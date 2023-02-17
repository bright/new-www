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

# 1. What is CI/CD

Continuous integration/continuous delivery (CI/CD) is a set of principles and tools that allow developers to build, test, analyse and deploy their changes automatically and whenever they want. In the most advanced scenario, it allows them to deliver their changes to the client immediately after they finish coding, with confidence that everything is working as expected.

# 2. It makes the developer more responsible for his task

When a project doesn't utilise CI/CD, then it is often not developer's responsibility for the deployment of a feature he was working on. The developer delivers a code, that sometimes is not even well tested, and moves on to a new task. His change is then often tested by someone else and then deployed by yet another person. In case of any errors or bugs, the task is returned to the developer (who has long forgotten about it) and the whole process starts again. This is both long and error prone. The reason behind that is the developer's attitude towards his task. Since he is not forced to run automation tests and he doesn't participate in the deployment process, he can become careless and neglectful. The feedback loop is too long and sometimes is even missing. \
On the other hand, when using CI/CD, the developer is responsible for the whole lifecycle of his task. He gets immediate feedback from the automation tests, and is responsible for the deployment process. In the most advanced CI/CD process, he completes his task after it is delivered to the clients on production environment. This gives the developer feeling of responsibility and satisfaction. It makes him more engaged and caring for his tasks.

\- *Jacek*

# 3. It adds value to the company's portfolio

The clients will be more willing to choose a company that offers CI/CD automation instead of competition without it. CI/CD allows developers to deploy their changes immediately and with confidence. This is a huge advantage over the classic workflow which doesn't use CI/CD. 

In classic approach, the client who is expecting a new feature or some bug fix, has to wait for a new version to be released, even though the changes in the code have been ready for some time. The new version release is a big event for the whole team and often engages a lot of people. There is always a chance that something might go wrong because it is a manual process.  

Using CI/CD tools to automate the process, the team can deliver a feature or bug fix immediately after the coding is finished. What is more, the changes are always tested and the delivery process is quick and automatic. The client doesn't have to wait for a new version release date because the application is constantly updated without him even knowing.

\- *Jacek*

When searching for a new job opportunity I would definitely look for a company that utilises CI/CD tools.

\- *Wojciech*

# 3. It is a documentation of the release process

When I need to check how the application is deployed, how to run the tests and what are the parts of the system, I am first looking for the pipeline configuration instead of README file. The documentation has to be manually maintained and it is often forgotten and neglected. This isn't the case for the pipeline definitions. They are the source of truth about the deployment process and they cannot be out-of-sync with the reality. This also gives me confidence, that the team can easily recreate the system in case of a failure or setup a new environment when needed. 

\- *Jacek*

# 4. It keeps the team confident in their changes

CI/CD tools are guardians of the code quality and reliability. When configured correctly, they always check new code before it is integrated to the application. The team is confident that even if someone forgets about running tests locally, they are also done automatically. Apart from running the tests, the CI/CD tools can also verify code coverage and make sure that it stays at a hight level. Moreover we can add tools that analyse code quality by analysing if it is meeting certain criteria. This together makes the team more confident in their changes and the pull request + review process is not the only protection of the codebase.

\- *Jacek*  

# 5. It allows quick deployment of new application version