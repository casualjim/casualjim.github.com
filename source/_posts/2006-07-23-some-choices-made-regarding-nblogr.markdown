---
date: '2006-07-23 09:14:35'
layout: post
slug: some-choices-made-regarding-nblogr
status: publish
title: Some choices made regarding NBlogr
wordpress_id: '105'
categories:
- .NET 2.0
- Atlas
---


		

For the development of [NBlogr](http://www.flanders.co.nz/Blog/www.nblogr.com) I had to say goodbye to some of my favorite controls.


		

The idea of [NBlogr](www.nblogr.com) is that it is Open Source so that means I can't use anything that is not open source / free in my project.  I use component arts excellent menu whenever I see fit except for now.


		


				[ComponentArt](www.componentart.com) have 2-3 controls in their range that I really like. The other ones aren't really usefull in my case.


		

I've been using the [freetextbox](www.freetextbox.com) control for 3,5 years now. But the latest versions aren't really good implementations. If I load up my control in a firefox browser and I reload the site by entering in the address bar.. I get 3-5 errors @ pageLoad.  And that just sucks because the rest of the javascript doesn't get executed and an atlas page won't execute.


		

So for me it's down with the freetextbox control and up with the [tinymce](http://tinymce.moxiecode.com) control from moxiecode.  
That one is the only true cross browser (IE, FF, Safari, Opera) richt text editor I can find 


		

Another benefit : It's smaller than the freetextbox and loads way faster.


		

Captcha isn't a good solution for blocking comment spam. I've decided to use [akismet ](http://akismet.com/)as a refferer and comment blacklist service for NBlogr.


		

 



