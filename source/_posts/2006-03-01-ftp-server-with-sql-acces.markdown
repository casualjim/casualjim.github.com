---
date: '2006-03-01 16:36:58'
layout: post
slug: ftp-server-with-sql-acces
status: publish
title: FTP Server with sql acces
wordpress_id: '135'
categories:
- Main
---

I have the need to run an ftp server for one of my applications. It is to complement a web application where there is a pretty big datatransfer.  Users need to be able to register and upon activation they need to be able to upload movies (20-70MB) to a folder online. These movies need to be made available online and proposed for review to somebody in the company.  
  
So far so good. Were it not that we are running IIS Ftp server for the moment who stores it's users in the AD of the server. That is not the place where I want to store credentials for my users. Also I wanted to make only one folder available for a user and to accomplish this IIS is just too difficult to manage.  Thus again time for an internet hunt and yessss there is is Blackmoon FTP server who allows to do the entire configuration in a sql database or an access database.    
  
Fits like a glove in my opinion :)   
I downloaded it, installed it end yes it just works. I can now do the full configuration through the generated DAL from ORM.NET. All it took to integrate an FTP server in my application was one afternoon and that's it.  
  
You can download blackmoon from their site. They offer a free version for personal use. But even from the enterprise edition with domain license you won't become  poor man :)  
http://www.blackmoonftpserver.com  
  

