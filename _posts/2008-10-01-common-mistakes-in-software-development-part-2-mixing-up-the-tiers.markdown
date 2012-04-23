---
date: '2008-10-01 05:10:54'
layout: post
slug: common-mistakes-in-software-development-part-2-mixing-up-the-tiers
status: publish
comments: true
title: 'Common mistakes in software development (part 2): Mixing up the layers'
wordpress_id: '255'
categories:
- .NET 2.0
- .NET 3.0
- .NET 3.5
- C#
tags:
- n-tier
---

In my [previous post](http://flanders.co.nz/2008/09/24/common-mistakes-in-software-development/) I explained some very quick wins to make your code a little bit cleaner. As I've been appointed an [asp.net](http://www.asp.net) project at work at the moment I have the chance to get more ammunition for blogging :).
This time I'd like to talk about properly separating your tiers so that the next person doesn't have to go through the complete application and make changes everywhere just to make a minor change to the application.

One  of the problems; one of the most time consuming that is; I've seen is that people are confused on what they have to put in the data logic layer and what is business logic. In my case this is fairly extreme because there isn't an ORM tool but rather every entity gets populated by calling a stored procedure and then in the code the graph objects get set. Whether this is a good approach for fetching your data or not is not within the scope of this blog post, but I'm guessing there are more people who are facing this type of situation.

Anyway let's start with the beginning and explain the typical [n-tier architecture](http://en.wikipedia.org/wiki/N-tier) people seem to follow. This is not a particular pattern like [MVC](http://en.wikipedia.org/wiki/Model-view-controller) or [MVP](http://en.wikipedia.org/wiki/Model-view-presenter) that people are talking about so much lately. This goes back to the guidance that can be found on the [msdn website](http://msdn.microsoft.com).  This type of architecture is often used in combination with data sets but not in my example for this post. This architecture is generally divided in 3 parts that can, but don't have to, run on different machines if needs be.  When talking about this type of architecture people mostly talk about an n-tier application.

##The first part is the data layer.
The golden rule for this one: this is the gateway between the rest of your application and the database. **NONE** of the other layers should be talking directly to the database but instead should be doing their talking through this layer.  That means if you have stored procedures you provide wrappers for them in this layer. You populate your entities in this layer too.
Other functions you can perform in this layer is setting the graph members (populating relationships). IMHO if you're talking to the database (open/close connection) you're doing stuff that belongs in the data layer which includes populating relationships.

Encapsulating this logic in it's own layer, which could potentially be walled off through only exposing it with remoting or WCF, allows you to reuse the code in different places of your applications or sharing this data access assembly with multiple applications.

##The second part is the business logic layer.
This layer encapsulates all the operations you do on entities to express the business rules. That means you would probably do most of your work in this layer. Basically **all** of the programming you will be doing for the business rules should be done here. Business logic doesn't live in stored procedures, it doesn't live in the UI or the data layer. Nope this layer is where it lives and nowhere else.  This statement may raise some eyebrows but only and only when you find that a certain routine is a bottleneck and it is really data intensive you can put it in a stored procedure but more on that subject in another blog post.
If you find yourself transforming data so you can display it in your GUI then you're probably expressing business rules that aren't explicitly stated as a business rule.
When you find yourself to be concatenating strings or writing logic to translate your pages in your GUI layer then you're probably expressing business logic (business logic doesn't have to come from business ;) in case that wasn't clear).
Another common find in business logic is validation for example because this generally expresses some kind of strict rule that comes from the business domain your application deals with. Validation is a tricky one but the rule is you should do **all** validation in your business logic. To provide a better user experience you can maybe reuse that validation on the client side. In the case of web development you probably will have to duplicate that validation in javascript if you really need it.

Separating these rules into their own layer allows you to reuse the methods and classes you create in the business logic layer, in different parts of your UI or even reuse it in different applications.
By separating this logic it should be easier for you to do some automated testing like unit testing and/or integration testing of that code.

##The third and last layer 
This is typically the UI layer but you could easily use web/WCF services as an interface to your logic. The UI doesn't have to be a GUI it can also be a CLI (Command-Line Interface) or something. But that is how you interact with the user or external application. The idea is that in this layer you have virtually no logic except for what's on the screen **everything** else should be handled by your business logic. To clarify this statement: you can show/hide UI elements or add/remove elements to the UI and respond to events triggered by user actions but the data of that response and the processing really belongs in the business logic layer.

The UI layer can talk to both the business logic and data logic layers. If for example you're getting a category list with just an id and name from the database chances are you won't need to transform that data so your UI can bind directly to the entities returned by your data layer. But more complex items like an invoice for example will probably need some processing and then it should probably pass through the business logic layer.

This is typically a somewhat harder part of your application to provide tests for although there are some libraries out there that make it easier but still there are easier parts to test in your application.

So that was a quick refresher on what the classic n-tier architecture is about an how it should be structured. I hope you will agree with me into stating that its not that hard and pretty straight-forward to implement, but what I find in the "enterprise" is far from the points mentioned above.
It is a bloody mix of everything everywhere, leaving me thinking -come on guys it's not that hard-:
*talking to the database => datalayer*
*showing windows/adding UI elements,... => UI layer*
*everything else => business logic*

Failing to abide by the previous simple rules will result in hell freezing over, entire plagues will be released upon the world; to cut a long story short: the world as you know it will seize to exist and turn into complete chaos.
Following the rules should result in less code duplication, an instantaneously easier to maintain codebase and probably more happy successors for when you move on to the next project.  It should also give you a higher degree of code reuse.
If there is one thing you should take away from this article then it should be:
**Don't mix your tiers**

Of course there are a couple of situations when you can diverge from the ideas presented in this post but you should always be able to justify why you break the rule. So you need a good reason to break the proposed architecture and that would probably also warrant a comment so the next guy also knows what's going on.
The most important part is to separate all non-UI logic out from the UI layer and put it in one of the lower layers.

Thanks for reading
Ivan - writing for more maintainable software -
