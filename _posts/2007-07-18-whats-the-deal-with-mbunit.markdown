---
date: '2007-07-18 06:13:13'
layout: post
slug: whats-the-deal-with-mbunit
status: publish
title: What's the deal with MbUnit
wordpress_id: '163'
---

Consider the following code :

 

        [Test]

        public void StringFormatEqualsTest()

        {

            string firstString = string.Format("{0}", "test");

            string secondString = string.Format("{0}", "test");

 

            Assert.AreNotEqual(firstString, secondString); //test passes

        }

 

        [Test]

        public void StringEqualsTest()

        {

            string firstString = "test";

            string secondString = "test";

 

            Assert.AreNotEqual(firstString, secondString); //test fails

        }

 

Why does the first test (StringFormatEquals) pass ? In my opinion it shouldn't. I raised a bug report on the mbunit site.

This behaviour doesn't exist in nunit.  I'm just putting it out there because you do want your tests to reflect the thruth :).
