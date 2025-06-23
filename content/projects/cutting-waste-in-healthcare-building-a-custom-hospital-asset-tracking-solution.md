---
team_members:
  - mateusz
our_service:
  - IoT development
layout: project
project_id: hospital-asset-tracking
title: "Cutting Waste in Healthcare: Building a Custom Hospital Asset Tracking
  Solution"
image: /images/case_study_hospital_asset_tracking.png
description: Our client, a provider of inventory tracking solutions, saw an
  opportunity to bring more clarity to hospital operations. By working together
  to adapt their platform for the healthcare sector we help hospitals not only
  track their assets, but also give time back to the people who save lives.
hero_image: /images/case_study_medical_asset_tracking.png
Hero Image_alt: hospital asset tracking case study
social_media_previev: /images/fb_preview_case_study_hospital_asset_tracking.png
social_media_previev_alt: hospital asset tracking case study
bar_achievements:
  - number: $30,000
    label: an ultrasound machine cost
  - number: ∞
    label: asset tracking
  - number: "2"
    label: iOS & Android apps
tags:
  - IoT
  - mobile app
  - bluetooth
title_team: meet the team behind the solution
title_case_study: explore our clients' stories
title_contact: hire us to build your unique asset tracking system
description_contact: Tell us more about your tech challenges and we'll look for
  solutions! Fill out the form below and we'll get back to you within 1 day.
order: 5
slug: hospital-asset-tracking
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

<TitleWithIcon sectionTitle="problem: the lack of hospital asset tracking" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

Hospitals are home to some of the most expensive and most critical assets in the world: life-saving medical equipment, an ultrasound machine can cost up to [30,000 USD](https://www.uscimaging.com/blog/ultrasound-machine-cost/), and even hospital beds, which can cost as much as [25,000 USD](https://hmedicalinc.com/2024/10/04/how-much-does-medical-equipment-cost/). These assets must always be available, well-maintained, and properly allocated.

<div className="image">![Healthcare asset tracking](/images/healthcare_asset_tracking.png "Healthcare asset tracking")</div>

Our client, a provider of advanced asset-tracking solutions, saw a unique opportunity to adapt their technology specifically for the medical industry. Their vision? A tailored **medical asset tracking** platform that could help hospitals reduce waste, optimize inventory management, and give doctors and nurses more time to focus on what matters most – patient care.

One of the key challenges they wanted to solve was time tracking during medical rounds. How long do doctors spend at each bed? Are there patterns that signal bottlenecks, or inefficiencies in ward routines? **Healthcare asset tracking** can offer answers to these questions.

<TitleWithIcon sectionTitle="the solution: tracking any device hospital management needs" titleIcon="/images/flag.png" titleIconAlt="the solution" />

To meet the hospitals’ unique needs, we adjusted the tracking app that we’ve been scaling for years so now it turns nearly any piece of hospital equipment into a traceable asset. It’s thanks to small trackers attached to devices, even hospital beds and a special **healthcare asset tracking** app developed by our team. 

With Bluetooth Low Energy (BLE) any mobile device running the app, whether it’s a nurse’s phone or an administrator’s tablet, can scan nearby assets to identify them, retrieve details, and even see their most recent location on a map.

Want to know where a particular ultrasound machine was last used? The app shows when and where it was moved. Can’t find a defibrillator that should be nearby? You can ping its tracker directly from the app, prompting it to make a sound, making it easier to locate in a high-pressure moment.

Beyond tracking movement, the platform can also collect and display sensor data. For example, BLE sensors placed around hospital rooms can monitor temperature in real time, allowing staff to view historical trends through an interactive dashboard. This is especially valuable in operating rooms, neonatal units, or laboratories, where even minor temperature fluctuations can affect patient safety or the reliability of medical procedures.

<div className="image">![medical asset tracking](/images/hospital_asset_tracking.png "Medical asset tracking")</div>

The **hospital asset tracking** app supports both iOS and Android devices, everything from iPhones, Samsung and Google Pixels to more rugged, industrial hardware like Zebra Technologies' phones. Hospitals can use the system in two ways: either by attaching trackers directly to assets, or by leveraging staff mobile phones as active participants in the network, acting both as scanners and trackers.

One of the most innovative uses? **Attaching trackers to hospital beds**. This enables real-time insight into daily medical rounds. By monitoring how long doctors spend at each bed, hospital managers can better understand patterns, optimize schedules, and predict when a physician will be free for consultations or urgent tasks.

<TitleWithIcon sectionTitle="challenges: device fragmentation, battery consumption, adjusting to hospital environment" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

One of the main technical hurdles (particularly on Android devices) is the **sheer diversity of phone manufacturers**. Many manufacturers apply their own custom overlays over the standard Android operating system, which often affects the background processes.

This had a direct impact on one of our core features: **continuous scanning for nearby trackers**, even when the app runs in the background. On some devices, this functionality works flawlessly, on others, with some disturbances.

To tackle this, we took a hands-on, multi-pronged approach. We tested our app on a wide range of devices, each from a different brand. We paid special attention to models known for custom firmware, like Samsung (with its One UI overlay) and rugged enterprise-grade devices like Zebra. To support this technically, we:

* built countless unit tests to maintain logic consistency;  
* ran extensive manual testing, supported by a dedicated QA specialist;  
* conducted full regression testing before every release;  
* end-to-end (E2E) automated tests that verify app functionality without any developer or tester interference, eliminating the risk of human error during the testing process.

We also made **app onboarding** as thorough as possible. On first installation, users are guided through a detailed setup flow where they grant essential permissions: Bluetooth access, precise GPS location, notification permissions, and disabling battery optimization. We also request the SCHEDULE_EXACT_ALARM permission, which allows the app to perform regular health checks, ensuring that background processes are running correctly and the system continues to operate as expected.

<div className="image">![Hospital asset tracking](/images/hospital_asset_tracking_photo3.png "Hospital asset tracking")</div>

Another major concern was **battery consumption**. Since the app must constantly listen for Bluetooth signals, some level of battery impact is unavoidable. Our goal was to minimize that effect as much as possible. While listening has to happen in real-time, we optimized the parts of the app responsible for processing and syncing data. Instead of sending every detected event immediately to the backend, we bundle them and send updates every 40 seconds in efficient batches. This significantly reduced unnecessary energy use without compromising accuracy.

We also encountered environment-specific edge cases. Every hospital is different, not just in layout, but in construction. **Hospital buildings are often large, with thick concrete walls, long corridors, and complex floor plans**. Bluetooth signals can weaken or drop entirely depending on where a device is located. In some cases, we had to adjust parameters or behavior in the app to adapt to the specific challenges of a particular hospital's infrastructure.

<TitleWithIcon sectionTitle="the results: A broader tracking offering for our client – and greater control for their users" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

By transforming our client’s inventory system into a **medical asset tracking** solution, we helped them successfully enter the healthcare industry. Medical equipment typically accounts for around [10%](https://www.aha.org/costsofcaring) of a hospital’s total budget. But equipment is only part of the equation. 

Labor remains the single largest cost for hospitals – and one of the hardest to optimize without reliable data. The **hospital asset tracking** system gives administrators a clear view into how staff time is spent, especially during daily medical rounds. In a system where every second matters, this kind of visibility doesn’t just boost operations, it helps put more time back where it's needed the most – patient’s sake.