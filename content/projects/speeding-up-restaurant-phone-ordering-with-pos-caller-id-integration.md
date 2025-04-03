---
team_members:
  - fjablonski
  - lukasz
  - azabost
  - piotr
our_service:
  - POS development
layout: project
project_id: pos-caller-id
title: Speeding-Up Restaurant Phone Ordering with POS & Caller ID Integration
image: /images/case_study_caller_id_pos.png
description: From the phone ring to order acceptance in under a minute! Managing
  restaurant phone orders has always been challenging, but Caller ID integration
  proved to be the perfect remedy. Discover how we tailored the integration of
  point-of-sale and Caller ID for Practi POS (later known as Just Eat POS),
  making phone orders smoother than ever.
hero_image: /images/case_study_pos_caller_id__integration.png
Hero Image_alt: POS and Caller ID
social_media_previev: /images/fb_preview_case_study_caller_id_pos.png
social_media_previev_alt: POS and Caller ID integration
bar_achievements:
  - number: "10"
    label: Years of collaboration
  - number: "2"
    label: iOS and Android POS apps
  - number: "2"
    label: Countries where POS operates
tags:
  - customized software
  - mobile app
  - retail & restaurant
title_team: the team behind the POS & Caller ID solution
title_case_study: how we support our clients
title_contact: book a free consultation in 48 hours
description_contact: Tell us more about your point-of-sale system. Fill out the
  form below and we'll get back to you in 48 hours.
order: 1
slug: restaurant-pos-caller-id
show_team: true
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />

<Gallery images='[{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/android_stack_logo.svg","alt":"Android"},{"src":"/images/swift_icon_stack.svg","alt":"Swift"}]' />

**technologies:** Kotlin, Swift

<TitleWithIcon sectionTitle="the problem: time-consuming restaurant phone order processing " titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

Imagine managing hundreds of restaurant orders coming from different channels: 
online, in-house, and by phone. **Handling phone orders, in particular, can be especially time-consuming and error-prone**. Waitstaff must ensure that the details, from the order itself to the customer’s address and phone number, are accurately recorded. **This manual process consumes time and increases the risk of mistakes**, such as incorrect orders or deliveries to the wrong address.

When scaling the point-of-sale solution for Practi, a company later acquired by Just Eat Takeaway.com, we recognized the need to speed up the phone ordering process.

<TitleWithIcon sectionTitle="the solution: custom POS system integration with Caller ID" titleIcon="/images/flag.png" titleIconAlt="the solution" />

Our [POS development](/blog/pos-software-development-guide/) team recommended integrating the Practi POS system with a Caller ID to transform the phone ordering. So, what’s special about this integration? The Caller ID is a device that automatically transfers information about the incoming phone number to the restaurant's POS system. Yet it goes beyond just displaying a phone number. By **combining the Caller ID data with the POS system, the waitstaff instantly identifies the caller**, checks if they are a regular customer, and accesses their previous order history and delivery address.

<div className="image">![Caller ID and POS](/images/pos_caller_id_case_study.png "")</div>

In cases where the caller is a regular customer, **the waitstaff can quickly suggest the customer’s usual order** and any loyalty points earned are automatically added to the customer’s account. What’s more, if a customer calls to ask about the status of their order, the waitstaff has all the information without needing the customer to provide any additional details.

<TitleWithIcon sectionTitle="challenges: number validation, missing data, and unreliable networks" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

One of the issues we needed to face was the **lack of standardization for mobile country number prefixes**, such as +44. This meant that if a customer called from the same phone number but the system received it once with the prefix and once without, it would not recognize them as the same caller. This inconsistency could lead to duplicate entries and confusion in the order history. To address this, **we developed a custom validation solution that could recognize phone numbers as identical**, whether they included the country prefix or not. 

Another challenge we discovered during the testing phase was that occasionally **the information sent by Caller ID wasn’t captured**. The Caller ID device operates in broadcast mode, meaning **it transmits data across the network without directing it to a specific receiver, such as a POS application**. This created situations where the restaurant might not receive the caller’s information, compromising the reliability of the Caller ID integration. This issue influenced the way we designed the entire integration.

To address this challenge, **we explored a key feature of the Caller ID device: sending information multiple times across the network to ensure no phone number would be missed**. Building on the provided specifications, **our team developed the Caller ID and POS integration from scratch**, as no solution was provided by the device manufacturer. 

A crucial part of our solution was **filtering out duplicate inputs**, which naturally occur when Caller ID sends information multiple times. Our integration was designed to **ensure that even when the local network experiences disruptions, the POS application can still reliably capture caller information**.

<TitleWithIcon sectionTitle="the results: improving restaurant efficiency with Caller ID integration" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

Integrating Caller ID for restaurants resulted in **shorter call times and a more personalized experience** – customers felt recognized from the very first "hello". This integration was successfully implemented in restaurants across the UK and Israel, helping businesses improve order management and build stronger relationships with their customers.