---
date: '2006-11-07 07:16:53'
layout: post
slug: boo-ironpython-scriptaculous-ms-ajax-and-me
status: publish
title: Boo, Ironpython, Scriptaculous, MS Ajax and me
wordpress_id: '58'
categories:
- .NET 2.0
- .NET 3.0
- Atlas
---

Over the weekend I got the idea of learning ironpython by moving the codebase that I have for nblogr to [ironpython](http://www.codeplex.com/Wiki/View.aspx?ProjectName=IronPython) script and compiling it.

Everything went fine until I had to decorate a method to make it cache/participate in a transaction/set a layout on a controller because ironpython in all its beauty doesn't support attributes on methods or classes.

I'm also missing a reference for [ironpython](http://www.codeplex.com/Wiki/View.aspx?ProjectName=IronPython). Something that shows the available functions and the syntax for inheritance etc.  which slowed me down of course.

Why do I want a dynamic language ?

The 2 main reasons are : [Duck typing](http://en.wikipedia.org/wiki/Duck_typing) and readable [anonymous functions](http://en.wikipedia.org/wiki/Anonymous_closure).  In c# there is the concept of anonymous delegates but that code really looks like it has been hit by a train, ugly.

I've been writing in [boo](http://boo.codehaus.org/) for a while now just as a templating language and yes I like [boo](http://boo.codehaus.org/) a lot.  It combines the nice features of python with the c# language in a wrist friendly way. (I never got the point of wrist friendly thing until I got [carpal tunnel syndrome](http://www.ninds.nih.gov/disorders/carpal_tunnel/detail_carpal_tunnel.htm#69013049), now it suddenly is a major issue)

I sure wish there would be a language service for visual studio to do boo development but I've been using sharp develop 2.1 to check it out.

[SharpDevelop 2.1](http://www.sharpdevelop.com/) is a nice piece of work definitely for an open source IDE', it beats eclipse in my book

In boo everything is an object also your functions and expressions (read it has anonymous functions).  Boo is strong typed but mimics duck typing in some form.

To conclude this little intermezzo : my next project will be written in boo :)

On the ajax library front I would have to report that I haven 't looked at atlas/ms ajax since the beginning of september . I had decided to use it again when they finally release the framework.  So I've been checking out these other libraries that are out there.  I checked out [jquery](http://jquery.com) which is a cool library but it is also slower in execution than the other ones.

The next one on the list was [scriptaculous](http://script.aculo.us) and that is the one I've been using in my projects now.  Scriptaculous does exactly what is expected and uses the javascript prototype model which happens to be one i like :) 

The move from the guys at MS to make their ajax extensions based on prototype was surprising but very positive in my book :) So when they release it i'll look at creating an javascript provider for nblogr so that you would be able to switch between your favourite library (we have plans to support the major libraries out of the  box.)  

del.icio.us tags: [Boo](http://del.icio.us/popular/Boo), [IronPython](http://del.icio.us/popular/IronPython), [Programming](http://del.icio.us/popular/Programming), [General](http://del.icio.us/popular/General)
