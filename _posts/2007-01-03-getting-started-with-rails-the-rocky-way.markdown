---
date: '2007-01-03 14:45:09'
layout: post
slug: getting-started-with-rails-the-rocky-way
status: publish
title: Getting started with rails... the rocky way
wordpress_id: '39'
---

Over the last couple of weeks I've been getting into ruby on rails. 

I won't get in to why I'm not using castle instead of rails.  I don't think there is a big difference between the 2 except that one is done with a static, compiled language and one is done with a dynamic language.

It's no secret that the syntax of ruby is a lot prettier than the syntax of C# let's say.

Currently i want to use it to write applications and these applications need to integrate with existing asp.net applications. That made it a pretty interesting journey.

I took the long road of course of first looking if there is something better out there, based on a dynamic language but i couldn't really find anything. For a while there I thought that pylons would be a valid replacement.  Of course there is django but I really don't want a heavily glorified CMS but something in rails style.  Something that generates some base things which are pretty boring to write and then let me do the customizing.  That being said it turns out that ruby on rails seems the best option for the moment if you want results quickly. And we all know we want results quickly :)

So the first step in the journey for me was buy the book : [**Agile development with Rails**](http://www.pragmaticprogrammer.com/title/rails/)**  **after that one I made one more stop at the bookshop and got myself the **[Ruby cookbook](http://www.amazon.com/Cookbook-Cookbooks-OReilly-Lucas-Carlson/dp/0596523696) **and the **[Rails cookbook](http://www.amazon.com/gp/product/0596527314/105-5120906-6250848) **(which still isn't available according to amazon)

Step number two would be then to actually write some code (some code is the correct term here because I really haven't written too much code to get something going)

Step number three was then to get it to talk to one of my other applications. And that's when I got completely lost :) I have this thing about guid primary keys as opposed to ints.  Using guids has a lot of advantages as opposed to using ints. Replication is one of them, the possibilty to do a global lookup (not that I ever did but it's nice to know that i can :) ), you can impose a kind of inheritance in your database,...   But yes I know they are a bit larger in size, however this doesn't seem to affect me so much.  


Now the philosophy of rails is that you can run your application on any platform with any of the supported database servers. That  implies that there is no support for uniqueidentifier primary key columns in sql server which made me somewhat upset.  Anyway since rails is open source you can teach it what you want by changing the source.  As i'm sure that the database server i'll use is ms sql server i do want some of those features.  So I went and changed the connection adapter for sql server so it would support most of the sql datatypes and moreover uniqueidentifier columns.    
My solution isn't as pretty as I would want it to be but the deadline is lurking :) I'll keep code for a next post.

Ok cool my application is working now on my laptop and on the laptop of the other developer that's cool let's show it to the client and stage it somewhere.

Which brings me to step number 4 create a server to run rails on.  Ok what have i got to run websites on ... uhm? let's see ah yes I've got a windows 2003 R2 machine with IIS 6 on it.  Well it took me 2 days before i completely abandonned that plan because i can't get it to work at all. I'm sure other people have succeeded but in my case things really didn't work out.  Mmmmm, how would i solve this issue ? Aha there is something like linux that will run rails with apache.

I know I can run apache on windows but here we come again to one of my pieves .. http traffic should be served over port 80 not over port 8080, 1024+,... and port 80 is taken by IIS  
Cool so i just download ubuntu server and install it and i'll be on my way or so I thought.  
Turns out installing ubuntu is not a point and click experience but it's a command line type of thing. So now we are 4 days later (i could have done it in 2 but somewhere along the way i changed some security settings without backing up the original files which isn't a good plan by the way)

Yep ubuntu has got this utility apt-get which will install software for you that's all fine until you want a working version of ruby ..then that apt-get thing didn't want to do it.  
[To run rails, subversion, trac in apache 2.2](http://ajopaul.wordpress.com/2006/12/11/setting-up-a-svn-14-server-using-apache-22-on-ubuntu/) you need to download the packages and actually build and install them yourself. which makes all of this a very very lenghty operation and the user experience is less than optimal.  I thought the days of command line things were abandonned somewhere around 1995.

Ok i have apache running let's get my rails app that talks to sql server using the ADO.rb file onto the linux server and fire it up.  I chose to use [mongrel_cluster](http://mongrel.rubyforge.org/) in combination with apache. Not that I really need it but I figure it's best to mimic a professional environment than to set up a totally different environment from the optimal one.  
Ok so here we go :

rake db:migrate RAILS_ENV=production   

Whoops win32 required errors all over the place. Ah yes I connect over OLEDB which is an ms specific thing and hence not supported on linux. But you can connect over ODBC in linux to the sql server... The even have a [page on the rails wiki](http://wiki.rubyonrails.org/rails/pages/HowtoConnectToMicrosoftSQLServerFromRailsOnLinux) to get it going.. sadly this page didn't really do it for me as things still didn't work. But what did work was [this page](http://www.artima.com/forums/flat.jsp?forum=123&thread=182961). I still had some issues but I can't find the links anymore.

Ok after a lot of tinkering, cursing and an injured pinkyI finally have got my rails app running on linux with my ms sql database.

So now we are about 1 week later and finally everything is running smoothly. If mac os x is built on linux then i don't really see how they can provide the best user experience. The might have the prettiest interface but installation and management of a windows machine is vastly easier then the experience i got on linux
