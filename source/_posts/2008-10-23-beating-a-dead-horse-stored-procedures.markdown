---
date: '2008-10-23 20:37:23'
layout: post
slug: beating-a-dead-horse-stored-procedures
status: publish
comments: true
title: 'Beating a dead horse: Stored Procedures'
wordpress_id: '260'
categories:
- .NET 2.0
- .NET 3.0
- .NET 3.5
- C#
tags:
- C#
- stored procedure
---

I seem to be having the same conversations with the dev teams whenever I switch clients. The topic of this post is one that many people have written about before. I'm just going to put my opinion on my blog so I can refer people to it in the future instead of having to repeat myself every time.
What prompted this post is that since I've moved to Belgium I've had to take a step back from living on the bleeding edge and using open source projects. Most of the work is concentrated in Brussels and is at big corporates or banks not exactly what you'd see as the progressive thinkers (with reason).
I guess it would be safe to say that I've been immersed in "enterprise" development. In short I still haven't seen anything that is more complicated than a web app like [Xero](http://www.xero.com). But perhaps more about that in another post. This one is about stored procedures and their valid uses.


My current client is pretty interested in the newer technologies (anything that is out of beta) and how to put them into production.  As such they use LINQ as their data layer. They follow the classic MS guidance of data logic, business logic and - the trigger for this post - stored procedures to encapsulate all the data access.
People that have worked with me in the past will be able to vouch for the fact that I feel strongly against stored procedures. But before we get to why I don't want to use them, let's look at some of the reasons people have given me in the past why they were using them.

* Performance. Because stored procedures are (pre)compiled
* Security. They can lock down tables from being accessed by users directly but they can get to the database through the stored procedures layer
* Maintenance. You can change a stored procedure more easily than deploying a new build of your application because no compilation is needed.
* Less data to send over the wire because stored procedures can execute more sql statements at once.

All of that stuff sounds pretty great right? As I've said before my current client has developed their data layer in their framework using Linq2Sql. I think Linq2Sql is not too bad, at least it gets the corporates into an ORM mindset because it comes from MS which makes it a vastly easier technology to sell than NHibernate for example.
But when you're going to use Linq in conjunction with stored procedures for basic CRUD operations I think you're kind of missing the whole point of Linq2Sql or ORM's altogether for that matter. So there you have it, this is why I cannot resist posting about this subject although many people have said pretty much the same as I'm going to say in this post.

###Credit where credit is due
The list of people below have helped me in forming my opinion on this subject. I've had the pleasure of having lengthy discussion on this topic with the first 3 people on the list. I consider the people on this list to be authorities in .NET development and 4 of them have written their own ORM in the past. Alex James and Andrew Peters now both work on the Entity Framework team.
* [Alex James](http://blogs.msdn.com/alexj)
* [Andrew Peters](http://andrewpeters.net)
* [Jeremy Boyd](http://turtle.net.nz)
* [Frans Bouma](http://weblogs.asp.net/fbouma)
* [Ayende (Oren Eini)](http://ayende.com/Blog)
* [Jeremy D. Miller](http://codebetter.com/jmiller)
* [Jeff Atwood](http://codinghorror.com)

Let's look at the reasons mentioned above and work our way through them seeing how they pan out in the end and you can draw your own conclusions on the matter.

###Performance
####Stored procedures are precompiled
The fact that stored procedures are precompiled and dynamic queries aren't is a complete myth. Ever since Sql Server 7.0 the query plans are cached for both of them. If you change a parameter in a stored procedure it has to be recompiled too.You can check the Sql documentation to verify that.
IMHO this also falls in the category premature optimizations. It could be that you have a query that is so complex or that is a real bottleneck for your application then it might be worth it to invest the time and write a stored procedure for it that queries the database differently and as such get rid of the bottle neck but take on a higher maintenance cost.
####Batching of queries and returning multiple result sets
Another argument people often bring to the table is that in a stored procedure I can issue many sql statements on the same database connection. I hate to break the news to you but you get the same benefits when you're using dynamic sql (preferably the parameterized kind). You could issue one command that returns multiple result sets just like the body of your stored procedure. Or you could issue more than one command on the same connection and still get a very similar result.

###Security
####Sql Injection attacks
Another argument I keep hearing is the fact that when you build dynamic sql statements you open yourself up for sql injection attacks which isn't that case for stored procedures.
There is some truth in that but it definitely isn't the whole truth. What they mean by that is that if you're going to build your dynamic query by concatenating strings then you could indeed open yourself up to a sql injection attack but I've seen this happen in stored procedures too it's just a little bit harder to do it there.
However if you build your sql statement by using a parameterized query you get the same security benefits as a stored procedure would give you.

####Different permissions on tables and stored procedures
This isn't such a big problem. I've mostly seen people use one dedicated user to access the database. Lots of times there is a SOA like architecture that allows the client application to not even know what type of database it's connecting too.  I haven't seen many places yet where they actually implement security that is that strict.
So the reasoning goes if you secure your application properly then this shouldn't be a big problem.
Ayende has a more elaborate post on the subject: [Stored Procedures for Security](http://ayende.com/Blog/archive/2006/04/05/StoredProceduresForSecurity.aspx)

###Maintenance
This is probably a very ambiguous problem. From a development point of view this might probably be the worst argument in favor for stored procedures. However if you look at it from the POV of the enterprise it might actually hold some value.
At my current client all the applications have to be distributed by a separate team, and that makes the deployment a costly scenario.
That is because once your application goes into production and something small needs to change the deployment team has to go around and deploy that application again on every workstation in the company. I know about click-once but nobody has any rights to install anything on their pc which makes that pretty hard to do.
Now from my POV this is the most invalid argument of all of them because of the maintenance overhead it adds.
When you give stored procs to a developer they see shiny quick shortcuts to quickly get some data out and perhaps already transform some of that data in their query. That is all good the first time you have to deploy the application. But the next person needs to add a column to a table and suddenly he will have to go through all the stored procedures (at least 3 of them for the C,R and D of CRUD) to add the column. Then he has to go in the data layer of your n-tiered application and modify the entity and perhaps the methods that map to the stored procedures.  Then comes time to deploy and you forgot to modify your update script with that one column you added to a stored proc. Of course this stored proc is the one that saves one of the core entities of your application and suddenly the new release is throwing errors all over the place.
I skipped the part of transforming some data. As [my previous post](http://flanders.co.nz) suggests: that stuff is business logic and doesn't belong in a stored procedure.

###Some more reading on the subject
* Jeff Atwood claiming that T-SQL is the assembly language of contemporary development.

[Who Needs Stored Procedures, Anyways?](http://www.codinghorror.com/blog/archives/000117.html)
* Frans Bouma explaining his point of view:

[Stored procedures are bad, m'kay?](http://weblogs.asp.net/fbouma/archive/2003/11/18/38178.aspx)
* Jeremy Miller swearing this is really going to be his last post on stored procedures:

[Why I do not use Stored Procedures](http://codebetter.com/blogs/jeremy.miller/archive/2006/05/25/145450.aspx)
