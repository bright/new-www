---
author: mateusz
secondAuthor: izabela
tags:
  - business
  - HealthTech
date: 2024-01-24T08:19:18.576Z
meaningfullyUpdatedAt: 2024-01-24T08:19:18.603Z
title: How Data-Driven Development Saved a Successful FemTech App Onboarding
  From a Failure
layout: post
image: /images/pregnancy_app_femtech.png
hidden: false
comments: true
published: true
language: en
---
**An 80% onboarding conversion rate for a mobile app is generally a successful metric. However, particularly in the world of software development, everything can be optimized. Or maybe not? Follow the story of how the pursuit of optimization, based solely on assumptions, nearly destroyed the successful onboarding of a FemTech app, and discover how we prevented this using the power of data!**

<div className="image">![FemTech app onboarding](../../static/images/pregnancy_app_femtech.png "FemTech app onboarding")</div>

## The hypothesis: simplifying onboarding to increase the app sign-up rate

While scaling the mobile application offering nutrition and fitness recommendations for pregnant women, we focused on key elements that would help attract more soon-to-be moms. One of the aspects was the quality of the app's onboarding process. 

The pregnancy app in question had, at that time, an **onboarding process containing 8 steps, divergently helping the app to customize the experience for its expecting women**. So, there weren't only the typical login screens, but the females also answered a bunch of questions such as:

* name,
* fitness and exercise preferences,
* food preferences,
* allergies.

Although **the onboarding conversion rate was 80%, our client – a Germany-based FemTech startup – questioned whether the detailed onboarding process might deter users from signing up**. We jointly decided to validate this hypothesis.

## The validation: confronting assumptions with data

For testing purposes, **we shortened the onboarding process from 8 to 3 steps**, focusing on login, name, and accepting terms, while omitting questions about fitness, food preferences, and other specifics related to pregnancy. What was the outcome? **The app onboarding conversion rate plummeted from 80% to 50%**.

How were we able to verify that? Naturally, **thanks to data-driven development which is a process of creating software based on data-driven decisions**. This approach couldn't take place without **analytics tools measuring user actions**. We install these at the early stage of every app we develop. In most scenarios (the pregnancy app included), we install a few different analytics tools to have the opportunity to compare data from various sources and ensure its accuracy.
		
After noticing the initial drop in the onboarding rate, our first step was to verify that there wasn't any crucial bug preventing women from completing the onboarding process. Once we eliminated that possibility, we waited to collect meaningful data. **After analyzing the numbers, we decided with the client to revert to the previous onboarding method. Subsequently, the app onboarding rate returned to 80%**.

Imagine making these crucial changes without data-driven development relying only on our feelings or assumptions. **The numbers provided by analytical tools were quite straightforward and quickly helped us verify the hypothesis** and come back to the onboarding that attracted more moms-to-be.

## Key Points to Remember While Designing App Onboarding for Pregnancy Apps