---
date: '2006-01-04 19:53:32'
layout: post
slug: webresourceaxd-how-do-i-use-it
status: publish
title: Webresource.axd. How do I use it ???
wordpress_id: '145'
categories:
- Main
- Old Blog
---

Ever since I got my hands on .NET 2.0 I noticed the handler webresource.axd which seemed to provide a similar function as what I was using handlers for.    
  
I used handlers in .NET 1.1 and before today also in .NET 2.0 to handle my javascript and css that I need in controls I developped.   
I mark them before compiling as embedded resource and then later on read them out via reflection and they get served up by the browser.  
  
I probably don't have to explain that (as long as your parameters don't change) this scripts get cached by the browser so they will only be downloaded once and re-used afterwards.




Well in asp.NET 2.0 there is a feature that uses webresource.axd to handle all kinds of embedded resources (images, pages, etc...)




[Nikhil Kothari ](http://www.nikhilk.net/WebResourceAttribute.aspx)has a post on how to use them in [his blog](http://www.nikhilk.net/WebResourceAttribute.aspx), and I just copy pasted the text below.




**_Using Web Resources  
_**Imagine I am writing an HtmlEditor control and I want to use a stock bold button icon. Here's what I'd do:  







  1. Embed "Bold.gif" as a resource with the same name into my control's assembly. 

  2. Mark it as Web-accessible via the attribute:  
`    [assembly: WebResource("Bold.gif", ContentType.ImageGif)]` 

  3. Use the GetWebResourceUrl() method on Page to get a URL that can be rendered out to the client.  
`    boldButton.ImageUrl = Page.GetWebResourceUrl(typeof(HtmlEditor), "Bold.gif");`



This results in a URL of the form:  
`    WebResource.axd?a=MyControls&r;=Bold.gif&t;=632059604175183419`  
  


[![](http://www.pheedo.com/img.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)](http://www.pheedo.com/click.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)

![](http://geekswithblogs.net/casualjim/aggbug/59980.aspx)
