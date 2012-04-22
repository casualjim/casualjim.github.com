---
date: '2006-09-01 09:13:37'
layout: post
slug: fileuploading-for-nblogr
status: publish
title: FileUploading for NBlogr
wordpress_id: '92'
categories:
- .NET 2.0
- Atlas
- NBlogr
---


		


		


		

To upload files in nblogr. I wanted the user to have the possibility to upload as many files as they wanted but only show one file element. 


		

The upload procedure has to work without reloading the page entirely but there is no way of getting the size or the bytes of a file through the html input file control from clientscript without popping up a security warning.  
And what do I personally think about security warnings : they are a necessary evil but limit you a lot in the development of contemporary sites with rich client interaction.  
If I am to present a site to my parents and they have to figure stuff out themselves I'm pretty sure that once the read the words : Security warning, Potential risk etc... they will click no ==> site doesn't work ==> site == crap 


		

I wanted to include an upload with progress bar but decided to let that idea go and just give an implementation of a multiple file upload with a single inputelement. Maybe I will put this in during the next iteration. That way I can probably release a ctp this weekend and start thinking about a plugin architecture (thanks for the idea [JD](http://blog.bluecog.co.nz/)) 


		

Because of the file issues i have to run it in an iframe :-s and have the page and the frame talk to eachother.



