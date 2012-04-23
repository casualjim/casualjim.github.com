---
date: '2008-02-09 05:27:42'
layout: post
slug: using-ruby-to-generate-lightspeed-models-part-4-again
status: publish
comments: true
title: Using Ruby to Generate LightSpeed Models - Part 4
wordpress_id: '207'
categories:
- IronRuby
- Lightspeed
- Ruby
---

**[UPDATE](http://flanders.co.nz/2008/04/09/updated-my-lightspeed-model-generator/): I have an update [here](http://flanders.co.nz/2008/04/09/updated-my-lightspeed-model-generator/) with a new version and the location on google code where the project is hosted now.**

In the previous 3 parts ([part 1](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models---part-1.aspx), [part 2](http://flanders.co.nz/blog/archive/2008/02/05/using-ruby-to-generate-lightspeed-models.aspx), [part 3](http://flanders.co.nz/blog/archive/2008/02/06/using-ruby-to-generate-lightspeed-models---part-3.aspx)) we talked about getting the meta data out of the database and generating the lightspeed entities in memory.

I won't put the code listings up in this blog post but instead will give you a [link](http://flanders.co.nz/wp-content/uploads/2008/04/generate_ls_models.zip) to the complete code :) You can download the express edition of [LightSpeed](http://www.mindscape.co.nz/Products/lightspeed/default.aspx) and try it for yourself if you want.

Instead I'll talk about how you can use the ruby script to generate the models from an existing database.

It adds the generated files to the visual studio project file in the same directory or you can specify one.

Currently it only supports Sql Server 2005. You need to create a project first in visual studio so we have a project file to add items to.

To use it you have to tell it which database it has to find by putting a database.yml file in your visual studio project directory.

The content of that database.yml file may look as follows

 

# on windows you can use the following connection string
    #
    # sqlserver:
    # database: northwind
    # host: localhost
    # username: sa
    # password: MaybePassword123
    #
    #
    # on OSX and Linux you can connect to sql server through odbc (iODBC or unixODBC in combination with FreeTDS)
    #
    # sqlserver:
    # dsn: NorthwindSql
    # username: sa
    # password: MaybePassword123

when you've done that you can execute it like shown in the screenshot below:

[![Terminal-screenshot](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/Terminalscreenshot_thumb.jpg)](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/Terminalscreenshot.jpg)

I have a database.yml file in the directory and I execute the command ruby <> on linux and OSX you can chmod +x that path and then you don't have to type ruby anymore.

That will generate the models for your database provided that your database conforms to the conventions needed for LightSpeed.

The next step would be to open visuals studio and build the project. The files got added in visual studio every entity are 2 files one with the generated code and one empty one that you can use to implement behavior on the model if you would want to.

The first picture shows how the solution explorer looks and the second one shows the results of the build without having touched one file after generation.

In the download there is a folder db which contains a slightly modified script from the Northwind database that comes with the samples for lightspeed. I used that database because it has every type of relationship and the script did conform to the lightspeed conventions :)

[![LightSpeedGenerateTest](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/LightSpeedGenerateTest_thumb.jpg)](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/LightSpeedGenerateTest.jpg)

[![LightSpeedGenerateTestBuildResult](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/LightSpeedGenerateTestBuildResult_thumb.jpg)](http://flanders.co.nz/blog/images/UsingRubytoGenerateLightSpeedModelsPart4_1018B/LightSpeedGenerateTestBuildResult.jpg)

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2008%2f02%2f09%2fusing-ruby-to-generate-lightspeed-models---part-4-again.aspx)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2fblog%2farchive%2f2008%2f02%2f09%2fusing-ruby-to-generate-lightspeed-models---part-4-again.aspx)
