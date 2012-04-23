---
date: '2008-08-07 15:23:43'
layout: post
slug: ironnails-introduction
status: publish
comments: true
title: 'IronNails : Rails like development for IronRuby with WPF/Silverlight'
wordpress_id: '240'
categories:
- .NET 3.0
- .NET 3.5
- C#
- ironnails
- IronRuby
- Ruby
- silverlight
- WPF
tags:
- dlr
- ironnails
- IronRuby
- silverlight
- WPF
---

For my book IronRuby I'm working on chapter 4. That chapter is about doing WPF development with IronRuby. I started out with a straight port of [Witty](http://code.google.com/p/wittytwitter) to IronRuby. As I was doing that the cogs started turning and I came up with a way to bring the rails style of development to WPF. I decided to investigate that route a little bit further and now I have a small framework that enables you to write WPF applications with the MVC paradigm. I decided to open that code up as open source and host it on github.

 

At first I used the name Sails for my framework but it turns out there is java clone of rails that is called opensails. So to avoid confusion David M. Peterson proposed the name IronNails.

 

>   
> 
> On Sat, 02 Aug 2008 08:00:44 -0600, Charles Oliver Nutter wrote: 
> 
>    
> 
> FYI, there's already a framework named "Sails" for Java:        
[http://www.opensails.org/](http://www.opensails.org/)
> 
>    
> 
> For the sake of sticking to the "Iron" theme, why not replace the 'S' with an 'N' and go with IronNails. ;-) Maybed it's just me, but if given the choice, I'd much rather nail it than sail it any day of the week. :D 
> 
>    
> 
> --        
/M:D 
> 
>    
> 
> M. David Peterson

 

You can find the project here: [http://github.com/casualjim/ironnails](http://github.com/casualjim/ironnails)

 

At this moment it's definitely not finished at all, but it does work. The remainder of the week I'll move my previous demo code onto this framework, update the code samples in my chapter and finish the content. I hope I will have all of this done by the end of next week.

 

Back to the IronNails project:

 

Because DLR objects cannot be used to bind to in WPF you have to define a skeleton of the ViewModel in C#, but this will change in the future. When that changes I'll look at extending the framework to make use of some other WPF patterns like defining a DependencyObject and Behaviors. Once those are defined you get a very clean separation between design and behavior.

 

This is abstracted away from you but in the background the framework works with the View - ViewModel - Model - Controller pattern although I've tried to keep your exposure to the view model to a minimum. The framework follows naming conventions per language. So in C# and XAML you camel case stuff and in IronRuby you underscore stuff.

 

The very core of the framework is defined in C# but most of the code is IronRuby, depending on how hard it will be after the DLR RTM's I may look at adding support for all the DLR languages.

 

>   
> 
> IronNails        
========= 
> 
>    
> 
> IronNails is a framework inspired by the Rails and rucola frameworks. It offers a rails-like way of developing        
applications with IronRuby and Windows Presentation Foundation (WPF).         
This framework uses the pattern Model - ViewModel - View - Controller (M-VM-V-C). It should be able to run on both WPF         
and Silverlight.         
The idea is that the views can be created using a design tool like Blend for example and just save that xaml as is. The         
designer should not need to use anything else than drag and drop to create a GUI design. The behaviors are then added to         
the view by using predefined behaviors in the framework or by defining your own behavior.         
The framework then generates a proxy for the view which will be used to transparently wire up the commands in the         
behaviors to controller actions. 

 

You are now able to write the following code for a controller: 

 
``` ruby    
class MyController < IronNails::Controller::Base
  
  view_action :show_message, :triggers => :my_button do
    MessageBox.show "This is the great message from a block"
  end
  
  view_action :change_color, :triggers => { :element => :my_text_block, :event => :mouse_enter }
  view_action :reset_color, :triggers => { :element => :my_text_block, :event => :mouse_leave } do |view|
    view.my_text_block.foreground = :black.to_brush
  end
  
  view_object :people, Person.find_all
    
  def change_color(view)
    view.my_text_block.foreground = :red.to_brush
  end
  
  
end
```

At this moment the project has 0 unit tests, it has below minimal documentation and it still needs a work like defining the behaviors. I have to move on with my book but intend to continue developing this framework after my book is finished and IronRuby RTM's. There are some more workarounds in the project that will all disappear as IronRuby progresses.

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2008%2f08%2f07%2fironnails-introduction%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2008%2f08%2f07%2fironnails-introduction%2f)

Technorati Tags: [IronRuby](http://technorati.com/tags/IronRuby),[IronRubyInAction](http://technorati.com/tags/IronRubyInAction),[IronNails](http://technorati.com/tags/IronNails),[WPF](http://technorati.com/tags/WPF)
