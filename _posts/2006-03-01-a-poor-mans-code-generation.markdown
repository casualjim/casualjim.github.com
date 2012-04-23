---
date: '2006-03-01 15:50:25'
layout: post
slug: a-poor-mans-code-generation
status: publish
title: A poor man's code generation
wordpress_id: '136'
categories:
- .NET 2.0
- C#
- Main
---

There has been a lot of talk about code generation and ORM software around where I was.




I got curious and embarked on a free codegeneration exploration. Being new to the concept of codegeneration my requirements were the following :






  * It needs to be faster then the dataset generator of visual studio 2005


  * It needs to support relations


  * It needs to support stored procedures or at the very least use dynamic query language that uses parameters to set up queries to the database.


  * It needs to be with a very very fast learning curve.


  * It needs to be free (although I also looked at the wilson O/R mapper which is practically free and LLBL codegen which is definetely not free)



These are my findings :




The one that is most easily found is mygeneration with the dOOdads architecture out of the box. Of course you can create your own templates to customize the generated code to you your specific needs and architecture.  
my generation can be found at : [http://www.mygenerationsoftware.com/portal/default.aspx](http://www.mygenerationsoftware.com/portal/default.aspx)  
It does work fine but the dOOdads architecture does not support relations and these you have to make yourself again.  I found it all a bit too much fiddling about and it didn't meet my 2 of my requirements, thus the search went on.




Next I found ORM.NET, which is the one I am using for the moment. Total setup time of a DAL that is easily queried 1,5 min flat. I was impressed, and best of all it is completely free. Apparently it is written by a consulting firm that used it for their internal needs. They no longer support it and it turned open source.  
ORM.NET gets my stars. And I will be using it a lot in simpler scenario's like websites etc.  
ORM.NET can be found at : [http://www.olero.com/OrmWeb/index.aspx?p=ORM.ascx](http://www.olero.com/OrmWeb/index.aspx?p=ORM.ascx)




While looking for some documentation on ORM.NET I came across a link to ntiergen.net which can handle about any job. It generates stored procedures for you, along the DAL and the needed classes. You get to configure all your stored procedures beforehand and get the opportunity to create views and complicated queries through their interface.  Normally it is priced at $449 but the link I found offers a fully functional licensed version open for the public. I downloaded it and just gave it a brief look as I am very pressed for time at the moment.  
nTierGen.NET can be found at [http://weblogs.asp.net/gavinjoyce/archive/2004/08/28/222017.aspx](http://weblogs.asp.net/gavinjoyce/archive/2004/08/28/222017.aspx)




Happy code generating !!!




 
