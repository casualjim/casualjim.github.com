---
date: '2007-12-16 23:03:51'
layout: post
slug: implementing-filters-in-aspnet-mvc
status: publish
title: Implementing filters in asp.net mvc
wordpress_id: '195'
comments: true
categories:
- .NET 3.5
- C#
- Castle
---

One of the things I wanted for the framework I'm building for Xero was to implement filters.

I have a first pass of those ready.. didn't take me to long to implement either.  I only tested the before filters I haven't gotten round to testing the After filter. I have to do a demo today that demonstrates databinding (like the castle project solved it.)  What I'm putting on my blog here is very much a proof of concept implementation and you should not use this in a production environment.

Here's how I went about it. In this post I'll show how I implemented a filter that directs anonymous users to the login page.

1. Define a couple enumerations

``` csharp
public enum Execute
{
    Before,
    After,
    BeforeAndAfter
}

public enum SecureFor
{
    None,
    Anonymous,
    PerUser
}
```

2. Create an IFilter interface

``` csharp
using System.Web;

namespace Xero.Mvc.Extensions.Filters
{
    public interface IFilter
    {
        Execute WhenToExecute { get; }
        IHttpContext HttpContext { get; set; }
        void Execute();
    }
}
``` 

3. Create an AbstractFilter base class

``` csharp
using System;
using System.Web;

namespace Xero.Mvc.Extensions.Filters
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public abstract class AbstractFilter : Attribute, IFilter
    {
        private readonly Xero.Mvc.Extensions.Execute whenToExecute;
        private IHttpContext httpContext;
        public AbstractFilter(Xero.Mvc.Extensions.Execute whenToExecute)
        {
            this.whenToExecute = whenToExecute;
        }

        public IHttpContext HttpContext
        {
            get { return httpContext; }
            set { httpContext = value; }
        }

        public Xero.Mvc.Extensions.Execute WhenToExecute
        {
            get { return whenToExecute; }
        }

        public abstract void Execute();
    }
}
```

4. Create a SecureFilter base class

``` csharp
using System;
using System.Web;
using System.Collections.Generic;

namespace Xero.Mvc.Extensions.Filters
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public abstract class AbstractSecureFilter : AbstractFilter, IFilter
    {
        private readonly SecureFor secureFor;

        public AbstractSecureFilter(Xero.Mvc.Extensions.Execute whenToExecute, SecureFor secureFor)
            : base(whenToExecute)
        {
            this.secureFor = secureFor;
        }

        public SecureFor SecureFor
        {
            get { return secureFor; }
        }

        protected void RedirectToLogin()
        {
            HttpContext.Response.Redirect("~/", true);
        }
    }
}
```

5. Implement the concrete AnonymousUsersFilter

``` csharp
using Xero.Mvc.Extensions.Filters;
using Xero.Mvc.Tasklist.Model.EntityClasses;
using Xero.Mvc.LLBLGenIntegration.Services;
using System;
using System.Collections.Generic;
using Xero.Mvc.Extensions;

namespace Xero.Mvc.Tasklist.Filters
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AnonymousUsersFilter : AbstractSecureFilter
    {
        private User[] users;
        private DataService<User> userService;
        public AnonymousUsersFilter(Xero.Mvc.Extensions.Execute whenToExecute, SecureFor secureFor) : this(whenToExecute, secureFor, null) { }

        private AnonymousUsersFilter(Xero.Mvc.Extensions.Execute whenToExecute, SecureFor secureFor, User[] users)
            : base(whenToExecute, secureFor)
        {
            this.users = users;
            this.userService = new DataService<User>();
        }
        public AnonymousUsersFilter(Xero.Mvc.Extensions.Execute whenToExecute, User[] users) : this(whenToExecute, SecureFor.PerUser, users) { }

        public User[] Users
        {
            get { return users; }
        }

        public override void Execute()
        {
            if (SecureFor == Xero.Mvc.Extensions.SecureFor.Anonymous && HttpContext.Session["userId"] == null)
            {
                RedirectToLogin();
            }

            if (SecureFor == Xero.Mvc.Extensions.SecureFor.PerUser && Users == null)
                RedirectToLogin();

            if (SecureFor == Xero.Mvc.Extensions.SecureFor.PerUser)
            {
                User currentUser = userService.FindOneById((Guid)HttpContext.Session["userId"]);
                List<User> allowedUsers = new List<User>(Users);
                if (allowedUsers.Find(usr => usr.Name.ToUpperInvariant() == currentUser.Name.ToUpperInvariant()) == null)
                RedirectToLogin();
            }
        }
    }
}
```

6. Implement the filter on a controller

``` csharp
[AnonymousUsersFilter(Xero.Mvc.Extensions.Execute.Before, SecureFor.Anonymous)]
public abstract class SecureControllerBase : SmartXeroController
```

7. There are a couple of places where you can implement the execution of the filter logic. I chose to do it before the actual controller class is being loaded. To do that I had to create a handler and a routehandler

7.a The MvcHandler

``` csharp
using System.Web.Mvc;
using System;
using Xero.Mvc.Core.Exceptions;
using Xero.Mvc.Extensions.Filters;
using System.Linq;

namespace Xero.Mvc.Extensions
{
    public class XeroMvcHandler : MvcHandler
    {

        protected override void ProcessRequest(System.Web.IHttpContext httpContext)
        {
            if (this.RequestContext == null)
            {
                throw new NoRequestContextException();
            }

            string controllerName = this.RequestContext.RouteData.Values["controller"].ToString();

            Type controllerType = this.GetControllerType(controllerName);
            if (controllerType == null)
            {
                throw new NoControllerFoundException(this.RequestContext.HttpContext.Request.Path);
            }

            IFilter[] filters = controllerType.GetCustomAttributes(typeof(IFilter), true) as IFilter[];
            filters
                .Where(attr => attr.WhenToExecute == Xero.Mvc.Extensions.Execute.Before || attr.WhenToExecute == Xero.Mvc.Extensions.Execute.BeforeAndAfter)
                .ToList()
                .ForEach(attr =>
                {
                    if (attr != null)
                    {
                        attr.HttpContext = httpContext;
                        attr.Execute();
                    }
                });

            IController controllerInstance = this.GetControllerInstance(controllerType);
            ControllerContext controllerContext = new ControllerContext(this.RequestContext, controllerInstance);
            controllerInstance.Execute(controllerContext);
            filters
                .Where(attr => attr.WhenToExecute == Xero.Mvc.Extensions.Execute.After || attr.WhenToExecute == Xero.Mvc.Extensions.Execute.BeforeAndAfter)
                .ToList()
                .ForEach(attr =>
                {
                    if (attr != null)
                    {
                        attr.HttpContext = httpContext;
                        attr.Execute();
                    }
                });
        }
    }
}
```

7b. The Route Handler

``` csharp
using System.Web.Mvc;
using System.Web;

namespace Xero.Mvc.Extensions
{
    public class XeroMvcRouteHandler : IRouteHandler
    {

        #region IRouteHandler Members
        public System.Web.IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new XeroMvcHandler { RequestContext = requestContext };
        }

        #endregion
    }
}
```

8. And the last step is to tell your application that it needs to use the new route handler. You can do that in the `global.asax.cs` 

``` csharp
protected override void SetupRoutes()
{
  // Note: Change Url= to Url="[controller].mvc/[action]/[id]" to enable 
  //       automatic support on IIS6 

  RouteTable.Routes.Add(new Route
  {

      Url = "Login/Default.aspx",
      Defaults = new { controller = "Login", action = "Index", id = (string)null },
      RouteHandler = typeof(XeroMvcRouteHandler) // Our custom route handler
  });

  RouteTable.Routes.Add(new Route
  {
      Url = "[controller]/[action]/[id]",
      Defaults = new { action = "Index", id = (string)null },
      RouteHandler = typeof(XeroMvcRouteHandler)
  });

  RouteTable.Routes.Add(new Route
  {
      Url = "Default.aspx",
      Defaults = new { controller = "Login", action = "Index", id = (string)null },
      RouteHandler = typeof(XeroMvcRouteHandler)
  });
}
```

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2007%2f12%2f17%2fimplementing-filters-in-asp.net-mvc.aspx)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2007%2f12%2f17%2fimplementing-filters-in-asp.net-mvc.aspx)
