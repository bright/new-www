---
team_members:
  - szymek
our_service:
  - mobile app development
layout: project
project_id: navigation-driver-app
title: Implementing Sygic GPS Navigation into Driver’s Application
image: /images/case_study_navigation_driver_app.png
description: Drivers are the lifeblood of any road logistics network. So, when
  digitalizing operations for a freight forwarding company, we knew a key piece
  of the puzzle would be a driver mobile app. It needed to do more than just
  display jobs or share documents – it had to guide drivers across borders
  through accurate navigation. In this story, we share how we tackled the
  integration with the external navigation system – Sygic, and the decision
  process behind choosing the navigation provider.
hero_image: /images/case_study_navigation.png
Hero Image_alt: Implementing Sygic GPS Navigation
social_media_previev: /images/fb_preview_case_study_navigation_drivers_app.png
social_media_previev_alt: Sygic navigation implementation
bar_achievements:
  - number: Unlimited
    label: Waypoints
  - number: "42"
    label: Countries
  - number: 1000+
    label: Vehicles
tags:
  - mobile app
  - customized software
  - product design
title_team: team
title_case_study: dive deeper into our portfolio
title_contact: hire us to scale your transport management system
description_contact: Tell us more about your tech challenges. Fill out the form
  below and we'll get back to you in 48 hours.
order: 2
slug: navigation-driver-app-integration
show_team: false
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />

<Gallery images='[{"src":"/images/android_stack_logo.svg","alt":"Android"},{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/figma_update_stack_logo.svg","alt":"Figma"}]' />

technologies: Android, Kotlin, Figma.

<TitleWithIcon sectionTitle="problem: unprecise mileage estimation and tracking" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

Our client, a [transportation services provider](/projects/transportation-management-system/), wanted to introduce a new process where **dispatchers create predefined routes that drivers must strictly follow**. This ensures precise mileage tracking, making it **easier to accurately settle payments with drivers** based on kilometers traveled. To achieve this, the system required seamless integration with a navigation solution that would ensure couriers adhere to the exact routes designed by freight forwarders.

While we had the freedom to choose the right navigation system, the client emphasized one critical requirement: **the predefined route must remain unchanged**, helping drivers stay on the exact route planned by the dispatcher.

<TitleWithIcon sectionTitle="the solution: custom integration with navigation system Sygic" titleIcon="/images/flag.png" titleIconAlt="the solution:" />

After careful research, the best option seemed to be **Sygic navigation** because it was the only solution we found at that moment providing the crucial functionality our client required. Sygic allowed routing based on a **fully predefined path**, with **no limits on the number of waypoints** and without displaying them on the map during navigation.

Most available popular navigation systems offered navigation based on specific coordinates, but they had limitations. Some displayed coordinates on the map during navigation, while others restricted the number of waypoints (typically around **150**), which would be problematic and inaccurate for long-haul routes – such as from Estonia to Portugal.

To enhance usability, **Sygic navigation should be embedded directly into our application** rather than redirecting users to an external app. While both approaches have pros and cons, we prioritized usability:

* **Drivers don’t have to install an additional app**, which would have been a major obstacle given their limited time.  
* **We maintain better control over the navigation experience**, whereas relying on an external app would leave us with no influence over its behavior or potential updates.

What’s more, based on the details of a given route, the app would display map download recommendations. Most drivers turn off mobile data when traveling through Switzerland due to high roaming costs, so if a route included Swiss territory, the app would notify the driver before the journey began – prompting them to download the necessary maps in advance and ensuring they were fully prepared for the trip.

<div className="image">![UI navigation](/images/ui_navigation_design_case_study.png "UI navigation")</div>

<TitleWithIcon sectionTitle="challenges: finding the right navigation solution, licensing design" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

The research phase was definitely a challenge, as the client had very specific requirements.\
As part of our research, **we held discussions with various navigation providers** to assess their capabilities.

Developing this **Proof of Concept (POC)** also proved to be complex. During the testing phase with Sygic, we submitted numerous requests for adjustments to their SDK to better align with our requirements.

Another key challenge we faced was **licensing design**. Sygic’s licensing model is based on either a per-device or per-unique-ID approach, so we had to carefully develop an optimal licensing strategy within our Transportation Management System (TMS) to keep costs under control.

We designed the **licensing system to be per vehicle**, as staff rotation is more frequent than changes to the fleet. When a driver is assigned a specific vehicle for a given time period, they receive a corresponding license. Once their assignment ends and they switch to another vehicle, they are issued a different license.

<div className="image">![navigation Sygic case study](/images/case_study_navigation_drivers_app.png "navigation Sygic case study")</div>

<TitleWithIcon sectionTitle="the results: Proof of Concept ready to add value to client’s system" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

We have developed a **fully functional Proof of Concept**, which is currently undergoing testing by the client’s staff, particularly freight forwarders and drivers. The implemented navigation system includes all necessary features to ensure accurate route estimation and maintain proper payment settlement, helping to avoid inconsistencies caused by incorrect routing.