---
date: '2009-07-02 14:45:21'
layout: post
slug: a-rant-on-a-talk-falling-to-pieces
status: publish
comments: true
title: A rant on a talk falling to pieces
wordpress_id: '360'
categories:
- ASP.NET MVC
- caricature
- IronRuby
- Presentations
- silverlight
tags:
- caricature
- IronRuby
- IronRuby MVC
- Presentation
---

Earlier this week I had the pleasure of doing a talk for the Belgian .NET user group. During this talk I ran in to all kinds of problems. I've done presentations where I was royally underprepared and to avoid that this time I actually started prepping for this talk on time. I was done on time, was prepared had 5 backups of my presentation and samples. What did I learn from this, if you're prepared other things will go wrong.      
I'll share the story of stuff that can go wrong. 

 

Before starting the rant I have some links to share.

 

  
  * [Slides](http://www.slideshare.net/casualjim/ruby-loves-dot-net)
   
  * IronRubyMvc sample – [live demo](http://irtodo.koolkraft.net/) – [source](http://github.com/casualjim/ironrubymvc-sample/tree/master)
   
  * Silverlight sample – [live demo](http://samples.koolkraft.net/picture_view/) – [source](http://samples.koolkraft.net/picture_view.zip)
   
  * IronRubyMVC specs – [source](http://github.com/casualjim/ironrubymvc/tree)
   
  * Sinatra – [source](http://samples.koolkraft.net/sinatra.zip)
   
  * Metaprogramming - [source](http://samples.koolkraft.net/metaprogramming.zip)
 

I have a device that I call internet on a stick, which is a vodafone usb 3G modem that I plug in to my system and it gets me on the internet (mistake 1). Since I assumed that that thing would continue to work I made most of my demos internet enabled (mistake 2). For example I have a demo where I go download pics from flickr and then show them with some animations with silverlight.      
Before my presentation I changed the fonts, opened all the files I was going to talk about ran all the demos again to make sure they would work and everything went fine.       
I unplug the USB device and go into the room to hook up the projector etc. The presentation starts and for the first hour everything went really well (from my perspective at least don't know about the people attending).       
We have a break and I plug the USB device in, at this point the vodafone program hangs (first time ever I swear). What's more I can't make it go away at all so I reboot my pc (this is still during the break). 

 

Now I'm getting a little desperate because it still doesn't work. With rebooting I also lost all my carefully opened files earlier (I'm showing code in about 3 different environments and 2 different OS'es).      
So during the presentation I apologise and try to reboot once more while taking questions from the audience and hoping somebody will try to start a discussion with me. After rebooting I got a message saying my date was set to 2001 which I thought was peculiar but clicked it away. I boot vmware fusion with windows 7 (this took fairly long and is a little bit funky as the screen resolution changes a lot during this process).       
Ok so far so good, by now I've already skipped the silverlight demo promising that it will be available as a download on my blog and will be moving on to the ironrubymvc sample. To prove I do actually use visual studio at times I wanted to open my demo project in visual studio. I open visual studio only for it to tell me that my trial has expired and I can either upgrade or close the application. Oooooookay this is completely weird because i get my software through my msdn subscription and I had been using it earlier that day. 

 

Moral of the story: Either go vastly underprepared and wing it. Or don't rely on the internet and always take at least 2 laptops that have identical configurations but I'm pretty sure those would or explode in my face or something will fall from the ceiling, building collapses or other mishaps. 

 

Instead of having one demo go bad on me now I'm probably facing a reinstall of my mac because it lost a bunch of settings, for which I'm holding the vodafone responsible. At this moment I'm fairly certain that I should go less prepared and just wing it just out of fear for bigger disasters, people may die. 

 