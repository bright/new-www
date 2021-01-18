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
I've got an idea for a great mobile app! I can easily write it on my own. The design for the UI is already in my head and I know how I would like it to work.
The only question is... where should I store my data? I don't want to implement whole backend stuff. This app is too simple for that. 
Fortunately, I can use Firebase database for that. But wait... there are two available solutions, which one should I choose? 

Haven't we all had such a moment in our carrier? Firebase provides two solutions, for database purposes. First one is called Could Firestore (CF),
and second one Realtime Database (RD). First thing, you can see, after opening [firebase documentation](https://firebase.google.com/docs/database/rtdb-vs-firestore)
is that "Cloud Firestore is Firebase's newest database for mobile app development.". So.. this one should be easy right? Newer is always better! Even if this is
a case really often, I'll try to summarize pros and cons of each solution to make this decision easier for you.

## *Pros and cons of Firebase databases*

Before we start digging into each database solution, let's first quickly talk about pros and cons, of using Firebase Databases at all. Maybe after reading it, 
you will decide, that none of those is for you and unfortunately, you have to create and host your own server with a database. 

### Pros:

* Free and easy to start with. That's a really important factor when you are creating your first projects. Letting firebase take care of whole database stuff,
  allows you to focus on the app itself and in the beginning, it will cost you nothing.
* You don't have to worry about hardware.
* Lots of documentation, and community help.

###  Cons:

* Limited querying possibilities
* Migration to own server & backend might be problematic. There are tools, to help you do that, but it requires some work.
* Pricing and limitations! If your app gets bigger, firebase databases costs might be much higher, than hosting your own server. 
  What is more, there are some limitations to stored data sizes, but it is pretty high, and nothing to worry about at first. 

## *Realtime database*

Let's start with the original database. RD is a NoSQL cloud database, updated in a realtime with great offline support. Data itself is stored as a JSON Object.
There are no tables, rows or records. Everything is stored in a form of a JSON tree. Every time, you add new data to it, it creates a new node in existing structure 
with an associated key, which you can provide on your own, or it can be generated automatically. In the [firebase documentation](https://firebase.google.com/docs/database/web/structure-data)
you can find great examples, how to properly structurize it, to prevent unwanted downloading of redundant data. 

\[ZDJĘCIE PRZYKLADOWYCH DANYCH W REALTIME DATABASE]

RD provides support for many useful database mechanisms like data validation, defining indexes or setting security rules to define who has access to what. 

## *Cloud Firestore*

Similar to its predecessor, CF is a NoSQL cloud database, with similar key capabilities. However, the main difference is in the way the data is structured. 
It is not stored in a form of a JSON tree. Instead, the data is stored in documents, which are organized into collections. Document contains set of key-value pairs. 
Each document, can contain subcollections, so nesting data is pretty simple. 

\[ZDJĘCIE PRZYKLADOWYCH DANYCH W CLOUD FIRESTORE]

## *Choosing a proper database*

Firebase provides a [survey](https://firebase.google.com/docs/database/rtdb-vs-firestore#key_considerations) that should help you to select a proper database for your needs. I personally feel like it's a little bit biased. Answers to the questions often push you to the CF side, which is understandable because it in fact has more to offer, but the whole truth is not shown there. 

### Strengths of RD

* Better latency. It's important to know if your app is going to have a special need for a real-like experience.
* Support for *presence.* RD can easily record clients connection status, so you can be immediately updated when they are coming online or offline.
* In my opinion, it's easier to store simple data.
* Pricing in some cases.

### Strengths of CF

* Complex querying.
* Easier to organize complex and nested data.
* Advanced write operations with transactions.
* Pricing in some cases.

### Pricing

Pricing is a strength of both solutions? Yes, because it highly depends on your needs. RD is primarily charging you for the amount of data that you have downloaded. CF charges for those too, but to a much lesser extent. The main costs arise from the number of operations that your app performs. To give an example, let's say that you are developing a multiplayer game like \[Boombarman](https://en.wikipedia.org/wiki/Bomberman) or \[Curve Fever](https://en.wikipedia.org/wiki/Achtung,_die_Kurve!) which requires constant updates. In that case, the RD pricing model might suits you better. On the other hand, the To-Do List app or (to also give a game example) turn-based multiplayer game like Tic Tac Toe or Chess will probably cost you less if you use CF. 

## Final decision

Your final decision should be based mainly on the needs of your application. Personally, I would select RD only if the app would be really simple and I knew that in the future it will not get more complicated or if it would require constant real-time updates. In every other scenario, I would probably select CF, since it just gives you more options for scaling in the future.