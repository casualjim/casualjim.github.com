---
date: '2007-10-22 22:24:23'
layout: post
slug: rejoining-the-pack
status: publish
title: Rejoining the pack
wordpress_id: '176'
categories:
- .NET 3.0
- C#
- Personal
---

The last year I've dabbled a lot with linux, ruby etc. Investigating alternative means of developing web applications.  I have switched back to vista ultimate x64 now because I spend about 95% of my time developing on windows so it didn't make sense to run linux as a base system.  Both ubuntu with Beryl or vista are just as slow/fast on my computer the admin time for my windows system is a lot shorter than the one for my ubuntu system.

I'm not taking a hard line against webforms any more, I still think I won't be using them in complex projects but for quick prototyping the dynamic datacontrols are pretty cool. Which won't stop me from building my own mvc style architecture because the current defacto standard is suffering from code bloat and a too tight integration of javascript frameworks etc.

This weekend I've finally started playing around with c# 3.0 and silverlight and I liked what I saw a lot.  

I'm getting my head around the new technolgies by building a little texas holdem multiplayer game.  So the technologies this project will use are: .net 3.5 with c# 3.0, silverlight 1.1 (with xaml), WCF.

I started building that texas holdem poker game because I couldn't find a nice one that I could install on my LAN or one that wouldn't require me to get a mortgage if I would lose a game online.

The microsoft one that comes with vista ultimate is nice and i aim to beat it by making it multiplayer.

The most challenging bit of this poker game is definitely the AI for the computer players because I don't want them to be idiots but also not the best players in the world seen as i'm not the world's greatest poker player (I'm still working for a living :)). If somebody that reads this blog has done some similar work or knows of some resources for me to work through some of that stuff please share them.

So far I've got the following logic going:

Evaluating wheter it's a good hand or a bad hand: simulate about 1000 games with the same hand,same cards on the table and the same number of players.

That gives me an idea of how good the hand is and if it should fold.  Next I want to figure out whether the player should bet, check or raise this is done by looking at the odds and the maximum score I could reach as well as how far along we are in the game.. I have more in my head but not enoughtime to write it all down. I'll write more on this subject in the course of the next few weeks.

I'm planning on making the multiplayer version open sourced for demo purposes but not the one that contains the AI for the computer players.

 

del.icio.us tags: [texas holdem](http://del.icio.us/popular/texas%20holdem), [silverlight](http://del.icio.us/popular/silverlight), [.NET 3.5](http://del.icio.us/popular/.NET%203.5), [Linq](http://del.icio.us/popular/Linq)
