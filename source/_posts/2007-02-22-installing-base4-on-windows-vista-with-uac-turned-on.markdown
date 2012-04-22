---
date: '2007-02-22 15:18:28'
layout: post
slug: installing-base4-on-windows-vista-with-uac-turned-on
status: publish
title: Installing base4 on windows vista with UAC turned on
wordpress_id: '34'
---

Windows vista introduces the wonderful concept of User Account Control, which also exists on linux and should make your computer more safe.

Anyway I decided to let the UAC turned on and want to work through the extra clicks etc.

Today I needed Base4 again and when I tried to install the program it would go until it was almost complete and then it would come up with error 2869

the easy way around this was to create a .cmd file in the with the following line : msiexec /i "C:\Users\ivan\Downloads\SourceSetup-2.2.0.91.msi"

and execute that cmd file by right clicking it and chosing run as administrator
