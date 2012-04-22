---
date: '2006-09-23 09:08:42'
layout: post
slug: a-bit-further-down-the-castle-track
status: publish
title: A bit further down the Castle track
wordpress_id: '79'
---

I've been playing with [castle](http://www.castleproject.org/) all day yesterday and I can say the more I work with it the more I like it and start to see the full power of the framework.

[My previous post](http://www.flanders.co.nz/Blog/2006/09/20/AmITooLate.aspx) was more about my frustrations when using the [webforms model](http://www.asp.net).

One of castle's strengths is the [Inversion of Control pattern](http://en.wikipedia.org/wiki/Inversion_of_control), an introduction to IoC can be found on the Joy of code [partI](http://www.thejoyofcode.com/The_Awesome_Power_of_IoC.aspx#comments), [partII](http://www.thejoyofcode.com/The_Awesome_Power_of_IoC_Part_II.aspx#comments).  In castle they apply it via the [windsor container](http://www.castleproject.org/index.php/Windsor_Container)

An introduction to castle can be found on the codeproject :   
[Introducing castle part I](http://www.codeproject.com/cs/design/introducingcastle.asp)  
[Introducing castle part II](http://www.codeproject.com/cs/design/introducingcastleii.asp)

If you're creating a website that has not a lot of interaction or a very complex interface you probably won't benefit too much from castle. However if you know your project will be growing a lot or the interface is becoming quite complex then you're probably better of using castle. 

Asp.NET gives you instant speed for development but this slows down as the project becomes larger and your pages more complex it loses it's power and attraction, at least in my case.  If you have ever spent a couple of hours on a site figuring out why something doesn't have a value that should have one etc. you'll understand what I'm talking about probably.

Castle on the other hand starts to really shine the more complex you're application gets.  You define something once and you can re-use it in your whole application.  This is nice it means I can define a master layout, have a standard layout render in that master so I have a page :) 

If you then add a list to that page with a detail you'll quickly see that you would be able to call that listview over and over again from anywhere.  
Yes, I see the power of castle. The question is do you ?

Tomorrow I'll start a series on how to create a master detail using castle if somebody is interested. One that walks you through all the steps involved because I had a hard time figuring some stuff out. Not too hard if you consider that it took me about 1 week to get started with asp.net and about 2 weeks to get started with the atlas library. I have a written a timesheet application in  a couple of hours
