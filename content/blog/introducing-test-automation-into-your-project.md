---
author: radek-l
secondAuthor: ""
thirdAuthor: ""
tags:
  - automation testing
  - QA
date: 2022-10-19T07:21:40.716Z
update_date: false
dateModified: 2022-10-19T07:21:40.746Z
title: Introducing Test Automation into your Project
layout: post
image: /images/test_automation_project.png
hidden: false
comments: true
published: true
---
![](https://lh4.googleusercontent.com/xHvYnSv4BZiOVO28x-5PHsEsxvrJLgQz5p36-4e_WmEjFHQRcMrRo3SWIBjTn-3oX3n39li2CBRG1h89tab1M-OI-2YeUnK9k6cBsykV0rmvRjKyfB69KISplsgi0Obf28G84TKm9b6qdwNo7XKZoBeONhcN9akmPIJI2UHDbz4gsgKqFRpZ6JUukg)

Implementing automated tests which concentrate on testing the entire working instance of the application is a challenging task. From picking the layers to verify (API, UI, or both?), through the kind of tests to implement (granular tests or compex user flows?) down to managing test data and picking the proper library for the job. Based on my experience I have prepared a set of guidelines about test automation enrollment. What aspects should you take into consideration?

## Understand the nature of your project

* Is it API-heavy?
* Is it UI-heavy?
* Does it have a mobile app?
* How much logic is put in the mobile app?
* Are there multiple mobile devices interacting with each other?
* Are there external dependencies to mock?
* Figure out the code architecture of the project itself. Verify if you can apply some principles to the code architecture of your automated tests. 
* Find documentation and validate it during test automation development planning.

## Understand the future of your project

* If there is some refactoring work scheduled for the next weeks, it is better to invest in API or UI tests which tend to be more black-box’ish. Investing time in unit tests for classes that are certain to be modified in the future is a wasted effort. 
* Is there work planned by business that would take advantage of a particular kind of test? Consider that to boost your development quality. 

## Figure out the spots that deserve testing the most

* Figure out the most crucial paths and elements: Core-Domain ([DDD Concept](/blog/domain-driven-design-explained-by-a-senior-backend-developer/)).
* Chat with your Project Manager, Manual QA Engineers and devs to figure out crucial elements from business, qa and dev perspective.
* Analyze the bugs reported in the last months.
* Figure out if anyone in the team has some experience with test automation.

## Consider which kind of test automation would bring the biggest benefit considering the cost and development time

That’s defined by an equation that consists of a few elements:

* What’s the current shape of your test pyramid?
* How much energy do we want to spend on automation?
* What’s the test automation knowledge in the team?
* What’s the area we have to cover?
* How much mocking/stubbing we should/need/must do?
* Do we have a reasonable working environment to execute the test against?

## Make sure your test automation is understood by business

* The more transparent the tests, test results, test data the more keen the business is to place effort in extending the test automation.
* Highlight the failures found by test automation on every occasion.

## Respect test data from day one

* Rely on static test data input as much as possible, because it's easier to prepare, debug and redo the test manually
* Static data + data removal is simpler to implement than dynamic data generation (That depends on the system characteristics though).

## Consider the technicalities

* Implement tests so you can run them in parallel.
* Make tests independent, easy to run, self-sustained.
* Data cleanups, database resets are welcome.

## Don’t bring the Unit test approach into Automated tests mentality

* Automated tests need a framework, setup and proper development. Structured and well layered set of classes and modules is a must.

## Make devs keen to run and extend the tests

* You want to make the tests enjoyable to run and extend by devs. Placing them in the same repository as the app’s code is the first step to achieve that.
* Take care of easy setup and run: tests should be set up with 3, 4 commands and run with a single one.
* Introduce automated tests implementation as a part of a given user story. Consider the flow with your QA.

## Give yourself some time and energy for refactorings, iterations and enhancements.

* Automated tests are a complex piece of code - just as the application itself. Embrace the challenge and accept the fact that it’s hard to make a reliable and scalable automation framework.

## Summary

There are many more aspects to be taken into account but these above seem to be essential in my opinion. Introducing Test Automation into your project is a hard task but if you feel like you have the skills go for it! I’d advise however to keep in touch with an experienced developer to consult the decisions about the structure of the framework. The concrete recipe for a successful test automation is hard to cover within a single blog post, but I think it is beneficial to at least ask yourself the questions and inspire yourself with the suggestions written above.

\-﻿--

S﻿pecial thanks to [Małgorzata](/about-us/malgorzata-z/) and [Michał](/about-us/michal-wa/) for their contribution.