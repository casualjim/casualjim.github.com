---
date: '2009-11-08 12:02:37'
layout: post
slug: a-good-url-regular-expression-repost
status: publish
comments: true
title: A good url regular expression? (repost)
wordpress_id: '366'
categories:
- General
tags:
- development
- regex
- url regex
---

I'm moving this post from [http://geekswithblogs.net/casualjim/archive/2005/12/01/61722.aspx](http://geekswithblogs.net/casualjim/archive/2005/12/01/61722.aspx)

I started out blogging on geeks with blogs but I can't allow comments there anymore or I get too much spam, so I'm moving the post from there to this place.  Various people have contributed through the comments in the other blog post. So here I have better control over the spam and can open the comments again.

I have been looking for a good first layer of validating an url to see if it is valid.

For checking the format of the url it seems to me to be the most logical approach to use regular expressions. Up until now I always discarded them as being to “geeky”, meaning i don't consider it my life's biggest goal to be typing (/?[]\w) all day long (so why did i become a programmer, aaaah yes to make life easier for other people)

Anyway.. to find a good regular expression to that validates urls not url domains. One that doesn't allow spaces in the domainname and where the domain can be suffixed with the port number.  Also I need support for the ~/ paths

This is what I came up with.. if somebody as a better idea... or finds a mistake please let me know.. Always happy to learn something new.

``` csharp
^(((ht|f)tps?\:\/\/)|~/|/)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5})(:[\d]{1,5})?)/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?
```

I was a bit quickly in using this regex. Simeon pilgrim indicated that the ftp urls won't validate when you add a username and a password.

I don't really need to validate ftp so I should have removed the ftp protocol from the list of choices.  I need this just to validate urls for weblinks and the link element in an rss feed.  When I need them for ftp I will post the ftp version.. but for now I don't have time to spend on elaborating the regex.


Anyway here is the right one :  
``` csharp
^(http(s?)\:\/\/|~/|/)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?
```

A full url validation would include resolving names through dns or making a webrequest to the provided url to see if we get a 200 response. The only way to be sure is to test if it is there in my opinion.

Thanks Simeon.

And for those who really want the ftp validation : 
``` csharp
^((ht|f)tp(s?)\:\/\/|~/|/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?
```

I am not sure about numbers in the username but I believe you can have a username of numbers alone.

Comments don't seem to work on this blog engine.. so just send me a mail through the contact form. thanks

Two days later ...

I discovered there is still a problem with my regular expressions... folders don't get parsed.

I've solved the path issue, so now it should be finding all url's

Expression:

``` csharp
^((ht|f)tp(s?)\:\/\/|~/|/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((/?\w+/)+|/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?
```

Should parse the url below

[http://hh-1hallo.msn.blabla.com:80800/test/test/test.aspx?dd=dd&id=dki](http://hh-1hallo.msn.blabla.com:80800/test/test/test.aspx?dd=dd&id=dki)

But not :

[http://hh-1hallo](http://hh-1hallo). msn.blablabla.com:80800/test/test.aspx?dd=dd&id=dki


Update 29/11/2008:


Joe posted what seems to be a great regular expression in the comments

he tested it with the following urls:

http://www.google.com/search?q=good+url+regex&rls=com.microsoft:*&ie=UTF-8&oe=UTF-8&startIndex=&startPage=1

ftp://joe:password@ftp.filetransferprotocal.com

google.ru

https://some-url.com?query=&name=joe?filter=*.*#some_anchor

Expression:

``` csharp
^(?#Protocol)(?:(?:ht|f)tp(?:s?)\:\/\/|~/|/)?(?#Username:Password)(?:\w+:\w+@)?(?#Subdomains)(?:(?:[-\w]+\.)+(?#TopLevel Domains)(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|travel|[a-z]{2}))(?#Port)(?::[\d]{1,5})?(?#Directories)(?:(?:(?:/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|/)+|\?|#)?(?#Query)(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?#Anchor)(?:#(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)?$
```


Update 8/11/2009:




Expression:



``` csharp
^(?#Protocol)(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?#Username:Password)(?:\w+:\w+@)?(?#Subdomains)(?:(?:[-\w]+\.)+(?#TopLevel Domains)(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|travel|[a-z]{2}))(?#Port)(?::[\d]{1,5})?(?#Directories)(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?#Query)(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?#Anchor)(?:#(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)?$
```

There is a wave for this regex:

[https://wave.google.com/wave/?pli=1#restored:wave:googlewave.com!w%252BsFbGJUukA](https://wave.google.com/wave/?pli=1#restored:wave:googlewave.com!w%252BsFbGJUukA)

Update 29/09/2010

So people if you don't like it don't use it.
Now this regex is troubled it has a bunch of issues but it works most of the time.  If you want a more liberal regular expression to just capture urls from text, there is a really good one on the blog of John Gruber.
[Improved regex for matching urls @ daring fireball](http://daringfireball.net/2010/07/improved_regex_for_matching_urls)
