---
date: '2008-02-05 04:32:36'
layout: post
slug: compiling-mono-and-ironruby-on-osx-leopard
status: publish
comments: true
title: Compiling Mono and IronRuby on OSX Leopard
wordpress_id: '202'
categories:
- .NET 3.5
- IronRuby
---

I tried to compile IronRuby on OS X (leopard) with the dmg I downloaded from the mono website, and that didn't work.

I then uninstalled that mono version by running monoUninstall.sh and proceeded to get mono from subversion. I'm putting these steps on my blog more for future reference when I decide to reinstall my box for some reason.

Download [gettext](ftp://ftp.gnu.org/gnu/gettext/gettext-0.17.tar.gz), [pkgconfig](http://pkgconfig.freedesktop.org/releases/pkg-config-0.23.tar.gz) and [glib2.0](ftp://ftp.gtk.org/pub/glib/2.12/glib-2.12.12.tar.bz2)

extract the archives and build them in the following order gettext, pkgconfig, glib2.0

    ./configure --prefix=/opt/local
    make
    sudo make install

At this point it would be wise to set the PKG_CONFIG_PATH environment variable. I added the following line to ~/.bash_profile

    export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/opt/local/lib/pkgconfig"

next it's time to check out the mono sources from their repositories

    cd ~/
    mkdir tools
    mkdir mono
    svn co svn://anonsvn.mono-project.com/source/trunk/mono
    svn co svn://anonsvn.mono-project.com/source/trunk/mcs
    svn co svn://anonsvn.mono-project.com/source/trunk/libgdiplus
    svn co svn://anonsvn.mono-project.com/source/trunk/moon
    svn co svn://anonsvn.mono-project.com/source/trunk/olive
    svn co svn://anonsvn.mono-project.com/source/trunk/gtk-sharp

checking those out will take a while

now go into the mono directory and build mono

    cd mono
    ./autogen.sh --prefix=/opt/local/mono --with-preview=yes --with-moonlight=yes

--with-preview enables the .NET 3.5 features that have been implemented so far
--with-moonlight enables support for moonlight

    make
    sudo make install

This will also take some time and when it completes you can check if mono is installed by typing mono -V

That's it for mono, now onto IronRuby

    cd ~/tools
    svn co http://ironruby.rubyforge.org/svn/trunk ironruby
    sudo gem install pathname2
    rake compile mono=1

And that should be all :)

UPDATE: I've got [new instructions](http://flanders.co.nz/2008/12/30/building-ironruby-with-mono-on-osx/) for building IronRuby
