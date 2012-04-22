---
date: '2008-04-18 11:09:18'
layout: post
slug: ninject-part-2-customizing-your-infrastructure-for-logging
status: publish
title: 'Ninject (Part 2): Customizing your infrastructure for logging'
wordpress_id: '221'
comments: true
categories:
- Dependency Injection
- Lightspeed
- Ninject
- Nlog
---

Yesterday we had a little introduction to [Ninject](http://ninject.org). Today I'd like to examine what's involved in getting some [AOP](http://en.wikipedia.org/wiki/Aspect-oriented_programming) style logging going for your application. I find that there are only very few places where I'm logging something that steps out of the bounds of being called at the end of the method when things succeed. I'm generally more interested in what happens when things go wrong and that's when I log the exception. In some cases I'll be interested in the actual parameters.

 

The code I'm going to show you will take care of basic logging needs but if you want more information about what happens inside your method you're either going to need to extend my implementation or log the call from within your method body. We're going to implement logging that when run with the debug level turned on will tell us that a method is going to execute, whether it finished successfully or with an error and if there was an error it will also log the exception.

 

To get this thing on the road, on the [LightSpeed](http://mindscape.co.nz) road that is. We're going to use [NLog](http://nlog-project.com) to get flexible routing of log messages. We're first going to create a LightSpeedTarget that is a customized NLog target (route destination) for your log messages.

 
    
``` csharp    	
namespace LoggingDemo.UI.Integration
{
    /// <summary>
    /// This class represents a NLog target that we can reference in the NLog.config file
    /// You can use this to use Lightspeed to log to the database just like a file target etc.
    /// </summary>
    [Target("LightSpeedTarget")]
    public class LightSpeedTarget : TargetWithLayout
    {

        public LightSpeedTarget(){
            Layout = "${message}";
        }

        protected override void Write(LogEventInfo logEvent)
        {
            var logMessage = CompiledLayout.GetFormattedMessage(logEvent);

            var appEvent = new ApplicationEvent
            {
                Sequence = logEvent.SequenceID,
                EventTime = logEvent.TimeStamp,
                Level = logEvent.Level.Name,
                LoggerName = logEvent.LoggerName,
                Message = logMessage
            };

            if (logEvent.Exception != null) appEvent.Exception = logEvent.Exception.ToString();
            if (logEvent.StackTrace != null) appEvent.StackTrace = logEvent.StackTrace.ToString();
            if (logEvent.UserStackFrame != null) appEvent.UserStackFrame = logEvent.UserStackFrame.ToString();

            Repository.Add(appEvent);
            Repository.CompleteUnitOfWork();
        }
    }
}
```

The class above overrides the TargetWithLayout class from the NLog project. The attribute tells NLog how to find this target. In the constructor I override the default message layout because it was a bit too verbose to my liking. 
    
We then override the Write method where we map the properties to our ApplicationEvent. And lastly we add the event to the repository and commit it.
Now if we want our application to use this we're going to have to tell it how. Nlog does this by looking for an nlog.config file in your application directory. So let's go ahead and add an nlog.config file to our project. I'll show you the nlog.config file for the application. In my unit test project I'm using the console logger so I can see what's going on :)

The NLog.config file for the application:

![image](http://flanders.co.nz/wp-content/uploads/2008/04/image.png)


My NLog.config file for my test project:

![image](http://flanders.co.nz/wp-content/uploads/2008/04/image1.png)

This enables our application to use the target we just created. Moving on now to the Interceptor which is Ninject specific (You can do the same with other DI frameworks). In Ninject you can tell the kernel to intercept a method on a class and execute some logic before and after invocation of the method. We can tell Ninject to intercept all methods on a class, specific methods or when we say all methods we can still exclude some of them. For our logging example I chose to use all methods on a class. You can do this by decorating the class with an [Intercept] attribute. If you would want a method not to be intercepted you can by decorating that method with an [DoNotIntercept] attribute. 
    
I took the liberty of inheriting of that attribute first.. that makes the rest of my code look a little bit prettier.

The LogMyCallsAttribute: 
    
``` csharp
using Ninject.Core;

namespace LoggingDemo.UI.Interceptors
{
    public class LogMyCallsAttribute : InterceptAttribute
    {
        public LogMyCallsAttribute() : base(typeof(LoggingInterceptor))
        {
        }
    }
}
```

The LoggingInterceptor:

``` csharp 
using System;
using Ninject.Core.Interception;
using Ninject.Core.Logging;

namespace LoggingDemo.UI.Interceptors
{
    public class LoggingInterceptor : SimpleFailureInterceptor
    {
        private readonly ILogger _logger;
        private bool _hasError;

        public LoggingInterceptor(ILogger logger)
        {
            _logger = logger;
            _hasError = false;
        }
        protected override void BeforeInvoke(IInvocation invocation)
        {
            _logger.Debug("About to invoke {0}", MethodNameFor(invocation));
        }

        protected override void OnError(IInvocation invocation, Exception exception)
        {
            _logger.Error(exception, "There was an error invoking {0}.\r\n", MethodNameFor(invocation));
            _hasError = true;
            base.OnError(invocation, exception);
        }

        protected override void AfterInvoke(IInvocation invocation)
        {
            _logger.Debug("invocation of {0} finished {1}.", MethodNameFor(invocation), (_hasError ? "with an error state" : "successfully"));
        }

        private static string MethodNameFor(IInvocation invocation)
        {
            return invocation.Request.Method.Name;
        }
    }
}
```

This class only overrides a couple of callbacks from its base class the `SimpleFailureInterceptor`. This is where the actual interception takes place. 

``` csharp
using System;
using Ninject.Core;
using Ninject.Core.Interception;

namespace LoggingDemo.UI.Interceptors
{
    public abstract class SimpleFailureInterceptor : IInterceptor 
    {

        #region IInterceptor Members

        public virtual void Intercept(IInvocation invocation)
        {
            try
            {
                BeforeInvoke(invocation);
                invocation.Proceed();
            }
            catch (Exception ex)
            {
                OnError(invocation, ex);
            }
            finally
            {
                AfterInvoke(invocation);
            }
        }

        #endregion

         protected virtual void BeforeInvoke(IInvocation invocation)
        {
        }
        
        protected virtual void AfterInvoke(IInvocation invocation)
        {
        }

        protected virtual void OnError(IInvocation invocation, Exception exception)
        {
            throw exception;
        }
    }
}
```

This is al the work that is involved in the actual implementation of our logger. Now I'd like to get some confirmation that things actually do work. Unit testing to the rescue I'd say ;)

The first thing we're going to need is way to verify that stuff actually got intercepted. I did that by subclassing the LoggingInterceptor with a LoggingCounterInterceptor in my unit test project.

``` csharp    
public class LoggingCounterInterceptor : LoggingInterceptor
{
    public int Count { get; private set; }

    public int ErrorCount { get; private set; }

    public void Reset()
    {
        Count = ErrorCount = 0;
    }

    public LoggingCounterInterceptor(ILogger logger) : base(logger)
    {
    }

    protected override void BeforeInvoke(Ninject.Core.Interception.IInvocation invocation)
    {
        Count++;
        base.BeforeInvoke(invocation);
    }

    protected override void OnError(Ninject.Core.Interception.IInvocation invocation, System.Exception exception)
    {
        ErrorCount++;
        base.OnError(invocation, exception);
    }
}


//The attribute for testing
public class LogMyCallsCounterAttribute : InterceptAttribute
{
    public LogMyCallsCounterAttribute() : base(typeof(LoggingCounterInterceptor))
    {
    }
}

```

In the code above we're just adding 2 counter properties to the interceptor and adding their counts at the appropriate time. Next we're going to need some kind of service class or something on which we can use our interceptor, enter the InterceptedServiceMock. 

```csharp    
public interface IInterceptedServiceMock
{
    void MethodWithoutBody();
    void MethodThatThrowsAnException();
}

[LogMyCallsCounter]
public class InterceptedServiceMock : IInterceptedServiceMock
{
    public virtual void MethodWithoutBody()
    {
        // Nothing to do here
    }

    public virtual void MethodThatThrowsAnException()
    {
        throw new Exception("Because I can.");
    }
}
```

The code above has one method that should execute and one method that throws an exception so we can verify things get picked up accordingly. Now all that's left to do is write the appropriate specs for them and see if they pass :) 

``` csharp    
[Context(Description = "Specifies the behavior for the LogMyCallsInterceptor")]
public class LogMyCallsInterceptorSpec
{
    private IKernel _kernel;

    [BeforeEach]
    public void Before()
    {
        var inlineModule = new InlineModule(m => m.Bind<IInterceptedServiceMock>().To<InterceptedServiceMock>());

        _kernel = new StandardKernel(new LinFuModule(), new NLogModule(), inlineModule);
    }

    [AfterEach]
    public void After()
    {
        _kernel.Dispose();
    }

    [Specification("All this should do is show the calls in the test runner. It should log to the console")]
    public void ShouldShowCallsInConsole()
    {
        var service = _kernel.Get<IInterceptedServiceMock>();
        IContext context = new StandardContext(_kernel, typeof(IInterceptedServiceMock));

        IRequest request = new StandardRequest(
            context,
            service,
            typeof(InterceptedServiceMock).GetMethod("MethodWithoutBody"),
            new object[0]
        );

        var interceptors = _kernel.GetComponent<IInterceptorRegistry>().GetInterceptors(request);

        var enumerator = interceptors.GetEnumerator();
        enumerator.MoveNext();

        Specify.That(interceptors.Count).Must.Equal(1, "There should be 1 interceptor registered");
        Specify.That(enumerator.Current).Must.Be.InstanceOf(typeof(LoggingCounterInterceptor));

        var interceptor = enumerator.Current as LoggingCounterInterceptor;

        service.MethodWithoutBody();

        Specify.That(interceptor).Must.Not.Be.Null();
        Specify.That(interceptor.Count).Must.Equal(1, "There should be 1 invocation counted.");
    }

    [Specification("Should show valid counts for a number of invocations")]
    public void Should_Show_Correct_Counts_For_Number_Of_Invocations()
    {
        var service = _kernel.Get<IInterceptedServiceMock>();
        IContext context = new StandardContext(_kernel, typeof(IInterceptedServiceMock));

        IRequest request = new StandardRequest(
            context,
            service,
            typeof(InterceptedServiceMock).GetMethod("MethodWithoutBody"),
            new object[0]
        );

        var interceptors = _kernel.GetComponent<IInterceptorRegistry>().GetInterceptors(request);

        var enumerator = interceptors.GetEnumerator();
        enumerator.MoveNext();

        Specify.That(interceptors.Count).Must.Equal(1, "There should be 1 interceptor registered");
        Specify.That(enumerator.Current).Must.Be.InstanceOf(typeof(LoggingCounterInterceptor));

        var interceptor = enumerator.Current as LoggingCounterInterceptor;

        service.MethodWithoutBody();
        service.MethodWithoutBody();
        service.MethodWithoutBody();

        Specify.That(interceptor).Must.Not.Be.Null();
        Specify.That(interceptor.Count).Must.Equal(3, "There should be 3 invocations counted.");
        Specify.That(interceptor.ErrorCount).Must.Equal(0, "There should be no errors counted.");
    }

    [Specification("Should have the correct count of invocations and the correct error count.")]
    public void Should_Have_Correct_Invocation_And_Error_Count()
    {
        var service = _kernel.Get<IInterceptedServiceMock>();
        var context = new StandardContext(_kernel, typeof(IInterceptedServiceMock));

        var request = new StandardRequest(
            context,
            service,
            typeof(InterceptedServiceMock).GetMethod("MethodWithoutBody"),
            new object[0]
        );

        var errorRequest = new StandardRequest(
            context,
            service,
            typeof (InterceptedServiceMock).GetMethod("MethodThatThrowsAnException"),
            new object[0]
        );

        var interceptors = _kernel.GetComponent<IInterceptorRegistry>().GetInterceptors(request);
        var errorInterceptors = _kernel.GetComponent<IInterceptorRegistry>().GetInterceptors(errorRequest);

        var enumerator = interceptors.GetEnumerator();
        enumerator.MoveNext();
        var errorEnumerator = errorInterceptors.GetEnumerator();
        errorEnumerator.MoveNext();

        Specify.That(interceptors.Count).Must.Equal(1, "There should be 1 interceptor registered");
        Specify.That(enumerator.Current).Must.Be.InstanceOf(typeof(LoggingCounterInterceptor));
        Specify.That(errorInterceptors.Count).Must.Equal(1, "There should be 1 error interceptor registered");
        Specify.That(errorEnumerator.Current).Must.Be.InstanceOf(typeof(LoggingCounterInterceptor));

        var interceptor = enumerator.Current as LoggingCounterInterceptor;
        var errorInterceptor = errorEnumerator.Current as LoggingCounterInterceptor;

        service.MethodWithoutBody();
        service.MethodWithoutBody();
        service.MethodWithoutBody();

        try
        {
            service.MethodThatThrowsAnException();
        }
        catch
        {
        }

        Specify.That(interceptor).Must.Not.Be.Null();
        Specify.That(interceptor.Count).Must.Equal(3, "There should be 3 invocations counted.");
        Specify.That(errorInterceptor.Count).Must.Equal(1, "There should be 1 invocation counted.");
        Specify.That(errorInterceptor.ErrorCount).Must.Equal(1, "There should be 1 error counted.");
    }
}
```
Testing this got a little messy I have to admit that. Now for a concrete example of how that looks in my application: 

``` csharp        
[Service(typeof(IBlogService))]
[LogMyCalls]
public class BlogService : DataServiceBase<Blog>, IBlogService
```

And that's how I implemented logging for my application :) Needless to say it was the testing that took me the longest to write. And from now on I don't have to worry anymore about forgetting that logger call. I always have minimal logging going. AOP is usefull in a lot more cases but this seemed like a good and easy example. 

Our next post will deal with initializing the modules in your application and their respective behaviors.

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f18%2fninject-part-2-customizing-your-infrastructure-for-logging%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f18%2fninject-part-2-customizing-your-infrastructure-for-logging%2f)

del.icio.us Tags: [LightSpeed](http://del.icio.us/popular/LightSpeed),[Ninject](http://del.icio.us/popular/Ninject),[NLog](http://del.icio.us/popular/NLog),[Dependency Injection](http://del.icio.us/popular/Dependency%20Injection),[IoC](http://del.icio.us/popular/IoC)
