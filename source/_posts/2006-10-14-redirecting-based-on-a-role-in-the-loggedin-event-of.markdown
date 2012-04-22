---
date: '2006-10-14 17:59:21'
layout: post
slug: redirecting-based-on-a-role-in-the-loggedin-event-of
status: publish
title: Redirecting based on a role in the loggedin event of the login control
wordpress_id: '71'
categories:
- .NET 2.0
---

Today I had to fix a website that is built by the guys over in Russia. Completely asp.net no castle involved whatsoever. There is not even an O/R mapper in the application.

Real basic stuff. Sql datasource gridview/formview type of things.

The client asked me to do redirect their site to certain pages depending on which role the user is in.

Cool. Let's handle the LoggedIn event of the Login control. This is what I started of with. Makes perfect sense to me that that should work.

    protected void Login1_LoggedIn(object sender, EventArgs e)

    {

        if (Roles.IsUserInRole("School"))

            Response.Redirect(string.Format("~/Career/School.aspx?ID={0}", CareerUser.GetUserTypeId(Membership.GetUser().ProviderUserKey)));

        if (Roles.IsUserInRole("Student"))

            Response.Redirect(string.Format("~/Career/Student.aspx?ID={0}", CareerUser.GetUserTypeId(Membership.GetUser().ProviderUserKey)));

        else

            Response.Redirect("~/Login.aspx");

    }

Now as expected that didn't do the trick. But this does

    protected void Login1_LoggedIn(object sender, EventArgs e)

    {

        /*I have to do it this way because there is no cookie set yet so Membership.GetUser() returns an empty object.

        * The same goes for the roles. No cookie means no data for the standard function.

        */

        Login login = sender as Login;

        Guid userObjectKey = (Guid)Membership.GetUser(login.UserName).ProviderUserKey;

        Guid userId = CareerUser.GetUserTypeId(login.UserName, userObjectKey);

        if (Roles.IsUserInRole(login.UserName, "School"))

            Response.Redirect(string.Format("~/Career/School.aspx?ID={0}", userId));

        if (Roles.IsUserInRole(login.UserName, "Student"))

            Response.Redirect(string.Format("~/Career/Student.aspx?ID={0}", userId));

        else

            Response.Redirect("~/Login.aspx");

    }

Just thought I'd share this for other people that have this problem.

Anyway this is wtf numero 10 today. And I haven't had these moments in the last couple of weeks, using castle and all, so I was feeling a little nostalgic about the whole thing.
