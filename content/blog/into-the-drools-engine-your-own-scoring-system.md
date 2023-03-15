---
author: tomasz-k
tags:
  - backend
  - drools
date: 2023-03-15T10:19:09.155Z
meaningfullyUpdatedAt: 2023-03-15T10:19:09.193Z
title: Into the Drools Engine. Your Own Scoring System
layout: post
image: /images/blogpost_drools.png
hidden: false
comments: true
published: true
---
**In this little tutorial, I am going to show you how to turn Drools rule engine into a practical form of a deployable expert system. I will show you how to make your very own scoring service – like in the banks... well, almost. 😉 Of course, it will not be ready for production but it should give you enough fuel for your imagination to let you sketch your own solution.**

<div class="image"><img src="/images/blogpost_drools.png" alt="Drools Engine" title="Drools Engine"  /> </div>

Expert systems have been around for decades. Probably already in the times when 50MB hard drivers were of the size of washing machines. The best way of debugging was by using punch cards while smoking tons of cigarettes, of course in the office where it was possible and still cool. Perhaps. **😉**

**Expert systems are designed to mimic human expertise in a specific domain**. They use a set of rules mapping concrete knowledge base, often represented in an "if-then" format, to make decisions and provide recommendations in an authoritative way just as they were programmed.

ES were ruling the world of decision-making software and many of us have thought that now it's just a matter of algorithm optimization, scaling on the way to create A.I. capable of beating "Turing's Test". There was however another approach developed in a parallel universe which in a short amount of time took the hearts of the IT world by storm. And here it is Machine Learning everything.

In contrast, ML is a more general approach to AI that uses algorithms to learn from data and make predictions. While expert systems and ML have their own strengths and weaknesses, they can be used together to create powerful AI systems. They can make complex decisions with a high degree of accuracy. Drools, with its ability to handle large sets of rules and manage complex decision-making processes, is a valuable tool for developers looking to build expert systems that integrate with ML or decision-making engine on its own.

In this blog post, I will set up a standalone Drools-based microservice and present a very basic scoring system for the transaction. Why not own a little KYC service:)