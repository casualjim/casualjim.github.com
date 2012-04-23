---
date: '2007-10-18 23:03:37'
layout: post
slug: get-all-the-css-classes-in-use-on-your-page
status: publish
title: Get all the css classes in use on your page
wordpress_id: '175'
---

By using javascript that can be done pretty easily. The script below requires prototype

var classes = [];  
function collectClasses(ele){  
  var children = ele.childElements();  
  if(children.length > 0){  
    children.each(function(el){collectClasses(el);});  
  }   
  else{  
   ele.classNames()  
     .each(function(className){classes.push(className)});  
   return classes;  
  }  
}  
var body = document.getElementsByTagName('body')[0];  
collectClasses(body);  
var myUniqueClasses = classes.uniq(); 

  

The myUniqueClasses variable holds all the classnames that are in use on your page.  

 

 

del.icio.us tags: [javascript](http://del.icio.us/popular/javascript), [dhtml](http://del.icio.us/popular/dhtml)
