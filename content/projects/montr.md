---
layout: project
project_id: digitized-questionnaires
title: Digitized Questionnaires
image: /images/digitizing_mobile_reporting_main2.png
description: A web application that enables digitizing mobile reporting. It helps you to build, with no code, the digitized surveys for end-users. A great tool for audits.
tags:
  - web app
  - product design
  - MVP
  - IoT
  - custom software development
  - fintech
order: 4
slug: app-digitized-surveys
show on homepage: false
published: true
---
![web app development](/images/digitizing_mobile_reporting.png)

## Main features:

* Planning investigations
* Conducting a specific investigation
* Self-investigations for the inspection targets (with video chat option)
* Managing investigation projects 
* Creating questionnaires 
* Managing inspection targets and reporters
* Following ongoing investigations and their subjects on a map
* Generating PDF reports from investigations
* Offline mode
* Colours and logo customisation on a company level
* Third party integrations (API’s etc)

## Skills:

**Frontend:** React

**Backend:** Node.js

**Database:** PostgreSQL + Azure and Docker containers

## About

This is a web solution that helps to digitize the company work. The app can be easily customised according to the user's business needs. It helps to create and share digital questionnaires, reports and surveys. It is a perfect tool for companies that provide inspections and audits. Also, this is the first dedicated app for the social care team.

![web app development](/images/digitizing_mobile_reporting_app.png)

## Goal

The goal of the software development process was to build a solution that would be flexible, easy to adjust and available offline mode for users. Our aim was to develop a UX friendly no-code workflow that helped to create digital questionnaires or surveys by users to end-users in a convenient and quick way. For example, a real-estate agency could create a questionnaire for a client to establish what property they would like to buy.

## Process

We have already worked with this client on a mobile version of the app with similar functionality. This time the client wanted us to create a web app with an independent backend from scratch. The app needed to be simple to use and able to work offline as well.

One of the key aspects of the app is the need to operate offline without any interruption and to synchronize whenever a connection is restored. This requirement determined the following technological solutions:

* localStorage, Redux persist – they allow us to keep the needed data within the web browser,
* Service worker – used for queuing requests sent while being offline.

What is more, the web app needed to be responsive and work well both on desktop and mobile devices (phones and tablets) as most of the users are expected to work in the terrain. We used the media queries to adjust the styles depending on the screen resolution. 

## Result

Currently, the app is used by end-users to perform various types of questionnaire-based investigations. The end-users are highly satisfied with the ease of use. We take care of the maintenance and bug fixes, with some new features being introduced every now and then.
