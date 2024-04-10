---
author: blazej-d
secondAuthor: tomasz-sch
thirdAuthor: michal-wo
tags:
  - HealthTech
date: 2024-04-09T13:04:27.604Z
meaningfullyUpdatedAt: 2024-04-09T13:04:28.187Z
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

* [Possible options you have when deciding on conferencing providers.](/blog/telehealth-video-conferencing-software/#what-options-do-you-have-when-deciding-on-a-telehealth-video-provider)
* [A software developer's perspective on what’s important when choosing a provider.](/blog/telehealth-video-conferencing-software/#engineers-perspective-on-video-telehealth-videoconferencing-solutions)
* [What to look for when choosing a solution dedicated for healthcare.](/blog/telehealth-video-conferencing-software/#what-options-do-you-have-when-deciding-on-a-telehealth-video-provider)
* [What video conferencing providers are available and the most popular in 2024.](/blog/telehealth-video-conferencing-software/#video-conferencing-tools-available-to-healthcare-providers-in-2024)

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

This is probably the most popular road that founders take when incorporating a video conferencing solution into their telehealth venture. It’s the most risk-averse option. But just like with the discontinuation of the API that we mentioned at the begining, choosing an external provider might prove irritating in the future.

They offer all the basic features like calendar integrations, screen sharing, chat, or document sharing. Also, they have a seemingly low entry barrier because the only challenge is to integrate via a ready-made API. For all those founders lacking the engineering resources this is a good way to start.

Of course with those solutions, there is not much room for flexibility and you become dependent on external factors. At the same time alongside the ease of integration comes a lack of risk in regards to GDPR or HIPAA compliance but also the bills will get higher when more users join your platform.

In time, when your venture scales and reaches more users the monthly cost of supporting this solution will start to grow. It’s up to you to decide when or if there is a need to change. Balance out the development cost with monthly support and if those two meet within a few years, it's probably a good idea to look for alternatives. But when starting, this is the way to go.

<EbookDynamic sectionTitle='face scaling challenges before they affect your users' ebookName='Scale-Your-Healthtech-Solution-Successfully.pdf' ebookDescription={'Get a free copy of our guide on scaling HealthTech. Download a pdf packed with market insights, tech recommendations and case studies.'} ebookImage='/images/healthtech_guide_cover.png' ebookAlt='cover' />

## Engineers' perspective on video telehealth videoconferencing solutions

If an engineer could choose a video conferencing tool to integrate what would they look for?

I’ve been talking with our team trying to get their point of view. Here are a few elements that we decided to highlight.

### 1. Technology alignment

Before you make a business decision, double-check with the engineers if the tech stack aligns. For example, If most of your users connect via mobile, and the tech stack that is used on your platform is React Native, verify if the tools you have chosen will be easy to integrate with this technology. On top of that, verify which devices the chosen solution supports.

### 2. Documentation

Before choosing a solution, highlight all the options you have on the table to your engineers and allow them to verify how specific the documentation is. The better this is prepared the less problems you will have when integrating it. A poorly prepared API documentation can have huge effects on the time consumed during the integration process.

### 3. Support levels

Remember when choosing a third-party option you are placing yourself at their mercy during downtime. Be sure that they are offering good quality support because many times your engineers will have their hands tied when trying to solve problems.

## Telemedicine video conferencing tools checklist

To summarize, allow me to present a checklist of elements to look out for when choosing a provider.

1. Remember that HIPAA does not equal GDPR and tools compliant with one do not necessarily comply with the other.
2. Look at the pricing plans, but also search for the small print. Solutions might only seem cheap at the start but once you: 

   * Need 24-hour support
   * Want unlimited data
   * Want unlimited call time
   * Want to add multiple callers
     The bill will start to grow.
3. Does the solution offer support for both web and mobile technologies?
4. Check if they have a developers' forum. This can act as an extra safety valve for your engineers, if the support will be slow to respond and a problem that occurs is critical, a developers forum might save the day. (nice to have)
5. Verify the opinions on industry directories. 
6. Verify the video quality. Practitioners need to be able to spot any changes in general presence or skin tone. Full HD should be enough.
7. Tech documentation. Before you decide, ask your engineers for their opinion on each solution and if the available specifications are understandable and up to date.

<div class="important-info"><h2>good to know: Web Real-time communication (WebRTC)</h2><div>With WebRTC, you can add real-time communication capabilities to your application that works on top of an open standard. It supports video, voice, and generic data to be sent between peers, allowing developers to build powerful voice- and video-communication solutions. The technology is available on all modern browsers as well as on native clients for all major platforms</div></div>

<div class="important-info"><h2>good to know: SDK vs API</h2><div>APIs are used to communicate between different applications, whilst an SDK is a tool kit to build applications and features. In most cases, an SDK application will contain an API — or even multiple APIs depending on the purpose of the software.</div></div>

8. Feature suggestions.

* chat and messaging;
* screen sharing;
* security and encryption protocols;
* recording;
* scheduling;
* file sharing;
* virtual waiting room.

## Video conferencing tools available to healthcare providers in 2024

*Please note that we are not affiliated with any of the mentioned providers. This comparison is made to help you out by mentioning the providers' “Google” and “G2” search results places as the most popular. The information provided in the below table is gathered from the official websites of these solutions.*

### Doxy.me

GDPR: Yes

HIPAA: Yes

Pricing starts from 35 USD (free plan available)
[doxy.me/en/pricing/](< https://doxy.me/en/pricing/>)

**Worth mentioning:**

* HD video and audio for an optimal experience. 
* Works directly in popular browsers without any downloads, plugins, or installations. 
* Identified by Clemson University research as the easiest telemedicine platform. 
* Personalization options with text, pictures, and videos for an engaging patient waiting experience. 
* Automatic tracking of each session's date, time, and duration for effortless record-keeping. 
* Accessible from almost anywhere using a mobile browser for flexible patient consultations.

### ZOOM for healthcare

GDPR: Yes (only paid plans)

HIPAA: Yes (only paid plans)

Pricing starts from 149.90 USD /year/user

https://zoom.us/pricing/healthcare/

**Worth mentioning:**

* Meetings up to 30 hours per meeting
* 100 Attendees per meeting
* Whiteboard Basic
* Team Chat
* Mail & Calendar Client & Service
* Cloud Storage 5GB

### GetStream

GDPR: Yes

HIPAA: Yes (only in enterprise plan)

Pricing: Pay as you Go available

[getstream.io/pricing/](https://getstream.io/pricing/#features)

**Worth mentioning:**

* Flexible video quality for an optimal experience. 
* Healthcare chat experience with SOC2, ISO 27001, GDPR.
* Enterprise grade uptime & performance + 99.999% uptime SLA available.
* Official Dolby.io partner for best in class video/audio calls.
* All the modern messaging essentials your users expect. Threads, replies, reactions, typing indicators and read state.
* Easy Integration
* Build chat using a combination of low-level API access and complete client-side SDKs to meet your needs.

### Go To

GDPR: Yes

HIPAA: Yes 

Pricing: starting from 12 USD /user/month

[goto.com/pricing/](https://www.goto.com/pricing/meeting)

**Worth mentioning:**

* Meeting locks and password protections create waiting rooms for patients just like an in-person practice.
* Video-based telehealth offers patients a convenient, safe option on any device, without sacrificing privacy.
* HIPAA-ready features and settings are pre-configured to provide the most comprehensive security.
* GoTo Resolve is an all-in-one IT management suite purpose-built for today's IT support challenges.
* 99,999% uptime
* Good variety of supported integrations.

### Google Meets

GDPR: Yes (under BAA)

HIPAA: Yes (under BAA)

But… 
“Customers are responsible for … ensuring that they use Google services in compliance with HIPAA.”

Pricing: Google workspace pricing plans

[workspace.google.com/pricing](https://workspace.google.com/pricing.html)

**Worth mentioning:**

* Google Meet offers high-definition video and clear audio quality, 
* Users can share their screens with others.
* Google Meet allows you to record meetings
* Real-time captioning is available 
* Integration with Google Workspace - Calendar, Gmail, and Google Drive, simplifying scheduling and document sharing.
* End-to-End Encryption
* Live Polls and Q&A

### MS Teams

GDPR: Yes 

HIPAA: Yes 

Pricing: MS 365 pricing plans

[microsoft.com/en-us/microsoft-teams/healthcare-solutions](https://www.microsoft.com/en-us/microsoft-teams/healthcare-solutions)

**Worth mentioning:**

* Tumor boards Use a virtual environment to admit and diagnose patients, start treatment, and review test results.
* Team coordination and collaboration across shared devices while adhering to compliance needs.​
* Knowledge and content sharing by hosting grand rounds to eliminate technology barriers.
* Virtual classes for prospective patients that cover a variety of topics.​
* Team huddles​ Address industry challenges related to patient care, safety, technology, equipment, process, and supplies.

### Whereby

GDPR: Yes

HIPAA: Yes 

Pricing: Pay as you Go available

[whereby.com/information/embedded/pricing](https://whereby.com/information/embedded/pricing)

**Worth mentioning:**

* Thanks to SDK with React hooks, you can fully customize the UI 
  virtual classroom experiences for students and teachers
* Embedded and Meetings plans
* Support, tutorial and full documentation available
* No app or software download required

### WEBEX by cisco

GDPR: Yes 

HIPAA: Yes 

Pricing: 14.50 USD/ month/user

[pricing.webex.com/us/en/hybrid-work/meetings/](https://pricing.webex.com/us/en/hybrid-work/meetings/)

[](https://pricing.webex.com/us/en/hybrid-work/meetings/)**Worth mentioning:**

* Strong AI focus and a dynamic ecosystem with incoming new features.
* Enables clinicians to send x-rays, treatment information, and screen recordings.
* Interactive patient experiences with new channels such as RCS and Apple Messages for Business. 
* Personalize patient experiences with custom buttons, carousels, list pickers, and video.

I hope you found something valuable in this article and the information shared can help you choose the video conferencing tool that is the right one for you and your organization. Also please keep in mind that we are neither favoring any mentioned tools nor trying to dissuade you from any other providers available on the market but not mentioned here. Thanks for reading!

<div class='block-button'><h2>discuss your video conferencing provider with our team</h2><div>If you need more assistance or guidance on choosing the right provider, or you are unsure if the solution you would like to implement is fitting for your current architecture, do not hesitate to reach out to us directly. Our tech experts will happily guide you through the details.</div><a href="/our-areas/healthcare-software-development/"><button>book a free consultation</button></a></div>