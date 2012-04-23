---
date: '2006-06-28 21:12:49'
layout: post
slug: safari-fix-for-the-client-library-of-atlas
status: publish
title: safari fix for the client library of atlas
wordpress_id: '114'
categories:
- Atlas
---

If you're not using the control toolkit for atlas and are doing some client side scripting. you may find that the April CTP has doesn't always work in the safari browser. 




This is in part due to the way that safari attaches events. 




In the control toolkit they use the following script to "patch" the april CTP of atlas to support safari a whole lot better. Some might find it useful :-)







   40     // This fixes a bug in the Atlas Safari compatibility layer that




   41  // prevents chaining multiple handlers to an event.  We will remove




   42  // this after an Atlas CTP refresh resolves the underlying issue.




   43  //




   44  if (window.__safari) {




   45     window.console.log("Patching Safari compat layer");




   46     (function() {




   47         var attachEventProxy = function(eventName, eventHandler) {




   48             this.addEventListener(eventName.slice(2), eventHandler, true);




   49         }




   50 




   51         var detachEventProxy = function (eventName, eventHandler) {




   52             this.removeEventListener(eventName.slice(2), eventHandler, true);




   53         }




   54 




   55         window["HTMLHtmlElement"] = document.createElement("html").constructor;




   56 




   57         function HTMLElement() {}




   58 




   59         HTMLElement.prototype = HTMLHtmlElement.__proto__.__proto__;




   60         var HTMLDocument = document.constructor;




   61         window.attachEvent = attachEventProxy;




   62         window.detachEvent = detachEventProxy;




   63         HTMLDocument.prototype.attachEvent = attachEventProxy;




   64         HTMLDocument.prototype.detachEvent = detachEventProxy;




   65         HTMLElement.prototype.attachEvent = attachEventProxy;




   66         HTMLElement.prototype.detachEvent = detachEventProxy;




   67 




   68     })();




   69 }
