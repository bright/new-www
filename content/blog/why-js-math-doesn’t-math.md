---
author: rafal-op
tags:
  - frontend
date: 2025-11-13T10:16:36.946Z
meaningfullyUpdatedAt: 2025-11-13T10:16:36.970Z
slug: why-js-math-does-not-math
title: Why JS math doesn’t math?
layout: post
image: /images/blogpost_blog_js_math_image.png
hidden: false
comments: false
published: true
language: en
---
**In this article, we’ll explore why JavaScript’s floating-point calculations behave the way they do, and what’s really going on under the hood.**

This post has two parts. The first (this one) gives a high-level overview of floating-point arithmetic in JavaScript. The second dives into the low-level mechanics and calculations, so you can see exactly what happens behind the scenes.

## Is JavaScript broken?

You’ve probably heard people say that JavaScript is a “broken” language and sometimes it really seems that way. One of the most famous examples is how JavaScript handles floating-point arithmetic. Adding simple numbers can produce strange, unexpected results. It’s funny, but the truth is, this isn’t actually JavaScript’s fault. The behavior comes from the number system it’s built on - a specification shared across many programming languages.

## JS’s math don’t maths

Let’s debunk a famous myth. Try adding 0.1 and 0.2 in JavaScript. You’d expect 0.3, right? Instead, you get 0.30000000000000004. Even this simple calculation seems to confuse JS!
*„JS floating-point numbers system is broken”*

## Counting in Binary

At their core, computers only understand binary, a language of 0s and 1s. To perform calculations, we first need to represent our numbers in this form. If you’re not interested in the details of the conversion process (see the section below), here are the binary approximations for our example numbers: