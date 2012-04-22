---
date: '2007-07-03 15:12:23'
layout: post
slug: about-javascript-compression
status: publish
title: About javascript compression
wordpress_id: '6'
categories:
- General
---

If you believe this guy then javascript packing is a bad thing. 

[http://batiste.dosimple.ch/blog/2007-07/](http://batiste.dosimple.ch/blog/2007-07/)

I don't agree with this post and here's why (i couldn't comment on his blog because he doesn't have comments):

IMHO that's not entirely correct.    
I'm sure that if you're not packing stuff but just removing comments and whitespace you'll get completely different results.  
  
If you're packing stuff then the reason should be because you want to obfuscate your javascript not because you want to get some speed improvement. It's just common sense to work out that   
1. javascript is slow  
2. more javascript execution (i.e. un-obfuscating) is even slower.  
  
Another benefit of packing javascript is that you/your company saves $ on bandwidth. 5k x 5000 pageviews x 30 days = lots of $.   
  
The guy is just looking at 1 aspect or 1 reason which gives a distorted image.   
Anyway my experience tells me that removing whitespace and comments in a production environment and then have them sent compressed by the webserver to the client gives me the best results. Regardless of this guys 1x test setup with 1 machine.   
  
I will generally read all the files into one file strip it from extra content after which they get gzipped (deflate is better for xml type structures) and sent to the browser.  Once the javascript has been prepared for the page it should remain cached on the webserver and preferrably on the client. 
