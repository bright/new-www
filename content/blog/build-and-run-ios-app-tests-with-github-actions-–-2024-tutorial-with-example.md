---
author: arturs
tags:
  - iOS
  - ci/cd
  - github actions
  - fastlane
date: 2024-07-18T11:14:12.143Z
meaningfullyUpdatedAt: 2024-07-18T11:14:12.960Z
slug: ios-build-run-tests-github-actions
title: Build and Run iOS App Tests with GitHub Actions – 2024 Tutorial with Example
layout: post
image: /images/background.jpg
hidden: false
comments: true
published: true
language: en
---
**In the first part of a tutorial we [configured fastlane and succeeded in running tests locally](/blog/building-running-ios-app-test-locally-fastlane/), right from our console, now it's time to make them fly, fly on GitHub!**

<div className="image">![GitHubActions + iOS](/images/background.jpg "GitHubActions + iOS")</div>

## Creating a workflow file

To make your project running on GitHub you need to create a yaml file that will be executed there. To do that, in your main project folder enter command

**`mkdir .github  && cd .github`**

This command creates GitHub directory and enters into it.

**`mkdir workflows && cd workflows`**

This one creates workflows directory, you can read more about it here:

**[docs.github.com/en/actions/using-workflows/about-workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)**

Inside, create a workflow file. You can name it “build-test-ios.yml”

## Setting Up and Understanding Your Pipeline

Now open the file that you just created and enter the code snippet that I added below. Don't be afraid if you don't fully get what's going on here - we will take it part by part down below

```ruby
name: iOS build

on:
 push:
   branches:
     - 'main'
     
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: maxim-lobanov/setup-xcode@v1
        with:
          xcode-version: '15.3.0'
      - name: Set up ruby env
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.3
          bundler-cache: true
      - name: Build & test iOS binary
        run: bundle exec fastlane ios build_and_run_tests
```

Now let’s split it into small parts, so it will be easier to understand what our pipeline is doing.

```ruby
on:
 push:
   branches:
     - 'main'
 workflow_dispatch:
```

This part decides about triggers that will start our workflow. To simplify implementation we want to listen to changes when they are pushed to a main branch. Second option that we created is manual trigger. You can read more about events that trigger workflows [here](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push).

```ruby
jobs:
  build:
    runs-on: macos-latest
```

We defined one job named “build” which will be runned on the latest available macOS on GitHub. You can check the list of GitHub runners [here](https://github.com/actions/runner-images).

```ruby
steps:
      - uses: actions/checkout@v2
      - uses: maxim-lobanov/setup-xcode@v1
        with:
          xcode-version: latest-stable
      - name: Set up ruby env
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.3
          bundler-cache: true
```

Our tasks are defined by "steps"  Under each step we can link multiple actions with keyword “uses” ([reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses)).

The actions we will need are as follows:

1. actions/checkout@v2 -  checks out our repository, so our workflow can use it  ([reference](https://github.com/actions/checkout)). 
2. "maxim-lobanov/setup-xcode@v1" - selects the latest stable xcode to build our app on GitHub runner ([reference](https://github.com/maxim-lobanov/setup-xcode)).
3. ruby/setup-ruby@v1 - downloads a prebuilt ruby and adds it to the PATH  ([reference](https://github.com/ruby/setup-ruby)).

```ruby
  - name: Build & test iOS binary
        run: bundle exec fastlane ios build_and_run_tests
```

Runs on github runner lane that we defined in the first [article](https://brightinventions.pl/blog/building-running-ios-app-test-locally-fastlane/)

Now commit and push your changes. It has to be done on the main branch as on this one we created branch policies.

## Seeing results of your work

To see the result, go to your repository on GitHub and tap on the actions tab. Here you should see the pipeline that has started after you pushed your changes to the repository.

<div className="image">![GitHub Actions tab with result latest build](/images/github-workflow.png "GitHub Actions tab with result latest build")</div>

<sub><center>GitHub Actions tab with result latest build</center></sub>

Congratulations, you just fired your first pipeline using GitHub Actions!

This is the second part of the iOS CI/CD tutorial. In another articles you will learn:

* [how to build and run iOS app tests locally with **Fastlane**](/blog/building-running-ios-app-test-locally-fastlane/);
* how to upload your app to TestFlight with the usage of **GitHub Actions and Fastlane Match** (soon to be released).