---
author: szymek
tags:
  - Android
  - Kotlin
  - Hilt
  - WorkManager
date: 2023-11-03T11:52:35.005Z
meaningfullyUpdatedAt: 2023-11-03T11:52:36.020Z
title: Use WorkManager safely and mindfully
layout: post
hidden: false
comments: false
published: false
language: en
---
**WorkManager is a powerful tool, but is it always completely safe to use? In this article, we will discuss a few potentially dangerous situations. We will focus on the inconstancy of Workers, which can be edited or removed over time.**

**<br/>**

## **Custom WorkerFactory and @AssistedInject**

Let's face it, nowadays injecting dependencies into a Worker class is common and nearly inevitable. Our background work often requires sending a request using e.g. Retrofit service or saving something in the database using *Dao.* It would be great if we could inject these dependencies directly into the Worker. Without injecting dependencies, Workers would not be so powerful. 

##### How to inject dependencies using Dagger 2

 // show sample usage of assisted inject and custom worker factory etc.

// show issue with common worker factory and ClassNotFoundException crashes

// show how to fix it with a try-catch and introduce to Hilt usage

##### How to inject dependencies using Hilt

// show how Hilt overcomes this issue

<br/>

## **Any other dangers?**

// show that we should be mindful when editing and removing Workers and why

## **Summary**