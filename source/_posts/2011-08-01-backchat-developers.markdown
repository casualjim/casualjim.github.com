---
date: '2011-08-01 20:57:20'
layout: post
slug: backchat-developers
status: publish
title: work for backchat
wordpress_id: '385'
comments: true
categories:
- General
tags:
- backchat
- jobs
---

# Backchat.IO is hiring!


BackChat.io is easiest to describe as _grep for real-time data_. We’re busy developing a platform that makes sense of the data you send it (in real-time).

For the social web that means that you can start following certain users on a network or define a search term and you get those in a unified activity streams format.

But for something more arcane, like say, log data, that means you can send it lines of text and have it extract out fields on which you can define filters. All of this happens in real-time and changes are reflected virtually immediately in open connections.

Our system is designed to allow for easy definition of data sources. Sources that currently feed into our system are [Twitter](http://twitter.com), [Facebook](http://facebook.com), [LinkedIn](http://linkedin.com), SMTP, RSS, ATOM, PubSubHubbub, and more. By next year we hope to provide dozens, if not 100’s, of API implementations.

In the longer term we hope to provide more intelligent stuff like real-time reporting by allowing you to define aggregates like SUM, enhance data with secondary information, and many more crazy ideas. We’re aiming to build our system exclusively on existing standards described in RFC’s or the activity streams spec. However not everything we do is described in standards and that’s where we’ll try to extend an existing standard.
Our use cases are wide, ranging from niche collaboration or social media apps, to communication/PR/marketing agencies, to telecommunications… We operate at an abstraction on a much lower level than most similar services; so many tools you see and use on the web today can be built with only a few lines of code in your favourite language on our platform.

The entire system is built on dogfooding and practicing what we preach. So where it makes sense we rely on our own service, like with log processing. Our entire website is built using the API methods we expose to our customers. Our API integration language will be shared with our customers too.


## How do you guys work?


We use a mix of technologies like [scala](http://www.scala-lang.org/), [akka](http://akka.iio), [mongodb](http://mongodb.org), [lucene](http://lucene.apache.org), [zeromq](http://www.zeromq.org/), [dropbox](http://dropbox.com), [flowdock](http://flowdock.com), [skype](http://skype.com), …. We apply agile principles to our development process, but this doesn’t mean we follow a doctrine that is being sold because some consultant wants to make some money. To us Agile development means: design for change. Which also means that the process we use is adapted to the people in the process and not vice versa. It’s about being productive and creating an environment where you want to work.
At the moment, all of us work from home. We’re a team of 3, looking for a fourth team-member to start in September. We don’t care where or how you work, just that you deliver 40 hours worth of output, regular github pushes (so new code can be reviewed before it hits our integration branch) and, most importantly, passion!


## Great! What are you guys looking for?


We’re looking for a passionate developer. This person ideally:



	
  * knows about concurrent and distributed programming

	
  * is well-versed in Scala

	
  * can accept a team decision, and understands that communication is the most important part of development as a team.

	
  * is polyglot (the ability to work with C#, node.js/javascript, ruby, python and/or php)

	
  * preferably knows XMPP beyond using the smack library

	
  * has used mongodb

	
  * knows Lucene

	
  * regular expressions have little or no secrets for you

	
  * does not believe in sugar-coating things and voices reservations early

	
  * No! Try not. Do, or do not. There is no try. (Some of us hope you’re a Star Wars fan too)


It’s a plus if you’ve done some of the following:

	
  * BIG data

	
  * Language parsing and development

	
  * Natural language processing

	
  * Statistics

	
  * knows how to express himself in simple english and not academic language

	
  * Netty server development / Java NIO

	
  * Jetty customization

	
  * Understands the problems communication agencies and social-media developers face


What we’re not looking for is someone who has little or no experience, community zealots and big framework lovers (I’m looking at you rails, lift, spring, …). We need doers!

You do not have to live in the UK to work with/for us. We are firm believers in smarter remote-working, and our cloud-based infrastructure is designed to allow us to work from where we want.


## Open-Source?


We use a lot of open source, and we believe in being good citizens and contribute back where we can. Some of the projects we use: [casbah](http://api.mongodb.org/scala/casbah/current/), [akka](http://akka.io/), [scalatra](https://github.com/scalatra/scalatra), lift-mongodb-record, lift-json, codahale metrics, databinder dispatch, …
So far most of our contributions were to scalatra and peripheral to akka. If we come up with stuff that we all agree on should really be in an open source project then we will actually take the necessary steps to make that happen.

Any open-source library we produce is licensed as MIT and uses as few dependencies as possible (be nice to people with complicated projects).


## What’s the vision?


To build the best damned developer platform for social-media and real-time data! Quickly!

Our service is primarily aimed at developers. We provide a metered, utility billing model. Depending on which bits and pieces of our infrastructure a developer uses we calculate a price per message for each incoming channel. At the end of the month they get a bill. This billing is updated in real-time so everybody knows exactly where they stand.
For corporate customers we provide a behind-firewall-install license. This license fee may or may not include bespoke development or integration into their systems.

Our founding customer has been O2/Telefonica. They’re using our platform in cool ways, but we can’t talk about that just yet (ssshh).


## Who are the company?


Adam Burmister is the CEO of the company and has previously worked as team lead for the bbc.com homepage. He has also done assorted javascript libraries and was nominated for a webby award for his work at xero.com. He’s a Kiwi, so be warned, he sounds funny.

Ivan Porto Carrero is the CTO and has previously almost published a book on IronRuby and has been an MVP for the last 2 years. Worked as an architect/consultant in the .NET sphere and met Adam while he was working as a senior development at xero.com It helps to know that Ivan is from Belgium, as an extremely low bullshit tolerance and it’s best to feed him at regular times with pre-approved snacks. Also, his english sounds funny.

Stefan De Boey was our very first helper and we haven’t managed to scare him off, he’s actually happy with his job, but won’t say so because he’s Belgian and compliments make people suspicious where he’s from (not to mention the thought of making a government).
Stefan typically starts his day between 11am and 12:30 and finishes around 20:00.
Also, his english sounds funny.


## Ok, I’m sold. How do I apply?


Great! We’re looking forward to meeting you.

If you could, please start by sending us your LinkedIn profile and preferably some recent open source projects you worked on.
