---
date: '2006-12-12 06:00:40'
layout: post
slug: wtf-ajax-and-the-hidden-cost-of-use
status: publish
title: Wtf ?? Ajax and the hidden cost of use
wordpress_id: '45'
categories:
- Castle
- General
---

In it world Sean McGrath has been talking about [Ajax and the hidden cost of use](http://www.itworld.com/AppDev/nlsebizajax061212/index.html).

I got to this post through Jon Udell, who has a post about [ajax and automation](http://weblog.infoworld.com/udell/2006/12/12.html#a1577).

Anyway the sort of arguments that Sean is using make me think he has yet to complete a good ajax application.

> _A common buzzword in the industry is the concept of a "front end". In an ideal world, the front end just handles all the graphical user interface stuff while the back end does all the real work. In this ideal world, you can just bypass the front end and work with the back end directly when you want to integrate applications. Sadly, we do not live in this ideal world_. 

I'm going of a rant here because I thought that the whole discussion AJAX is it good vs bad? was closed about a year ago.

He obviously hasn't seen any of the Castle or ruby implementations who do just that. For example I can unit test my complete controllers base with out running a browser.

Unless i'm really sure that an application will be used in one type of browser or it's successor and this browser is ajax capable.. then and only then the user interface will rely on javascript for the interaction. 

People then go why don't you cache values and have javascript work it out for you the next time this gives a perceived performance benefit. There are 2 main reasons for it : 

1 separation of concerns the only decision an UI can make is should I show this red or green based on a value of the object etc. But nothing else. 

2 you want live data not data that is almost live (i'm taling about a system where minutes matter in the workflow) :)

> _Think now of web-based applications you most like to use. How are their front ends and back ends? Well, historically, they have been quite cleanly separated. After all, a web browser only has limited capabilities. Behind the scenes it is really only capable of sending two commands GET and POST to things called URLs. Everything else (slight simplification!) happens at the back end.   
Ah, but that was then and this is now. Now we have AJAX and JSON and Flash and the Google Web Toolkit and Windows Presentation Foundation and...   
All these things help us to make web applications easier to use. In so doing, the clean separation between front end and back end gets more and more blurred. **With every blurring of the separation, application integration becomes more complex. **_

I guess somebody is really missing the point here a UI is just a shell over lots of services that can do the job with or without the UI on it.  All the real work is to be done in the service layer or deeper down in you app.

I think Windows Presentation Foundation says it all in its name already _Presenation_ **only **whatever is not related to the presenation of your data in the UI shouldn't be there.

What I think is going on here is that he's affraid to take the plunge because the arguments he uses are arguments I had against building a full ajax site about 2 years ago.  I've set them aside.. and just do it now.

I must say that using [castle](http://www.castleproject.org/) has been a tremendous help for me into getting things done in the same timeframe as i would have with the classic model.

For instance I'm about to finish a project that  in a clasic model would have consisted out of 70+ very dataintensive forms. The result of using ajax a.o. technologies now has the application down to 5 forms

I still had to write the 70+ views and but not nearly as many search functions etc.  I do ajax on the AHA  principle (which means I send html snippets) because JSON and building dom nodes breaks backwards compatibility and would have slowed down development a lot.

To get to the automation bit .. I think ajax makes it much more easy to interact with the backend then the classic model would have done. There are many more options to choose from (which is kind of a dissease of our time.. too many options) and you have a much finer grained control over what passes through the pipeline in terms of bits and bytes. just pull up any http request listener and you'll have all the things you need to replay your actions vs. parse forms and go through the html to figure out the fields etc.

Ok that's it for my morning rant.  I just thought somebody needed to put his views into context. I have to give him that technology certainly didn't come to a standstill over the last year so it's getting increasingly difficult to keep up.

I've known a couple of really good people to give up the game this year because it's all moving too fast in some respects or not how they want it to move. In my opinion things are indeed moving very fast at the moment.. but that's what makes it so exciting :D
