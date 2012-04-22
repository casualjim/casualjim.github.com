---
date: '2011-09-03 10:56:12'
layout: post
slug: scalatra-is-a-dsl-in-a-string
status: publish
title: Scalatra is a DSL in a string
wordpress_id: '392'
comments: true
---

I've heard it a couple of times as if that is a bad thing and yes Scalatra is a DSL-IN-A-STRING, but allow me to ellaborate:




However a pattern match, for example





as you all know is nothing more than an isDefinedAt and when that call returns true the data is passed to the partial function, the partial function is lifted and you get a result.




In scalatra we put an extra dsl over this particular behavior which builds up a registry of route matchers. Which are also just scala classes and then we essentially use .isDefinedAt on that route registry to determine which block of code to run and then apply the matching function.




What we do there is nothing different from what people do right before they figure out which bit to run. They do a string.split or run a regex and then pass it to that partial function.




So to me the dsl-in-a-string is a pretty short-sighted response because there is no immediate "case ... =>" in sight.




YES WE COPIED SINATRA'S DOCUMENTATION => at least we have pretty elaborate documentation, the alternative was no documentation. I don't think I'm going to get a Pulitzer for being original in docs. If that was my aim I should have become a journalist of fiction writer.




The goal of docs is to provide information, ours do that now.
