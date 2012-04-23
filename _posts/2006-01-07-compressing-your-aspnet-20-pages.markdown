---
date: '2006-01-07 08:09:23'
layout: post
slug: compressing-your-aspnet-20-pages
status: publish
title: Compressing your ASP.NET 2.0 pages
wordpress_id: '141'
categories:
- .NET 2.0
---

After installing Dasblog I had problems with the compression module of [Ben Lowery](http://www.blowery.org/blog/Trackback.aspx?guid=116eb7f1-b368-46d1-a48d-346911a2e82c).   
In .NET 1.1 I had exactly the same problems.  No output was generated to the browser.




I dissected his code and found that it could be greatly simplified, so i decided to rewrite it to a .NET 2.0 version.




The first thing that needed to be done was rewrite the configuration, next get rid of all the inherited streams that were there for no reason in my opinion but to add some headers to the stream. I decided to hook them, the headers, up after I was sure that everything was compressed ok.




In the blowery module you can provide paths in the web.config that need to be excluded and this works well as long as your app is running on a virtual directory and not on a website. If your page is [www.foo.com/default2.aspx](http://www.foo.com/default2.aspx) that needs to be excluded his parser returns efault2.aspx so I changed that to work properly as well.




I've provided a zip with this post that contains the module, which you can use freely as long as you leave the copyright notice intact. If you have any questions do not hesitate to ask.

[HttpCompress.zip (34.48 KB)](http://www.flanders.co.nz/Blog/content/binary/HttpCompress.zip)
