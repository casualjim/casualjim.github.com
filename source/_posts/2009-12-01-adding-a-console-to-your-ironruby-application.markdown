---
date: '2009-12-01 11:00:44'
layout: post
slug: adding-a-console-to-your-ironruby-application
status: publish
comments: true
title: Adding a console to your IronRuby application
wordpress_id: '370'
categories:
- IronRuby
tags:
- IronRuby
---

When building an application it might be very handy to have a REPL console that knows about the libraries of your application, but you don’t necessarily want to start your application to interact with it. In Rails they have a script/console command. Here’s how you create one that knows about ironruby. The example I’m going to use is taken from an IronRubyMVC application.

 

I started out by creating a folder script.

 

Then I created a file called console (on a unix system I would chmod +x this file). I also like to have completion in my console so I’ve added the irb/completion library. Then I’ll require the routes.rb file so that the libraries of my application get loaded.

 
``` sh console script
#!/usr/bin/env ir
# File: script/console
irb = ENV['OS'] =~ /^Windows/iu ? 'CALL iirb.bat' : 'iirb'

libs =  " -r irb/completion"
# Perhaps use a console_lib to store any extra methods I may want available in the console
libs <<  " -r #{File.dirname(__FILE__) + '/../routes'}"
puts "Loading Poll chat"
exec "#{irb} #{libs} --simple-prompt"
```




The 3rd line has CALL iirb.bat as a command on a windows system. The CALL command is needed for the next step because we’re going to execute a batch file from another batch file on windows. Otherwise it wouldn’t work for me. CALL is very similar to exec in ruby and gives control to another executable until its task is done.





For windows to be able to use script/console (script\console) instead of ir script/console you also need to create a batch file called console.bat in the script folder. 




``` bat console script
@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"ir.exe" "script/console" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"ir.exe" "%~dpn0" %*
```




This is all there is to it to get rails like scripting abilities.





IronRuby has another really cool feature built into IronRuby is the ability to provide REPL’s for your application at run-time. All you need to do is use Repl.new and give it an output and input stream.
