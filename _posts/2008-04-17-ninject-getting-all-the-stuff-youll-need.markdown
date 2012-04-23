---
date: '2008-04-17 11:13:48'
layout: post
slug: ninject-getting-all-the-stuff-youll-need
status: publish
title: 'Ninject: Getting all the stuff you''ll need'
wordpress_id: '218'
comments: true
categories:
- .NET 3.5
- Dependency Injection
- Lightspeed
- Ninject
- Nlog
tags:
- Dependency Injection
- Lightspeed
- Ninject
- Nlog
---

I have a new project I started and I could reevaluate my toolset :) I decided to take a closer look at [Ninject](http://ninject.org), [Moq](http://code.google.com/p/moq/) and [NSpecify](http://https//nspecify.svn.sourceforge.net/svnroot/nspecify). [Moq](http://code.google.com/p/moq/) has been talked about enough I think, a really nice way of mocking and I will definitely be using more of it. My original plan was to write one big blog post.. but it is going to be far too long, so I'm breaking it up in smaller bite size pieces.

What I did was download the code, have it rest on my pc for about a week, updated again when I really got round to using it. I read the [wiki](http://dojo.ninject.org/wiki/display/NINJECT/Ninject+Manual) which gives a short introduction on what's what in Ninject and everybodies jobs. Decided that the wiki was cool for some more theoretical knowledge but I really needed to see more code.

I opened the project and something rare happened: I was actually very happy with the code I found, not always the case I can tell you ;). Anyway the gold is in the unit tests, it's got great test coverage and it shows lots of the possibilities of Ninject. It's like a great big manual for you to get really advanced with it really quickly. I was slightly disappointed to see that there was no [NLog](http://nlog-project.com) support for Ninject, that disappointment quickly turned in to joy when I figured out it only took me 20 minutes to plug NLog in. And it was added to the trunk the same day.

Now I don't want to make this post about which DI framework is better Windsor, Spring, Structuremap or Ninject. I just know that Ninject and I will become good friends over the next couple of months I like it. Ninject outsources its proxy generation to either Castle's DynamicProxy2 or to LinFu DynamicProxy. LinFu seemed like an interesting choice after reading [this codeproject article](http://www.codeproject.com/KB/cs/LinFuPart1.aspx). It's supposedly faster than castle's dynamic proxy. Luckily Ayende is there to put this in [perspective](http://www.ayende.com/Blog/archive/2007/10/16/Trusting-the-benchmark.aspx). And I can confirm that the error messages etc castle's dynamic proxy generates are a lot more useful than LinFu.

![Screenshot - LinFuGraph.png](http://www.codeproject.com/KB/cs/LinFuPart1/LinFuGraph.png)

Anyway I'm using LinFu at the moment as the proxy generator for Ninject. I will walk you through a sample application I built that will deal with the following subjects of Ninject, Lightspeed and NLog. For Ninject we will use the dependency injection and it's interceptor possibilities to implement AOP style logging. For Lightspeed we will create our own logger to plug into the context so that we can log what Lightspeed does too. And we want NLog to log through Lightspeed to our database so we'll be creating a custom target for NLog as well.

But let's start at the beginning doing DI with Ninject :).

The most important thing to remember: **MAKE YOUR METHODS VIRTUAL**. Once again **make your methods virtual **otherwise Ninject has a hard time generating proxies for your classes.

Ninject is different from most other DI Containers in that it doesn't have XML-configuration, its configuration is done through code (wouldn't be hard to add an XML configuration for it tho but what's the point). No XML ?? Suits me fine, everybody that ever worked with me will agree : Ivan no like XML editing. Ninject takes a modular approach by using modules that you pass to a kernel. This is pretty nice that means that an assembly can have a couple of different sets of Modules and all the caller of that assembly needs to do is add the module with the appropriate configuration to their kernel.

Ninject supports DI on constructors, properties, methods and fields: [http://dojo.ninject.org/wiki/display/NINJECT/Injection+Patterns](http://dojo.ninject.org/wiki/display/NINJECT/Injection+Patterns).      
It basically boils down to decorating the item you want to inject with the attribute _[Inject]_

Ninject allows you to do a lot of configuration through the use of attributes. But I think I'll leave it at that for today and continue this tomorrow.     
Let's look at a concrete class from what we've seen so far. The class below is the Logger implementation to plug into the LightSpeedContext. We will finish this later on but for now this will be enough to summarize today's post.

 
``` csharp    
using Ninject.Core;
using Ninject.Core.Logging;

using ILightSpeedLogger = Mindscape.LightSpeed.Logging.ILogger;
using INinjectLogger = Ninject.Core.Logging.ILogger;

namespace LoggingDemo.UI.Integration
{
    ///
    /// This class intercepts logging messages from the LightSpeed context and
    /// sends them to our NLog logger.
    ///
    public class LightSpeedLogger : ILightSpeedLogger
    {
        private readonly INinjectLogger logger = NullLogger.Instance;
        
        public LightSpeedLogger()
        {
        }
        
        [Inject]
        public LightSpeedLogger(INinjectLogger logger)
        {
            this.logger = logger;
        }
        
        #region ILogger Members
        
        public virtual void LogSql(object sql)
        {
            logger.Info(sql.ToString());
        }
        
        public virtual void LogDebug(object text)
        {
            logger.Debug(text.ToString());
        }
        
        #endregion
    }
}
```

Let me know what you think :)

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f17%2fninject-getting-all-the-stuff-youll-need%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f17%2fninject-getting-all-the-stuff-youll-need%2f)
