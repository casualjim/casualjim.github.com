---
date: '2009-03-21 18:33:32'
layout: post
slug: gitgithub-survival-guide
status: publish
comments: true
title: Git/Github survival guide
wordpress_id: '319'
categories:
- Source control
tags:
- cheat sheet
- git
- github
---

Lately I’ve been helping a few people to get started on [Github](http://github.com). I use git at the command line and my survival guide is also based on that way of interacting with [Git](http://git-scm.com/). So I thought I’d write the procedure up so that I can just point people to this page.

 

The first tip I can give you and most of what I’ll be talking about is in the [guides](http://github.com/guides/home) from github. When you’re used to Subversion or Team Foundation Server for example you’ll need to make a mental leap. That leap would be to realise that your local copy _is_ the master copy for you. The remote server like github.com is one is a little bit like an afterthought. I think it goes a little bit like this: “O cool I’ve built this really cool thing here and I’ve got it in this git repository on my machine. It would be cool if other people also had access. Wait a minute, I’ll just add a remote and push my stuff onto that server.” Problem solved.

 

Most of this guide applies to both windows and *nix systems except for the next part because that will describe the install parameters for getting msysgit to behave nicely on your system.

 

==== Windows only ====

 

If you’re on windows I suggest you use [msysgit](http://code.google.com/p/msysgit) as your git client. You can probably use everything I’m about to explain from explorer too if you want to use [tortoisegit](http://code.google.com/p/tortoisegit/) or just prefer gui’s. I, personally, like having options so I’ll probably use a mix of those in the future. Ok onto the install procedure.

 

Somewhere half-way through the install of msysgit it will ask you how far you want to integrate it. The correct choice is the middle one: Run Git from the Windows Command Prompt. For generating ssh keys etc you probably want to use OpenSSH. 

 

==== Windows only end ====

 

When the install of msysgit is completed it is time to start configuring your git install for usage with github. The first step you need to take is to tell git your username and email address. You will also need your API token that you can find on your [account page](http://github.com/account).

 
    
    [~]$ git config --global user.name <span class="str">"Ivan Porto Carrero"</span>
    [~]$ git config --global user.email ivan@nowhere.com
    [~]$ git config --global github.user casualjim
    [~]$ git config --global github.token [[API TOKEN]]





This information can be found in the github guides: [http://github.com/guides/tell-git-your-user-name-and-email-address](http://github.com/guides/tell-git-your-user-name-and-email-address). The configuration above is global but you can still override that on a per project basis.





Now that git knows how to deal with github it is time to formally introduce your machine to the github server. To do so you might have to create an ssh key private/public keypair. A tip I can give you before you start the creation is that you probably don’t want to type a password everytime you push to github. So when you create your ssh key don’t use a passphrase (leave it blank when asked for one).





The procedure on how to create the ssh keys can againn be found in the github guides: [http://github.com/guides/providing-your-ssh-key](http://github.com/guides/providing-your-ssh-key). On windows I would suggest that you use the openssh one. I use RSA keys but you can choose whichever flavor you want of course :) After generating the ssh keys you need to provide them to github in your [account page](http://github.com/account).





This should get you up and running with github. I’m assuming most people coming to github are familiar with subversion so I’ll try to map some common operations to the command sequence you need in git.





First things first I have a couple of aliases defined for some common operations. 
    
You can just copy paste the aiases section below in the .gitconfig file that you can find in the root of your personal folder. C:\users\ivan\.gitconfig on vista for me and ~/.gitconfig in bash.




    
    [alias]
        ci = commit
        st = status
        co = checkout





If all you need is read-only access to a repository you can just clone a repository by its public clone url ie. git clone git://github.com/casualjim/ironrubymvc.git





The first operation you’ll need is how to get source code, make changes and send in a patch. In git lingo this is called forking.





On github you fork the project you want to make changes too. Then you clone that project on your local machine and make your changes. You then push your changes back to your repository and send a pull request to the original project. That is all you need to do to send in a patch, issue a pull request.





I forked ironrubymvc from Jimmy Schementi and send him pull requests regularly when I’ve completed a chunk of work on it. so here’s the sequence of commands I use to do this.





_**git clone **_[_**git@github.com:casualjim/ironrubymvc.git**_](mailto:git@github.com:casualjim/ironrubymvc.git)





… make some changes …





To start updating the repository with my changes I’ll generally first ask for a status to see if I need to add some files to ignore and if there are new files that need te be included





_**git st **_





If there are files that need to be ignored I’ll add them to the .gitignore file in my project root. If there are still some new files that need to be added:





**_git add ._**





Then I’m ready to commit the changes to my local repository:





_**git ci –a –m “Made ironrubymvc do the dishes and ironing”**_





Now it’s time to push my changes to the github server.





_**git push**_





And now I need to go to the github website and send a pull request to Jimmy. He can then decide if he wants to apply the patch or make some changes.





The next step is to keep your fork in sync with the forked repository, so that you can continue to pick up their changes and ensure that your changes still work.





_**git remote add upstream git://github.com/jschementi/ironrubymvc.git**_





to automatically fetch and then merge the changes from the upstream repository you can pull from it. You have to tell pull the remote source it has to pull from and the target branch.





**_git pull upstream master_**





A more detailed explanation of this process can be found in the github guides. [http://github.com/guides/fork-a-project-and-submit-your-modifications](http://github.com/guides/fork-a-project-and-submit-your-modifications)





The next thing we’re going to map is svn:externals. In git this is called submodules. They have a great explanation off that in the github guides [http://github.com/guides/developing-with-submodules](http://github.com/guides/developing-with-submodules)





Suppose you made some changes and they aren’t really what you want and you want to restore the repository to the last commit.





**_git reset --hard_**





The last topic is branching and merging changes etc. As an example I will take the [IronRuby](http://ironruby.net) project for which Michael Letterle and myself maintain the linux branch. This branch ensures that IronRuby gets the fixes it needs to compile on mono. A typical workflow for me when I sync it with the source repository @ git://github.com/ironruby/ironruby.git from the ironruby project root on my local machine.





Previously I did:





_**git clone git@github.com:mletterle/ironruby.git**_





_**git remote add ironruby git://github.com/ironruby/ironruby.git**_





And to create and track the remote linux branch I issued the following commands:





**_git co –-track –b linux origin/linux_**





**_git pull_**





This has now got my local copy set up with a linux branch and has pulled in the contents of the remote branch to my local repository.





When there are changes in the source repository I issue the following commands:





**_git co master_** // Check out the master branch





**_git pull ironruby master_** // Pull in changes from remote





**_git co linux_** // Check out the linux branch





**_git merge master_** // Merge in the changes from the master branch





**_mate ._** // Open textmate to resolve conflicts





**_git add ._** // Add the files with the resolved conflicts back to the repository





**_git ci –a –m “Synced with upstream”_** // submit changes





**_git push_** // update the github server





The information above can be found in the github guides as well but in several places:





[http://github.com/guides/git-cheat-sheet](http://github.com/guides/git-cheat-sheet) 

    
[http://github.com/guides/showing-and-tracking-remote-branches](http://github.com/guides/showing-and-tracking-remote-branches) 

    
[http://github.com/guides/push-a-branch-to-github](http://github.com/guides/push-a-branch-to-github) 

    
[http://github.com/guides/keeping-a-git-fork-in-sync-with-the-forked-repo](http://github.com/guides/keeping-a-git-fork-in-sync-with-the-forked-repo) 

    
[http://beans.seartipy.com/2008/12/09/setting-up-ruby-on-rails-projects-with-git-and-github/](http://beans.seartipy.com/2008/12/09/setting-up-ruby-on-rails-projects-with-git-and-github/)





Those are the commands I use about 95% of the time when I’m working with git. I thought they might be useful to other people hence the share.





If you combine the above with my previous post on how to git-enable your command-line [http://flanders.co.nz/2009/03/19/pimp-your-command-line-for-git/](http://flanders.co.nz/2009/03/19/pimp-your-command-line-for-git/) . I guess you’ve got a pretty sweet setup.





**There is one gotcha that I’d like to repeat one more time. When you’re branching you have to close the solution in visual studio or all kinds of nastiness will ensue. Visual studio will lock some files and if git wants to remove them it can’t. This results in a branch that is probably messed up.**









[![kick it on DotNetKicks.com](http://www.dotnetkicks.com/Services/Images/KickItImageGenerator.ashx?url=http%3a%2f%2fflanders.co.nz%2f2009%2f03%2f21%2fgitgithub-survival-guide%2f)](http://www.dotnetkicks.com/kick/?url=http%3a%2f%2fflanders.co.nz%2f2009%2f03%2f21%2fgitgithub-survival-guide%2f)





Technorati Tags: [git](http://technorati.com/tags/git),[github](http://technorati.com/tags/github),[cheat sheet](http://technorati.com/tags/cheat+sheet)
