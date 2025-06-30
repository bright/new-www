---
team_members:
  - mateusz
  - mateuszg
  - sebastian-r
our_service:
  - IoT development
layout: project
project_id: water-quality-monitoring
title: Building IoT-Based Water Quality Monitoring System for Fish Transportation
image: /images/case_study_water_monitoring.png
description: Maintaining food product quality isn’t just about logistics — it’s
  about trust and the right technology behind it. This case study looks at a
  custom IoT asset tracking system, developed to help a major seafood exporter
  monitor water conditions inside fish crates  — on any device they choose,
  including iPhones, or Zebra Technologies.
hero_image: /images/case_study_fish_transport.png
Hero Image_alt: water quality monitoring for fish transport
social_media_previev: /images/fb_preview_case_study_water_monitoring.png
social_media_previev_alt: water monitoring
bar_achievements:
  - number: "1"
    label: Custom IoT System
  - number: "2"
    label: Continents
  - number: "2"
    label: "Mobile platforms: iOS & Android"
tags:
  - IoT
  - mobile app
  - bluetooth
title_team: meet the team behind the solution
title_case_study: dive deeper into our portfolio
title_contact: hire us to build your unique monitoring system
description_contact: Tell us more about your tech challenges and we'll look for
  solutions! Fill out the form below and we'll get back to you within 1 business
  day.
order: 1
slug: water-quality-monitoring
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

<TitleWithIcon sectionTitle="problem: unreliable water monitoring for temperature-sensitive foods" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

In the food industry, precise temperature control during transportation is essential — fish transportation highlights the issue. As one of the most temperature-sensitive foods, **fish must stay between 0°C and 4°C (32°F to 39°F)**. Even small deviations can lead to contamination.

Yet maintaining this precision is difficult. One of the key problems we aimed to solve for a **global fisheries export company** is the ability to monitor the temperature inside each individual fish crate, ensuring freshness is maintained at every stage of the journey — not just the overall container.

<TitleWithIcon sectionTitle="the solution: IoT water management with real-time water monitoring" titleIcon="/images/flag.png" titleIconAlt="the solution" />

To address these challenges, we set out to build a custom IoT network specifically designed for food transportation and water management — **a system that monitors critical water conditions in real time, 24/7**.

We developed an integration with trackers capable of monitoring water parameters — including internal container temperature — directly inside fish crates. These trackers, paired with our custom-built software, allow the staff to **detect issues like overheating** **due to a lid left open or poor sealing**, helping maintain the ideal temperature range for maximum freshness.

<div className="image">![fish transportation water monitoring](/images/water_monitoring_case_study.png "fish transportation water monitoring")</div>

Now, the staff can monitor water conditions live and access detailed graphs showing temperature at every step of the journey — from packaging to delivery. The platform **works across both Android and iOS devices**, giving teams the flexibility to use the tools they already have.

While this is a major operational benefit, supporting such a wide range of mobile environments introduces its own set of technical challenges — especially when it comes to **ensuring stable, efficient background tracking**.

<TitleWithIcon sectionTitle="challenges: supporting a wide variety of mobile devices and ensuring continuous background operation" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

One major challenge was the **fragmentation of Android devices**. Each manufacturer — from Samsung through Xiaomi to Zebra Technologies — customizes the Android operating system. As a result, critical functionality like continuous background scanning for nearby trackers might work perfectly on one device, while not functioning at all on another.

To address this, we conducted extensive **device-level testing**, especially on models used by the fisheries export company’s team. Internally, we **test across multiple brands** to replicate edge cases and catch compatibility issues early.

<div className="image">![Fish export](/images/water_monitoring_case_study_fish_transport.png "Fish export")</div>

We also **designed a comprehensive onboarding process** during the app’s first launch to ensure all necessary permissions are granted such as access to Bluetooth and precise GPS location. This helps to ensure the app performs reliably across different environments and system versions.

On **iOS devices**, development was more streamlined due to the smaller number of models, but maintaining background operations still required careful tuning. Apple’s strict resource management policies meant our app needed additional optimization to function consistently in passive mode.

A key part of our approach is also **optimizing battery efficiency**. Since our solution relies on continuous Bluetooth scanning, we based it on **Bluetooth Low Energy (BLE)** and optimized the data flow.

Instead of sending data immediately to the backend, we batch and sync messages every 40 seconds, which keeps energy usage low without compromising data accuracy.

<TitleWithIcon sectionTitle="the results: reducing product waste and financial loss through reliable water monitoring" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

Thanks to the implementation of our custom IoT solution for water management, a leading seafood export company has significantly **reduced the risk of compliance issues** and brand damage related to fish freshness.

With continuous, real-time monitoring, the team can respond more quickly to negative conditions — helping **reduce product waste and, in turn, financial losses**.