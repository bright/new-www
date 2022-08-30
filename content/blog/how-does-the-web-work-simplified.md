---
author: wojciech
tags:
  - web
  - frontend
  - backend
date: 2022-08-30T13:02:44.038Z
title: How does the web work - simplified
layout: post
hidden: true
comments: false
published: true
---
Very often, when recruiting for a frontend/backend/fullstack developer, especially for junior positions, the question is asked - how is it actually that in the browser somebody enters a specific address and a website related to it appears? This question is good because it allows the recruiter to test knowledge from many fields at once by asking deeper into the topic, while the candidate answers. So let's try to provide a model answer to this type of question and attempt to predict a few additional questions from the recruiter during the answer to the original question.

<img src="/images/internet.webp" alt="web address" class="image" />

Before we start answering, let's make some assumptions, which are essential to get the answer started:

1. The computer is equipped with a browser, which is a program designed to view and download resources made available by web servers.

2. The computer is connected via a router/modem to an Internet service provider (ISP).

Our answer can be written as a sequence of steps that are performed in order:

1. You enter the URL in the web browser,

2. The entered URL address is translated into an IP address,

3. The web browser sends an HTTP request to the provided IP address

4. The server sends an HTTP response to the browser

5. The browser starts rendering the resulting HTML based on the received HTTP response.