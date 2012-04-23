---
date: '2006-10-14 08:12:26'
layout: post
slug: some-news-on-nblogr
status: publish
title: Some news on nblogr
wordpress_id: '72'
categories:
- Base4
- Castle
- NBlogr
---

[NBlogr](http://www.codeplex.com/Wiki/View.aspx?ProjectName=Nblogr) isn't dead.. It just underwent a transformation for the better.

I also changed the title of the application from **NBlogr - An atlas blogging engine** to **NBlogr - a blogging engine built on simplicity  
**The reason for this change is the fact that it is currently built using jquery as javascript library.  I will look at atlas again when it releases. 

I moved [NBlogr](http://www.nblogr.com) to run on [castle](http://www.castleproject.org/).  During the course of the next week I'll complete my posts on how to do Castle development with [base4](http://www.base4.net/)

If you're interested in how it looks or you want a preview the [last source in the repository builds](http://www.codeplex.com/SourceControl/ListDownloadableCommits.aspx?ProjectName=Nblogr) and you should be able to run it in the development server of visual studio

I had a chat with [JD](http://blog.bluecog.co.nz/) a while ago and he asked me about plugins. At that time I knew already I wanted to provide something for users to be able to add plugin's to the database.  But I hadn't really given it much thought on how I would do that.

My reasoning on this subject is :   
I want users to be able to add a plug in at runtime. Plugin's for a blog are lately both server related client side. So I will create a plugin factory with a couple of providers like a google video provider, grouper video, flickr, bookmark services.  And you can write a plugin using javascript and ironpython code. The engine will evaluate that code at runtime and there has been no application restarting etc. If somebody has a better plan for doing a plugin infrastructure please let me know I haven't done any of the ground work for this yet but create a schema in base4 so now would be the best time to stop me from making big mistakes.

Another improvement is the fact that when nblogr reaches release it will come with a couple of templates for you to chose from. I'll try to include one that is built on the css scheme of csszengarden that way you'll have an infinite repository of css to make your blog look differently instantaneously.

The next improvement is that a user is now able to mimic wildcard requests and nblogr will handle those. So there is no need for appending aspx to pages for rewriting (routing it is called in monorail)  You get the choice in the config file to have your webserver handle the wild card mapping or nblogr. When you choose for nblogr nblogr will need write access to 2 folders in your website and create a shadow folder structure to represent the rewrite tree structure. There is weaker point here and that is that the **first** default document in IIS must be set to Default.aspx If you can map an extension to aspnet_isapi.dll at your webserver then you can also have the urls rewritten using a branded extension.

I think that this are the 3 major changes for the moment to the engine.  This did set me back for the next release with a couple of weeks but in the end the final release can be done much more quickly than it would have been possible using the code I had before.

I also promise that this time things mostly stay as they are. There will be no more experimenting but just getting Nblogr to a proper release state and shipped.
