---
date: '2009-04-08 19:07:22'
layout: post
slug: binder-for-ironruby-mvc
status: publish
comments: true
title: Binder for ironruby mvc
wordpress_id: '322'
categories:
- ASP.NET MVC
- IronRuby
tags:
- IronRuby
- IronRuby MVC
---

I’ve progressed far enough with [IronRuby](http://ironruby.net) MVC to start thinking about a sample and I’ve decided to write 2 separate samples both on the same technologies. As an OR/M I will be using [LightSpeed](http://www.mindscape.co.nz/products/LightSpeed/default.aspx) from Mindscape, just because it’s an awesome piece of technology.

 

 

At this moment I’m looking at creating a binder for objects that takes a hash as input. The default model binder of ASP.NET MVC doesn’t quite fit all that well with the ironruby implementation so I’m creating a ruby binder implementation. This stuff is just something that makes ruby shine.

 

While doing so I came up with this little tidbit of code:

 
    
    class System::Object
    
      class << self
          
        def create_from_hash(options)
          result = self.new
          result.populate_from_hash options
          result
        end
        
      end
      
      def populate_from_hash(options)
        options.each do |k, v|
          mn = "#{k}=".to_sym
          self.send(mn, v) if self.respond_to?(mn)
        end
      end
    end





This code allows you to populate any .NET object from a hash.





So doing Person.create_from_hash(:username => “joe”) would create a user instance with the property username set to joe.





You do need to provide a hash where the values have the correct type. 





Technorati Tags: [IronRuby MVC](http://technorati.com/tags/IronRuby+MVC),[IronRuby](http://technorati.com/tags/IronRuby)
