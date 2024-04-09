---
author: blazej-d
secondAuthor: tomasz-sch
thirdAuthor: michal-wo
tags:
  - HealthTech
date: 2024-04-09T10:48:09.946Z
meaningfullyUpdatedAt: 2024-04-09T10:48:09.969Z
title: How to Choose the Right Video Conferencing Tool for Healthcare
layout: post
image: /images/telemedicine_video_conferencing_tool.png
hidden: false
comments: true
published: true
language: en
---
**In December 2024, Twilio will decommission its video API, posing a significant challenge for HealthTech companies, particularly those specializing in telemedicine, as they now need to find an alternative video conferencing provider. To assist in this transition, we've prepared a guide on selecting the right provider for your telehealth solutions.**

<div className="image">![telehealth video conferencing tools](../../static/images/telemedicine_video_conferencing_tool.png "telehealth video conferencing tools")</div>

## What will you find in this article?

* possible options of video conferencing providers;
* a software developer's perspective on what’s important when choosing a provider;
* what to look for when choosing a solution dedicated for healthcare;
* what video conferencing providers are available and the most popular in 2024.

This year started with some of our clients asking us to help explore the possibilities of shifting from one of the major video providers [Twilio that will decommission its video API by the end of 2024](https://www.twilio.com/en-us/changelog/programmable-video-eol-notice). This has put a lot of stress on some organizations, forcing them to act fast and look for a substitute. 

The mentioned provider highlights ZOOM as a potential replacement, but given the backlash of the 2020 data breach, and constant phishing attacks performed in ZOOM’s direction it’s hard to be 100% confident about its stability and safety. In all fairness, ZOOM has done a lot of work to improve their safety and no major breach has happened since 2020, but being one of the leaders always puts you in the “hacker spotlight”. 

**In this article, we will provide key information you need to make an educated decision when choosing a video conferencing tool**.

## What options do you have when deciding on a telehealth video provider?

An honest answer to a question about the best video provider solution for your venture is as you might already know is: it depends. There are both business and technical factors that need to be taken into consideration and the decision must be a calculated one. 

We can only provide you with the spectrum of options that are at your disposal. So here they are.

### 1. Build your own native solution

Integrating native video conferencing into your telehealth application can seem highly effective. This method offers a lot of flexibility and room for customization, it ensures full control over the user experience. 

But “with great power comes great responsibility”.

Building a video conferencing tool is a startup in itself. This approach is best for companies with big budgets, definitely not an option for startups on VC funding. Yes, it offers a lot of flexibility and opens the door for new monetization methods but it also leaves YOU to adjust and  comply with all regulations and place all the risk that comes with it in your hands.

So not only is it a huge expense but also extra time-consuming when applying to get all the certificates.

### 2. Look for open-source software

Open-source solutions are usually a “smart choice”. It leaves you some room for customization but takes the load of building the solution's core feature. 

Usually, I recommend it to startups as a first choice when they are already after the MVP stage. It requires some budget to build but in time the benefits start to show with time. However, they are not GDPR or HIPAA compliant by default. 

Take “Jitsy”, one of the more popular open-source video providers which we have integrated in the past. Even if it does not store conversation contents by default, it does process personal data to operate and store browsing data and conversation metadata in logs. Although it implements client-server encryption it does not implement end-to-end encryption between clients, so it has to be properly configured, to be GDPR compliant.

In other words, you can implement the solution in a compliant way, but it does not mitigate the “legal’ risk to a third party.

### 3. Leverage existing compliant software providers

This is probably the most popular road that founders take when incorporating a video conferencing solution into their telehealth venture. It’s the most risk-averse option. But just like with the discontinuation of the API that we mentioned at the beggining, choosing an external provider might prove irritating in the future.

They offer all the basic features like calendar integrations, screen sharing, chat, or document sharing. Also, they have a seemingly low entry barrier because the only challenge is to integrate via a ready-made API. For all those founders lacking the engineering resources this is a good way to start.

Of course with those solutions, there is not much room for flexibility and you become dependent on external factors. At the same time alongside the ease of integration comes a lack of risk in regards to GDPR or HIPAA compliance but also the bills will get higher when more users join your platform.

In time, when your venture scales and reaches more users the monthly cost of supporting this solution will start to grow. It’s up to you to decide when or if there is a need to change. Balance out the development cost with monthly support and if those two meet within a few years, it's probably a good idea to look for alternatives. But when starting, this is the way to go.

Side note: Is “Google Meets” HIPAA and GDPR compliant?

Google Meet safeguards HIPAA-compliant chat through a multi-layered approach, alongside robust encryption, access controls, 2FA, and data minimization. It adheres to HIPAA regulations via a dedicated Business Associate Agreement and GDPR compliance on top, while offering features like chat log export and reporting tools for enhanced security and record-keeping.

## Engineers' perspective on video telehealth videoconferencing solutions

If an engineer could choose a video conferencing tool to integrate what would they look for?

I’ve been talking with our team trying to get their point of view. Here are a few elements that we decided to highlight.

### 1. Technology alignment

Before you make a business decision, double-check with the engineers if the tech stack aligns. For example, If most of your users connect via mobile, and the tech stack that is used on your platform is React Native, verify if the tools you have chosen will be easy to integrate with this technology. On top of that, verify which devices the chosen solution supports.

### 2. Documentation

Before choosing a solution, highlight all the options you have on the table to your engineers and allow them to verify how specific the documentation is. The better this is prepared the less problems you will have when integrating it. A poorly prepared API documentation can have huge effects on the time consumed during the integration process.

### 3. Support levels

Remember when choosing a third-party option you are placing yourself at their mercy during downtime. Be sure that they are offering good quality support because many times your engineers will have their hands tied when trying to solve problems.