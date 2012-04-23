---
date: '2007-12-12 19:46:46'
layout: post
slug: aspnet-mvc-taken-for-a-test-drive
status: publish
title: ASP.NET mvc taken for a test drive
wordpress_id: '193'
categories:
- .NET 3.5
- Castle
---

A couple of days ago Microsoft released a CTP of the much discussed ASP.NET MVC handler. I decided to take it for a test drive.

 

At first I just wanted to have a look at how to use the MVC handler with the ADO.NET Entities but quickly found that I can easily replace like the view engine.

 

So I diverted my intentions and wanted to look at how hard it would be to plug it straight into the architecture of xero.

 

At Xero we currently use a 2 step view approach where each page transforms its output through xsl and renders html that way.  Our O/R Mapper of choice is LLBLGen Pro, who does a great job at mapping stuff but the API could be a lot nicer IMHO.

 

I'll make my application available soon, as soon as I removed the dependencies on LLBLGen and some of our custom classes. I have to do it this way because we're a publicly listed company and I'm not allowed to give out that information.

 

Aaanyway in all it took me about 4 hours to plug in an xslt view engine and implement attribute based filters.

 

Overall I'm quite happy with what I'm seeing that's in there. A couple of convenience methods like RenderText(...) would be nice. It would also be cool if it could find out the name of the requested action and then pass that as the current view so you don't have to specify the name of which view you want to render all the time.

 

We did run into some trouble while writing unit tests apparently we can't pass the view context a temp data dictionary but I'm sure that will be fixed soon.

 

So my conclusion is: There did go a fair bit amount of thought into the handler. I like what I see very much and I'll definitely keep a close eye on new developments in that space.

 

del.icio.us Tags: [asp.net mvc](http://del.icio.us/popular/asp.net%20mvc),[xero architecture](http://del.icio.us/popular/xero%20architecture),[aspnetmvc](http://del.icio.us/popular/aspnetmvc)
