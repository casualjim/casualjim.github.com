---
date: '2008-08-19 07:50:14'
layout: post
comments: true
slug: ironnails-some-progress
status: publish
title: 'IronNails: Some progress'
wordpress_id: '244'
categories:
- ironnails
- IronRuby
- Ruby
- silverlight
- WPF
---

I thought it might be a good idea to update you guys on how IronNails is progressing. I think I've got it so that you aren't exposed to writing many of the boring boilerplate code that comes with taking this approach (M - V - VM- C). Also to execute an action on a controller asynchronously you can by just adding :mode => :asynchronous to your view_action declaration.

A lot is still left to do but this proves that it is possible to use IronRuby today to do some pretty cool stuff. From the top of my head here are some things that still need to be done:
  
  * The ability to load xaml from an assembly like the one that is generated when you use Blend for your design. 
   
  * More predefined behaviors 
   
  * Templated generators 
   
  * Silverlight support 
 

But the core of the framework is working. Now it's a matter of extending the functionality. Some of the features the framework does support
  
  * Binding to controller actions through commands 
   
  * Binding to controller actions through event handlers on the view proxy 
   
  * Asynchronous execution of actions 
   
  * Timed execution of actions 
   
  * Binding to models 
 

I will be developing my sample for my chapter against this framework and will add the pieces I'm missing as I get on.

 

Some of the things I foresee that might need to be added are:
  
  * support for controlling the application from an IronRuby console so that you can interact with the interface as it is running. 
   
  * support for a console to interact with the code of the application. 
   
  * support for plugins 
 

So after all these lists how would an application look like when you are developing it? 

The controller:

``` ruby demo_controller.rb    
class DemoController < IronNails::Controller::Base
  view_object :status_bar_message, "The status bar message"
  
  view_action :change_message
  
  def change_message
    @status_bar_message = "#@status_bar_message appended"
  end
end
```

The ViewModel:

``` csharp DemoViewModel.cs
public class DemoViewModel : IronNails.View.ViewModel { }
```

The View:

``` xml    
<Window 
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:behaviors="clr-namespace:IronNails.Library.Behaviors;assembly=IronNails.Library"
    Title="Window1" Height="300" Width="300">
    <StackPanel>
        <TextBlock Text="{Binding Objects[StatusBarMessage].Value}" ></TextBlock>
        <Button Content="Click me" behaviors:ClickBehavior.LeftClick="{Binding Commands[ChangeMessage]}" />
    </StackPanel>
</Window>
```

There are currently 2 dictionaries available to the view. One that contains the models (Objects) and one that contains the commands (Commands). The value of an entry in the Objects needs to be observable by implementing INotifyPropertyChanged and that is what's responsible for the binding syntax Objects[ModelName].Value 

At this moment there are only a couple of behaviors implemented: LeftClick, RightClick, DoubleClick and Hover.

The framework expects that you follow the basic naming conventions of the technology you're programming in. So in ruby you underscore names but in C# and xaml you camelcase them. 

By defining an object with view_object :object_name, default value you define it with a default value that you can change afterwards in the controller actions. By defining an action with view_action :action_name, :mode => :asynchronous you tell that framework that you want to link a method or a block as a controller action and execute it asynchronously.
