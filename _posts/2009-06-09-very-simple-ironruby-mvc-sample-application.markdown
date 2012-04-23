---
date: '2009-06-09 23:45:03'
layout: post
slug: very-simple-ironruby-mvc-sample-application
status: publish
comments: true
title: Very simple IronRuby MVC sample application
wordpress_id: '359'
categories:
- ASP.NET MVC
- IronRuby
tags:
- ASP.NET MVC
- IronRuby
- IronRuby MVC
---

Over the weekend I wrote a very simple task list application with IronRuby MVC and LightSpeed as an OR/M. And I’ve just put a demo live. This demo is running on a windows 2008 vps with IIS 7 as webserver. The source of this sample is also available.

 

At this moment I’m working on the [Ironruby mvc](http://github.com/jschementi/ironrubymvc/) sample for my book. And while I was playing around to get some samples together I tried building the simplest application possible that has some degree relations in the db and does some crud. And I came up with the original idea of creating a task list application.

 

As an OR/M I choose to use [LightSpeed](http://www.mindscape.co.nz/products/LightSpeed/) and it runs on a sqlite database so it should be immediately usable after checking out. There is one caveat though. If you’re using a 32-bit OS you’ll need to replace the sqlite dll that is included in the dependencies tree with a 32-bit version of the dll and rebuild the solution.

 

The links:

 

Demo:      
[http://irtodo.koolkraft.net/](http://irtodo.koolkraft.net/)

 

Source of sample:     
[http://github.com/casualjim/ironrubymvc-sample](http://github.com/casualjim/ironrubymvc-sample)

 

IronRubyMVC source:

 

[http://github.com/jschementi/ironrubymvc](http://github.com/jschementi/ironrubymvc)

 

LightSpeed:     
[http://www.mindscape.co.nz/products/LightSpeed/](http://www.mindscape.co.nz/products/LightSpeed/)

 

Technorati Tags: [IronRuby MVC](http://technorati.com/tags/IronRuby+MVC),[IronRuby](http://technorati.com/tags/IronRuby),[ASP.NET MVC](http://technorati.com/tags/ASP.NET+MVC)
