---
date: '2008-05-13 19:27:27'
layout: post
slug: using-the-mini-spec-framework-that-comes-with-ironruby
status: publish
title: Using the mini spec framework that comes with IronRuby
wordpress_id: '223'
comments: true
categories:
- IronRuby
---

I've set out to build my first "real" application (still playground material) with IronRuby today and for me no application can be built without having the unit tests or specs to give me that warm fuzzy feeling that things should work. That being said the first thing on my list of things to do is figure out how to use the minispec framework that IronRuby currently uses to write my specs.

Since my application will be doing a fair bit of http requests I want to be able to mock that out so I don't have to rely on the webservers to be up and running or being online to run the specs.

The first thing I did was copy a couple of files from the **tests\IronRuby\Specs **directory in the directory where you downloaded the IronRuby source code into `C:\tools\IronRuby` in my case. I copied those files in a specs subdirectory of my application directory. The files we're going to need are:

  * mini_mock.rb 
   
  * mini_rspec.rb 
   
  * mspec_helper.rb 
   
  * rspec_helper.rb 
   
  * simple_mock.rb 
   
  * spec_helper.rb 
   
  * spec_runner.rb 
 

The next thing on my to-do list is then to change some of the files so that we can run our own specs on our terms. 

The first changes I made are in spec_helper.rb. I replace require 'mini_mock' on line 18 with `require File.dirname(__FILE__) + '/mini_mock'` 

The next bit is in the spec_runner.rb file. I just removed the word _core/_ in that file because our specs will just live in a directory structure under the specs folder.

Now to create the first spec and mock with that spec framework: 

I created a folder models in my specs folder. In that folder I created a file `spec_test_spec.rb` with the following content

 
``` ruby    
require File.dirname(__FILE__) + "/../spec_helper.rb"

describe "Specs" do

  it "should work" do
    # puts "Yay!!! It works"
  end
  
  it "should mock methods" do
    mock = Object.new
    mock.should_receive :mocked_method, :returning => "Yay!!! I'm mocking"
    result = mock.mocked_method
    result.should == "Yay!!! I'm mocking"
    # puts result
    Mock.verify
  end

end
```

This just has a test method to see if it will run the rspec syntax and the second is where I tested to see if I could mock methods on objects. In the future we'll be able to use mocha and rspec for example and then we'll have a nicer syntax for mocking stuff. But this will do for now.

Then I opened up a command console and navigated to the folder that contains my application

    + C:\projects\lumpr\src\Sylvester.DesktopEdition\Sylvester.IronRuby\specs
        
    » **ir spec_runner.rb models - pass**
        
    Specs should work
    Specs should mock methods
    Total pass: 2 out of 2 examples

I may post an example later this week with some real tests but this shows you how to get going with the mini spec framework to test your .NET stuff today.
