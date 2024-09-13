---
team_members:
  - azabost
  - fjablonski
  - piotr
  - szymek
our_service:
  - custom software development
layout: project
project_id: pos-bill-splitting
title: Crafting Stress-Free and Secure POS Bill Splitting for Restaurants
image: /images/case_study_bill_split_mechanism_pos.png
description: Bill splitting is a convenient way to share the cost for diners.
  Yet for waitstaff, it can be a source of stress, particularly when the
  technology doesn’t support them or even brings more hassle than benefits. Our
  team recognized this challenge and developed a stress-free splitting bill
  mechanism for restaurants. It involved navigating a maze of local tax
  regulations, ensuring every calculation was precise, analyzing secure data,
  and implementing a user-friendly interface for waitstaff.
hero_image: /images/case_study_bill_splitting.png
Hero Image_alt: POS bill split mechanism case study
social_media_previev: /images/fb_preview_case_study_bill_split_pos.png
social_media_previev_alt: restaurant bill split mechanism case study
bar_achievements:
  - number: "10"
    label: Years of collaboration
  - number: "2"
    label: iOS and Android POS apps
  - number: "2"
    label: countries where the system operates
tags:
  - fintech
  - retail & restaurant
  - customized software
title_team: the team behind the split bill
title_case_study: discover more solutions we built
title_contact: book a free consultation in 48 hours
description_contact: Tell us more about your mobile project or idea for an app.
  Fill out the form below and we'll get back to you in 48 hours.
order: 1
slug: pos-bill-splitting
show_team: true
show_case_study: true
show on homepage: false
published: true
work_in_progress: false
language: en
---
<TitleWithIcon sectionTitle="technologies" titleIcon="/images/skills.svg" titleIconAlt="technologies" />



<Gallery images='[{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/swift_icon_stack.svg","alt":"Swift"},{"src":"/images/firebase_logo_stack_new.svg","alt":"Firebase"},{"src":"/images/realm_stack_logo.svg","alt":"Realm"}]' />

**technologies**: Kotlin, Swift, Firebase, Realm, MixPanel, Fastlane

<TitleWithIcon sectionTitle="the problem: unsupporting bill splitting mechanism in POS systems" titleIcon="/images/icon_title_about.svg" titleIconAlt="problem" />

After enjoying a delicious three-course meal, clients are ready to settle the bill and free up the table. But then, the waitstaff hears those dreaded words: “Can we split the bill?” **While customers love the convenience of splitting bills, it might be a different story for the waitstaff**. Their frustration typically stems from a POS system that doesn’t truly support bill splitting, making the process stressful and prone to errors.

<TitleWithIcon sectionTitle="the solution: bill splitting mechanism navigating waitstaff through the process" titleIcon="/images/flag.png" titleIconAlt="the solution" />

For a decade of collaboration with POS provider Practi (later acquired by Just Eat Takeaway.com), **we developed numerous features and applications, including the bill splitting that supports restaurants across Israel and the United Kingdom**.

Our bill-splitting solution allows the POS system to handle all possible scenarios, **enabling the division of any component of the bill – from individual courses to delivery fees and tips**. Customers can also split the payment by paying with a credit card, cash, or coupons.

<div className="image">![The system divides the total costs into the specific payments.](/images/pos_bill_split.png "The system divides the total costs into the specific payments.")</div>

*The system divides the total costs into the specific payments.*

The system is designed to **fully support waitstaff by providing all necessary calculations through a user-friendly interface**, eliminating the need for manual calculations. Restaurant staff simply provides details about the number of splits, discounts, and chosen payment methods, and the system guides them through the entire process. **It not only calculates the correct amounts but also ensures that the appropriate taxes are applied after the split**.

<div className="image">![POS bill split mechanism for restaurants](/images/pos_bill_split4.png "POS bill split mechanism for restaurants")</div>

<TitleWithIcon sectionTitle="challenges: math dilemmas behind the code, secure payment analysis" titleIcon="/images/gearwheel.svg" titleIconAlt="challenges" />

Splitting the bill might seem like simple math to customers, but **complexities that require meticulous coding lie beneath the surface**. For instance, what if some customers want to pay only for specific meals while splitting the delivery fee, and one of them has a discount that applies only to their portion of the bill? What if one customer wishes to leave a tip that should be included in their part of the payment? What if the total payment cannot be evenly split (for example, try to divide $10 into three equal payments)? These scenarios quickly turn into mathematical challenges.

<div className="image">![tipping](/images/pos_bill_split3.png "tipping")</div>

Our team had to anticipate and account for a wide range of such possibilities, ensuring that every aspect – **from the division of costs down to the smallest decimal, to the accurate calculation of taxes, and the application of various discounts, whether they apply during specific hours or on particular bundles – was handled by the system**.

The ultimate solution to this challenge was to **conduct a meticulous analysis of as many possible cases as we could identify**. Therefore we needed to optimize our logging and monitoring systems to manage the enormous volume of data generated by these transactions, making it easier to debug and refine the feature in the future. 

Why was it necessary to scrutinize the payment process so deeply? Because what might seem like a simple restaurant payment can be fraught with potential issues. **From network problems and payment provider errors to complications with 3DS payment confirmations, there are many factors to consider**. Therefore, when building solutions that involve payment processing, it’s crucial to monitor data carefully to quickly identify and resolve issues, while maintaining a balance in the scope of data stored and analyzed.

This led to another significant challenge: ensuring that sensitive data, such as names, surnames, or card numbers, was not collected. **In adherence to PCI DSS (Payment Card Industry Data Security Standard) Compliance, we implemented DataDog with data obfuscation techniques, retaining only the essential data** required to trace backend communication with the client and monitor the entire payment processing path. Beyond data obfuscation, we implemented other security practices, such as **two-fold protection of cardholder data, encryption** of transmitted data, and the creation and maintenance of **access logs**.

<div className="image">![bill splitting UI](/images/pos_bill_split2.png "bill splitting UI")</div>

<TitleWithIcon sectionTitle="the result: reliable and secure bill split for restaurants" titleIcon="/images/icon_result_svg.svg" titleIconAlt="the results of the collaboration" />

**The bill split not only meets security requirements but also complies with tax regulations** in the UK and Israel, providing a stress-free and secure experience for both customers and waitstaff. It became an essential feature of the point-of-sale system offered by Practi (later known as Just Eat POS).