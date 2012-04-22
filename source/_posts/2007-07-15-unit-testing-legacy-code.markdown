---
date: '2007-07-15 12:22:49'
layout: post
slug: unit-testing-legacy-code
status: publish
title: Unit Testing Legacy Code
wordpress_id: '161'
categories:
- .NET 2.0
---

Whenever I'm faced with a bunch of legacy code that I would like to write unit tests for I get quickly demotivated because I know the code works but still i'd love to know if the code will still work after I've been working on it.

Lately I've been faced with a lot of legacy code so I decided to make a little tool that does the same as what VSTS testing does when you select generate unit tests.

I haven't made an add in yet, it's just a little winforms app I started it this afternoon and i have something working now. It's also one of my very first winform apps so things have a lot fo room for improving.

I'm open for suggestions and i decided to open source it so if you have a fix or would like to make it a better tool let me know and I'll add you to the list of contributors

You can find the tool @ my subversion repo:  [https://svn.koolkraft.net/test_generator/trunk](https://svn.koolkraft.net/test_generator/trunk)

I know that it's against the rules of TDD to do this stuff but i just want to save some time by generating stubs that don't actually do anything except setup objects and initial values

Let me know what you think :)
