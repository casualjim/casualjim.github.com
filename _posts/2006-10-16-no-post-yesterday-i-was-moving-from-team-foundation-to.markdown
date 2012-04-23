---
date: '2006-10-16 06:35:43'
layout: post
slug: no-post-yesterday-i-was-moving-from-team-foundation-to
status: publish
title: No post yesterday I was moving from team foundation to subversion
wordpress_id: '70'
categories:
- General
---

I was using Team foundation workgroup edition  for the past year to manage collaborating with a couple of people. And the other stuff you use team foundation for.

I like Team foundation a lot but unfortunately am not rich enough to buy licenses for everybody that needs to log bugs etc.  To avoid all those licensing issues we have switched over to a combination of open source packets.The total cost of the operation is about 450NZD for unlimited licenses.

So what is the setup :

  * [Subversion](http://subversion.tigris.org/) as source control server
  * [Apache2](http://httpd.apache.org/) with openSSL for people to connect to the subversion repository. 
[Install Guide](http://raibledesigns.com/wiki/Wiki.jsp?page=ApacheSSL)
  * [TortoiseSVN](http://tortoisesvn.tigris.org/) and/or [AnkhSVN](http://ankhsvn.tigris.org/) (VS2k5 integration) as source control client
  * [Gemini](http://www.countersoft.com/) as project management tool
  * [Gemini Time tracker](http://projectmanagementsuite.com/portal) to manage the time spent on issues/work items
  * [The plugin](http://gemini.countersoft.com/issue/ViewIssue.aspx?ID=302) originally written by [Chris Auld](http://www.syringe.net.nz/CategoryView,category,.NET.aspx) and improved by [Frans Bouma](http://weblogs.asp.net/fbouma/) for hooking into subversion

The whole experience took about 6 hours to configure ant that is because I didn't know apache at all and getting it to work with SSL did take me some time until I found the install guide that had a link to compiled binaries. I'm not that good in compiling ansi-C on a windows 2k3 64-bit machine without the windows sdk installed. Not to mention all these little tools you have to download all over the place. Most of them i had never heard of before, so yes I was happy to find that guide.

We are now completely switched over, except for the work items that are currently in team foundation server. It was a good moment to do this because the most of the previous projects have come to an end and the new wave is rolling in. I got really tired of retyping the emails etc I got into the issue tracker, simply becasue I couldn't afford it.
