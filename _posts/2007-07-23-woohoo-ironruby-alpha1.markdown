---
date: '2007-07-23 22:26:31'
layout: post
slug: woohoo-ironruby-alpha1
status: publish
title: Woohoo IronRuby alpha1
wordpress_id: '166'
categories:
- .NET 2.0
---

Well I'm pretty excited about the drop of IronRuby 

We took it for  a quick spin at work.. and it looks really promising :)

As you can read on John Lams blog there are a bunch of things that aren't implemented yet.

One of those things would be to enumerate the methods of a class.

We thought String would be a good fit as John is explaining how much time they put in that one.

so this is what we tried.

start up the ironruby console

str_test = "Hello World"

10.times { puts str_test }

which gives the expected output

Iterations over arrays etc work as expected.

however one of the things i use a lot are the methods : methods and attributes

attributes shouldn't exist on a string class but methods should only now it throws an error.

All in all I'm very impressed by what they've accomplished so far and I'll definitely be looking at contributing to this project as soon as I have completed my last 2 projects for clients.
