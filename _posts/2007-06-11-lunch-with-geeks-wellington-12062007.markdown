---
date: '2007-06-11 17:04:03'
layout: post
slug: lunch-with-geeks-wellington-12062007
status: publish
title: Lunch with geeks - Wellington - 12/06/2007
wordpress_id: '9'
categories:
- Lunch with geeks
---

Another week, another lunch. The attendees this week were JD (Mindscape), Andrew Peters (Mindscape), Adam Burmister (Xero), Fletch Brown (Xero), Simone Charietta (Calcium), James Hippolite (Telecom), Martin Harris (Telecom) and me (Xero).    
Our meetings used to be on a thursday but we moved them to Tuesday in the hope that more people would be able to make it (Tim wink wink)

We started out with the OR mapper of mindscape: Lightspeed.  JD and Andrew were pretty quick to point out that Lightspeed is a lot faster than NHibernate for all the operations they currently support.  
The analogy was made that NHibernate is like the Oracle of OR mappers and supports every single feature you could every imagine. Where Lightspeed is a bit more limited in features but still does a good job.

From that point on the discussion went on to Katmai (SQL Server 2008) and nobody seemed to know what the new killer features are, apart from the obvious one that it's a new version.  
JB of Mindscape has a the ctp installed but didn't have time yet to have a proper play with it.  Simone asked what the killer features were for Sql 2005 and offered XPath/XQuery in the Xml columns, I offered CLR integration from then on we struggled a little. It turns out that Andrew and me were the only ones that had actually used the features in a production app.  
Luckily JD threw the MAX values for varchar, nvarchar, .. on the table and everybody agreed that that one is overlooked because it should have been there all along :)

The next point of discussion was of course the beta release of Safari for windows. Andrew pointed out that you could go to [Pimp my safari](http://pimpmysafari.com/) to flesh out safari with some much needed plugins.  Nobody really understood why apple didn't take advantage of cleartype rendering on the windows platform. One of the reasons might be that the apple developers want to maintain one codebase, which is also understandable but then they will have to fix the subpixel rendering because now it isn't up to scratch.  

James moved the discussion topic over to the fact that Silverlight supports VB.NET better than it will support C# as programming language. Which made me ask why the guys of MS not just kill of the VB language all together ?  Lot's of C# programmers agreed on this but the poor VB guys didn't flinch one bit.  Everybody around the table had programmed in some form of Basic in the course of their lives. For me I started with GW-Basic, did some visual basic after that but from then I moved to Turbo Pascal.  
The DLR has a dynamic form VB as well so it will still be a while before that one will go away, if it ever does. :)    


Which brought us to the next point of discussion datasets vs OR/mappers. James is a big fan of the dataset and what he can do with it. Where most of the other people around the table liked the OR approach better. After some bickering we agreed that it's mostly a personal choice. Both methods have their advantages and disadvantages.  Andrew was the one that enlightened us with the big difference between the 2. Domain models have behaviour attached to objects where an RDBMS approach separates the 2 which makes you maintain the code into 2 different places.  

And the last point of discussion would be XML is it a datacontainer/exchanger or is it a programming language.  
I personally have a strong dislike for xml, I find it verbose and not friendly to write (number of keystrokes).  
JD picked up that discussion by categorically saying that xml is a datacontainer and not a programming language, he then asked me why I asked that question.  The reason for that question is, that whenever I bring up the subject people will tell me it's a datacontainer and yet we see the new technologies being introduced are all based on xml (WPF, XUL, ...). Then people come up with the fact that if there is a good tool support for it it's not that bad. On this point [I personally agree with Ayende](http://ayende.com/Blog/archive/2007/05/19/Random-thoughts-in-a-vacum.aspx), in that you shouldn't have to use a tool if you want to get on with the technology. To quote Ayende:

> _Here is a good metric that I like to use. Take an technology, and try to build it without any tool assistance. Is it still a good approach? If not, then there it is complex and hard to use. A lot of UI frameworks fails this test, by the way. WinForms certainly does, when you start to think about complex UI._

Which brought us to the point of DSL's vs. XML + tools to generate your manifests (manifest => a webpage has an xhtml manifest, with javascript behaviour and CSS for representation)  
Somebody around the table didn't quite know what DSL meant, so Andrew quickly explained that it means Domain Specific Language and it makes it a lot easier for the developer to write out the manifest he needs or to make your code inside your specific domain more readable.

Ok that's it for today, or at least that's all I could remember, if I forgot something please let me know and I'll add it to this post
