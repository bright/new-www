---
author: michal-was
tags:
  - apple
  - iOS
  - ios
  - app store
  - mobile development
date: 2024-01-29T11:48:06.141Z
meaningfullyUpdatedAt: 2024-01-29T11:48:06.158Z
title: Diving into Alternative Marketplaces coming with iOS 17.4
layout: post
image: /images/ios_alternative_marketplace_blog_cover.png
hidden: false
comments: true
published: true
language: en
---
**Apple is forced by the EU to introduce the ability to install apps by alternative marketplaces other than AppStore. What does it mean for iOS developers and app owners? In this article, I will cover the main tech and business requirements to set up your marketplace.** 

The directive, called the **Digital Markets Act (DMA)**, which **will be effective in March 2024**, implies on Apple some major changes, the most important ones are:

* make it possible to install apps by the alternative marketplace;
* allow external payment providers;
* allow users to use alternative browser engines.

**This article covers the first of the implications, which is alternative marketplaces.**

<div className="image">![Sideloading for iOS](../../static/images/gete7kex0aazvi5.jpeg "")</div>

Source: https://twitter.com/altstoreio/status/1750598337533747445

# What is an alternative marketplace? 

Currently, iOS allows users to install apps from AppStore, Testflight or by Enterprise and MDM programs. **Alternative marketplace will be a completely new method of installing apps in iOS, but Apple doesn’t just open iOS for installing any app from any source known i.e. as sideloading.**

**To install an app from an alternative marketplace, users will have to first install an alternative marketplace app developed by an entitled marketplace developer**. After installing the marketplace app, they will be able to browse and install apps from it like they currently do through the AppStore app.

To become a marketplace developer, **multiple requirements need to be met**. A developer needs to accept new business terms, request the “Alternative App Marketplace Entitlement (EU)” and meet multiple criteria required by Apple. One of these requirements is providing “a stand-by letter of credit from an A-rated (or equivalent by S&P, Fitch, or Moody’s) financial Institution of €1,000,000 to establish adequate financial means in order to guarantee support for your developers and users”.

See https://developer.apple.com/support/alternative-app-marketplace-in-the-eu/ & https://developer.apple.com/support/dma-and-apps-in-the-eu/#ios-app-eu 

Considering that you will meet all the requirements and Apple will agree to grant you such entitlement, the rest of the work is building a marketplace app and providing apps for it.

<div className="image">![](../../static/images/apple_doc_mockups.png "")</div>

Source: https://developer.apple.com/documentation/appdistribution/creating-an-alternative-app-marketplace#Distribute-the-marketplace-app-on-the-web

# Submitting apps for alternative marketplaces

To distribute an app through an alternative marketplace, **app developers will still need to submit them through AppStore connect**. It will be required to pass a new review called “Notarization for iOS apps” that will check “platform integrity and protecting users”.

Notarization for iOS apps will focus on Functionality, Safety, Security, Privacy and Accuracy. Apple doesn’t mention that apps must comply with the “Human Interface Guideline”. Apps distributed on the AppStore will still need to meet Apple’s high standards and pass the normal review.

See https://developer.apple.com/support/dma-and-apps-in-the-eu/#notarization-for-ios-apps

After passing notarization, **developers will need to obtain a security token from the marketplace owner to make their app available in a specific marketplace**.

It will be possible to make one binary available in the AppStore and multiple alternative marketplaces. App developers will be able to branch their code based on the installation (AppStore / TestFlight / Enterprise / Alternative Marketplace). 

It’s important to note that **iPad-only apps can’t be distributed through an alternative marketplace**, they need to support the iPhone too.

# Building an alternative marketplace

To set up a marketplace you will need to provide:

* marketplace webpage for letting people download the marketplace app;
* webserver for storing app data received from AppStore Connect and facilitating a secure app installation by communicating with iOS;
* dedicated iOS marketplace app.

<div className="image">![](../../static/images/apple_doc.png "")</div>

source: https://developer.apple.com/documentation/appdistribution/creating-an-alternative-app-marketplace

**Marketplace iOS apps will be a new type of app that will be distributed by external webpage**. A special URL scheme will be used to perform an iOS app installation and that’s the only way of distributing and installing it.

Although the app will be distributed over an external webpage, **it will be required to do a setup with AppStore connect to obtain an “alternative distribution package”**. The process repeats with any update to the marketplace app, but can be automated with webhooks.