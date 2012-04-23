---
date: '2006-05-03 21:43:54'
layout: post
slug: woohoo-microsoftsqlservermanagementsmo
status: publish
title: Woohoo... Microsoft.SqlServer.Management.Smo
wordpress_id: '131'
categories:
- .NET 2.0
---

The problem I was facing is that I need to keep an accounting database in sync with the "real" application this company uses.




I don't need all the tables but about 125 need to be imported with data and the whole shabang.




In my mind the best way to do that is to have something iterate the whole database, fill up a dataset and start creating the tables in sql if they don't exist. Next step is to import all the data from the dataset into the new database.




Obviously this can be done if you just look at the dataset generator. It reads schema's and creates .net objects from database tables.  
But how do i create tables ? And how do i do it without having to write long sql strings ?




The answer is : **Microsoft.SqlServer.Management.Smo  
A managed library to manipulate sql 2005 :)**   
You can create any number of items with this library including databases, tables, functions, views, stored procedures ....  
Hence woohoo.




To support just the simple types (no objects) I now have a class that does exactly what I want it to do import a database and it took me about 70 lines of code :)




All you need to know to get started can be found on the microsoft website or on david haydens website, that's where I learned of the existence of this namespace.




[http://davidhayden.com/blog/dave/archive/2006/01/27/2775.aspx](http://davidhayden.com/blog/dave/archive/2006/01/27/2775.aspx)




[http://msdn2.microsoft.com/en-US/library/ms162203.aspx](http://msdn2.microsoft.com/en-US/library/ms162203.aspx)




I won't be putting up any code with this post because it's too easy.  If you do run into problems, i can provide you with a snippet :)
