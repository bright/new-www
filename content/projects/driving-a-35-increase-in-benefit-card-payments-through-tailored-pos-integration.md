---
team_members:
  - agata
  - klaudiusz
  - mateuszg
  - joanna-c
our_service:
  - POS development
layout: project
project_id: benefit-cards-pos
title: Driving a 35% Increase in Benefit Card Payments Through Tailored POS
  Integration
image: /images/case_study_pos_benefit_cards_loyalty_programs_integration.png
description: >
  When a fast-growing restaurant chain asked our client, a POS vendor, to
  support benefit and loyalty cards like Multipass and Verifone, we stepped in
  to turn that request into reality. The result? Flexible payment options for
  end consumers, and a stronger position for our client in the POS market.
hero_image: /images/case_study_pos_benefit_cards.png
Hero Image_alt: POS payment integration with benefit cards loyalty programs
social_media_previev: /images/fb_preview_case_study_poa_integration_payment.png
social_media_previev_alt: POS payment integration with benefit cards loyalty programs
bar_achievements:
  - number: "1"
    label: POS
  - number: "5"
    label: New payment providers
  - number: 35%
    label: Increase in benefit card payments
tags:
  - retail & restaurant
  - customized software
title_team: meet the team behind the solution
title_case_study: explore other success stories
title_contact: hire us to build your unique POS integration
description_contact: Tell us more about your tech problems and we will help you
  find solutions! Fill out the form below and we'll get back to you in 48 hours.
order: 1
slug: pos-integration-benefit-loyalty-cards
show_team: true
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />

<Gallery images='[{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/springboot_update.svg","alt":"Spring Boot"},{"src":"/images/aws_stack_logoupdate2.svg","alt":"AWS"},{"src":"/images/dot_net_stack.svg","alt":".net"},{"src":"/images/flutter.svg","alt":"Flutter"},{"src":"/images/grafana.svg","alt":"Grafana"}]' />

technologies: Kotlin, Spring boot, AWS ECS, .net, Flutter, Grafana

<TitleWithIcon sectionTitle="problem: gaps in payment method support for restaurant clients" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

A leading point-of-sale vendor needed to expand their payment offering as part of a broader [POS legacy system modernization](/projects/pos-legacy/). The goal was to support a wider range of secure payment options, including **benefit cards, employee meal cards and loyalty programs**, alongside traditional methods like cash and credit cards.

<TitleWithIcon sectionTitle="the solution: new payment providers integrated into the POS" titleIcon="/images/flag.png" titleIconAlt="the solution" />

We centered this [POS integration](/blog/pos-integration/) around major benefit cards and loyalty cards in the Israeli market, where our client operates, including payment providers such as **Multipass, Verifone, Cibus, and Value Card**.

To meet the client's needs, we built a comprehensive integration that connected their iPad-based POS systems with various payment providers via a real-time API. This allowed restaurant staff to offer a seamless checkout experience – customers could now select their preferred payment method, including **benefit cards**, and the system would automatically apply relevant discounts or benefits.

Technically, the integration works by sending a charge request from the POS to the external payment provider’s API, debiting the customer’s account with the order amount. The system then uses the provider’s response to update the payment status within the POS.

<TitleWithIcon sectionTitle="challenges: priorities, documentation gaps, and payment logic variations" titleIcon="/images/gearwheel.svg" titleIconAlt="challenge" />

One of the first challenges was strategic: with plans to integrate with five different payment providers, we had to prioritize carefully. We worked closely with the client to **identify the most critical payment providers** for their restaurant clients and started implementation there, ensuring maximum value early in the project.

A significant hurdle was the **limited or inconsistent technical documentation** from some of the third-party payment providers. While a few partners offered robust, well-documented APIs, others required a more hands-on approach. We engaged in extensive, thoughtful email correspondence with provider support teams to clarify edge cases.

We also faced the challenge of **unifying payment logic and mapping discounts and confirmations** across all third-parties. Each payment provider had a slightly different process flow, response format, and timing. To maintain a consistent user experience and back-end reporting logic, we had to **adapt our internal system to normalize these differences**. It ensured that every transaction, regardless of provider, was correctly processed, recorded, and confirmed.

To solve this, we developed for the POS system a **dedicated microservice** responsible for managing communication with external payment providers. This service acted as a proxy layer, handling request formatting, authentication, and response parsing. We also built a lightweight service that **mapped the local order data into a standardized payment request format** and routed it through the microservice. This architecture not only simplified the client-side logic but also made it easier to scale and onboard new providers over time.

<TitleWithIcon sectionTitle="the results: increased redemptions and strengthened market position" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

The impact of the integration was clear almost immediately. In just the first month after launch, **meal purchase through benefit cards rose by 35%**, indicating strong user adoption and improved convenience for customers.

By the end of the implementation, restaurants gained access to a broader set of payment options beyond the usual methods. This added flexibility not only improved the customer experience but also **strengthened our client’s position** in the highly competitive point-of-sale market.