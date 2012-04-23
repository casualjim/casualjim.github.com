---
date: '2006-09-20 08:49:40'
layout: post
slug: am-i-too-late
status: publish
title: Am I too late ?
wordpress_id: '80'
---

Yesterday I had a discussion with [Alex](http://www.base4.net/Blog.aspx) about asp.NET where I vented some of the frustrations I have building a CRM application on one form with multiple user controls that have enough functionality in them that other people would create separate pages for it.

I don't like the fact that you loose information about something you're working on because you need to change a small piece of a bigger whole.

Anyway my problem is that to do something that is more complex than just simply displaying one form on a page asp.NET gets pretty complicated. Events are firing all over the place. I have to take viewstate into account. (I turned viewsate off because it was about 50K half way through my app.) And then it became even more difficult to get stuff to respond the way I want them to respond. 

All in all it takes a really long time before I get something done properly. Where all it is actually doing is rendering small portions html out to the browser.

I have also been discussing with Alex on how to create something that takes a view definition and merges it with base4 domain objects to get to a view.

Well enter the [castle project](http://www.castleproject.org/). I looked at it before but never really saw the point. Yesterday I got down and dirty with it and let me tell you I DO see the point now.

The way they built their framework resembles very closely how I was going to build ours.

It provides a more natural way of creating webpages in my mind than trying to force a winform programming model into a stateless model. Not to mention the speed in which you get things done.

[I'm not the only one who joins the party this late](http://www.thejoyofcode.com/The_Awesome_Power_of_IoC.aspx)
