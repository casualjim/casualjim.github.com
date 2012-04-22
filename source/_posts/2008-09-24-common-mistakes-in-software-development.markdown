---
date: '2008-09-24 11:31:44'
layout: post
slug: common-mistakes-in-software-development
status: publish
comments: true
title: Common mistakes in software development
wordpress_id: '247'
categories:
- .NET 2.0
- .NET 3.0
- .NET 3.5
- C#
---

***** Rant Alert *****

<rant>

At my current client I've got to do mainly maintenance on existing applications. This gives me the chance to look into codebases that have been created by other people and that don't really reflect how I would write things. That is all good though it gives me a chance to learn new ways of doing things and when I think their way is better I'll surely adopt.

Anyway when I'm browsing these codebases I do find a lot of things that could have been done better or more correctly and that's what I'll be writing about a little today.

The first one is returning bools:

I've found this in just about every project I've been in:

```csharp    
public bool IsNull(){
  if(obj == null)
    return true;
  else
    return false;
}
```

The snippet above is a very long winded way of writing. IMHO this hurts readability and you're saying the same thing twice. obj == null already returns a bool it makes no sense writing it again.

``` csharp    
public bool IsNull() { return obj == null; }
```

Another thing I keep seeing is very liberal use of try..catch blocks that catch all exceptions. Admittedly try..catch is cool but it should be used at times you are actually interested in the exception that is thrown. But it shouldn't be used as a safeguard to swallow exceptions you don't want to fix at this moment.  I keep seeing this code in projects:

``` csharp    
try{
    myBLObject.FindSomething(someId).SomeMethod();
}
catch(Exception){
    // Nothing to be done but error stops
}
```

Now that can be easily written so that it won't throw an exeption and then the try catch isn't necessary anymore at all. Try..catch blocks most certainly have their use but throwing and catching exceptions definitely hurts performance because the system has to generate a complete stack trace etc. for every exception that is being thrown.

``` csharp    
var result = myBLObject.FindSomething(someId);
if(result != null) result.SomeMethod();
```

The code becomes a lot more readable, not to mention faster. I've seen this being used in OnRowDataBound events etc on grids with 500+ rows, removing the try catch blocks more than doubles the speed of that page.

The next one on the list is using if,else and switch statements. They are sometimes a cause of code bloat. To put it in the words of [Scott Hanselman](http://www.hanselman.com/blog/BackToBasicsLifeAfterIfForAndSwitchLikeADataStructuresReminder.aspx):


> I think that using only _if_, _for _and _switch _is the Computer Programmer equivalent of using "like" in every sentence.


Scott does a great job explaining why they can be pretty evil so I'll just leave you with a [link](http://www.hanselman.com/blog/BackToBasicsLifeAfterIfForAndSwitchLikeADataStructuresReminder.aspx) to his post

I have another couple of posts in the making on this subject but I had to get this out of my system. These are also very quick wins the other things I'm going to talk about are application architecture and stored procs....
</rant>
