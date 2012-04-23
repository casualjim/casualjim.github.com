---
layout: post
slug: a-good-url-regular-expression
status: publish
title: "A good url regular expression ?"
categories:
- Main
- Old Blog
---

I have been looking for a good first layer of validating an url to see if it is valid.




For checking the format of the url it seems to me to be the most logical approach to use regular expressions. Up until now I always discarded them as being to “geeky”, meaning i don't consider it my life's biggest goal to be typing (/?[]\w) all day long (so why did i become a programmer, aaaah yes to make life easier for other people)




Anyway.. to find a good regular expression to that validates urls not url domains. One that doesn't allow spaces in the domainname and where the domain can be suffixed with the port number.  Also I need support for the ~/ paths




This is what I came up with.. if somebody as a better idea... or finds a mistake please let me know.. Always happy to learn something new.




<strike>^(((ht|f)tps?\:\/\/)|~/|/)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5})(:[\d]{1,5})?)/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?</strike>




I was a bit quickly in using this regex. Simeon pilgrim indicated that the ftp urls won't validate when you add a username and a password.  




I don't really need to validate ftp so I should have removed the ftp protocol from the list of choices.  I need this just to validate urls for weblinks and the link element in an rss feed.  When I need them for ftp I will post the ftp version.. but for now I don't have time to spend on elaborating the regex.




Anyway here is the right one : <strike>^(http(s?)\:\/\/|~/|/)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?</strike>




A full url validation would include resolving names through dns or making a webrequest to the provided url to see if we get a 200 response. The only way to be sure is to test if it is there in my opinion.




Thanks Simeon.




And for those who really want the ftp validation : <strike>^((ht|f)tp(s?)\:\/\/|~/|/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?/?(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?</strike>




I am not sure about numbers in the username but I believe you can have a username of numbers alone.




Comments don't seem to work on this blog engine.. so just send me a mail through the contact form. thanks




Two days later ...




I discovered there is still a problem with my regular expressions... folders don't get parsed.  
I've solved the path issue, so now it should be finding all url's




Expression:  
**^((ht|f)tp(s?)\:\/\/|~/|/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((/?\w+/)+|/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?**




Should parse the url below  
_[http://hh-1hallo.msn.blabla.com:80800/test/test/test.aspx?dd=dd&id;=dki](http://hh-1hallo.msn.blabla.com:80800/test/test/test.aspx?dd=dd&id=dki)_




But not :  
[http://hh-1hallo](http://hh-1hallo). msn.blablabla.com:80800/test/test.aspx?dd=dd&id;=dki




 

[![](http://www.pheedo.com/img.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)](http://www.pheedo.com/click.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)

