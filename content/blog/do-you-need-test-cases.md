---
author: malgorzata-z
tags:
  - QA
date: 2022-11-28T08:00:49.083Z
meaningfullyUpdatedAt: 2022-11-28T08:00:49.083Z
title: "Do You Need Test Cases? "
layout: post
image: /images/blogpost_test_case_preview.png
hidden: false
comments: true
published: true
language: en
---
There is a trend to write test cases. If you are a tester, write test cases. The more the better… But is it really always a good idea?

<div className="image">![Test cases - do you need them?](../../static/images/blogpost_test_case_preview.png "undefined")</div>

I'm not a test case enthusiast. I worked on many projects during my career and noticed that the value provided by test cases differs between projects. Sometimes it’s valuable and important, but sometimes it doesn’t make sense and is even a waste of time. I would like to show you why test cases are not always necessary.

## When test cases are important

**Have you ever wondered** why you need test cases? Is it because everybody is writing them? Maybe you are a tester and this is your duty?

<GiphyEmbed url='https://giphy.com/gifs/nickjonas-nick-jonas-872o15eAXFBw66UfNl' />

First of all, test cases can be good documentation. Especially when you are a new QA in the project and you have to learn the product. At this point, test cases are really helpful. You can see the common paths and expected results.

On the other hand, writing documentation is not a QA responsibility. Documentation should be written by a professional person, e.g. technical writer. I know that not every project has documentation specialists, another option is to write some documents by the whole team. Documentation is also needed for new software developers, not only testers.

Test cases can be considered as testers' tasks to see the **work progress on the board**. This is more useful for automated tests. You can create test cases for each automated test and add it to sprint as the task to work on. It helps to manage tests when more than one tester is writing them. Test cases for automated tests are also useful to see which part of the application is covered by automated tests.

## When test cases aren’t important

From my point of view, a lot of test cases are written just to be written. This is a kind of habit. Everywhere you can find information that TCs are important. There are special courses for testers focused on writing test cases. Don’t get me wrong – this is a very useful and important skill, you need to **know how** to write them, but you **don’t need to write** them in each project.

<GiphyEmbed url='https://giphy.com/clips/showtime-season-1-episode-2-i-love-that-for-you-0KpHXHBK8MtJ1mK0r2' />

\
Let’s assume that you are writing test cases for each story. After that, **do you really use all these test cases**? Are they still relevant and up-to-date? The project is still being improved, the design is changed, and new features are coming. It’s not possible to have all the test cases up-to-date. Based on my experience, a team could write even up to hundreds of test cases and nobody has time to keep them up-to-date.

## Regression

You can say that test cases are used for **regression testing**. It is helpful, but mostly for beginners. When you always test your application with the same paths then you lose your creativity and don’t invent new paths. It’s an easy way to miss the bug. In my opinion, it’s better to explore the new feature and write high-level test cases using only keywords. You save a lot of time which can be used for exploratory testing and finding bugs.

## When test cases are a waste of time

Sometimes writing test cases is a waste of time. Tester spends a lot of time preparing good test cases and the cost is higher than the results. Paradoxically, focusing on the test cases can be a reason for the inferior quality. **QA spends their time preparing documentation instead of looking for bugs**. This time can be used for example for test automation.

<GiphyEmbed url='https://giphy.com/gifs/Vida-Starz-season-2-starz-210-J2PVPWryd2jx3XG53p' />

## So… don’t write test cases at all?

Writing test cases makes sense when you can reuse them and benefit from them. Some projects are complicated and definitely need test cases. In that case, you can have a small base of TCs, which are easy to maintain. In my opinion, it’s definitely a good idea to have test cases for automated tests as they are always in use.
