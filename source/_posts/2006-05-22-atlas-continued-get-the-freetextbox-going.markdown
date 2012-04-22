---
date: '2006-05-22 09:02:25'
layout: post
slug: atlas-continued-get-the-freetextbox-going
status: publish
title: 'ATLAS continued : Get the freetextbox going.'
wordpress_id: '126'
categories:
- .NET 2.0
- Atlas
---

I decided after working a bit more with ATLAS that the client-side needs a LOT more documentation. Some cooperation with other javascript libraries would also be nice.    
A properly working dataservice is lacking.




I've turned back to the server side controls.  The start of this whole mission was to keep the freetextbox control on a page and still don't have full postbacks.  Upload pictures with progressbar was going to be a plus. 




How to upload files from within an update panel is something that I will come back to in the future but it isn't going to be pretty.




The things I'm about to write I will wrap in a control later (when I have time) for people to download




Anyways you wrap your freetextbox in an Iframe and it works. Don't add a scriptmanager to your iframe page.




Put a hiddenfield on your main page and in the ClientSideTextChanged event of the freetextbox control you update the hiddenfield on the parent.  If you wrap it inside a control then I suggest you add a property to the control that holds the Text variable :)




That's about it, easy isn't it.
