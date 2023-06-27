---
author: piotr
tags:
  - development
  - git
date: 2023-06-27T06:51:31.468Z
meaningfullyUpdatedAt: 2023-06-27T06:51:32.191Z
title: How to have multiple branches checked out at the same time?
layout: post
image: /images/blogpost_tip_git-worktree.png
hidden: false
comments: true
published: true
---
**Find out how to use Git worktree to have multiple branches checked out at a time.**

<InstagramEmbed url='https://www.instagram.com/p/CgmUvBuI4TB/' />

## What is a Git worktree?

A `git` `worktree` is a linked copy of your Git repository, allowing you to have multiple branches checked out at a time. A `worktree` has a separate path from your main working copy, but it can be in a different state and on a different branch.

`Git worktree `is an alternative to `git stash`. Both of these mechanisms help you to manage multiple streams of work at once. The basic approach is to git-stash your changes and checkout the other branch.

## Why you should use worktree to simultaneously check your branches?

The specifics of `worktree` approach is that it operates within a single `worktree`. Stashing the changes, and checking out the branch can cause performance mayhem within your IDE, which needs to reindex the files and that can take time in bigger projects.

It is a great way to switch to a different branch for a brief moment but is unsuitable in more complex situations.

As opposed to `git stash`, `git` `worktree` parallelizes your work by creating dedicated work trees and placing them in separate folders. 

Each tree/folder is separately managed by a dedicated IDE window.

I hope you enjoyed this bright dev tip!