---
date: '2006-06-30 21:23:05'
layout: post
slug: javascript-obfuscation
status: publish
title: Javascript obfuscation
wordpress_id: '113'
categories:
- .NET 2.0
- Atlas
---

I've been getting much better along with atlas lately. Almost up to the point that it takes me almost the same time to create page in asp.net than it does me to create a page in atlas. Notice the word almost :) And that's optimism talking




Anyway it does take a wee while longer to create an atlas page than it would to create an asp.net page. But the result is about 10x as usable and than a normal page.




That being said. All that atlas goodnes comes at a cost : A lot of javascript being pushed down to the browser. When I was in wellington on wednesday there was somebody talking about atlas in the user group.  Seen as I will go talk to the regional groups I was quite keen what Tatham had to say on the subject.




It was interesting but at a certain point he talked about the "obfuscated" javascript files. Those are just packed. That made me think that I also want to have packed javascript that is slightly less readable. I remember I have some open source library that I downloaded a year or so ago.




Well the guy has a nice library that you can download here : 




[http://dean.edwards.name/packer/](http://dean.edwards.name/packer/)




It's nice but his HttpHandler doesn't work for me. But there's a simple work-around. Make your own handler that reads the javascript file and uses his Pack function.




If somebody is interested in the code just drop me an email and i'll send it to you.
