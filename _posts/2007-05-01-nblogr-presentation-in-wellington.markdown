---
date: '2007-05-01 23:17:00'
layout: post
slug: nblogr-presentation-in-wellington
status: publish
title: NBlogr Presentation in Wellington
wordpress_id: '21'
categories:
- .NET 2.0
- Base4
- C#
- Castle
- NBlogr
---


		


		


		


				  
Tonight I got the chance to present my nblogr application to a larger audience. Unfortunately I'm in the process of fixing bugs in NBlogr and one of those bugs required me to make a change to NBlogr.Web/views/default/shared/mainmenu.boo . I had made this change on sunday around midnight right before I went to bed. Of course I forgot to test the application because and it wouldn't run on my presentation.  When I got home it took me about 3 minutes to fix. I had to import a reference to Base4.Storage in the mainmenu.boo file.  
  
I'd like to thank everybody for coming, their patience and listening to my ramblings.  
  
Anyway I've included my slide deck in this post and I think it might be a good idea to post a couple more links to some of the people I mentioned in my talk.  
[http://www.base4.net](http://www.base4.net)  - Alex James, Auckland  
[http://blog.bittercoder.com](http://blog.bittercoder.com) - Alex Henderson, Auckland  
[http://www.ayende.com/blog](http://www.ayende.com/blog)  
[http://hammet.castleproject.org](http://hammet.castleproject.org)  
  
[http://www.castleproject.org](http://www.castleproject.org)  
[http://www.nunit.org](http://www.nunit.org)  
[http://www.nblogr.com](http://www.nblogr.com)  



		

svn repository:  
[https://svn.koolkraft.net/nblogr/trunk](https://svn.koolkraft.net/nblogr/trunk)


		


				[NBlogr-Wellington 02 _05_2007.ppt (440 KB)](http://www.flanders.co.nz/Blog/content/binary/NBlogr-Wellington%2002%20_05_2007.ppt)
				  

				  
To get nblogr running on your machine follow these steps :  
  
Make sure you have a subversion client installed or subversion itself.   
  
C:\Projects> svn co [https://svn.koolkraft.net/nblogr/trunk](https://svn.koolkraft.net/nblogr/trunk)  
C:\Projects> osql -E  
1> create database nblogr  
2> go  
1> quit  
  
open the nblogr solution.  
  
change the connection string in web.config  
  
The different configuration options are explained in the web.config  
  
If you want to use a different extension than aspx you have to change the httphandler configuration and set the extension in nblogr/routing  
  
if you want urls to be rewritten without an extension you will have to enable wildcard handling.  
  
hit ctrl-f5 and it should take you through the configuration. If ctrl-f5 doesn't work try setting up the application in IIS.


		  

		


				**Update:   
**James Hippolite from telecom was so kind to blog most of the bullet points of my slides. Which can be found here [http://tvornz.spaces.live.com/blog/cns!A93B6100E328706D!388.entry?_c=BlogPart&_c02_owner=1](http://tvornz.spaces.live.com/blog/cns%21A93B6100E328706D%21388.entry?_c=BlogPart&_c02_owner=1)  




