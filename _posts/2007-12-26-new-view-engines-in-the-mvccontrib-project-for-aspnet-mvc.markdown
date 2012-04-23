---
date: '2007-12-26 05:47:25'
layout: post
slug: new-view-engines-in-the-mvccontrib-project-for-aspnet-mvc
status: publish
title: New view engines in the MvcContrib project for asp.net mvc
wordpress_id: '197'
comments: true
categories:
- .NET 3.5
- C#
- Open Source
tags:
- aspnetmvc
- mvccontrib
---

When I got back from visiting my parents over the christmas holiday I checked the [MvcContrib](http://www.codeplex.com/MVCContrib) project to find out that both Andrew Peter's [NHAML view engine](http://andrewpeters.net/2007/12/19/introducing-nhaml-an-aspnet-mvc-view-engine/) and my [XSLT view engine](http://flanders.co.nz/blog/archive/2007/12/15/xsltviewengine-patch-submitted.aspx) have been accepted in the trunk of those projects.

What's left to do for me is provide a sample site that shows usage of the view engine.  This has been a very rewarding experience so far :). I found out about IViewSourceLoader to get the path to the current view file for example.

I also learnt a new trick to increase my test coverage and be able to test the content of the rendered view. 

To get the mvc contrib project you can either download it from the [releases section](http://www.codeplex.com/MVCContrib/Release/ProjectReleases.aspx) on the codeplex site.

Or you can check out the source code and build it yourself from the [subversion repository](http://mvccontrib.googlecode.com/svn/trunk)
 
