---
date: '2006-07-25 11:14:23'
layout: post
slug: disable-page-caching-globally
status: publish
title: Disable page caching globally
wordpress_id: '104'
categories:
- General
---


		

I decided to put some of the questions I get from time to time on my blog, if they involve code samples at least.


		

Today : 


		


				Sent: Wednesday, 26 July 2006 10:18 a.m.
		


		


				To: Ivan Porto Carrero
		


		


				Subject: Page Caching
		


		


				
				
						 
				
		


		


				I use the following markup to disable caching for specific pages in my app. 
		


		


				<%@ OutputCache Location="None" VaryByParam="None" %>
		


		


				
						 
				
		


		


				Do you know how to do this gloablly, for whole application? 
		


		


				
				 


		


				Answer:
		


		


				void Application_PreSendRequestHeaders(object sender, EventArgs e)
		


		


				
						
								
										    {
						
				
		


		


				
						        
				
		


		


				
						
								
										        Response.ContentEncoding = System.Text.Encoding.UTF8;
						
				
		


		


				
						
								
										        Response.Cache.SetCacheability(HttpCacheability.NoCache); 
						
				
		


		


				
						 
				
		


		


				
						
								
										    }
						
				
		


		


				
						 
				
		


		


				Add that to the global.asax that will disable all caching
		


		


				
						 
				
		


		


				More info on the HttpCacheability object :
		


		


				[
						http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemwebhttpcachepolicyclasssetcacheabilitytopic.asp
				](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemwebhttpcachepolicyclasssetcacheabilitytopic.asp)
		


		

 



