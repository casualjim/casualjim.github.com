---
date: '2009-03-15 01:32:30'
layout: post
slug: ninject-knows-a-new-trick
status: publish
comments: true
title: Ninject knows a new trick
wordpress_id: '311'
categories:
- C#
- IronRuby
- Ninject
tags:
- dlr
- IronRuby
- Ninject
---

Earlier this week Nate [already said](http://kohari.org/2009/03/13/ninject-github-crazy-delicious/) that I was doing some work on [Ninject](http://ninject.org), now I have it working :). Everything I’m about to talk about is currently in the master tree of the [ninject github](http://github.com/enkari/ninject) repository. Getting [IronRuby](http://ironruby.net) to play nice with [Ninject](http://ninject.org) was surprisingly easy :).

There was only one place that required some kind of weird workaround and from that workaround I’m entirely sure that it will go away by the time .NET 4.0 will be here. The DLR duplicates a number of delegates from .NET 4.0 but .NET 3.5 also defines them (i.e. System.Func<T, TT>) and then you get great exception messages like: System.Func is not of type System.Func. The solution is to not reference System.Core in your project. Except that Ninject expects the System.Core variant at some point and that was solved by aliasing the System.Core assembly and talking to the types in that assembly by their alias.

Anyway the juicy stuff :) How can you take advantage of Ninjects newly found friendship with [IronRuby](http://ironruby.net). 

[Ninject](http://ninject.org) now has 2 flavors of Kernels. We have a StandardKernel that knows how to deal with the module configuration system that uses a fluent interface defined in C#. And now we also have a DlrKernel that extends the StandardKernel with a RubyModuleLoader plugin. If you tell the DlrKernel to look inside a path for configuration files it will scan those folders for *.dll or *.rb files. Those files should contain the configuration for the ninject bindings.

 

So to create a Kernel that is ruby enabled you would use the following code:

 
``` csharp    
IKernel kernel = DlrKernel();
kernel.AutoLoadModulesRecursively();

var samurai = kernel.Get<IWarrior>();
System.Console.WriteLine(samurai.Weapon.Name);
```

The above snippet could then for example load a configuration file that has been defined like this:

``` ruby    
require File.dirname(__FILE__) + '/../Ninject.Tests.dll'
include Ninject::Tests::Fakes

to_configure_ninject do |ninject|
  ninject.bind IWeapon, :to => Sword
  ninject.bind IWarrior, :to => Samurai
end
```

The configuration above shows how most of a typical configuration would be defined by you the full configuration API at your disposal. All the options for the configuration can be specified in 2 ways. The first way is in a hash like syntax and the second way uses a more fluent syntax.

``` ruby
to_configure_ninject do |ninject|
    
  ninject.bind IServiceA, :to => ServiceA, :as => :singleton,
                          :meta => { :type => "superservice" },
                          :name => "aaaaa",
                          :with => { 
                            :parameter => { :my_param => lambda { |context| "param_value" } },
                            :constructor_arguments => {:const_arg => 56 },
                            :property_values => {:property_name => 94 },
                          },
                          :on_activation => lambda { |obj| obj.do_some_work },
                          :on_deativated => lambda { |obj| obj.do_some_cleanup },
                          :when => lambda { |context| "a value" } # or
                          # :when => { :injected_into => ServiceB } or
                          # :when => { :target_has => AnAttribute } or
                          # :when => { :member_has => AnAttribute } or
                          # :when => { :class_has => AnAttribute }
  end 
```

Or 

``` ruby
to_configure_ninject do |ninject|
    
  ninject.bind IServiceA, :to => ServiceA, :as => :singleton do
    meta :type => "superservice" 
    name "aaaaa"    
  
    with :parameter => { :my_param => lambda { |context| "param_value" } }    
    with :constructor_arguments => { :const_arg => 56 }    
    with :property_values => { property_name => 94 }    
    
    on_activation do |obj| 
      obj.do_some_work 
    end    
    
    on_deativation { |obj| obj.do_some_cleanup }

    condition do |context|     
      true
    end 

    # or
        
    condition :injected_into => SomeClass 

    # or ...
    
  end
    
end 
```

Some of the nicer consequences of using Ruby as a configuration language is the syntax for open generics. The example below shows how to configure types with open generics.

``` ruby    
require File.dirname(__FILE__) + '/../Ninject.Tests.dll'
include Ninject::Tests::Fakes
include Ninject::Tests::Integration::StandardKernelTests

# IGeneric is a generic interface and GenericService is a generic type
# we don't have to specify any special notation for open generics

to_configure_ninject do |ninject|
  ninject.bind IGeneric, :to => GenericService, :as => :transient 
  ninject.bind IGeneric, :to => GenericService2
end
```

To specify a condition the syntax would look like this
 
``` ruby   
require File.dirname(__FILE__) + '/../Ninject.Tests.dll'
include Ninject::Tests::Fakes

to_configure_ninject do |ninject|
  ninject.bind IWeapon, :to => Shuriken do
    condition do |request|        
        request.target.nil? 
             ? false 
             : request.target.member.reflected_type == Samurai.to_clr_type
      end 
  end
  ninject.bind IWeapon, :to => Sword
  ninject.bind IWarrior, :to => Samurai
end
```

Well that’s all. I hope you like it. I will be looking into more ways to integrate DLR stuff into [Ninject](http://ninject.org) the most obvious is allowing you to inject dynamic types into static classes.

