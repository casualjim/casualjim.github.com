---
date: '2009-03-09 19:18:22'
layout: post
slug: ironruby-mvc-progress
status: publish
comments: true
title: IronRuby MVC progress
wordpress_id: '307'
categories:
- ASP.NET MVC
- IronRuby
tags:
- ASP.NET MVC
- IronRuby
- IronRuby MVC
---

If you follow my tweets or the [IronRuby](http://ironruby.net) mailinglist then you would know that I’ve been working on taking [IronRuby](http://ironruby.net) ASP.NET MVC from the prototype stages to a more complete application. For me this has been a great experience getting familiar with the insides of ASP.NET MVC as well as playing around with integrating [IronRuby](http://ironruby.net) in an existing C# application.

The guys over at MSFT ([John Lam](http://www.iunknown.com), [Jimmy Schementi](http://blog.jimmy.schementi.com) and [Phil Haack](http://haacked.com)) had previously created a prototype and I built upon their work. You can read more about the previous versions of the prototype.       
[http://www.iunknown.com/2008/06/ironruby-and-aspnet-mvc.html](http://www.iunknown.com/2008/06/ironruby-and-aspnet-mvc.html)       
[http://blog.jimmy.schementi.com/2008/07/aspnet-and-dynamic-languages.html](http://blog.jimmy.schementi.com/2008/07/aspnet-and-dynamic-languages.html)       
[http://haacked.com/archive/2008/06/12/ironruby-and-asp.net-bffs-forever.aspx](http://haacked.com/archive/2008/06/12/ironruby-and-asp.net-bffs-forever.aspx)       
[http://haacked.com/archive/2008/07/20/ironruby-aspnetmvc-prototype.aspx        
](http://haacked.com/archive/2008/07/20/ironruby-aspnetmvc-prototype.aspx)[http://haacked.com/archive/2009/02/17/aspnetmvc-ironruby-with-filters.aspx](http://haacked.com/archive/2009/02/17/aspnetmvc-ironruby-with-filters.aspx)

In a previous post I explained what I had done I explained how I found an entry point and how to get started building your own mvc framework on top of asp.net MVC.

[http://flanders.co.nz/2009/01/25/created-a-basic-integration-for-ironruby-and-aspnet-mvc/](http://flanders.co.nz/2009/01/25/created-a-basic-integration-for-ironruby-and-aspnet-mvc/)

How far am I now since my last post? Well we’ve got action filters, result filters, exception filters and authorization filters. We have an IronRubyMvcApplication as a base HttpApplication. Which should get you pretty far when building apps with [IronRuby MVC](http://github.com/casualjim/ironrubymvc). 

I’m currently looking at implementing selectors and aliased actions. When I’m done with that I guess I’ve got a fairly working implementation of asp.net MVC and I’ll start developing a sample with it. 

I’ve actually started building the sample to find out if I’ve missed something. The sample will be using [LightSpeed](http://www.mindscape.co.nz/products/LightSpeed/default.aspx), [IronRubyMVC](http://github.com/jschementi/ironrubymvc) as well as youtube and flickr.

I would love to hear from people that submit bugs or even patches. I’d also like to get some discussion going on what is going to happen to it in the future :)

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2009%2f03%2f09%2fironruby-mvc-progress%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2009%2f03%2f09%2fironruby-mvc-progress%2f)
