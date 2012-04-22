---
date: '2006-05-20 12:32:45'
layout: post
slug: atlas-cracked-the-nut
status: publish
title: ATLAS cracked the nut
wordpress_id: '129'
categories:
- .NET 2.0
- Atlas
---

Ever since i knew about the ATLAS framework it intrigued me because it offers a lot of the features that made me avoid javascript in the past.  The issues that kept me from using javascript are well known to everybody who wrote 7 lines of javascript. Basically it comes down to browser differences in understanding javascript and the differences in the DOM implementation for the two.




Then there was Ajax.NET very nice but a lot of extra programming is involved to get minor ajaxy effects. and still the browser incompatibility.




Actually I wasn't looking for an ajax framework I wanted  the whole deal. And I stumbled upon ATLAS like many others have of course.  I had been using ajax in intranet applications through the magixajax panel, which still has at least one feature that the update panel from atlas doesn't have : the ability of a button to cause a regular postback from inside a panel.  It can be implemented in atlas by using a clientside control and have that cause a postback when it's clicked.




Then [Tim Haines](http://www.ims.co.nz/blog) told me about the Anthem library. A library of controls that add instant ajax abilities to numerous familiar controls.  The library works well but i found it hard to debug hence it slowed me down a lot. I am not using Anthem anymore.




The atlas framework was exactly what i wanted: extensible, cross-browser and shiny :)  
The entry into the atlas world was definitely not the easiest one ever.  It started out with the updatepanels and the server side controls along with the AtlasControlToolkit. And from seeing how things worked in the control toolkit.   
The updatepanel is a great tool for enhancing existing apps with instant ajax abilities, that much is certain. A downside I found with the updatepanel was the fact that the response you get back from the server is the full html version for your page and some added lines.  Not really a bandwith saver I would say. Accompanied with the fact that you can't put a freetextbox inside an updatepanel nor a file upload control made it a close but no cigar kinda tool.  The data exchange is what bugged me the most because more data means slower pages etc...




The next step presented itself, get using webservices and do the processing client-side. Cool let's take a look at the samples from the documentation. Aha a data service that sounds interesting. Ooops wait a minute xml script. So it took me a some time to get over the fact that it is xml script and to be convinced xml script does save you from writing tons of lines in javascript. Once you get used to the xml script it reads ok and more quickly than javascript.  
The dataservice looked very cool.. it takes care of the processing of the datatables returned from my BLL. I tried to get it to work for a very long time but all I could get out of it was that it displays records (that part I had after 5 minutes) but i can't get it to save my data back to the database (that part cost me 2 days at least). This is through bindings and xml script.  No updating kinda cripples my whole application :( 




A day later i got it working after digging deeper and doing a lot of googling and live searching. I still can't use the dataservice except for loading data. but I can use regular webmethods to put stuff in the database and use the load method of the dataservice to get the fresh data bound to the listview and itemview controls




So now I can have my somewhat SOA oriented applications and not spend hours trying to resolve browser issues or write thousands lines of javascript to parse my results into the page.




Resources that I found to be very helpful :   
[http://atlas.asp.net/docs/Client/Browser/jsBrowser.aspx](http://atlas.asp.net/docs/Client/Browser/jsBrowser.aspx)  
[http://atlas.asp.net/docs/default.aspx](http://atlas.asp.net/docs/default.aspx)  
[http://atlas.asp.net/docs/Client/default.aspx](http://atlas.asp.net/docs/Client/default.aspx)  
[http://aspadvice.com/blogs/garbin/archive/2006/03/05/15591.aspx](http://aspadvice.com/blogs/garbin/archive/2006/03/05/15591.aspx)




Javascript transitions and good scripts can also be gotten from script.aculo.us   
[http://script.aculo.us/](http://script.aculo.us/)




Another problem with an ajax application is that the history button behavour gets broken. Or at least doesn't work as it is supposed to work. There is a library out there called the Real Simple History Framework that makes that a thing from the past.   
A detailed article can be found here :  
[http://www.onjava.com/pub/a/onjava/2005/10/26/ajax-handling-bookmarks-and-back-button.html?page=1](http://www.onjava.com/pub/a/onjava/2005/10/26/ajax-handling-bookmarks-and-back-button.html?page=1)




 
