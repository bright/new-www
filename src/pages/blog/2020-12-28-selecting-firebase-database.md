---
layout: post
title: Selecting firebase database
date: 2020-12-28T12:30:59.657Z
image: /static/images/database.webp
author: lukasz
tags:
  - firebase
  - database
  - realtime database
  - cloud firestore
hidden: true
comments: true
published: false
---
I've got an idea for a great mobile app! I can easily write it on my own. The idea for the UI is already in my head and I know how I would like it to work.
The only question is... where should I store my data? I don't want to implement whole backend stuff. This app is to simple for that. 
Fortunately I can use Firebase database for that. But wait... there are two available solutions, which one should I choose? 

Haven't we all had such a moment in our carrier? Firebase provides two solutions, for database purposes. First one is called Could Firestore (CF),
and second one Realtime Database (RD). First thing, you can see, after openning [firebase documentation](https://firebase.google.com/docs/database/rtdb-vs-firestore)
is that "Cloud Firestore is Firebase's newest database for mobile app development.". So.. this one should be easy right? Newer is always better! Even if this is
a case really often, I'll try to summarize pros and cons of each solution to make this decision easier for you.

*Pros and cons of Firebase databases*

Before we start digging into each database solutions, lets first quickly talk about pros and cons, of using Firebase Databases at all. Maybe after reading it, 
you will decide, that none of those is for you, and unfortunatelly you have to create and host your own server with a database. 

Pros:

* Free and easy to start with. Thats a really important factor, when you are creating your first projects. Letting firebase take care of whole database stuff,
  allows you to focus on the app itself, and on the begining it will cost you nothing.
* You don't have to worry about hardware.
* Lots of documentation, and comunity help.

 Cons:

* Limited querying possibilities
* Migration to own server & backend, might be problematic. There are tools, to help you do that, but it requires some work.
* Pricing and limitations! If your app gets bigger, firebase databases costs might be much higher, than hosting own server. 
  What is more, there are some limitations to stored data sizes, but it is pretty high, and nothing to worry about at first. 

*Realtime database*

Let's start with the original database. RD is a NoSQL cloud database, updated in a realtime with great offline support. Data itself, is stored as a JSON Object.
There are no tables, rows or records. Everything is stored in a form of JSON tree. Every time, you add new data to it, it creates new node in existing structure 
with an associated key, which you can provide on your own, or it can be generated automatically. In the [firebase documentation](https://firebase.google.com/docs/database/web/structure-data)
you can find great example, how to properly structurize it, to prevent unwanted downloading of redundant data. 

\[ZDJĘCIE PRZYKLADOWYCH DANYCH W REALTIME DATABASE]

RD provides support for many useful database mechanisms like: data validation, defining indexes or setting security rules to define who has access to what. 

*Cloud firestore*

Similar to its predecessor, CF is a NoSQL cloud database, with similar key capabilities. However, main difference is in the way the data is structured. 
It is not sotred in a form of a JSON tree. Instead, the data is stored in documents, which are organized into collections. Document contains set of key-value pairs. 
Each document, can contain subcolections, so nesting data is pretty simple. 

\[ZDJĘCIE PRZYKLADOWYCH DANYCH W CLOUD FIRESTORE]