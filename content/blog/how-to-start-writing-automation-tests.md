---
author: malgorzata-z
tags:
  - QA
date: 2022-06-06T09:47:30.104Z
title: How to Start Writing Automation Tests
layout: post
image: /images/gosia_automation_tests_blog.png
hidden: false
comments: true
published: true
---
**You are a manual tester and you would like to start writing automation tests but you don’t know how to start. You even learn some programming language but what next? How to start writing automation tests? How to choose the right language and framework? Which test should be your first automated one? Here is my guide on how to switch from manual to automation tester.**

![How to Start Writing Automation Tests](/images/gosia_automation_tests_blog.png)

## How I started writing UI automation tests

Actually, I wasn’t a manual tester before starting automation tests. I was testing some applications but not in the Software Tester position, so I didn’t know much about test cases, etc. I just bought a book about JavaScript and started learning JavaScript, HTML and CSS from free tutorials like Codecademy or Coursera. I also chose an existing webpage and wrote it from scratch (without JS, just CSS) to practice HTML and CSS. I watched some free videos on YouTube. **I took part in many challenges on platforms like Codewars** to get points and finally, **I wrote some games** like memory or ping-pong to build my GitHub profile. **When I got stuck I just asked my friend, who is a developer, for a hint on how to move on**. 

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/gLiyt8QwcHA5ZvLwaF" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/roosterteeth-rooster-teeth-no-idea-funhaus-gLiyt8QwcHA5ZvLwaF">via GIPHY</a></p>

At some point I didn’t know if I had sufficient knowledge and what to do next. It was exactly this time when I started writing tests using WebdriverIO. **The language or tool to learn doesn’t matter much. The most important thing is just to start writing code**. Shortly after that (3 months later) I got a job in which I was writing automation tests from scratch. It was the best practice for me. I understood quickly what flaky tests are, how many tests I should write, etc. With this experience, it was easier to write tests in other frameworks like Cucumber, Cypress, Playwright, etc.

This was my road to writing tests. I didn’t know how to start, I just knew that I could and I would do it. **Now based on my experience I would like to show you how easy it is to start writing automation tests**, especially when you are a Software Tester. 

## When can you start automation testing?

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o7TKTDn976rzVgky4" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/colbertlateshow-stephen-colbert-3o7TKTDn976rzVgky4">via GIPHY</a></p>

I assume that you have good knowledge about the product which you test manually. Certainly, you wrote some test cases and you know which of them you test more than others. Also, **you are aware which test cases are repeatable and are prone to bugs. These are test cases that could be automated**. So at the beginning, you can start writing a test plan for automation tests including them.

## Choose the programming language for test automation

You need to choose in which language you want to write automation tests. I think this decision should be made by the whole team. **Automation tests are part of the application, so maybe it’s worth having it in the same language**. After making a decision you can start learning. There are a lot of free tutorials on the Internet. It is worth being familiar also with HTML and CSS for looking for and writing selectors. 

When I was learning a programming language to start writing automated tests I had a pretty common problem. I did all these free tutorials, I had all the basic knowledge but still didn’t know how to start. I was wondering how much I need to know about programming language to start? I started doing some tasks for points and creating some games for my portfolio, but I still had this one question in my mind: **is that knowledge enough to start**? For me, it was the most difficult time during my learning. **I didn’t know what to do next, I got just stuck and couldn’t move on. It turned out that I didn’t need to have comprehensive knowledge to write my first test, basic skills were really sufficient**. The answer was easy, it was simply the right time! I was ready to stop learning programming language and begin creating tests.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/dUJxUPSkmZBqE" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/idea-epiphany-dUJxUPSkmZBqE">via GIPHY</a></p>

## Choose the framework for test automation

The next step after learning a programming language is **choosing the framework in which you will be creating UI automation tests**. You should think about what you need. Does your product have 3rd party authentication? Do you need to open a new tab in the browser and do some operations there? 

Why am I asking such questions? **I’ll give you an example.** Some time ago after work, I wanted to learn Cypress. It’s a very widely used and popular framework, so I wanted to know it and I also wanted to write some automation tests for someone's app. It occurs that it’s not easy to write a test for authentication when your product uses 3rd party authentication (login to your app using Google, Microsoft, etc). There were some workarounds but it was time-consuming and having other problems it was easier to choose another framework. 

The second problem is that Cypress doesn’t support switching tabs at all. I needed to switch to another tab and do some actions, but I couldn’t. Cypress is a great option for most of you who are starting, on the Internet, you can find many tutorials, videos, etc. But what I want to say is that not every simple framework offers simple solutions. Sometimes it’s better to choose for a first glance a more difficult framework because in practice it’s easier. In this situation, **I left Cypress and wrote automation tests in Puppeteer**, because it fits my needs. 

To sum up, firstly you have to think if your test cases from the test plan, which you created at the beginning, are easy to implement in the framework which you want to use. How do you know which framework is the best if you don’t have any experience? From my point of view, the best way is to **read the documentation and try some of them**. In the worst case, you will gain extra experience.

## Create your first automation test

When you finish your basic training and choose a framework then you can finally start writing your first test. Each framework has documentation on how to install it and how to write the first test. If it’s not enough for you, **I recommend finding some repository with automation tests in your chosen framework and just cloning it to see how they set up it and written tests**. You can also look for some videos on YouTube. If you want to use JavaScript, I think Playwright is worth considering. They have a great documentation with a [Getting Started section](https://playwright.dev/docs/intro).

![Playwright](/images/playwright.png)

## Is it worth going on a paid course for Software Tester?

I’ve never bought such training. Why? To my mind, it’s a waste of money. I’m convinced that **you can learn a lot from such training, but I’m more than sure that you can learn the same or even more by yourself**. 

You can find a lot of free trainings, documentations, and blogs. People are sharing their knowledge all the time. But **the most important is that you have to start writing by yourself to know real problems**, to know the language, and framework. You have to just practice. **Another benefit of learning by searching for solutions is that you have to know how to find the answer to your question, and where to look**. This is a very important skill because during writing automation tests you will run into many issues. 

## Do I need ISTQB certification?

It wouldn’t be a surprise if I told you that **not at all**. I have it, but I did it after a few years of experience only because I had an opportunity to do it. It can be useful if you are a manual Software Tester, but it’s not needed to have this certification to start writing automation tests.

## And finally… Is test automation hard to comprehend?

It’s really easy to start writing automation tests. You just have to be persistent and not give up when the first problem occurs. **If you struggle, just ask people with more experience. I learned a lot from developers**. Take your test plan, choose language, choose a framework and write your first test. Practice is the best teacher. 

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/Wsju5zAb5kcOfxJV9i" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/keyboard-admin-prtg-Wsju5zAb5kcOfxJV9i">via GIPHY</a></p>