---
date: '2008-12-30 15:01:59'
layout: post
slug: building-ironruby-with-mono-on-osx
status: publish
comments: true
title: Building IronRuby with Mono on OSX
wordpress_id: '265'
categories:
- IronRuby
tags:
- IronRuby
- mono
---

****** This is a duplicate post of [http://rubydoes.net/2008/12/30/building-ironruby-with-mono/](http://rubydoes.net/2008/12/30/building-ironruby-with-mono/) ******

IronRuby comes in 2 flavours of SCM and apparently also with 2 flavours of project layout.

I spend most of my time on the mac and I wanted to be able to test ironruby stuff on it too. I tried to build IronRuby on my mac which doesn’t work straight away you have to patch it a little to make it work.

If you’re using the svn version then you can use the [patch](http://sparcs.kaist.ac.kr/~tinuviel/download/IronRuby/) created by Seo Sanghyeon.

[Michael Letterle](http://blog.prokrams.com/) has forked the ironruby git repository and created a branch called **linux**. You can find it on [github](http://github.com/TheProkrammer/ironruby).

For me the linux branch didn’t want to work and so I forked the ironruby repository too, created a branch called **mono**. My version is also up on [github](http://github.com/casualjim/ironruby).

If you’re going to use the git layout of IronRuby, which is practically the same as what the IronRuby team uses at Microsoft. You’ll have to set an environment variable _MERLIN_ROOT_ . I use a .bashrc file and added the following line to it:

`export MERLIN_ROOT=’/Users/ivan/src/ironruby/merlin/main’`

Now how do you get to those git branches?

Start a terminal session.

I have a directory src in which i download and compile sources. So I navigated into that directory src.

``` sh
cd src
git clone git://github.com/casualjim/ironruby.git
cd ironruby
git checkout -b mono
git pull origin mono
```

Compiling IronRuby

``` sh
cd merlin/main/Languages/Ruby
rake compile mono=1
```

Update:

You will also need a version of ruby installed, rake and the pathname2 gem

It won't work with the latest release of mono. I'm using the trunk version of mono to build ironruby.
I've got instructions that could show you how to compile mono [here](http://flanders.co.nz/2008/02/05/compiling-mono-and-ironruby-on-osx-leopard/).
