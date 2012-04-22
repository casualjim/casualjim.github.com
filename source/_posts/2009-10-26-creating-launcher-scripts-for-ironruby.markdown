---
date: '2009-10-26 14:16:48'
layout: post
slug: creating-launcher-scripts-for-ironruby
status: publish
comments: true
title: Creating launcher scripts for IronRuby
wordpress_id: '361'
categories:
- IronRuby
tags:
- IronRuby
---

It’s been a while since I blogged, I’ve been terribly busy going through some changes and prepping the book.

 

Anyway lately a lot of blog posts have been written on how to ironruby with cucumber to test your .NET code. While I think it’s great people are using ironruby and cucumber, the guide you can find on aslak’s github wiki isn’t the most ideal solution as it will only work for windows and it requires MRI to be installed on your system. So I thought I’d write up how I’ve been creating launchers that work both on windows .NET and mono systems.

 

Another problem the approach of setting the GEM_PATH to the MRI gem location is that if your gem requires a C-extension (which could easily be a C# extension in IronRuby) ruby will get confused about which one it’s going to need.

 

I’m going to use cucumber as an example but this counts for most ruby libraries. I’ve been using this for a few months already so it really doesn’t matter which version of IronRuby you’ve got installed. I’ve compiled a fresh version from github and deployed that to C:\ironruby on windows and added C:\ironruby\bin to my PATH environment variable. I installed my ironruby version on my *nix boxes in /usr/local/ironruby and added /usr/local/ironruby/bin, /usr/local/ironruby/silverlight/bin and /usr/local/ironruby/silverlight/scripts to my PATH environment variable.

 

##### 1. install the gem: igem install rspec cucumber --no-rdoc --no-ri

 

this will install the rspec and cucumber gems with their dependencies. And the gems process will actually install the launcher scripts in C:\ironruby\lib\ironruby\gems\1.8\bin and we’re going to use those scripts to create our launcher script

 

##### 2. Get the launcher scripts into the bin dir

 

On windows you can now go:

 
    
    copy C:\ironruby\lib\ironruby\gems\1.8\bin\cucumber C:\ironruby\bin\icucumber
    copy C:\ironruby\lib\ironruby\gems\1.8\bin\cucumber.bat C:\ironruby\bin\icucumber.bat





NTFS supports symlinks so you could also use the junction tool from the sysinternals toolkit to create those instead of copying the files. [http://technet.microsoft.com/en-us/sysinternals/bb896768.aspx](http://technet.microsoft.com/en-us/sysinternals/bb896768.aspx)





On *nix based systems there is one more step to go through.




    
    cp /usr/local/ironruby/lib/IronRuby/gems/1.8/bin/cucumber /usr/local/ironruby/bin/icucumber
    chmod +x /usr/local/ironruby/bin/icucumber





And this is the easier way to properly use installed gems from the ironruby distribution, it will also make it a lot easier to upgrade your gems in 2 different ruby installations at different times etc.
