---
date: '2007-10-24 01:01:34'
layout: post
slug: generics-overwhelming
status: publish
title: Generics overwhelming
wordpress_id: '177'
---

Ayende put [this post up](http://ayende.com/Blog/archive/2007/10/23/MonoRail-Tricks.aspx) which looks freakishly a lot like some code I wrote a couple of months ago. 
    
    <style type="text/css"><![CDATA[.cf { font-family: consolas; font-size: 10pt; color: #fffbca; background: #202020; }
    .cl { margin: 0px; }
    .cb1 { color: #fa8072; }
    .cb2 { color: #00d2d2; }
    .cb3 { color: silver; }
    .cb4 { color: #d0d0d0; }
    .cb5 { color: #2b91af; }
    </style>
    <div class="cf">
    <p class="cl"><span class="cb1">public</span> <span class="cb1">abstract</span> <span class="cb1">class</span> <span class="cb2">AccountServiceBase</span><span class="cb3"><</span><span class="cb4">T</span>, <span class="cb4">K</span>, <span class="cb4">Q</span><span class="cb3">></span> : <span class="cb5">IAccountService</span><span class="cb3"><</span><span class="cb4">K</span><span class="cb3">></span></p>
    <p class="cl">        <span class="cb1">where</span> <span class="cb4">T</span> : <span class="cb2">BankImportSetup</span>, <span class="cb5">IAccountData</span>, <span class="cb1">new</span>()
    </p><p class="cl">        <span class="cb1">where</span> <span class="cb4">K</span> : <span class="cb1">class</span>, <span class="cb5">IAccountData</span>, <span class="cb1">new</span>()
    </p><p class="cl">        <span class="cb1">where</span> <span class="cb4">Q</span> : <span class="cb1">class</span>, <span class="cb5">IEntityQueries</span><span class="cb3"><</span><span class="cb4">T</span>, <span class="cb4">K</span><span class="cb3">></span>, <span class="cb1">new</span>()</p>
    <p class="cl">        .....</p>
    </div>
    




The reason for building it this way is that I have to implement something for heaps of banks each one has a subtle difference in the way they are processed. But 95% of the code would be the same for every BankImportSetup entity.


This way I could save a lot of time by going a bit overboard on the generics side of it.


To cut a long story short. Generics are fun but they can be pretty overwhelming at first.


 


PS. My colours look very different on my pc. It's copy source as html that doesn't pick up all the colors resharper adds.
