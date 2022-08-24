---
author: kasia
tags:
  - risk management
  - agile
  - project management
  - ISO
  - ALARP
date: 2020-08-05T12:34:37.084Z
title: "No risk, no fun or: How I learned to stop worrying and love the risk
  management."
layout: post
image: /images/blog_post_risk_management.png
hidden: false
comments: true
published: true
---
I’ve been researching and writing about the agile approach to risk management for quite a few years now but mostly in relation to safety-critical software (for example [here](https://dl.acm.org/doi/10.1145/3234152.3234174) , [here](https://link.springer.com/chapter/10.1007%2F978-3-030-37534-8_4) and [here](https://journals.agh.edu.pl/csci/article/view/51) ). This time I wanted to address other types of projects, how it can work in practice and why the risk is not necessarily a bad thing. 

![risk management IT](/images/blog_post_risk_management.png)

I started to write this blog post back in March, I already had the title and some notes. And then something unexpected ([but apparently still predictable](https://www.youtube.com/watch?v=6Af6b_wyiwI)) happened - a global pandemic. Suddenly, writing that if there’s no risk, then there’s no fun seemed inappropriate. Going out, ignoring the risks, was simply foolish and arrogant. We were all stuck in our homes, not sure about the actual threats, following the numbers, untangling expert advice from the conspiracy theories, trying to predict whether we’d make it to the summer at all. With live footage of human tragedies unfolding in different parts of the world, we looked out the window to see the trees in bloom and birds chirping, like nothing was happening. Was it really that dangerous? While it felt awkward to write candidly about the idea of risk a few months ago, I think now the timing couldn’t be better. Because now that we debate the risk at personal level, almost every day since March, maybe considering it also on a professional level would feel more natural. Because there’s always risk. Sometimes it’s unavoidable, sometimes, manageable, but it’s there. Pretending we don’t see it (or indeed, not seeing it at all) is a dangerous strategy. **But acknowledging the risk, making informed decisions and sometimes doing things anyway is where the fun begins.**

## Risk management

The idea of managing the potential threats to a project is in no way a new topic. There is the golden standard (the [ISO 31000 standard](https://www.iso.org/obp/ui/#iso:std:iso:31000:ed-2:v1:en) - I have read it so you don’t have to) of risk management that defines the following steps:

1. Establishing the context
2. Risk identification
3. Risk analysis
4. Risk evaluation
5. Risk treatment

And on top of that, constant monitoring and review.

As you can imagine, there’s a lot of processes, templates, guidelines and requirements connected with each step. Boring, yes, but that’s good. You wouldn’t want to fly a plane with an autopilot software delivered by someone who felt that risk evaluation should be fun. Or an incurable optimist just hoping for a happy path. Surely no one will ever use this weird flow that we rushed through QA because the client wanted it ready for a board meeting anyway, right?

## Context

While not all of us work with safety-critical software, it doesn’t mean there are no threats associated. **Not every system needs a systematic, high brow risk policy but all would benefit from thinking about potential threats early on and monitoring them along the way.** Your team develops an app integrated with a payment system? Or maybe your system helps to plan drug administration to the care home residents? Depending on the domain you can choose how much attention should be devoted to risk management. In general

* Low risk apps. Examples are loyalty programs, tourist guides, simple games or weather reports. The apps that in case of malfunction will cause discomfort and users might be annoyed, but that’s it. If you work on such apps, there’s a high chance that you haven’t really put too much thought into the potential threats. And to be honest, there’s not much more work that should be done here. Focus on security, make checklists, write tests. Good advice can be found [here](https://owaspsamm.org/assessment/) and[ here](https://www.commoncriteriaportal.org/cc/). 
* Medium risk apps. These are the apps where you store some more delicate data, connected to health or privacy of the users or handling complex payments. The system that in case of malfunction can cause some serious financial problems or influence user’s wellbeing and health.
* High risk apps. The systems that take people to the moon or at least to the stratosphere and the ones that will save your life if you need a complicated surgery. The safety-critical creme de la creme. If you work in such an industry, a blog post would never be enough to cover all the issues so I won’t even try. Nevertheless, [here](https://www.springer.com/gp/book/9783319702643) and [here](https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1127&context=scschcomcon) you can find some interesting ideas.

All that follows concerns these medium risk apps in an agile environment. Where it feels that filling in a risk matrix and xls spreadsheets will be awkward but still some degree of risk awareness is needed. You can use all of the suggested practices or just one, depending on the project’s needs.

## Risk identification

That’s the step where you basically think about all the things that can go wrong. The more visions of impending doom, the merrier (in a twisted, risk oriented way), so a brainstorming technique works great here. Gather as many people engaged in the project as you can - especially the ones who always undermine any idea you come up with. Now’s their time to shine and you can actually appreciate it.

When is the right time to organise such a meeting? If you’re using Scrum, such discussion could be held after at least the first version of Backlog is created, so that you have some idea about the functionality and the domain but not after the main architectural decisions have been made. When you have already thought about what you want the system to do, there comes the time to think about what you wouldn't want.

Listing all of the users and roles can be a great start - much like with the user stories. Reverse user stories if you like. You can also start with the functionalities of the system. Actually, one of my favourite techniques are Hazard (or [Abuser](https://medium.com/@jimvdwaal/abuser-stories-thinking-like-a-hacker-ed7999b507c8)) stories. They can follow a pattern like:

“As a result of < definite cause >,

< uncertain event > may occur,

which would lead to < effect on objective(s) >”

## For example:

“As a result of a lost internet connection, data about the drugs dosage might not be refreshed for a long time, which would lead to wrong drug dispensation.”

Or just follow the structure of the backlog items that you have in your project - more like anti-features.

You will notice shared patterns between the hazards described this way. Some causes will appear more often than others, as will the unwanted effects. These are the elements you’ll need to pay more attention to.

It’s a good idea to keep the list of hazards in the same tool that you use as your issue tracker. The goal is to store it somewhere people can actually see it. Since we use JIRA at Bright, I will refer to it as an example. It allows you to create multiple boards per project with different filters, so a Risk Board or something like this can be a good idea. You can use a customized issue type, like “Hazard” or “Risk factor” and filter it out only on your Risk Board.

## Risk analysis & evaluation

Once you have your hazards listed, you need to take a step back and breathe deeply. It may seem like a lot of bad things can happen, it’s quite overwhelming. But obviously not all of the identified threats are as likely to happen or have the same consequences. Risk is defined as the probability that harm occurs multiplied by the severity of that harm - so a potentially life threatening situation that’s highly unlikely to happen can have less impact on the project than something far less dangerous that affects your system a few times a day. There’s even a matrix for [that](https://en.wikipedia.org/wiki/Risk_matrix), but any scale would do. Think about these two dimensions and based on that prioritise the hazards, High - Medium - Low would be enough.

Another thing to consider is how these risks are introduced in the system. No one will actually implement Hazard Stories on purpose. What will be implemented though is the User Story connected with the Hazard Story. This is the crucial link, that should also be reflected in the issue tracker. For each hazard, there should be at least one feature which could unwillingly introduce it to the system. During implementation of this particular feature, we should be aware of the bad twin - the hazard task. If you’re using JIRA, it can be a good idea to even create some customized relations. The user stories can also have sub tasks dedicated just to overcome the hazard - connect them as well. They will be super useful at the QA stage.

## Risk treatment & monitoring

There’s little value to a list of hazards if you’ll never look at it again. Treat the risk items as a part of your backlog, just with different purposes than the regular tasks. Think about them when planning sprints, check the connected hazards before moving a development task to Done. Adding “Check connected hazards” as a step to the[ Definition of Done](/blog/definition-of-done/) is a good way to remind everyone about it and turn it into a habit.

As I mentioned before, you can assign some development tasks to counteract the harm presented by the risk items. Sometimes you just need to add 2-Factor Authentication or handle an offline mode to stay confident. Sometimes though, you look at a hazard and can do only as much as to stretch your arms helplessly and say “Yes, this can happen indeed”.

There is an approach to reducing the risk called ALARP - [As Low As Reasonably Practicable ](https://www.hse.gov.uk/risk/theory/alarpglance.htm). Sometimes it would be too costly to do anything about a particular threat, or there are few options left anyway. It’s like with leaving your house these days - you can hide in the bunker and order all your groceries online, washing every product with 70% alcohol, risking insanity (and getting drunk from the fumes) or go out, wear a mask, sanitise your hands and accept the residual risk.

The crucial part is to be honest with yourself and your team about the risks. Team members should feel comfortable to mention any concerns - only then you can manage the risk in a meaningful way and feel collectively responsible for the final result.

**Knowing the risks, then reducing the ones we can and ALARPing the rest is in a way a definition of responsibility.** It’s not about avoiding any risk at all cost. You will never be 100% safe but that’s life. Wear a helmet and ride the bike, fasten your seatbelt and drive the car, encrypt the connection and let the users enjoy your great system. In the end, you’ll have to suck it and see.