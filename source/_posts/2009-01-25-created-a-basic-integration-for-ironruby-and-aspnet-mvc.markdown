---
date: '2009-01-25 14:42:13'
layout: post
slug: created-a-basic-integration-for-ironruby-and-aspnet-mvc
status: publish
comments: true
title: Created a basic integration for IronRuby and Asp.NET MVC
wordpress_id: '297'
categories:
- .NET 3.5
- IronRuby
tags:
- IronRuby
---

As I can see the end of the chapter on Rails and I'm looking ahead to see what will be next. I decided to start working on the chapter that talks about using IronRuby with Asp.NET MVC next.  [Jimmy Schementi](http://blog.jimmy.schementi.com/) and [Phil Haack](http://haacked.com/) created a proof of concept implementation a couple of months ago that actually did work.
The past weekend I've been looking to build on the excellent work they did and to build a more complete integration. In this post I'll try to explain what I did to make it work.  The integration work is far from complete, so if you've got some free time on your hands and you happen to be looking for an Open Source project to help with then this could be a candidate for you :).


### Finding a place to start
Let me start off by saying that I'm pretty happy with the internals of the asp.net mvc framework. The code was easy to read given that you start in the correct file and work your way through much in the same way a request would be executed. In my case I started at the MVC handler and immediately you see one of the classes that we'll definitely need to customize. The _RubyControllerFactory_ is the class in question and it needs to be customized because we're going to use a _RubyController_.
ASP.NET MVC internally uses reflection to do its magic. In the futures project they have a couple of other implementations like async with reflection and so on. I decided to use the classes prefixed as Reflected as my guide for creating my own integration they were probably the simplest implementation of the class.
I kept the view engine Jimmy and Phil created and focussed on the controllers. Working with the DLR API's requires a bunch of classes and 

### Sweet now what does this mean in terms of IronRuby integration?
To limit some of the work I needed to be doing I decided that Ruby controller actions don't take any parameters we can bind to instead you will have to rely on the data that's available in the params hash to get to the input delivered by the request. Actually I made a decision to keep that from the POC implementation before.  
In ASP.NET MVC there is a _ReflectedControllerDescriptor_ and a _ReflectedActionDescriptor_. They are used to cache the information we need so it only has to perform the costly operations once, which is a good strategy IMHO. 
For IronRuby that means we'll need to create a _RubyControllerDescriptor_ and _RubyActionDescriptor_. The last class we'll going to need to customize in this exercise is the _ControllerActionInvoker_ which as the name hints at: invokes actions on your controller :)
For people that have been doing rails applications, you're not limited to Rails now. You could use Ruby but leverage the ASP.NET MVC infrastructure for implementing a mvc web app. When somebody would create the adapters for activerecord to leverage ADO.NET to talk to data sources you should be able to just use active record that comes with the rails framework in your app as models. The view engine in ironrubymvc is also erb based so I'd imagine you would be able to just copy your view code in and making sure that you have replacement helpers if you've used helpers. 
Working on this code also opens up the question if it isn't possible to actually run rails via a similar mechanism... mmm must investigate 

### Where can I find it?
I forked the git repository from [Jimmy Schementi](http://github.com/jschementi/ironrubymvc). And I do send him pull requests when I've pushed some changes. So you could potentially pick that repository to work out of. The disadvantage is that you won't pick up changes I make immediately. The good thing is that Jimmy's repo is probably a good place to follow because he can also take work that Phil did and add it to the repo. I will then have to sync my version with his.
Or you could use [my repo](http://github.com/casualjim/ironrubymvc) and pick up the changes I make immediately but you'll have to wait to merge it with the changes that have been applied into Jimmy's repo until I get around to merging that into mine.
I'd say that over time it would probably be a better idea to get the repo from Jimmy while mine will be very active but just for a short period of time, when I'm happy with it I'll move on. 

### What's left to do?



	
  * Implement action filters (before/after)

	
  * Implement authorization filters

	
  * Implement an HttpApplicationBase class that will create the script runtime

	
  * Implement a HttpModule that will take care of creating a RubyEngine object

	
  * ...



For today I'd say **_go\_to("http://github.com/casualjim/ironrubymvc").play.create.have\_fun_**

When my work stabilizes a little bit more I'll write a blog post explaining how I went about using the DLR hosting API's to host IronRuby in an ASP.NET application and how the implemenation of IronRubyMvc was put together.

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2009%2f01%2f25%2fcreated-a-basic-integration-for-ironruby-and-aspnet-mvc%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2009%2f01%2f25%2fcreated-a-basic-integration-for-ironruby-and-aspnet-mvc%2f)
