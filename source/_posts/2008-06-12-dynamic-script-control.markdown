---
date: '2008-06-12 18:13:42'
layout: post
slug: dynamic-script-control
status: publish
comments: true
title: Dynamic Script Control
wordpress_id: '233'
categories:
- C#
- IronRuby
- silverlight
---

Both Silverlight and WPF use XAML markup to describe their user interface. As I'm currently writing my chapter on WPF for my book IronRuby In Action and I want to use some xaml that has been generated before for a different project but with an IronRuby class to load the xaml I'm in trouble. This is because you can declare assembly references in the xml namespace declarations so you can use the types in that assembly from xaml.

 

The DLR based languages don't compile into static assemblies and this means that you can't use those xml namespace definitons to reference your assemblies. I wrote a fairly trivial control that acts like a hook for DLR based controls in the XAML tree.

 

You can check it out at codeplex.      
[http://codeplex.com/dynamicscriptcontrol](http://codeplex.com/dynamicscriptcontrol)

 

The idea behind this control is that you can "hook" your DLR based control into the visual tree by setting some properties. You can set properties on the DLR based control by setting the Attributes property on the DynamicScriptControl

 

Let's look at a quick example:

 

1. The ruby file defining a custom TextBox. But you can do whatever you want in that ruby file of course.

 

[![dynamic_script_control_rubyscript](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-rubyscript-thumb.png)](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-rubyscript.png)

 

All this textbox does is preset it's text property to "I'm prefilled"

 

2. The xaml for the window

 

[![dynamic_script_control_window_xaml](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-window-xaml-thumb.png)](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-window-xaml.png)

 

You first declare a namespace for the assembly that has the DynamicScriptControl. Next I have a StackPanel that contains 2 DynamicScriptControls. The first just contains the 2 mandatory properties. We need to know which class you want to instantiate in the file you provide by setting the ScriptFile property. This script file property is a path to your ruby file in my case prefilled_text_box.rb.      
The second DynamicScriptControl is one where I want to initialize the control with my own text property. To declare those properties you have to add them to the Attributes collection of the DynamicScriptControl. At this moment it's not smart enough to know which datatype you give it so you can specify a format string which was necessary in this case because text is a string.

 

3. The result

 

[![dynamic_script_control_window](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-window-thumb.png)](http://flanders.co.nz/wp-content/uploads/2008/06/dynamic-script-control-window.png)

 

Michael Foord the author of IronPython In Action will provide the python integration in this control. 

 

There was a release of the Dynamic Silverlight SDK earlier this week which contained the necessary source code files to compile a common DLR for both IronRuby and IronPython. That is what makes it possible to support multiple scripting languages from the start.

 

I've hosted the source code on google and you can find that at:

 

[http://code.google.com/p/dynamic-script-control](http://code.google.com/p/dynamic-script-control)

 

Technorati Tags: [ironruby](http://technorati.com/tags/ironruby),[WPF](http://technorati.com/tags/WPF),[DLR](http://technorati.com/tags/DLR),[ironpython](http://technorati.com/tags/ironpython),[Silverlight](http://technorati.com/tags/Silverlight)
