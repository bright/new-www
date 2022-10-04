---
author: michal k
tags:
  - DDD
  - business
  - development
date: 2022-10-04T07:30:53.975Z
title: Domain-Driven Design Explained by a Senior Backend Developer
layout: post
image: /images/ddd_blog_cover.png
hidden: false
comments: true
published: true
---
**Are you looking for an introduction to Domain-Driven Design (DDD)? [Michał](/blog/beyond-code-meet-michal-senior-backend-developer/), a Senior Backend Dev with over 8 years of experience, gives you answers to the most popular Google searches about DDD. If you are a Domain-Driven Design newbie – keep on reading. 😉**

<div class="image"><img src="/images/ddd_blog_cover.png" alt="Domain-Driven Design Explained" title="undefined"  /> </div>

## What is Domain-Driven Design? With example.

Domain-Driven Design is a methodology of building software, created by Eric Evans and published as a book in 2003. In a nutshell, it’s about **focusing on the business problem we are trying to solve, rather than technology**. In detail, it **consists of two levels: strategic and tactical**. 

First, the **strategic** one is a higher level and about **understanding the domain in which our software will be built**. It brings the idea of finding domain experts – people who know certain aspects of business best. Next, it states about building the common ubiquitous language that both business and technology people will be using to express the processes. By working with domain experts we will be able to find boundaries between certain subdomains and distill the core domain – the main, most valuable part of the business. Finally having all that knowledge we will be able to build a domain model of the system which we will be implementing.

This is where **tactical DDD** kicks in. It brings a group of patterns and relations between them, based on which **we can implement business logic and technical parts in separation**.

It allows us to detach things like communication details (if this is REST, GRPC, or anything else), persistence (SQL or NoSQL database), or form of authentication from the domain itself. 

<div class="image"><img src="/images/two_levels_ddd.png" alt="Strategic and tactical levels of DDD" title="undefined"  /> </div>

<div class="important-info"><div>Let’s take applying taxes as an example. Imagine our software is responsible for selling food. Depending on ingredients we might have higher or lower tax. If we will separate tax operations like calculating gross price, from technical details like how exactly we are retrieving tax value and from which database, we might be able to speak the same language in the code as with the domain experts. Our test cases for tax calculation might be readable by non-technical people while the storage can be easily changed e.g. due to performance reasons.</div></div>

## What is Domain-Driven Design in microservices?

These terms are often used together, but let’s make it clear that one can live without the other.

In terms of microservices (or any other architecture), DDD, especially its strategic part, **helps us find the most effective boundaries between business processes which we can then apply to encapsulate certain logic within services**. Ideally, those services should be totally independent from others and be able to bring business value to a customer without others’ work. Such services can be then implemented **using** **patterns from the tactical part of DDD**.

## When to use the Domain-Driven Design?

It’s a really hard question to answer as it depends on many aspects. Let’s first separate two levels of DDD. First, more high level, is **strategic Domain-Driven Design**. It is more about talking with domain experts, finding ubiquitous language, and building a common understanding of the processes among both business and tech people. It does not necessarily need to go down to the code itself. An example would be if, during conversations with domain experts, engineers find out there is not much of business logic and the application will be a simple CRUD (create, read, update, delete). However, if such conversations will result in complex processes, we could (or even should) continue with **tactical DDD** which boils down to building system from blocks and patterns described by Evans in his book.

## How to implement Domain-Driven Design?

As mentioned above **Domain-Driven Design starts way before we sit down and write code**. It’s happening in the form of strategic DDD. Sometimes during the phase of accumulating the knowledge, we will realize that business problem is really trivial and doesn’t need complex patterns from tactical DDD. It might also happen that the main challenge of the organization sits outside of the processes we were asked to implement. If none of the mentioned cases are valid we can implement our business logic using DDD building blocks like [Entities](/blog/domain-driven-design-in-kotlin-entities-lifecycle-management/), Value Objects, Services and so on (all of the elements can be found directly in Eric Evans book or on the diagram presented there).

<﻿center><div class="image"><img src="/images/ddd_graph.png" alt="Model-Driven Design" title="undefined"  /> </div><﻿/center>

## What are Domain-Driven Design principles?

Firstly, we should be **focused on the business logic** and **base software design on domain design**. Besides, the business constantly evolves so should its model and system within that business. **Engineers should work in sync with domain experts** using the same language in order to keep a system up to date with the business process. Finally, the common language, called ubiquitous should be also used in code to describe the domain.

## What to expect from a software agency with a DDD approach (as employee and client)?

**Let me start from a client as from their perspective nothing should really change**. I mean, we as specialists should find a way to communicate with minimal overhead related to working with the new technique. It should be as smooth as possible. The only thing I can advise potential clients of such a DDD company is to “be open and trust them”. 

Experts of certain domains can expect the engineers following DDD to ask a lot of questions which can make people tired. Business people only need to realize that such an approach of knowledge crunching is an important precondition before any code will be written. **The purpose is to avoid the huge cost of refactoring and reimplementing** and correcting our assumptions while we’re still working on a piece of paper.

<div class="image"><img src="/images/dev_team.png" alt="DDD software agency" title="undefined"  /> </div>

**When it comes to employees, it’s a bit different**. Firstly it highly depends on how many projects within that agency are led with DDD in mind. It might happen that only a few of them use goodies of Domain-Driven Design, while others are completely unrelated to that approach. It’s **really worth it for such a candidate to dig deeper during a job interview and understand what it means for a certain company to use DDD** and whether that suits his/her needs. For someone using code patterns related to tactical Domain-Driven Design will be enough, while for others using ubiquitous language and having domain experts as partners will be way more important.

## What are examples of Domain-Driven Design tools?

It is hard to name something like a DDD tool, to be honest. One could name techniques used to understand the business flow and customer needs such as **Event Storming** or **User Story Mapping**, which can live also without DDD. On the other hand, we have a bunch of **UI tools** that help us facilitate sessions of gaining an understanding of the business. These might also be called DDD tools. When it comes to a physical meeting with domain experts and facilitating on-site workshops, a whiteboard, sticky notes and markers can be treated as DDD tools. Finally, once we start implementing our software based on the previous visualization and requirements, our **IDEs** and **Code Editors** will become DDD tools.

<div class="image"><img src="/images/event_storming_ddd.png" alt="Event storming DDD" title="undefined"  /> </div>

## What DDD books do you recommend?

I will go first with the most obvious choice which is **“Domain-Driven Design: Tackling Complexity in the Heart of Software” by Eric Evans**. He is the author of DDD and the book contains his huge experience standardized and written down. I wouldn’t recommend it for very beginners though. The language used by Evans is quite sophisticated and those 500+ pages might be overwhelming for newbies. I would start with some blog posts and presentations as an introduction to DDD to get the basics, then move to some implementation examples in Your favorite technology and finally go to the Bible.