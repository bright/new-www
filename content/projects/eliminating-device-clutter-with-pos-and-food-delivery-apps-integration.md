---
team_members:
  - tomasz-sch
  - karol r
  - michal
  - piotr
our_service:
  - POS food delivery platforms integration
layout: project
project_id: delivery-integrations-pos
title: Eliminating Device Clutter with POS and Food Delivery Apps Integration
image: /images/case_study_third_party_delivery.png
description: From Uber Eats, Wolt to Just Eat and beyond, managing online orders
  from multiple food delivery platforms is challenging for busy waitstaff. To
  address this, while scaling the POS system for our client Practi (acquired by
  Just Eat Takeaway.com), we developed a solution that synchronizes all orders
  from various food delivery apps into a single device. Read the full story of
  how this integration alters restaurant operations.
hero_image: /images/case_study_pos_food_delivery_integration.png
Hero Image_alt: POS and third-party delivery providers intergation
social_media_previev: /images/fb_preview_case_study_integration_delivery_providers_pos.png
social_media_previev_alt: POS and food delivery integration case study
bar_achievements:
  - number: "10"
    label: Years of collaboration
  - number: "5"
    label: Food delivery partners integrated with POS
  - number: "2"
    label: Countries where POS operates
tags:
  - retail & restaurant
  - customized software
title_team: meet the team behind the solution
title_case_study: how we support our clients
title_contact: book a free consultation in 48 hours
description_contact: Tell us more about your POS system. Fill out the form below
  and we'll get back to you in 48 hours.
order: 99
slug: pos-third-party-delivery
show_team: true
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />

<Gallery images='[{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/springboot_update.svg","alt":"Spring Boot"},{"src":"/images/aws_stack_logo_update.svg"},{"src":"/images/case-study_typescript_stack-logo.svg","alt":"TypeScript"}]' />

**technologies**: Kotlin, SpringBoot, AWS, TypeScript

<TitleWithIcon sectionTitle="the problem: handling online orders from various third-party delivery providers" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

Let’s step behind the restaurant counter and observe the waitstaff in action. In addition to serving in-house guests, they must **manage online orders from third-party food delivery platforms** like Wolt and Uber Eats. **Each platform provides its own device for managing orders**, adding to the growing number of devices that already overwhelm the busy staff (from a point-of-sale desktop to payment terminals, thermal printers, and more).

But **what if all third-party, in-house, and phone orders were automatically integrated into a single device**? That was the goal of the food delivery providers integration we developed for the Practi POS provider (later known as **Just Eat POS**) for restaurants in Israel and the UK.

<YouTubeEmbed url='https://www.youtube.com/watch?v=-pUtXXxpsFg' />

<TitleWithIcon sectionTitle="the solution: all restaurant orders synchronized on one device" titleIcon="/images/flag.png" titleIconAlt="the solution:" />

A key aspect of this integration is menu synchronization. Any changes to the menu – such as prices, unavailable items, or ingredients – are automatically updated across all food delivery platforms, eliminating the need for waitstaff to manually update each one. 

However, if a restaurant wants to for example set different prices for various platforms, they can easily make those adjustments using the simple POS interface:

<div className="image">![POS delivery integration UI](/images/pos_delivery_integration_ui.png "POS UI")</div>

The true gem of this integration is **the real-time synchronization of every order on the Just Eat POS system**. Whether it's an online, on-site, or phone order, all information is automatically displayed on the primary POS device. This means the waitstaff can finally retire the multiple devices provided by third-party platforms. Now, **everything is accessible through the Just Eat POS device – the only one the restaurant needs**.

This automation also eliminates the errors occurring when busy staff manually transfer online orders to the main POS device so they can be sent to the kitchen. Now, **orders are processed automatically, speeding up meal preparation and delivery**. What’s more, order statuses are available on the same device, **keeping the waitstaff informed** throughout the process – from order acceptance to delivery.

<div className="image">![POS UI](/images/pos_delivery_integration.png "POS UI")</div>

Integration with food delivery platforms aligned perfectly with other parts of the multifunctional Just Eat POS. For example, **if a restaurant prefers to manage deliveries in-house, they can also use the [delivery drivers application](/projects/delivery-drivers-app/) offered by Just Eat POS**. Thanks to order synchronization, every order is available in the app, making it easy to coordinate deliveries. The app provides drivers with all the necessary information for a successful delivery, including the customer’s address, navigation with a map, and payment status.

<TitleWithIcon sectionTitle="challenges: synchronization with unstable connection, achieving real-time updates" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

The **greatest technical challenges lie in menu and order synchronization**. To keep all data synced across multiple platforms, restaurants rely on a stable internet connection, which isn’t always guaranteed. In cases of lost connectivity, our team implemented solutions to ensure proper synchronization as soon as possible. **We developed automatic monitoring of the integration status, continuously checking connection stability**. If disruptions occur, the system will automatically restore the connection once available to synchronize all menu and order information.

Additionally, to achieve real-time order updates, **we had to design a mechanism that would automatically receive, verify, and process every order**. The POS system also updates order statuses and driver information, ensuring this data is available to the third-party provider. For example, with Just Eat POS, **users can track the order's delivery progress, even though the waitstaff manages the order exclusively through the POS device**.

Another challenge related to synchronization was **automating the import of menus from third-party providers to sync with the POS**. This was difficult due to the complex meal sets, with multiple bundles, and add-ons, as well as the different data structures used by each food delivery app. Our team had to analyze these differences and **implement a mechanism to transform the various data structures into a unified format**, ensuring synchronization with the POS system while accommodating the complexities of meal sets, bundles, and add-ons.

<TitleWithIcon sectionTitle="the results: standing out through integrations with numerous food delivery providers" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

Food delivery integration has been one of the most impactful changes, instantly making the waitstaff's work easier. Thanks to this integration, **Just Eat POS has firmly established itself as a truly versatile solution, offering connections with a wide range of third-party providers**. Our team developed this integration from scratch, along with dozens of other applications and features built for Practi (Just Eat POS) throughout our decade-long partnership.