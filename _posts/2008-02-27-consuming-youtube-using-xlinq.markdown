---
date: '2008-02-27 02:28:51'
layout: post
slug: consuming-youtube-using-xlinq
status: publish
comments: true
title: Consuming YouTube using XLinq
wordpress_id: '208'
categories:
- .NET 3.5
- C#
---

I had to implement an integration with youtube for a client yesterday. Google provides API's but they are for Java and PHP. I'm using C# for this project. So I decided to use XLinq to fetch the feeds and parse them into classes for what I needed. 

I only need titles, movies and a thumbnail for each item. So I haven't implemented all of the properties. And I am impressed. From having no exposure to XLinq whatsoever to having it parse feeds and being able to use those feeds in my monorail application took me about an hour. Since this is the very first time I use XLinq I imagine there is room for improvement, please tell me so when I'm wrong.

The classes I show here can be used as follows:
    
``` csharp
YouTubePlayList.LoadForUser("<<username>>").ForEach(pl => Response.Write("<span style="color: blue">" + pl.Id + "</span><br></br>"));

var url = http://gdata.youtube.com/feeds/api/playlists/<<playlistid>;
YouTubeCollection.LoadFrom(url).ForEach(yt => Response.Write(yt.Title + ", " + yt.MovieUrl + "<br></br>"));
    
public class YouTubeCollection : List<YouTubeItem>
{
    public YouTubeCollection()
    {
    }

    public YouTubeCollection(IEnumerable<YouTubeItem> collection)
        : base(collection)
    {
    }

    public static YouTubeCollection LoadFrom(string uri)
    {
        var feed = XElement.Load(uri);

        XNamespace ns = "http://www.w3.org/2005/Atom";
        XNamespace media = "http://search.yahoo.com/mrss/";
        
        var list = new YouTubeCollection(from item in feed.Elements(ns + "entry").Elements(media + "group")
                    select new YouTubeItem
                    {
                        Title = item.Element(media + "title").Value,
                        MovieUrl = (from el in item.Elements(media + "content")
                                 where el.Attribute("type").Value == "application/x-shockwave-flash"
                                 select el.Attribute("url").Value).First(),
                         ThumbnailUrl = (from el in item.Elements(media + "thumbnail")
                                         select el.Attribute("url").Value).First()
                    });

        return list;
    }

}

public class YouTubePlayList : List<YouTubePlayListItem>
{
    public YouTubePlayList()
    {
    }

    public YouTubePlayList(IEnumerable<YouTubePlayListItem> collection) : base(collection)
    {
    }

    public static YouTubePlayList LoadForUser(string user)
    {
        var url = string.Format("http://gdata.youtube.com/feeds/api/users/{0}/playlists", user);

        var feed = XElement.Load(url);

        XNamespace ns = "http://www.w3.org/2005/Atom";
        XNamespace gd = "http://schemas.google.com/g/2005";

        var list = new YouTubePlayList(from item in feed.Elements(ns + "entry")
                                       select new YouTubePlayListItem
                                         {
                                             Name = item.Element(ns + "title").Value,
                                             Id = item.Element(gd + "feedLink").Attribute("href").Value
                                         });

        return list;
    }
}

[DataContract]
public class YouTubePlayListItem
{
    [DataMember]
    public string Name { get; set; }
    [DataMember]
    public string Id { get; set; }
}

[DataContract]
public class YouTubeItem
{
    private string _id;
    [DataMember]
    public string Id
    {
        get
        {
            return MovieUrl.Split('/').Last();
        }
        set
        {
            _id = value;
        }
    }

    [DataMember]
    public string Title { get; set; }
    
    [DataMember]
    public string MovieUrl { get; set; }
    
    [DataMember]
    public string ThumbnailUrl { get; set; }
}
```