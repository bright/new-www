---
team_members:
  - mateusz
our_service:
  - IoT development
layout: project
project_id: manufacturing-asset-tracking
title: Transforming Devices into Scalable Trackers for Manufacturing Asset Tracking
image: /images/case_study_manufacturing_asset_tracking.png
description: Can a lost device actually signal where it is? Yes! That was the
  breakthrough moment for a major firm in the manufacturing sector. Faced with
  growing losses from misplaced equipment, they approached us to find a solution
  – without investing in dedicated tracking hardware. What started as a
  cost-saving idea turned into a digital transformation in how they track,
  manage, and protect their assets.
hero_image: /images/case_study_asset_tracking_for_manufacturing.png
Hero Image_alt: manufacture
social_media_previev: /images/preview_case_study_manufacturing_asset_tracking.png
social_media_previev_alt: Manufacturing asset tracking
bar_achievements:
  - number: 89%
    label: of missing assets involve fraud
  - number: 24/7
    label: asset tracking
  - number: "2"
    label: iOS and Android apps
tags:
  - IoT
  - mobile app
  - bluetooth
title_team: team
title_case_study: explore more clients' stories
title_contact: hire us to build your unique asset tracking system
description_contact: Tell us more about your tech problems and we will help you
  find solutions! Fill out the form below and we'll get back to you in 48 hours.
order: 1
slug: manufacturing-asset-tracking
show_team: false
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />

<Gallery images='[{"src":"/images/swift_icon_stack.svg","alt":"Swift"},{"src":"/images/android_stack_logo.svg","alt":"Node.js"},{"src":"/images/bluetooth_stack_logo.svg","alt":"React"},{"src":"/images/zebra_technologies_stack_logo_bigger_new.svg","alt":"Zebra Technologies"}]' />

technologies: Swift, Android, Bluetooth Low Energy, Zebra Technologies

<TitleWithIcon sectionTitle="problem: financial loss from asset misplacement" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

When it comes to workplace fraud, most of it isn’t some elaborate heist – it’s just stuff quietly going missing. In fact, asset misappropriation accounts for [89%](https://bradyware.com/new-acfe-report-exposes-rising-fraud-costs-trends/) of all reported cases. For manufacturers, where machinery, tools, and mobile assets are constantly in motion, **the need for reliable asset tracking is more critical than ever**.

Traditionally, companies have relied on dedicated tracking hardware – physical devices attached to every asset to monitor its location and usage. While effective, **this method might be redundant** – especially in environments already equipped with a range of capable devices.

One of our clients in the manufacturing sector faced this exact dilemma. They had already invested heavily in mobile devices, including popular iOS and Android smartphones, as well as specialized **Zebra Technologies** hardware. The question was: **Could we transform these existing devices into a scalable asset tracking system?**

<TitleWithIcon sectionTitle="the solution: real-time manufacturing asset tracking system built on already owned devices" titleIcon="/images/flag.png" titleIconAlt="the solution" />

To address this challenge, we developed a scalable, software-based asset tracking network inspired by the principles behind **Apple’s iBeacon technology**. Our custom solution **leverages devices the company already owns** by transforming them into active participants in a decentralized tracking system.

Using **Bluetooth Low Energy (BLE)**, each mobile device can act either as a tracker or as a detector. By simply installing the application we built for the company, any iOS or Android device becomes capable of simulating a beacon signal. This means **the devices can both emit their presence and listen for signals from nearby assets** – essentially turning the entire mobile fleet into a dynamic, location-aware network.

Here’s how it works: if a device is lost, it can be marked as "missing" in the system. The next time another employee carrying a phone with our app passes nearby, their device picks up the BLE signal and sends a command to the lost asset. That command triggers **the lost device to vibrate and emit a loud sound, making it easy to locate** – even if it’s out of sight.

What’s more, the app logs when and where the missing item was last detected and by whom, creating a real-time trail of activity. This **transforms every employee’s pocket into a tool for tracking and recovery** – no extra hardware required.

<TitleWithIcon sectionTitle="challenges: adjusting to various devices and environmental factors blocking the signal" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

One of the biggest challenges was the **fragmentation in the Android ecosystem**. Every manufacturer tends to modify the Android operating system, which affects background behavior and Bluetooth scanning. A feature like continuous BLE scanning – essential for our solution – works flawlessly on one device but may be completely blocked on another. We had to ensure stability across a wide array of devices, from Zebra scanners to Samsung or Apple smartphones, each with their own quirks.

<div className="image">![device tracking](/images/manufacturing_asset_tracking_photo.png "device tracking")</div>

**Maintaining consistent background operation was critical** – and no small feat. Both Android and iOS place strict limitations on what apps can do in the background, especially when it comes to Bluetooth activity. We made it work by deeply optimizing the app's behavior, which required a **strong understanding of both Apple’s and Android’s native system**s. Just as important was designing a thoughtful permission strategy: from the very first onboarding screen, users were guided to grant all the necessary permissions to ensure the app could function reliably in the background.

What’s more, the **manufacturing asset tracking** app has to remain active at all times without significant drain of the battery. We optimized power consumption by batching network messages and reducing how often we processed Bluetooth events, without sacrificing responsiveness.

**Environmental factors** added another layer: solid concrete walls (common in Europe) versus thin drywall (typical in the US) significantly altered signal strength. Even human bodies – being mostly water – can block BLE signals when a device is held in hand.

Therefore **testing this system was a monumental task**. Our QA team became deeply familiar with countless edge cases – from interrupted data packets to the physical realities of the factory itself, including its layout, construction materials, and how they impacted signal behavior. 

All that effort paid off: by reproducing even the most specific and obscure conditions, we were able to **reduce unexpected bugs in the production environment** and deliver a more reliable product.

<TitleWithIcon sectionTitle="the results: safeguarding assets with real-time tracking" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

Every company-owned device is now **tracked in real time, 24/7** – reducing the risk of asset misplacement or misuse. Globally, businesses lose an estimated [5%](https://www.smallbizgenius.net/by-the-numbers/employee-theft-statistics/?utm_source=chatgpt.com) of their revenue annually to occupational fraud. By implementing a software-based tracking system that requires no additional hardware, a leading company in the manufacturing sector took a major step toward safeguarding their assets.