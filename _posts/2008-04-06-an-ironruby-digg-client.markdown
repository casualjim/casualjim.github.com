---
date: '2008-04-06 16:45:49'
layout: post
slug: an-ironruby-digg-client
status: publish
comments: true
title: An IronRuby Digg Client
wordpress_id: '214'
categories:
- IronRuby
tags:
- dynamic silverlight
- IronRuby
- silverlight
---

Scott Guthrie has a [series of tutorials](http://weblogs.asp.net/scottgu/archive/2008/02/22/first-look-at-silverlight-2.aspx) on how to consume the Digg API with Silverlight and C#. I wanted to know if I could convert that tutorial to IronRuby.

What I came up has the same end result but due to the fact that IronRuby and its Silverlight implementation isn't complete yet I can't mimic the structure of that tutorial yet. I couldn't yet figure out how to load external xaml files so I put all the xaml in one file.

I have one C# file that resides in the lib folder, this file is called DigStory.cs and contains a DiggStory class which represents a story on digg. It uses XLinq to parse the xml document and return a list of stories.

**[Download the complete code](http://flanders.co.nz/wp-content/uploads/2008/04/digg.zip)**

The code contained in that file:      

``` csharp    
public class DiggStory
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int NumDiggs { get; set; }
    public Uri HrefLink { get; set; }
    public string ThumbNail { get; set; }
    public string UserName { get; set; }

    public static IEnumerable<diggstory> ParseFeed(string feedContent)
    {
        var diggFeed = XDocument.Parse(feedContent);

        var result = from story in diggFeed.Descendants("story")
                     where story.Element("thumbnail") != null && !story.Element("thumbnail").Attribute("src").Value.EndsWith(".gif")
                     select new DiggStory
                     {
                         Id = (int)story.Attribute("id"),
                         Title = ((string)story.Element("title")).Trim(),
                         Description = ((string)story.Element("description")).Trim(),
                         ThumbNail = (string)story.Element("thumbnail").Attribute("src").Value,
                         HrefLink = new Uri((string)story.Attribute("link")),
                         NumDiggs = (int)story.Attribute("diggs"),
                         UserName = (string)story.Element("user").Attribute("name").Value,
                     };

        return result;
    }
}
```

I won't post the xaml file because it's a bit too long. I will however post the app.rb file and offer a little bit more explanation on that file.

``` ruby app.rb
require "System"
require "Silverlight"
require "System.ServiceModel.Web"

require "Contract"

include System
include System::Net
include System::Windows

class App < SilverlightApplication
  use_xaml

  def get_topic_url(topic)
	  "http://services.digg.com/stories/topic/#{topic}?count=20&appkey=http%3A%2F%2Fflanders.co.nz%2Fblog"
  end
  
  def initialize
	  
	  search_button.click do |sender, e|
		topic = search_textbox.text
		
		client = WebClient.new
		client.download_string_completed do |sender, args|
			return unless args.error.nil?

			stories = DiggStory.parse_feed(args.result);
			stories_list.selected_index = -1;
			stories_list.items_source = stories;
		end
		client.download_string_async Uri.new(get_topic_url(topic))
		
		
	  end
	  
	  stories_list.selection_changed do |sender, args|
		  story = stories_list.selected_item
		  
		  story_detail.data_context = story;
		  story_detail.visibility = Visibility.Visible
	  end
	  
	  close_button.click do |sender, args|
		story_detail.visibility = Visibility.Collapsed
	  
	  end
  end	
end

App.new
```

The above code contains all the code necessary for our application.

We first tell the application to use the app.xaml file. Next we define a method that builds us the request url for the digg api. I chose to use the xml format to stay as close as possible to the sample of Scott.

Like in the C# sample we're also downloading the file asynchronous. In the callback for when the request completes we parse the returned string into a list of stories and set that as the item source of our Listbox in the app.xaml file.

We handle the selection_changed event of the ListBox to display a detail view on a story with a link to the digg page.

More explanation on the xaml can be found on [Scotts blog](http://weblogs.asp.net/scottgu/archive/2008/02/22/first-look-at-silverlight-2.aspx).

Make sure you get the bits you need from the [dynamic silverlight website](http://dynamicsilverlight.net) needed for running dynamic silverlight applications.

Put the path to chiron.exe in your PATH variable and extract the contents of the downloaded sample. open a command prompt and go to the location where you extracted the files to. type chiron /b and click on index.html 

**[Download the complete code](http://flanders.co.nz/wp-content/uploads/2008/04/digg.zip)**

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f06%2fan-ironruby-digg-client%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f06%2fan-ironruby-digg-client%2f)

