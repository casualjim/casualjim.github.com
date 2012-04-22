---
date: '2007-04-29 13:12:50'
layout: post
slug: subversion-vs-team-foundation
status: publish
title: Subversion vs Team Foundation
wordpress_id: '23'
categories:
- General
---


		

I work at Xero and we were using Sourcesafe, which we always knew had to be replaced sometime.


		


				[http://www.codinghorror.com/blog/archives/000660.html](http://www.codinghorror.com/blog/archives/000660.html)
		


		

I have some experience with most of the source control systems out there. We decided to go with Team Foundation Server the reasons for it being :


		


				
  * High level of integration with visual studio 2005

				
  * Easily extensible with C# 

				
  * It is currently v1, which translates to me as 2 more versions and it will be the most awesome tool out there

				
  * Based on Sql Server

		
		

Why didn't we choose for Subversion, you may ask ?


		


				
  * It's a microsoft shop we don't need cross-platform tools

				
  * Not based on Sql Server

				
  * No webservices api ready to be consumed  


		
		

I personally like the way subversion stays out of the way and you don't have to explicitly check stuff out. But I don't like the decentralised way of managing it.


		

The tools that come with Team Foundation Server, even though it's only v1, look more slick and handle a lot better than the tools that come with Subversion.


		

Since everybody in our team was already familiar with source safe which made the learning curve virtually non existent.


		

All in all taking all the variables into account we decided that Team Foundation Server was a much better solution for our needs than subversion.


		

 


		

If you want to read some other peoples thoughts on the subject, Ayende and Roy Osherove  have been having a discussion about it through their blogs.


		


				  

				[http://ayende.com/Blog/archive/2007/04/29/CodePlex-TFS-and-Subversion.aspx](http://ayende.com/Blog/archive/2007/04/29/CodePlex-TFS-and-Subversion.aspx)
				  

				[http://weblogs.asp.net/rosherove/archive/2007/04/29/tfs-or-not-being-a-perfectionist-is-a-realistic-world.aspx](http://weblogs.asp.net/rosherove/archive/2007/04/29/tfs-or-not-being-a-perfectionist-is-a-realistic-world.aspx)
				  

				[http://ayende.com/Blog/archive/2007/04/29/TFS-Zero-Friction-and-living-in-an-imperfect-world.aspx](http://ayende.com/Blog/archive/2007/04/29/TFS-Zero-Friction-and-living-in-an-imperfect-world.aspx)
				  

				[http://weblogs.asp.net/rosherove/archive/2007/04/29/what-source-control-tool-do-you-use-and-more-on-tfs-vs-open-source-tools.aspx](http://weblogs.asp.net/rosherove/archive/2007/04/29/what-source-control-tool-do-you-use-and-more-on-tfs-vs-open-source-tools.aspx)
				  

				[http://ayende.com/Blog/archive/2007/04/29/TFS-Vs.-Open-Source-tools.aspx](http://ayende.com/Blog/archive/2007/04/29/TFS-Vs.-Open-Source-tools.aspx)
				  

				[http://weblogs.asp.net/bsimser/archive/2007/04/29/tfs-vs-open-source-the-battle-rages-on.aspx](http://weblogs.asp.net/bsimser/archive/2007/04/29/tfs-vs-open-source-the-battle-rages-on.aspx)
				  

				[http://ayende.com/Blog/archive/2007/04/29/Exensability-Ask-and-you-shall-recieve.aspx](http://ayende.com/Blog/archive/2007/04/29/Exensability-Ask-and-you-shall-recieve.aspx)
		



