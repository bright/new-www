---
author: tomasz-l
tags:
  - iOS
  - Swift Package Manager
  - Xcode
date: 2022-07-29T10:34:45.775Z
title: Swift Package Manager, build configurations and non compiling iOS projects
layout: post
image: /images/blogpost_spm_tomasz.png
hidden: true
comments: true
published: true
---
Swift Package Manager in Xcode is the newest way of managing third party dependencies of Swift projects. It is very neatly integrated and allows for clean and easy dependency management. At least sometimes.

## TL;DR

In this article I am going through struggle of adding SPM to legacy project containing frameworks not compatible with Apple Silicon iOS simulators (arm64). If you are in rush for a solution head straight to [**SPM build configurations** paragraph](/blog/swift-package-manager-build-configurations-and-non-compiling-ios-projects/#spm-build-configurations).

![Adding SPM to Legact Project](/images/blogpost_spm_tomasz.png)

When working on greenfield projects SPM in most cases is really a breeze to use. In reality however quite frequently we find ourselves working on some kind of legacy projects with all of their quirks.

**\[Disclaimer]:** Described problems and their solutions were tested on Xcode 13.2.1 and 13.4.1. Behavior may change in future Xcode releases. [Here](https://github.com/TLizer/SPM-build-configurations) you can find a repository with an example project.

## The problem

The other day I was trying to add Swift Package Manager to one of the projects I work on as my Team tends to move to SPM from other dependency managers.

Surprisingly I was greeted with a big fat red error preventing the project from compiling: 

```
Could not find module <package name> for target 'x86_64-apple-ios-simulator';
found: arm64, arm64-apple-ios-simulator
```

![Could not find module <package name> for target 'x86_64-apple-ios-simulator'; found: arm64, arm64-apple-ios-simulator](/images/could-not-find-module-for-target-error.png "Could not find module for target error")

Whatever library I wanted to add to the project it always ended in the same way: error telling you that module for current architecture is lacking. At that point I left behind the idea of slow migration to SPM. When I stumbled on this issue once again I finally thought that something needs to be done about that.

## Root of all evil

After lots of trials and errors I finally arrived at a solution. But before opening a bottle of champaign let's try to think why that was even happening.

Issue itself originates not from other dependency managers, but rather build settings of the project. You may be familiar with workaround for running projects with legacy frameworks (e.g.  “Fat” .framework not built for arm64 iOS simulator) on Apple silicon machines. 

There are two main options to deal with that:

![Drake xcode meme](/images/drake-xcode-meme.jpg "Drake xcode meme")

* Run Xcode using Rosetta - seems like a good idea and actually works, but it comes with a price. Time of clean build for our project increased from 112 to 165 seconds. That is almost 50% longer and I would suspect other performance penalties during day to day work.
* Exclude arm64 architecture for iOS simulator sdk for your development build configuration. This is quite a straightforward and clever solution to the problem. Excluding arm64 architecture for the simulator forces xcode to build our app for x86_64 architecture on an iOS simulator that is compatible with our legacy framework ([stackoverflow post](https://stackoverflow.com/a/63955114)).

Even though we are explicitly excluding arm64 architecture for iOS simulator we are getting error shown above. What is more it explicitly says that SPM built our dependency just for arm64 architecture. We can conclude that SPM is ignoring our project build settings.

Unfortunately there is no (at least straightforward) way to configure the build configuration of SPM dependencies. But it works in other project with exactly the same limitations. So in my case it seemed obvious that there must be a way of affecting build configuration of SPM dependencies.

## SPM build configurations

If we inspect the documentation we can see that there is `debug` and `release` [BuildConfiguration](https://developer.apple.com/documentation/packagedescription/buildconfiguration) defined. We can also have a look at [source code](https://github.com/apple/swift-package-manager/blob/5d9202f829c6c66bbae20f4750b85fe5011ad280/Sources/PackageDescription/BuildSettings.swift) but there is not much useful information there. So what does debug and release configuration mean and in what circumstances those are applied? 

I believe I have quite valuable and maybe even shocking observations:

Debug build configuration is being applied to Swift Package Manager dependencies if our current build configuration contains “debug” or “development” in its name (case-insensitive).
So if you try to build an app in default Release configuration, rename Debug to something else or create a new configuration (eg. Stage) and it will just work™. This means there is some kind of parsing logic for project build configuration **name** that then translates to different build configurations of SPM dependencies.

I want to highlight that once more: as silly as it sounds **renaming your project build configuration** is the key to success. It cannot contain `Debug` nor `Development` in its name in order to build **SPM dependencies** in `Release` mode.

## Reverse problem

We just arrived at the conclusion that we need release configuration of SPM dependencies for our project in the scenario described above. But in the past I have stumbled on a similar issue, however from the other side. Since we are writing Unit Tests we also wrote such for internal packages that we used for code separation. It turned out that we faced issues while trying to run our unit tests together with other test targets in the main project scheme:

```
Module <package name> was not compiled for testing
```

![Module <package name> was not compiled for testing](/images/module-was-not-compiled-for-testing-error.png "Module not compiled for testing error")

As you may already suspect the solution here is totally opposite to what we just did before. In order to make such error go away we must compile our **Swift Package** with **debug configuration** and that means we need to add “debug” to our development configuration name. If at the same time you are dealing with a previous issue then this is not possible. We solved it by creating a separate scheme just for running unit tests of local packages.

## Conclusions

Swift Package Manager is a great way of managing third party dependencies in iOS projects. With new releases of Xcode it is getting more useful and powerful. Unfortunately SPM is still a young addition to Xcode and lacks some functionalities. Also its ephemeral way of implementation brings issues like those I have faced. In this particular case we could benefit from explicit documentation telling about **build configuration name parsing logic** applied to our **Swift Packages**. If you ever find yourself in a similar situation I hope this article will help you in sorting it out :)