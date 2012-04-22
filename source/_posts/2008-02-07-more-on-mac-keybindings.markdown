---
date: '2008-02-07 10:35:01'
layout: post
slug: more-on-mac-keybindings
status: publish
comments: true
title: More on Mac KeyBindings
wordpress_id: '206'
categories:
- Apple
---

The biggest problem so far I've had when switching from windows to a mac were the shortcut keys, and mostly the inconsistency thereof. It turns out there is a way to manipulate the keybindings for all cocoa apps, which should make them consistent across all good cocoa citizens. Firefox isn't one of those citizens neither is firefox 3.0. 

I uninstalled quicksilver because I couldn't work out what it would do for me and didn't want to spend time figuring it out either. This liberated my ctrl-space for visual studio.  I remapped alt-insert to alt-i and that works for me. Then I brought some consistency in the way my keys behave across all cocoa apps. 

I solved my problem with the shortcut keys by following the instructions that can be found in the following posts.      
They talk about editing a file by hand and saving it, but for those that like a GUI there is one for it.  

The GUI application: [KeyBindingsEditor](http://www.cocoabits.com/KeyBindingsEditor/) 

The links with some instructions and background information. 

[http://blog.macromates.com/2005/key-bindings-for-switchers/](http://blog.macromates.com/2005/key-bindings-for-switchers/)

[http://www.hcs.harvard.edu/~jrus/site/cocoa-text.html](http://www.hcs.harvard.edu/~jrus/site/cocoa-text.html)

The last post lists a couple of predefined keybinding files like one for emacs 

[http://www.hcs.harvard.edu/~jrus/site/KeyBindings/Emacs%20Esc%20Bindings.dict](http://www.hcs.harvard.edu/~jrus/site/KeyBindings/Emacs%20Esc%20Bindings.dict)

or windows key bindings

[http://www.hcs.harvard.edu/~jrus/site/KeyBindings/Emacs%20Esc%20Bindings.dict](http://www.hcs.harvard.edu/~jrus/site/KeyBindings/Emacs%20Esc%20Bindings.dict)

Guess which ones I took and it's not emacs ;) I actually just took a couple of keybindings. The ones that I use the most

    /***** ARROWS *****/ 
    "^\UF700"   = "moveToBeginningOfParagraph:";    /* C-up         Move to beginning of paragraph */     
    "^\UF701"   = "moveToEndOfParagraph:";          /* C-down       Move to end of paragraph */ 

 

    "^$\UF700"  = "moveToBeginningOfParagraphAndModifySelection:";     
                                                    /* C-Shft-up    Select to beginning of paragraph */      
    "^$\UF701"  = "moveToEndOfParagraphAndModifySelection:";      
                                                    /* C-Shft-down  Select to end of paragraph */ 

 

    "^\UF702"   = "moveWordLeft:";                  /* C-left       Move word left */     
    "^\UF703"   = "moveWordRight:";                 /* C-right      Move word right */ 

 

    "$^\UF702"  = "moveWordLeftAndModifySelection:";     
                                                    /* C-Shft-left  Select word left */      
    "$^\UF703"  = "moveWordRightAndModifySelection:";      
                                                    /* C-Shft-right Select word right */ 

 

/***** CTRL + LETTERS *****/ 

 

    "^a"        = "selectAll:";                     /* C-a          Select all */ 

 

    "^x"        = "cut:";                           /* C-x          Cut */     
    "^c"        = "copy:";                          /* C-c          Copy */      
    "^v"        = "paste:";                         /* C-v          Paste */ 

 

    "^z"        = "undo:";                          /* C-z          Undo */     
    "^y"        = "redo:";                          /* C-y          Redo */ 

 

    "^s"        = "save:";                          /* C-s          Save */     
    "^S"        = "saveAs:";                        /* C-Shft-s     Save as */      
  

