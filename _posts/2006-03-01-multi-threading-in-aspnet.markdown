---
date: '2006-03-01 21:30:15'
layout: post
slug: multi-threading-in-aspnet
status: publish
title: Multi-Threading in asp.net
wordpress_id: '134'
categories:
- C#
---

I got a question asked just recently about multi threading and async execution of a page.




About async execution I am a little bit biased because for asp.net I don't really see a huge benefit most of the time and I really believe it should be used very wisely. 




Spawning threads on the other hand is more convient for lengthy operations that are not essential to the execution of the page.  I will just copy paste the mail I've sent to the other guy. It came with a question on what about cleaning of the objects afterwards




If you use it async [asp.net](http://asp.net/) should take care of the cleaning.




I haven't used the async scenario yet because I jump to separate threads more quickly that way my page isn't blocked ever and I can update the interface through a timed ajax call to a webservice.




I use the multi threading to send mass emails with progress bar etc.




Once you've done it you will see that it is pretty easy to implement and has IMHO more advantages than simply executing a page async because you don't have to wait for the execution to end.




 




You start by making a worker class with a parameterised constructor that implements at least the following interface




 













    4     interface IAggregatorWorker




    5     {




    6         void ExecuteTask();




    7         bool KeepRunning { get; set; }




    8     }







 




The execute task method is the method where you do your work as long as KeepRunning is set to true.  I believe that sessionstate is unavailable in a spawned thread so you will have to find a way to persist your session objects differently if you are needing them at all. 




If you want to add properties for the worker thread to work with you that is no problem it behaves as a normal class as far as i can tell




 




In your page you start a thread by instantiating your workerclass and setting the properties




 










   45         BLL.MailThreadWorker mtc = new BLL.MailThreadWorker();




   46         mtc.Body = tbBody.Text;




   47         mtc.Subject = tbSubject.Text;




   48         Guid id = Guid.NewGuid();




   49         mtc.BaseUrl = Request.Url.DnsSafeHost;




   50         mtc.SessionId = id;




   51         System.Threading.Thread thread = new System.Threading.Thread( new System.Threading.ThreadStart(mtc.MailingStart));




   52         thread.Name = "MailingThread" ;




   53         thread.Start();




 




You can stop or suspend the thread at any time and then you can dispose of your objects that are still hanging around. By setting the property of KeepRunning property of the worker instance to false.




and there you should do your clean-up.  The code from the mailingthread is taken from the code beside (i believe is the new word for the file) of my aspx page.




 




This is a link to an article on msdn that explains it probably a lot cleaner than I ever can. Other good examples to look at what you can do with threading is to look after articles about windows services there are a few that explain the concept really clearly 




 




[http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dv_vstechart/html/vbtchUsingThreads.asp ](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dv_vstechart/html/vbtchUsingThreads.asp)  

