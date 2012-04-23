---
date: '2009-05-03 14:10:04'
layout: post
slug: mocking-for-ironruby
status: publish
title: Mocking for IronRuby
wordpress_id: '330'
comments: true
categories:
- IronRuby
- Mocking
tags:
- IronRuby
- Mocking
---

As you may or may not know I’m in the process of building IronRubyMvc. At one point I did write a bunch of tests in for the code I had at that point. However that test code was written in C# with xunit and moq. I wasn’t too happy about that so I deferred writing tests to a later date when I could use a Ruby library to write them.

 

That time has come, I can use bacon and it’s acceptable performance wise now, not stellar but workable. So when I started to port some of my previously written tests to bacon I ran into a road block. Mocking isn’t as straightforward as my optimistic self was expecting. This lead me to think about what exactly does a mocking framework do?

 

I’m pretty much a just stuff no fluff kind of guy when it comes to coding. So I tend to choose for solutions that have just the right amount of features and virtually no whistles and bells. I generally blame it on being slightly stupid so I can’t grok intensely complex solutions. Once you cross a treshold there is no way in hell I will ever look at it again.

 

Anyway the no fluff approach to mocking would be to look at the core responsibilities of those frameworks, which are 2 as far as I can tell.

 

1. Generate a proxy for an object so you can intercept method calls     
2. Allow for verificatons of those intercepted method calls to do things like how many times was this method called, was it called at all etc.

 

So I’m starting to implement a way to generate proxies today.. This should be a piece of cake with Ruby :) Then I’ll look at implementing some constraints and verifications.

 

Thinking about how to approach the API for defining the mocks has also been an interesting experience. From the get-go a Record/Replay/Verify model is out. But then it comes to the following part, when do you define the verifications.

 

Do you do that in the assertion fase, thus stubbing everything beforehand and just allowing the user to define return values when establishing the test context. Or do you define the verification (at least twice, ignore arguments etc) when you establish the test context. My vote goes to the first option.

 

So a new project is born it’s called caricature and lives on github. Which will try to implement the ideas set forward in this blog post for [IronRuby](http://ironruby.net).

 

[http://github.com/casualjim/caricature](http://github.com/casualjim/caricature)

 

Technorati Tags: [IronRuby](http://technorati.com/tags/IronRuby),[Mocking](http://technorati.com/tags/Mocking)
