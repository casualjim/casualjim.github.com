---
date: '2006-01-04 19:53:32'
layout: post
slug: rss-parsing
status: publish
title: Rss Parsing
wordpress_id: '152'
categories:
- Main
- Old Blog
---

As mentioned earlier in this blog, I am building a rss program together with [http://datafreakz.blogspot.com](http://datafreakz.blogspot.com)




Right now we have about 100000 feeds from this feeds I had before the weekend about 5000 that failed. Now most of these feeds were valid rss although my google sidebar doesn't parse a lot of them either.




Then I've noticed that lots of people never took the time to read the specifications and dump whatever they like in an rss feed.  
Furthermore there are a lot of people including w3c and ms that put stylesheets in their xml.  Up until last week (because I had a parser that seemed to parse a lot of it already), I was one of these people that thought that just using the System.Xml.XmlReader would be enough and that I would get everything on the first pass through my xml.




Now after the weekend I've figured out that it takes 3 passes, that is 3 different ways to get the xml in my program to parse almost everything. The next problem that shows up are feeds that do exist, but their hosts are pretty slow in resolving the domains etc.. so I will be needing some retry mechanism.  The idea behind our system is that we want to be able to parse **every** **valid** feed from the internet. 




I've got the different encodings sorted now.




One of the feeds that bounces the first time :  
















[http://presscenter.org/repository/rss/nl/Ext_102110_5.xml](http://presscenter.org/repository/rss/nl/Ext_102110_5.xml)



And this one doesn't want to parse yet :















[http://www.musicalfan.be/rssfeed.xml](http://www.musicalfan.be/rssfeed.xml)



probably because of its description field in a few posts.  but I do read feeds with html in them that is what I find so strange.. I don't know why this one doesn't want to parse.. for now. ;-)




Always I will appreciate ideas.... I can't show you my code for my parsers but it is based on the xml reader class, too which you pass an encoded textreader. at least the first try parser.  I parse more feeds than Rss.NET and I parse more than rssbandit or rssfeeder.net But I want to be able to say that I parse about 99,99% of the feeds out there.   
I don't want to use serialisation because of the performance overhead.. If you need to parse 100 000 - 300 000 feeds every bit counts ;)  And once we open up for the general public it will be even more feeds.




When everything will be finished online.. probably I will be providing a vs2k5 add in and outlook add in.

[![](http://www.pheedo.com/img.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)](http://www.pheedo.com/click.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)

![](http://geekswithblogs.net/casualjim/aggbug/63483.aspx)
