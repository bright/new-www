---
layout: post
title: Walking skeleton
author: mateusz
hidden: true
tags: ['agile', 'project management', 'continues integration', 'continues delivery', 'spike']
comments: true
---

## What makes a client happy?

Do you know what really makes your client happy? Tones of unit tests? Advanced integration tests running on every machine using Docker? Dozens of thousands of lines of well-formatted, clean code? Or maybe a new open source library that every programmer is talking about? Actually, none of them.

## The outcome

What a client really cares about, is the outcome. He values what he can see and touch, he appreciates the visible progress, he admires when his polished idea is being brought to life.

Does it mean that all those unit and integration tests, continues integration and delivery processes, design patterns and clean code practices are less important than visible progress? Not really, every mature client will appreciate all those good practices and processes, but even the most experienced **client will value the outcome more**.

## Walking Skeleton

Instead of starting a project with a Sprint 0 when you set up everything, configure robust environment, integrate advanced crash tracking, logging, reporting, and analytics systems, start with a **tiny implementation that performs small end-to-end function**.

This technique is called a **walking skeleton**, it won't use the final architecture, but it should link together the main architectural components.

The walking skeleton is not complete, it doesn't have any "flesh", it's missing functionality, which is built along with the infrastructure incrementally, over time. You can consider it as an outline of your concept that is executable and shippable, it should also be accompanied with tests.

![image2](/images/walking-skeleton/skeleton.jpg)

A walking skeleton is different than spike, although the difference is subtle. Spike is either a particular component of functionality or a rough sketch of a system to verify the idea, intended to answer the question "Are we heading in good direction?", and it's thrown away afterwards. On the other hand, a walking skeleton is a permanent code built with production habits, accompanied with tests, intended to grow with a system.

## Get a walk in your client's shoes

Next time, when running a new project, try to get a walk in your client's shoes. Take into account that he's spending his precious money on a software that might be his only chance to hit the market with the product of his dreams.

**Pay attention to the quality**, but also pay attention to **how the client perceives your job**, because even the most advanced technical solutions, even well communicated, won't change the bad impression when there is no visible progress for a longer time.
