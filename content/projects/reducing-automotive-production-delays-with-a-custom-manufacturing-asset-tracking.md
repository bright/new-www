---
team_members:
  - mateusz
our_service:
  - asset-tracking
layout: project
project_id: asset-tracking-vehicle-manufacturing
title: Reducing Automotive Production Delays with a Custom Manufacturing Asset
  Tracking
image: /images/case_study_pos_benefit_cards_asset_tracking_for_manufacturing_update.png
description: "While scaling a custom asset tracking platform over the past 7
  years for our client – a provider of tracking solutions we encountered a new
  challenge: applying it to the automotive manufacturing industry. Find out how
  we tailored a Bluetooth-based application for a leading vehicle manufacturer
  to support live production tracking."
hero_image: /images/case_study_asset_tracking_manufacturing.png
Hero Image_alt: asset tracking for manufacturing
social_media_previev: /images/fb_preview_case_study_automotive_asset_tracking_manufacturing.png
social_media_previev_alt: manufacturing asset tracking
bar_achievements:
  - number: "7"
    label: years of collaboration
  - number: 10 sec
    label: till a new car enters production
  - number: 30k
    label: parts in a single vehicle
tags:
  - IoT
  - mobile app
  - bluetooth
  - customized software
title_team: the team
title_case_study: more clients' stories
title_contact: hire us to build tailored asset tracking
description_contact: Tell us more about your tech challenges and we'll look for
  solutions! Fill out the form below and we'll get back to you within 1 business
  day.
order: 4
slug: asset-tracking-car-manufacturing
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

<TitleWithIcon sectionTitle="problem: the bottlenecks at the production line you can’t see" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

A typical car contains **[around 30,000 individual parts](https://collectorsautosupply.com/blog/how-many-parts-are-in-a-car/)** and every one of them has to arrive and fit into the right place at the right time within a highly complex manufacturing environment. With a process this intricate, how do you even begin to spot what needs improving? This is exactly the challenge one of our clients – a provider of advanced asset tracking solutions set out to solve for a key player in the sector.

Their end customer (a leading car manufacturer) needed a custom asset tracking system that would allow them to **track car components along the assembly line**, monitor **how long it takes to build an entire vehicle**, and identify **where delays happen and why**. The goal? To pinpoint the weakest links in the production chain and make smarter, real-time decisions to improve efficiency without guesswork or unnecessary warehousing.

<TitleWithIcon sectionTitle="the solution: turning movement into insight with manufacturing asset tracking" titleIcon="/images/flag.png" titleIconAlt="the solution" />

The system we develop operates in real-time, on the **assembly floor**, where each car-in-progress moves from one workstation to the next. At every station, a **gateway box is** installed. When a **tracker attached to a vehicle** comes into range, the system logs its location and displays the data live in the admin console.

To monitor the production line, each vehicle is equipped with a small tracker. Yet the tracking process doesn’t start with a sensor – it starts with a person. The first step involves a factory worker equipped with a **handheld scanner** and our **mobile app**. At the start of the line, the employee scans a **QR code** of the tracker attached to the car component, linking it to the asset via the app.

This pairing process has to be lightning fast. A new vehicle arrives every **10 seconds**, leaving only a brief window for scanning and syncing before the next car rolls in.

To meet these constraints, we had to:

* Optimize for **ultra-fast connection speeds** to pair trackers in real time  
* Build an interface that supports fast recognition and error handling  
* Eliminate anything that could slow down the user, including loading animations or complex screens  
* **Design a clean, minimalist notification system** to confirm success instantly, with no extra taps or distractions

This isn’t just a technical integration – it’s a deep collaboration with the people on the floor. We work to understand their pace, their constraints, and the rhythm of their daily work.  

<TitleWithIcon sectionTitle="adjusting asset tracking to automotive manufacturing settings" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />
Building a fast, responsive asset tracking system is one thing. Making it reliable across an unpredictable manufacturing floor is another.

To enable real time asset tracking we needed to maintain stable **background operation** across both Android and Apple devices used by the particular manufacturer company staff. Both platforms limit what apps can do in the background, especially with Bluetooth. To overcome this, we deeply optimized the app’s behavior and built an **onboarding and permission granting strategy**. From the first launch, users were guided to enable exactly what was needed which means no guesswork and no digging into settings menus.

We also had to make sure the system didn’t **drain device batteries**, especially since it needs to run all day in a high-paced production environment. We achieved this by **batching network messages**, minimizing Bluetooth processing, and fine-tuning how and when the app wakes up in the background.

The physical environment introduced its own set of challenges. Bluetooth Low Energy signal strength can be disrupted by all kinds of factors:

* **Thick concrete walls** (common in European factories) reduce signal range
* **Factory layouts** create unexpected dead zones or interference
* Even **human bodies**, mostly made of water, could block signals simply by the user holding the device a certain way

Testing this system wasn’t just a technical checklist, it was a full exploration of the factory's reality. Our QA team spent weeks reproducing obscure edge cases: dropped packets, gateway collisions, signal distortion due to metal machinery. By simulating even the most unlikely scenarios, we were able to harden the system for the unexpected and deliver a tracking solution that performs under real-world pressure.

<TitleWithIcon sectionTitle="the results:  Real data that protects against delays" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

With manufacturing asset tracking in place, managers get access to live production data they can act on instantly.

The system makes it clear which stations consistently slow down the line, helping to find the reasons why. In some cases, the delays in manufacturing might be caused by staffing issues: not enough machine operators to keep up with demand. In others, frequent malfunctions might reveal the need for stronger preventive maintenance at specific workstations. 

<div className="image">![car manufacturing](/images/asset_tracking_production_automotive.png "car manufacturing")</div>

The data can also reveal different problems hidden in the factory layout itself. In certain areas, just moving parts from one station to the next situated on the other side of the factory might take too much time. That can lead to a larger discussion about floor design – and in several cases, a rearrangement of workstations led to improvements in production speed.

These are just a few examples of how manufacturing asset tracking can help change guesswork into proactive optimization. With clear, reliable data driven decision-making, the automotive companies could prevent delays, and reduce inefficiencies. Yet **the key to success lies in customization** – with asset tracking, every detail of a business’s operations can influence how well the software performs.