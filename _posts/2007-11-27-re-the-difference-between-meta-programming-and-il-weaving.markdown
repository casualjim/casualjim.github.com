---
date: '2007-11-27 07:34:33'
layout: post
slug: re-the-difference-between-meta-programming-and-il-weaving
status: publish
title: 'Re: The difference between meta programming and IL weaving'
wordpress_id: '192'
categories:
- .NET 3.5
- C#
- IronRuby
- Ruby
---

Ayende [replied](http://ayende.com/Blog/archive/2007/11/27/The-difference-between-meta-programming-and-IL-weaving.aspx) to [my post](http://flanders.co.nz/blog/archive/2007/11/27/mixins-in-c-3.0.aspx) from this morning. His point is that the in order to be able to do meta programming Reflection.Emit isn't enough because it happens after the compilation has taken place. And in order to do meta programming you need to be able to do that during the compilation step. This is my reply, hence the title :)

 

Meta-programming can be achieved by having the language implementation change classes or generate classes at some point. In dynamic languages that is generally at run time, it's most common use is where the data format drives the code ie. a database, csv files etc. For the sake of this discussion i'm going to keep it at runtime, if meta programming occurs at compilation time it loses a lot of its power, how is it going to respond to changes at runtime like changes in the data schema. 

 

You could do this by having an interface of your implementation, If you're going to use an interface implementation you can just as well generate the class or implement the class. Another thing you need for meta programming is duck typing. So for meta programming to happen you would have to forgo things like type checking, looking for existing methods on classes etc. You would lose the biggest advantage of a statically typed language and one of the biggest reasons for having a compiler at all. So, with all due respect, I wonder at that point why use a static typed language implemented on a compiler, that will make things really hard for you, at all when you can achieve the same things in other dynamically typed languages with hardly any effort. 

 

If all you want is ruby with c# syntax, then you will lose exactly what makes ruby so attractive its more natural syntax. At this moment the IronRuby implementation still needs a lot of work but you could use Ruby.NET and get a good working version of Ruby that runs and compiles on the CLR. Or use ironpython that implementation is a lot more usable at this moment and you can do interop with .NET assemblies.

 

With Reflection.Emit you can get similar things. You can't modify existing classes but when you would be using something like an IoC container that keeps track of dynamic proxy wrappers that are being generated so that it can always use the latest proxy wrapper, that way you could achieve almost the same thing. This won't be the fastest method around but it would give you most the needed abilities. You would still need at least some interfaces and know about those interfaces upfront. After all MSIL is much like a dynamic language.

 

I still wouldn't exactly call it meta programming but it can come close, you wouldn't be able to modify existing classes but you would be able to add functionality to classes. It also won't be the most easy thing to implement correctly but in theory it can be done.

 

Method missing in ruby works because the ruby interpreter walks up its tree of objects looking for an implementation of method_missing but that's also what makes method missing not the fastest mechanism around.

 

This whole discussion made me think of a generalization Greenspun's 10th law: "any sufficiently complicated program in a statically-typechecked language contains an ad-hoc, informally-specified bug-ridden slow implementation of a dynamically-checked language." ;)

 

What would the implementation of IDynamicObject be ? Would it suddenly drop the type checking for implementing classes and defer that to runtime? How would you like to see IDynamicObject happening without losing static typing along the way ? I would like to find out these things interest me tremendously, I'm always looking for ways to make C# more dynamic but I don't want to lose static typing along the way.  I would like to use C# instead of C++ for speed and use IronRuby for the rest for example, shifting those languages one era along.

 

  

del.icio.us Tags: [Ruby](http://del.icio.us/popular/Ruby),[Ironruby](http://del.icio.us/popular/Ironruby),[C# 3.0](http://del.icio.us/popular/C#%203.0),[meta programming](http://del.icio.us/popular/meta%20programming)

  
