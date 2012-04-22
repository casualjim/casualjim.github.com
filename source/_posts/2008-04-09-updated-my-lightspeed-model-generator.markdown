---
date: '2008-04-09 18:53:06'
layout: post
slug: updated-my-lightspeed-model-generator
status: publish
comments: true
title: Updated my lightspeed model generator
wordpress_id: '215'
categories:
- Lightspeed
- Ruby
tags:
- Google code
- Lightspeed
- Ruby
---

This week I could start a project that has a database that goes somewhat beyond a blog. This seemed to me like the best way to improve my model generator that [I built earlier](http://flanders.co.nz/2008/02/09/using-ruby-to-generate-lightspeed-models-part-4-again/)

And as expected I needed to tweak it a little so that it would work properly, and I added a feature.

Seen as there are 2 files generated for an entity if you add a private field that exists in the database there then the generator will skip it so that you can add more attributes than the ones this script generates for you. If you override a field you also have to put the property in the user file.

I also added support for generating a datacontext. If you want to use the Linq support that Lightspeed is getting then that is a starting point. The same goes for this class with user files and generated file as above, the user file takes precedence.

I hosted this project on [google code](http://code.google.com/p/model-generator-ruby/) so you can check it out from there. Or you can download [todays version](http://model-generator-ruby.googlecode.com/files/generate_ls_models.zip) 

[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f09%2fupdated-my-lightspeed-model-generator%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2008%2f04%2f09%2fupdated-my-lightspeed-model-generator%2f)
