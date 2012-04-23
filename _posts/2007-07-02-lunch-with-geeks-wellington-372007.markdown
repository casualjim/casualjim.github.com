---
date: '2007-07-02 16:19:46'
layout: post
slug: lunch-with-geeks-wellington-372007
status: publish
title: Lunch with geeks - Wellington - 3/7/2007
wordpress_id: '7'
categories:
- Lunch with geeks
---


		

Another week, another lunch.


		

This lunch had the biggest attendance yet.  I won't be putting up all the names because I can't remember them all :-$. We had about 20 people showing up, most of them were new faces. It was very good to see that Tim Haines could make it as well as Owen Evans. Another new addition was John Rusk and a couple of people from the TradeMe development team.


		

With lots of people it becomes a lot more difficult to follow all the conversations at once. I'll do my best to write up the minutes, if I miss something please let me know so I can add it.


		


				_My start question for today was: How do people do integration testing?_
		


		

The question is a bit on the broad side I admit but [Owen Evans](http://www.bgeek.net) stepped up and gave us a rundown of how they do it. The first thing I got from his explanation is that there is a right way to write tests and a wrong way to write them. Because unit tests shouldn't do integration testing etc.  
He explained that in the beginning they had a build process that would take about 2 hours to complete and after refactoring their app to use the right way of testing it only takes them a couple of minutes.  Owen uses Fit and Fitnesse for doing the integration testing.  He also explained that integration tests are not tests you would want to run on every build but preferrably during the nightly build so you have something to look forward to when you start your programming day :)  Owen said a lot more but I can't remember all of it -sorry Owen-  
The guys at TradeMe have a manual testing process as do we (Xero).   
I think JD was the first to mention watir for automated integration testing, which I second. I think [watir](http://wtr.rubyforge.org/) or [watin](http://watin.sourceforge.net/) are beautiful tools as is [Selenium](http://www.openqa.org/selenium/).  
For more info on which one fits your project best: [http://adamesterline.com/2007/04/23/watin-watir-and-selenium-reviewed/](http://adamesterline.com/2007/04/23/watin-watir-and-selenium-reviewed/)


		

Somehow we got on the subject of source control and the different source control systems were using. My personal preference is [subversion](http://subversion.tigris.org/) closely followed by [Team Foundation Server](http://msdn2.microsoft.com/en-us/teamsystem/aa718825.aspx).  Most people in our group liked subversion the best some of the reasons for it are the fact that it is not bound to a visual studio solution, the cost of subversion is also a major factor and the fact that it is not related to any specific technology and the fact that subversion can be easily integrated with other systems.


		

JD then asked who did use unit testing and it turns out that about 6 people actually did use unit testing. One of the reasons mentioned for people not using it was that tests take too much maintenance as your code evolves.  The response to that objection was that in that case you're probably writing your tests wrong.  The benefits in my opinion were that you write code that is a lot more beautifull and you get a nice, warm fuzzy feeling inside called confidence in your code.


		

Next John Rusk took the floor bringing us back to the original question and he introduced us to a new term: [exploratory testing](http://en.wikipedia.org/wiki/Exploratory_test). Which is a way of trying to bring structure to an unstructured process (manual testing). It wasn't very clear to me where the distinction lies with manual testing except for the fact that the user that does the actual testing does need to have some knowledge of the application domain.


		


				[JB](http://www.mindscape.co.nz) said that another good way to understand what your application is going to withstand is to take a couple of uneducated users (they don't know anything about the application) and put them in front of a terminal and watch what they are doing. This gives you some very valuable insights for usabilty as well as finding some bugs.


		


				_My second question was: What differentiates an average developer from a great developer ?_
		


		

This question didn't get the same attention as the first one because the answers to this one were almost unanimously: **Passion**  
The willingness to make mistakes, the drive to look for answers yourself, an inquisitve mind.


		

I personally don't think of software development as being a science for me it's more an art form which might be a good topic for next week.



