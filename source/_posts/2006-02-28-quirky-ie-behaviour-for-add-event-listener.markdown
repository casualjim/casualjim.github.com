---
date: '2006-02-28 14:18:44'
layout: post
slug: quirky-ie-behaviour-for-add-event-listener
status: publish
title: Quirky IE behaviour for Add Event Listener
wordpress_id: '137'
---

Today I had to build something so I needed to add multiple functions to the window.onload event  
  
So what I discovered today is when you use the following snippet for attaching events .. They don't get loaded in the right order by this I mean Firefox fires the one that says yay first and then the again one... IE fires first the latter and then the first.  Nothing to be worried about for the moment,in my case at least, but when you need it to initialise some functions.. it can get you into a lot of head scratching.  
  
function myAddEvent(obj, event, listener, useCapture) {  
  // Non-IE  
  if(obj.addEventListener) {  
    if(!useCapture) useCapture = false;  
  
    obj.addEventListener(event, listener, useCapture);  
    return true;  
  }  
  
  // IE  
  else if(obj.attachEvent) {  
    return obj.attachEvent('on'+event, listener);  
  }  
}  
  
function myListener() {  
  alert('yay');  
}  
  
function myListener2() {  
  alert('yay again');  
}  
  
myAddEvent(window, 'load', myListener);  
myAddEvent(window, 'load', myListener2);  
  

