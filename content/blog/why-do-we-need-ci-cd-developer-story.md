---
author: jacek
secondAuthor: wojciech-k
tags:
  - ci/cd
  - devops
  - automation
date: 2023-02-03T14:36:42.705Z
meaningfullyUpdatedAt: 2023-02-03T14:33:54.306Z
title: Why do we need CI/CD - developer story?
layout: post
hidden: true
comments: true
published: true
---
**Why would you spend time on configuration and maintenance of CI/CD flow for your application? Do the gains justify the effort? And what exactly do you get when you start using CI/CD?**\
**Two bright developers with a lot of experience in DevOps and automation will explain why, in their opinion, CI/CD is a must have element of any system.** 

# 1. It makes the developer more responsible for his task

When a project doesn't utilise CI/CD, then it is often not developer's responsibility for the deployment of a feature he was working on. The developer delivers a code, that sometimes is not even well tested, and moves on to a new task. His change is then often tested by someone else and then deployed by yet another person. In case of any errors or bugs, the task is returned to the developer (who has long forgotten about it) and the whole process starts again. This is both long and error prone. The reason behind that is the developer's attitude towards his task. Since he is not forced to run automation tests and he doesn't participate in the deployment process, he can become careless and neglectful. The feedback loop is too long and sometimes is even missing. \
On the other hand, when using CI/CD, the developer is responsible for the whole lifecycle of his task. He gets immediate feedback from the automation tests, and is responsible for the deployment process. In the most advanced CI/CD process, he completes his task after it is delivered to the clients on production environment. This gives the developer feeling of responsibility and satisfaction. It makes him more engaged and caring for his tasks.

\- *Jacek*

# 2. It adds value to the company's portfolio

The clients will be more willing to choose a company that offers CI/CD automation instead of competition.

\- *Jacek*

When searching for a new job opportunity I would definitely look for a company that utilises CI/CD tools.

\- *Wojciech*

# 3. It is an always up-to-date documentation of the release process

When I need to check how the application is deployed, how to run the tests and what are the parts of the system, I am first looking for the pipeline configuration instead of README file. 

\- *Jacek*

# 4. It keeps the team confident in their changes

# 5. It allows quick deployment of new application version