---
author: arturs
tags:
  - iOS
  - Fastlane
  - ci/cd
date: 2024-07-11T06:16:36.857Z
meaningfullyUpdatedAt: 2024-07-11T06:16:36.881Z
slug: building-running-ios-app-test-locally-fastlane
title: Building and Running iOS App Tests Locally with Fastlane - 2024 Tutorial
  with Example
layout: post
image: /images/fastlane-ios33.png
hidden: false
comments: true
published: true
language: en
---


**Quick and reliable iOS application delivery is crucial and properly configured CI/CD pipelines can significantly aid in this process. Learn how to start your journey by building your app and running tests locally with Fastlane in 2024. Enjoy the part 1 of the step-by-step iOS CI/CD tutorial. More to come soon!**

<div className="image">![fastlane + ios](/images/fastlane-ios33.png "")</div>

Before we start, you need to have an iOS project with at least one unit test.

## What is CI/CD and what can you gain from it?

Continuous Integration (CI) is the practice of frequently integrating code changes into a shared repository, where automated builds and tests are run to detect issues at an early stage. Continuous Delivery (CD) extends this by automating the deployment of applications, ensuring that code can be reliably released at any time. What can you gain by this automation?

* Faster Time to Market: Automating the build, test, and deployment processes allows for quicker and more frequent releases.
* Improved Code Quality: Continuous integration ensures that code changes are automatically tested, leading to higher code quality and fewer bugs.
* Consistent Deployment: Automating deployments reduces the risk of human error, ensuring consistency across environments.
* Tools integrations: CI/CD allows you to integrate tools into your pipeline, such as SwiftLint, SonarQube, sending dSYMs to Firebase Crashlytics or Sentry for error monitoring. 

## How can you integrate CI/CD in iOS programming? 

The most versatile, popular, and common free open-source tool to do so is Fastlane. It is an open-source automation tool designed to simplify and streamline the deployment process of mobile applications. It allows you to automate building, testing, and releasing apps and also gives you the possibility to easily manage app metadata like certificates and provisioning profiles for iOS projects. 

**You can read more about it here: [fastlane.tools](https://fastlane.tools/)**

There are a few ways to install Fastlane on your device, however, the most recommended one is the one using [bundler](https://bundler.io/). It will also allow us to easily integrate other tools in future - if needed.\
**[docs.fastlane.tools/getting-started/ios/setup](https://docs.fastlane.tools/getting-started/ios/setup/)**

Great, you have just installed a tool that will allow you to build your first CI. Just to confirm everything works and is ready to go type:

`fastlane -v`

**If everything went OK, you should be able to see the details of the installed Fastlane.**

## **Fastlane setup**

In the root folder of a project type this command:

`fastlane init`

during installation select the option “Manual setup - manually setup your project to automate your tasks (Option 4)” - for the purposes of this guide, we want to do the configuration ourselves.

<div className="image">![fastlane setup options](/images/fastlane-setup-options.png "Options for Fastlane setup")</div>