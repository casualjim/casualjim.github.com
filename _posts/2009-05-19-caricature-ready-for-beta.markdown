---
date: '2009-05-19 15:06:04'
layout: post
slug: caricature-ready-for-beta
status: publish
comments: true
title: Caricature ready for beta
wordpress_id: '349'
categories:
- caricature
- IronRuby
- Mocking
tags:
- caricature
- IronRuby
- Mocking
---

The last couple of days I’ve been getting [Caricature](http://github.com/casualjim/caricature) to a more releasable state. The code got a thorough cleanup and refactor. Caricature now knows how to be a full mocking framework for Ruby classes and CLR classes that only interact with ruby objects. When I apply the 80/20 rule to caricature it’s definitely beta worthy.

I’m not a huge fan of the 80/20 rule unless all the features I want are in the 80 part. In that case for me it’s a 100 rule ;). 

As for the latest changes:

Adding `require 'caricature'` only gives you ruby mocking. If you want to use it to mock CLR classes or interact with the CLR you’ll need to add an extra require statement:`require 'caricature/clr'`. I’ve done it this way so that I can still add Java and MacRuby support later on.

By default caricature will always give you an instance of an isolation, but there are times that you’ll want to substitute the result of a class method invocation. So the API got expanded with 2 methods, `when_class_receives` and `did_class_receive?` These methods enable you to setup substitutions for class method calls.

I’m still waiting for IronRuby 0.5 to be released to give you a blow-by-blow tutorial on how to setup your environment.

Basically you download the ironruby release from [Codeplex](http://ironruby.codeplex.com/Release/ProjectReleases.aspx)

Then you make sure the path to ir.exe is in your PATH variable 

After that you should be able to do igem list and get an empty result back. 

now you need to install bacon you can do that by executing

  igem install bacon

next you need the caricature gem

  igem install caricature

You will also need rake to be installed to build the cs files included in the sources.

  igem install rake

ok now you should be good to to
    
``` ruby   
require 'rubygems'
require 'bacon'
require 'caricature'
require 'caricature/clr'

describe "when isolating Ruby classes with class members" do

  before do
    @dagger = Dagger.new
    @soldier = Caricature::Isolation.for(SoldierWithClassMembers)
  end

  it "should work without expectations" do
    result = @dagger.attack @soldier
    result.should.equal nil
    @soldier.did_receive?(:survive_attack_with).with(@dagger).should.be.successful 
  end

  it "should work for expectations with an argument constraint" do
    @soldier.when_receiving(:survive_attack_with).with(@dagger).return(5)
    @dagger.attack(@soldier).should.equal 5
    @soldier.did_receive?(:survive_attack_with).with(:any).should.be.successful
  end

end
```

you can get the gem from [rubyforge](http://rubyforge.org/projects/caricature/)

Or from my github account: [http://github.com/casualjim/caricature](http://github.com/casualjim/caricature)
