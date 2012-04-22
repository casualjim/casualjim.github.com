---
date: '2009-05-15 23:34:46'
layout: post
comments: true
slug: an-update-on-caricature
status: publish
title: An update on caricature
wordpress_id: '341'
categories:
- caricature
- IronRuby
tags:
- caricature
- IronRuby
---

Yesterday I explained about caricature but I didn’t have it fully tested yet. Today I’ve written a bunch of integration specs for all the platform combinations Caricature currently supports so you should be able to use Caricature also for plain ruby object mocking in addition to CLR interop mocking.

After having a very brief twitter discussion with Scott I decided it would be a good idea to change the name of the methods _when\_told\_to_ and _was\_told\_to?_ . In ruby objects receive messages so the wording now becomes _when\_receiving_ and _did\_receive? _. I have a problem with the should naming because there is nothing conditional about it. Either you want the method to return something or you want it to return a default value for CLR value types or nil. And if you’re asserting if a method it called that is deterministic; it is either called or not there is no gray area there. 
    
```ruby    
ninja = ClrModels::Ninja.new 

@weapon.when_receiving(:attack).with(ninja).return(5) 

@ninja.attack(ninja, @weapon).should.equal 5 

@weapon.did_receive?(:attack).with(:any).should.be.successful 
```

Before I call it 1.0 I want to at least give ruby objects also the ability to isolate static and sealed methods as well as mocking ruby class methods. So that for CLR to Ruby interaction you a get the full range of possibilities.

I have also [set up a site on github](http://casualjim.github.com/caricature/Caricature.html) that contains the API documentation for Caricature. When IronRuby 0.5 releases I’ll publish a blog post that will talk you through testing your CLR assembly with IronRuby, bacon and Caricature. 

For now you can take a look [here](http://github.com/casualjim/caricature/blob/7ab1d513be74b26c95a1ca34cc1d01f6c850cc43/spec/integration_spec.rb) for example on how to use Caricature for isolating features.
