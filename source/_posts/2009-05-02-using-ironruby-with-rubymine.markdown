---
date: '2009-05-02 14:50:37'
layout: post
slug: using-ironruby-with-rubymine
status: publish
title: Using IronRuby with RubyMine
wordpress_id: '325'
comments: true
categories:
- IronRuby
tags:
- IronRuby
- RubyMine
---

[RubyMine](http://www.jetbrains.com/ruby/) was released earlier this week. I’ve used rubymine in the past and was very impressed with the IDE, so much that I’m silently hoping the guys from [Jetbrains](http://www.jetbrains.com/) would do a C# IDE too. I’d probably buy that one as well, but for now I’ll settle for [Resharper](http://www.jetbrains.com/resharper) with Visual studio.

By default Rubymine won’t accept [IronRuby](http://ironruby.net) as a ruby SDK, but I asked for help in the twitterverse and got it ([http://twitter.com/iRomeo/statuses/1677867948](http://twitter.com/iRomeo/statuses/1677867948)).

[![settings_rubymine](http://flanders.co.nz/wp-content/uploads/2009/05/settings-rubymine-thumb.jpg)](http://flanders.co.nz/wp-content/uploads/2009/05/settings-rubymine.jpg)

Just symlinking didn’t really work because the ruby.exe listens to --version for getting its version number.  IronRuby on the other hand listens to –v to get its version number.  The solution to that is to create a batch file that will translate the --version  modifier to –v.

So instead of symlinking the ir.exe to a name that starts with ruby I created a batch file called ruby_iron.cmd with the following content.

    
    @echo off
    set IR_CMD="%~dp0ir.exe"
    if "%1"=="--version" ( GOTO RUBY_VERSION )
    GOTO RUBY
    :RUBY_VERSION
    %IR_CMD% -v
    goto QUIT
    :RUBY
    %IR_CMD%
    :QUIT


With that ruby_iron.cmd file in place you can just add IronRuby as an SDK in RubyMine.

Enjoy :)
