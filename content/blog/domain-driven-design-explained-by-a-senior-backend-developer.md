---
author: michal k
tags:
  - DDD
  - business
  - development
date: 2022-10-04T07:08:05.593Z
title: Domain-Driven Design Explained by a Senior Backend Developer
layout: post
image: /images/ddd_blog_cover.png
hidden: false
comments: true
published: true
---
**Are you looking for an introduction to Domain-Driven Design (DDD)? [Michał](/blog/beyond-code-meet-michal-senior-backend-developer/), a Senior Backend Dev with over 8 years of experience, gives you answers to the most popular Google searches about DDD. If you are a Domain-Driven Design newbie – keep on reading. 😉**

## What is Domain-Driven Design? With example.

Domain-Driven Design is a methodology of building software, created by Eric Evans and published as a book in 2003. In a nutshell, it’s about **focusing on the business problem we are trying to solve, rather than technology**. In detail, it **consists of two levels: strategic and tactical**. 

First, the **strategic** one is a higher level and about **understanding the domain in which our software will be built**. It brings the idea of finding domain experts – people who know certain aspects of business best. Next, it states about building the common ubiquitous language that both business and technology people will be using to express the processes. By working with domain experts we will be able to find boundaries between certain subdomains and distill the core domain – the main, most valuable part of the business. Finally having all that knowledge we will be able to build a domain model of the system which we will be implementing.

This is where **tactical DDD** kicks in. It brings a group of patterns and relations between them, based on which **we can implement business logic and technical parts in separation**.

It allows us to detach things like communication details (if this is REST, GRPC, or anything else), persistence (SQL or NoSQL database), or form of authentication from the domain itself. 

<div class="image"><img src="/images/two_levels_ddd.png" alt="Strategic and tactical levels of DDD" title="undefined"  /> </div>