---
date: '2006-09-09 10:16:45'
layout: post
slug: the-conceptual-internet
status: publish
title: The conceptual internet
wordpress_id: '89'
---

There has been some talk lately on how to define web 2.0

[The Conceptual Internet](http://www.base4.net/Blog.aspx?ID=109)

[WTF is Web 2.0](http://blog.bluecog.co.nz/archives/2006/09/06/wtf-is-web-20/)

In my opinion web 2.0 is something you add to the description of your application or service and have instantaneously a perceived coolness upgrade.

Everything is else is just the web.  I'm up to the point that if I hear somebody mention web 2.0 to me I'll run out the door screaming ;-)

But let's talk a bit more about conceptual url's as [Alex](http://www.base4.net/Blog.aspx) has called them. I feel they should be more self-describing urls. [Alex](http://www.base4.net/Blog.aspx?ID=109) and I have been discussing this way of forming url's for a wee while now. 

Self describing urls are urls that mean something to everybody also your mum and nana. When talking to users I often find that they don't get anything that comes after [http://www.somedomain.com/FooBar](http://www.somedomain.com/FooBar)

However if it were common to implement a scheme like [http://www.somedomain.com/MyAccount](http://www.somedomain.com/MyAccount), [http://www.somedomain.com/Blog](http://www.somedomain.com/Blog)  
That is something they also grasp but what they don't get (want to or need to) is why there is sometimes .aspx, .php, ..... and definitely the question mark is where the look in their eyes becomes fully glazed.  
So a common schema to implement  could be protocol://domain/DomainObject/View/RowIDOrFilter/Action/DomainObject/View/RowIdOrFilter/Action.... Now why do i feel that they should be called self describing. The reason is because you can read them in plain english :   
At _domain_ Get me the _domainObject_ as a _view _with only _RowIdOrFilter_ and do _Action_ with it/make it_ Action_/apply _Action_ to it

[http://www.nblogr.com/Category/DetailByName/Venues/ShowSublist/Entry/List/](http://www.nblogr.com/Category/DetailByName/Venues/ShowSublist/Entry/List/) would be valid and would say then at nblogr.com get me the categories By name Venues and from those show me a sublist of entries as a list. Now that is something my grandfather with alzheimer still understands and quite possible could navigate.

That way url's are in fact really easy to remember if you make them all up of meaningful words so that would make internet more transparent for everybody to use.

This theory poses a problem when there are complex filters to be applied. However filters can be foreseen and hence be named upfront.  And the biggest problem I see here is to come to a world wide consensus on which naming to use for commonly used filters ect.  But in fact with predefined standards really everybody would benefit from it.

In asp.net with virtual path providers you can store your whole website in sql server and never have a real physical website running

Needless to say that I can't wait for IIS 7 to get rid of the aspx extensions etc on my projects.

I'd say back to the basic idea of the computer/internet is here to assist people into doing better jobs not to confuse the hell out of them.
