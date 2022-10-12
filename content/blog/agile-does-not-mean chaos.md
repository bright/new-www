---
author: michal k
tags:
  - Agile
  - software development
  - soft skills
date: 2022-10-12T07:54:40.976Z
update_date: false
dateModified: 2022-10-12T07:54:41.005Z
title: Agile does not mean chaos!
layout: post
image: /images/dog_blog_post.png
hidden: false
comments: true
published: true
---
![](https://cdn-images-1.medium.com/max/1600/1*nodfoEWdCEbbDI4B10kUDA.jpeg)

Every time I walk through our bright office, I see huge posters with sentences from the Agile Manifesto. I cannot disagree that people and their interactions are much more important than processes, or working software should be treated higher than comprehensive documentation. Looking at the signatures under those sentences and knowing how much these guys did for the developers' world I have to say “You’re damn right!”.

People like Martin Fowler or Kent Beck spent decades serving our community, sharing knowledge, and spreading good practices across the whole globe. They’ve provided us with many different tools, patterns, and approaches to different problems in the IT industry. But if we remind ourselves of any book, blog post, or presentation from these amazing specialists, will we find phrases like “Don’t plan”, “Just Code” and “Don’t dig a hole in Your business stomachs”? The answer is **NO.**

Why then do we treat the Agile process as the complete opposite of the Waterfall? Why we gave up on proper planning and designing, not even talking about pulling requirements from customers? Either Scrum or Kanban or any Agile frameworks, are not stopping us from thinking a few steps ahead. On the contrary, they are telling us to plan but do it carefully, being flexible, and expecting that our plan will change over time.

Every time I start to work on a new project or in a new team, one of the things I see is people not knowing why they are working on certain things. Of course, there is a guy above them or a client ( depending on the size of the company ) who told them to do so, but sorry, that’s **NOT** the answer. We, as experts shouldn’t start coding anything without understanding the entire picture. Of course, nobody needs to know everything, but by treating the team as a single unit, that unit should know the reasoning behind its tasks. Otherwise, our work will probably land in the trash or will be refactored/redesigned many times before will become usable. I see a few reasons for this thing to happen.

- - -

### We do not ask

Sad but true, many people are still afraid to ask questions. Once I am getting a one-liner description of my task, I can expect that something is missing. Especially if this task title stated about brand new functionality, not a typo-like bug. At this point, the task is begging us to be filled in a description. Besides the scope and plan of the work, designs, or diagrams of the flow, we should add more contextual background. It should tell the reader, why a certain task is important. If the client ( of our work who expects us to do something ) is not able to bring the answer to the question, we must be perseverant and dig deeper. We must ask the same questions with different words or use examples that justify our worries. We must revisit some topics, reiterate, and meet again. We cannot quietly allow our incomplete understanding to govern our development. Is it uncomfortable? Can it create friction or slow us down for a few days? Yes, but if we want to be professional software engineers — it’s necessary.

### We ask the wrong people

Working with big, corporate companies look different than developing software for startups. In the case of the latter, we might have direct access to the main visionary of the software who should be able to answer most of our questions, or the people who will be using the stuff we are building. If we cannot get the information from our direct product person or manager we should reach out to the visionary or customer. Also, the “I don’t know” is important here, as probably nobody knows the answer. In that situation, if this is not the knowledge we can gain by ourselves, this particular part of work needs to be treated very carefully and in an elastic way or ( even better ) postpone until stakeholders will find the answers. 

Big companies might be a bit more complex with their structure. Getting the answer from the CEO of 1000+ employees company is not something we will expect. Fortunately, the CEO might not be necessarily responsible for defining the scope of the project. Also, the layers of “management” might introduce additional noise to the communication and change the meaning of answers. We should always try to be as close as possible to “key” people who are the exact source of the requirements. 

As an ideal situation, we might take an example of a company building software for their staff to digitalize existing manual processes. We shouldn’t be blocked by anyone to sit down with those “upcoming users of our system” and talk about how they work and how they wish to work. The requirements most like sit in those people’s heads we just need to get them out.

### We ask the wrong questions

All right, imagine we’re not afraid to ask questions, and we know who to ask but the answers are not telling us what exactly is the scope of our work and why we should do it. It’s most likely that someone doesn’t understand the questions we ask. If we are about creating distributed system and thinking about the boundaries of each service, the question asked to the business will be “Do A and B need to be immediately consistent”. The answer will most likely be “yes” and we will end up with a monolith or (even worse) distributed monolith. Things like “consistency” or “reliability” might be understood differently by non-tech people. That’s why we need to be careful and rephrasing tech definitions into business language.

### We ask but do not write down the answer

In my personal feeling, that’s the worse thing. It’s because I don’t have any other explanation than people being selfish ( thinking that only they will need that answer ) or lazy ( “I will not waste, my precious coding time to write anything other than code itself “ ). Normally, people forget things, especially when those things are not being used on daily basis. That’s why documentation is so important, but not more important than people and their interactions of course.

### To many assumptions

Let’s break it down into two. Firstly, we are often assuming that someone else will know. If we need that knowledge, we will ask him/her. What if everyone on the team is assuming the same? I don’t need to know the details of my task because I assume that my Project Manager or my Team Leader knows it and I can ask him anytime. The second is even worse: assuming there are no details in the task I got, I can do it the way I want. Nobody asks for the testing feature so I will not test it on my own and pass it to QA. Quality Engineer will take a look at the task without a description so he/she will assume that he/she can test it the way he/she feels it’s right. Such **assumption-driven development** leads to software needing to be immediately refactored, without or with minor value to the end customer.

### Lack of awareness

We don’t know that there is another way of working. We were using the same approach over and over again. We get used to it so much that it became comfortable for us. We don’t need to involve a lot, just do the work. All fine, except that most likely we could be much more effective and our work could serve peoples’ needs better. 

### We don’t think it matters

Finally, we don’t see a relationship between the way we will implement something and people’s efficiency in using the software we build. Let’s go back then to your latest online shopping sessions. Did some of the shop’s responsiveness piss You off? Did you close the tab and went to some other? Did you ever change any app to its alternative or were searching for it? If the answer to any of those questions is YES, then You see that our work matters from the User’s perspective.

### Summary

Agile or its implementations do not mean that we should perform assumption-driven development without asking questions and proper planning. Don’t be afraid to ask questions until you understand why you're doing things. By doing that you are not making things harder for the client — you are making them better. You are doing things the only way that is acceptable — by searching for the truth. Try to reach real customers or the main visionary of the project you’re working on. Reduce the number of “proxies” between you and “real” business people to eliminate information noise. Plan the next steps with your team, and be a partner to your customer, not just the contractor. Question your thoughts, and document decisions and reasoning behind them.

**Work the agile way, not the chaotic one.**