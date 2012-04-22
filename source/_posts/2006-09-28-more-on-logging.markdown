---
date: '2006-09-28 14:10:58'
layout: post
slug: more-on-logging
status: publish
title: More on logging
wordpress_id: '76'
---

Earlier this week, about the same time that I was playing with health monitoring. I found out after a while that log4net isn't working on Vista RC1.

Now I don't know about you but log4net seemed like the obvious choice for logging for me.  Now I was forced to have a look around what else is there. And castle supports also [nlog](http://www.nlog-project.org/). I took a closer look at nlog and I like it a lot. It has much better integration with visual studio 2005 than log4net has.

The configuration was much easier. I wrote a "log provider" (log target in the nlog dictionary) for base4 in about 15 minutes.  Ah yes extensibility is great for this product. 

It's open source but it is a really tight project.  Maybe you too should investigate :)
