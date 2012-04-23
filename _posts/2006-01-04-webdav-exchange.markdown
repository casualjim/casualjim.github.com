---
date: '2006-01-04 19:53:32'
layout: post
slug: webdav-exchange
status: publish
title: 'WebDav Exchange ... '
wordpress_id: '149'
categories:
- Main
- Old Blog
---

I live in new zealand.




I can successfully create appointments in exchange using webDAV.  But I can only create them in the timezone Z if I change the timezone to Y (which is mine) I always get bad request.




Do I say ok.. so not during string conversion but I just calculate the offset and add that to the date and create the appointment then that should be ok. Also not !!!




My conversion function is very basic but i didn't find a way to get it properly formatted in .NET so this is my way. The function below ends with “Y“ and this doesn't work, when I end it on Z it does work. Any suggestions ? 


All sorted now.. instead of passing on the timezone I should replace the Y with the offset of the timezone to +13:00 in the new zealand case. 





string

formatDate(DateTime input){  
  



return input.ToString("yyyy-MM-ddTHH:mm:ss.fffzzz");  
}


**** 

[![](http://www.pheedo.com/img.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)](http://www.pheedo.com/click.phdo?s=ws-58bab757b1982e63240738f517c2db883329859)

![](http://geekswithblogs.net/casualjim/aggbug/63737.aspx)
