---
date: '2008-04-23 06:36:15'
layout: post
slug: taking-ninject-to-new-places
status: publish
title: Taking Ninject to new places
wordpress_id: '222'
comments: true
categories:
- Ninject
---

When I started looking at [Ninject](http://ninject.org) I was pretty impressed by how nice the code looks and how well the project has been put together.  [Nate](http://kohari.org) had been profiling the project yesterday and it performs slightly better than its cousin from the [Castle framework](http://castleproject.org) but that difference is almost negligible.
However I recommend you download the Ninject framework and just look at its codebase because it may teach you some new tricks or give you some new insights. The rest of this post will explain a small MVP framework for Ninject and WPF that I added to [Ninject contrib](http://code.google.com/p/ninject-contrib/) last weekend.

When I downloaded the Ninject code for the first time I immediately saw that it had integration points for [Monorail](http://castleproject.org), [ASP.NET](http://asp.net) and Winforms but sadly I was looking at it for a WPF application. For doing the type of MVP I wanted to do with WPF I couldn't straight copy what was there for Winforms and neither what was there for Webforms. It looked like it walked some middle ground. So I looked very closely at what Nate had done before me and learned.

Apart from the occasional IronRuby demo I had never used WPF with the intent of building a moderately sized system on top of it. I did have a couple of design guidelines that helped me through my voyage but most of my what I applied comes from Jeremy Miller's blog in his excellent build your own CAB series. I looked at 1 post in particular the [third one](http://codebetter.com/blogs/jeremy.miller/archive/2007/05/25/build-you-own-cab-part-3-the-supervising-controller-pattern.aspx) about the Supervising controller. 

I figured out that I didn't want to make my view now anything or as little as possible about my presenter or at least as little as possible. The way I have it now allows one view per presenter; they are mapped one-to-one. In the repository of the contrib project there is the framework and a little sample application. A log viewer that uses the framework to demonstrate its usage.
I was going to tell you about Modules etc. but all that stuff is nicely explained in the ninject wiki so I don't really feel the need to write it all up again. I will however explain you how to get started with the MVP framework that now comes with Ninject.

We need to tell our application that we want to use Ninject and to do that there are 2 ways:  

  * Inherit of ``Ninject.Framework.PresentationFoundation.NinjectWpfApplication`` which also makes you change the XAML of the application. I didn't really like that so I came up with a second way.
  * Initialize the application through the KernelContainer static helper class.


``` csharp
[LogMyCalls]
public partial class App 
{

    protected override void OnStartup(StartupEventArgs e)
    {
        // KernelContainer.InitializeApplicationWith(this, new LinFuModule(), new NLogModule(), new WpfModule(), new LoggingModule());
        this.InitializeApplicationWith(new LinFuModule(), new NLogModule(), new WpfModule(), new LoggingModule());
        base.OnStartup(e);
    }

}
```

This tells our application that we are going to use Ninject in this application. And should initialize all the services we will need in our application.
Next on the list is the View. There is probably a better way to do this (read I'm not entirely happy with this but have a rather small brain). We need to tell the view which presenter we will be using, for that I added a PresentedBy attribute that takes a type (the presenter type).  And you also have to override the OnInitialized event and again use the KernelContainer helper class to initialize the presenter. There is a reason for this, at a certain point during my testing I had it so that the view was agnostic of the controller but that meant I would have to skip a couple of checks before running the window. I may add that later again not sure.  The views aren't decorated with the service attribute so they won't get picked up by the AutoModule instead we inject it manually through its initialisation procedure.


``` csharp
[PresentedBy(typeof(LogsPresenter))]
public partial class LogsView :  ILogsView
{

    public LogsView()
    {
        InitializeComponent();
    }

    protected override void OnInitialized(EventArgs e)
    {
        base.OnInitialized(e);
        
        this.WireUp(); // KernelContainer.WireUp(this);
    }

    [PublishAction]
    public event EventHandler GenerateLogs;

    [PublishAction]
    public event EventHandler FilterLogs;
}
```



So far we've got a view that knows how to initialize a presenter but it also needs to be able to communicate with the presenter. I chose to expose the relevant items I will need in my presenter through properties on the view and I chose to use a Publish/Subscribe model through a customized Ninject MessageBroker to handle my events. This allowed me to not couple my view too tightly to the presenter. You can customize the name of the published action but not the publisher at this moment. And that's what the PublishAction is for.  It uses a standard event handler but will ignore the arguments that you would send to it. The presenter should go back to the view to interrogate it about its state.

And the last piece we need to talk about is the Presenter. The Ninject presentation foundation project holds a Generic PresenterBase class that takes the interface/type of the view as a type parameter. I let Ninject auto-register my components so I just decorated the presenter class with [Service] and it will get picked up by the Ninject Kernel. You can subscribe to an action from the view by using a [SubscribeToAction] attribute. That attribute takes the class name of the view as a parameter as well as the name of the action you want to subscribe to. 


    
``` csharp    
[Service, LogMyCalls]
public class LogsPresenter : PresenterBase<ILogsView>
{
    private readonly ILogService _logService;
    private readonly IRandomDataService _randomDataService;

    [Inject]
    public LogsPresenter(ILogService logService, IRandomDataService randomDataService)
    {
        _logService = logService;
        _randomDataService = randomDataService;
    }

    [SubscribeToAction(typeof(LogsView), "GenerateLogs")]
    public virtual void GenerateLogs()
    {
        _randomDataService.AddRandomData(5);
        SetFindAll();   
    }
}
```

And that should be all you need to know to get started. It's not a hell of a lot of code in the presentation framework and the sample application contains NSpecify specs in combination with Moq for mocking.
