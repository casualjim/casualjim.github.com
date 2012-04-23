---
date: '2009-05-14 23:31:50'
layout: post
slug: ironruby-just-got-a-mocking-framework-kind-of
status: publish
title: IronRuby just got a mocking framework – kind of
wordpress_id: '332'
comments: true
categories:
- C#
- caricature
- IronRuby
tags:
- C#
- caricature
- CLR interop
- IronRuby
- Mocking
---

As I mentioned in a previous [post](http://flanders.co.nz/2009/05/03/mocking-for-ironruby/). I started working on a small mocking framework. It has now progressed far enough to handle the most common mocking tasks.

 

Below I pasted the output of the integration tests for CLR interop.

 

    when isolating CLR interfaces        
    - should work without expectations         
    - should work with an expectation with any arguments         
    - should work with an expectation getting different method call result         
    - should work for an assertion on a specific argument 

    when isolating CLR classes        
    - should work without expectations         
    - should work with an expectation for any arguments         
    - should work with an assertion for specific arguments         
    - should fail for an assertion with wrong arguments 

    when isolating CLR instances        
    - should work without expectations         
    - should work with an expectation for any arguments         
    - should fail for an assertion for specific arguments         
    - should allow to delegate the method call to the real instance (partial mock)

 

you will need bacon installed to run the specs:

  igem install bacon

you can then install the caricature gem in ironruby by issueing

  igem install caricature

To use it there are some examples in the file spec/integration_spec.rb 

```ruby spec/integration_spec.rb 
require 'rubygems'
require 'bacon'
require 'caricature'

ninja.when_told_to(:survive_attack_with).return(5) 

weapon.attack(ninja).should.equal 5 

ninja.was_told_to?(:survive_attack_with).with(:any).should.be.successful
```    

There is a gotcha though, when you use it in a CLR class you're bound to CLR rules and it only overrides the methods that are marked as virtual. We also can't isolate static or sealed types at the moment. 
    
I took the approach of doing away with the terminology of mocking and subbing and instead chose the much clearer Isolation. By default any method returns null or the default value of a value type. You can tell an isolation to return a specific value or raise an error etc. Later on you can then assert if the method was actually called.

This fits in better with the way you probably structure your tests. 

I hope you like it.

You can find the source in my github account. 
    
[http://github.com/casualjim/caricature](http://github.com/casualjim/caricature)
