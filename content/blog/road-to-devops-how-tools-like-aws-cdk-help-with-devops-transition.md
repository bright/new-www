---
author: michal-lem
tags:
  - devops
  - development
  - backend
  - aws
  - cdk
  - typescript
  - inspiration
date: 2021-11-09T14:00:00.080Z
title: Road to DevOps - How tools like AWS CDK help with DevOps transition
layout: post
hidden: true
comments: true
published: false
---
It's obvious that DevOps is a buzzword these days. If you are somehow connected with software development, the DevOps culture could possibly jump right on your face from your fridge. You haven't heard it? I don't believe you, but if that's the case - no worries, you will. Sooner or later.

## The Definition of DevOps

I could possibly write a book trying to describe everything that one should know about DevOps, how cool it is, and why everyone should shout out DevOps slogans with the same frequency as some Agile mantras. Yeah, most probably it wouldn't be a bestseller, so I won't. Instead I would present short, yet meaningful [definition from AWS](https://aws.amazon.com/devops/what-is-devops/): 

> DevOps is the combination of cultural philosophies, practices, and tools that increases an organization’s ability to deliver applications and services at high velocity: evolving and improving products at a faster pace than organizations using traditional software development and infrastructure management processes.

How does it sound? Simple yet descriptive, right? Sure, but what does it really mean for a software development team that would like to boost up velocity, and go one step ahead on delivery quality path? I have my own perspective on DevOps, that grew while working with different teams, in different envioronments, on a wide spectrum of projects. 

> DevOps culture is about getting out of comfort zone, cross-team collaboration and putting impact on a feedback loop, all that with the help of modern DevOps toolset

And that’s what this story is really about.

## Road to DevOps, the story of a DevOps engenieer and a common antipattern

### Background

Now, let's pay a visit to Dr Emmett Lathrop Brown, and make use of that fancy DeLorean DMC-12 to jump into the past for a second. Someone is waving at us! That's a younger version of me. Meet Michał, **the SysOps.** He is working in a big corporation with bare metal servers and some virtualisation in place. Oh, and he has keys to datacenter! And a winter wool hat for hours spent there with all the fans and air conditioning on.

Back then my main problem was to automate repetitive work on copious amounts of virtual machines and bare metals hosting business applications on some enterprise Linux distributions or other Unix family systems like IBM AIX. It was relatively easy, sometimes challenging, but mainly easy with some edge cases to be covered with custom scripts and dirty hacks that should never go live to production. I had some useful background for that job: 

* The very basic concepts of programming, data structures and algorithms were injected into my fertile brain back then. It was done in the lower secondary school by my IT teacher, she was able to see that small IT sparkle in me and a few colleagues.
* That knowledge was constantly growing, both in school and at home. Besides hanging out with friends (yes, I'm from the generation that used to play outside), I was creating websites about Worms and Quake 2/3 with HTML, PHP and some Javascript. Later it evolved into Python and Django.
* I used to have a self-built server in my drawer, made of an old laptop motherboard. Gentoo Linux was sitting there, if someone is not familiar with it... It's a distribution that forces you to configure everything from scratch by yourself, hence my main hobby was to compile Linux kernel with a hilarious frequency. It was useful though, drawer served as a heater during winter.

So automation, scripting, Perl, Bash, Sed, Awk, Python, Linux, Unix. Let's add Ansible/Chef to the stack, some monitoring (Nagios, Sensu), VCS and finally Docker with Docker Swarm. Not to forget about load balancing with Nginx and HAProxy. That was me as a SysOps back then.

### DevOps Engineer

Ok, we are jumping into DeLorean once again. Oh, Hi Marty! When did you join us?! Never mind. We travelled in time a few years forward. Here he is, Michał with his shiny Apple Macbook working from home. Yes, from home. Why, you ask? That's because now he works **in the cloud**. Now Michał is a **DevOps Engineer**, serving as a catalyst to software development. How cool is that, huh? 

**So, what changed?**

* Now everything is done with VCS. CI/CD is in place and I'm responsible for the pipelines and how optimal they are.
* I'm working with software being developed by frontend and backend devs. New programming languages and frameworks to support and know their gotchas.
* Managed services rather than self-hosted ones. Despite being more expensive it's easier to have something supported externally without the need of maintaining an internal team for some software component support.
* **Cloud is new normal**. Mostly AWS, some GCP, some Azure and some edge cases like Hetzner Cloud or Digital Ocean. Well, I had to learn quite a lot regarding the cloud. A few new certifications, loads of whitepapers and even more tries and errors.
* **Docker is the new normal**. And Kubernetes with all its sparkles and problems as a remedy for software at scale.
* Developers need dynamic environments, on demand. It's best to have per pull request env for QA to check new features. The challenging topic for DevOps team.
* Tickets, lots of tickets, from PMs and developers. And due dates, with impatient stakeholders.
* And the [Terraform](https://www.terraform.io). How could I forget that?! Now, as we live in clouds these days, it's wise to have Infrastructure as Code (IaC) in place. No more clickology, a new level of automation and ability to reuse common snippets. And yes, the code for infrastructure also lives in Git, with CI/CD. 

**So again, what changed?**

Can you see what I'm trying to say here? Let's move back to the DevOps definition. Clearly, there are some new shiny DevOps tools in game, and for sure they serve software development and help to deliver apps with a higher velocity at a better scale. But it doesn't really sound like we are aligned with the whole DevOps story. What definitely is different is that now I work as a DevOps Engineer climbing the DevOps career path and raising seniority level.

How could I describe my daily work in a few words? I was working for developers (not with them), building infrastructure and CI/CD pipelines with a modern DevOps toolset, reacting to tickets with the use of knowledge that was sealed in the DevOps team. It was neither of my interest to wear developers shoes nor developers will to understand what my team does and how does the infrastructure hosting software they write works. Not to mention any form of contribution both ways.

**And this is the most common scenario of how a DevOps role looks like in many teams/companies and the most common scenario of how do people start working as a DevOps Engineer.**

Also, confronting this with the DevOps definition it's **the most common DevOps antipattern** among the IT world.

### DevOps Engineer revisited. A short novel about getting out of my comfort zone.

Last journey. DMC-12, can you please move us to the more or less present time? Thank you, but where is Marty? Most probably he's got some business in the future. 

Where are we now? **We are in Bright Inventions**. Hurray, I've managed to pass the recruitment process with [Ula](/about-us/ula/) examining my attitude and team fit and somehow got through difficult yet right on the nose questions asked by [Piotr](/about-us/piotr/). I'm pretty happy that I could finally be able to mostly focus on one product and get rid of context switching I used to deal with previously.

Actually, I'm satisfied with the fact that I'll vendor lock myself a bit with AWS, mainly because this is my field of expertise and I have the most experience with AWS services. After short onboarding, I should be ready to work. This environment is familiar to me, and also the toolset, right? Indeed, mostly. One simple thing, that is so much different in the bigger picture - [AWS CDK](https://aws.amazon.com/cdk/). So what is the CDK? According to AWS, it's is an open-source software development framework to define your cloud application resources using familiar programming languages. Pretty neat right? At first sight, it seems like a substitute to Terraform.

Now a very important piece of information that seems to be a clue to the whole story.

**I'm the first DevOps Engineer at Bright Inventions**

Why is this important, you may ask. Well, as I mentioned the team was already using everything I was familiar with. The software is living in the cloud, and the development lifecycle needs a good velocity. So how actually the team did manage to go that far without a DevOps engineer? Well, besides having some really bright minds on board, truly open minds, they did something that was the most comfortable and well known to them. They made use of TypeScript to spawn the whole infrastructure with the help of AWS CDK. Having documentation in place for all the CDK constructs, and being able to work with a programming language they are familiar with it was possible for them to do what they needed in the AWS cloud.

I mentioned getting out of comfort zone. Firstly it was for sure not easy for the developers to work with AWS. It's a wide, complicated ecosystem with different gotchas in many places. It requires rather a wide domain knowledge to do things both right and secure. Not to forget about being cost-effective. But CDK helped with that a bit being kind of a proxy to AWS services with TypeScript constructs in place. Documentation covering all the parameters and methods is a well-known ground for developers using them. 

Secondly, me and CDK. That was something that bothered me for some time. It's just a tool doing same thing diffeerently, they say. However there was something unusual for me in the path Bright Inventions took here. It took w few weeks for me to get to know CDK, it's interactions with underlying CloudFormation, and to learn something new - TypeScript. It was refershing, but definitely out of my cozy status quo I grew using Terraform. While I was familiar with some programming languages, not being a part of software development per se, resulted in necessity to learn good practices and how to do things just right.

All in all, fun things happened here:

* My mindset changed a bit. I started to think more like developer then SysOps I actually am. It gave me a wider perspective on software I'm working with, with deeper understanding of application code, and how to work with developers efficently.
* I've learned a lot about the code quality, good practices regarding programming languages and code review. Of course I knew about that, in theory. Practicing these guidelines was not an everyday basis, especially having in mind that previously my level of dev <-> ops collaboration was from minimal to none. I even feel comfortable with contributions to applications codebase.
* I've noticed something that seems to be most crucial part of DevOps culture - **the developer empowerment**. Developers feel free to contribute to infrastructure. They have an understanding of how infrastructure works, and how to use AWS services properly.

Of course, it doesn't mean that DevOps Engenieer can be switched for developer. Making the most of AWS requires some domain knowledge about service dependencies, networking, security and how do they scale up and scale out. What does it mean however is that it's much easier to understand infrastructure and it's current state with tools like CDK and its documentation.

Most importantly, something I saw in Bright Inventions with naked eye is that instead of raising a ticket to DevOps for ex. adding S3 bucket, SQS, or Lambda function, waiting a week for closing it, developers do these contributions to the infrastructure themselves with pull requests and review request from DevOps Engenieer or anyone familiar with particular subject. 

## Summary - the definition revisited.

Remember my definition of DevOps? That's the story how I came to that. DevOps mindset is all about **collaboration and feedback loop**. Thanks to tools like AWS CDK one can both introduce so important dev empowerment and move the quality of work done by SysOps/DevOps/Infrastructure engenieers to a whole new level. As an effect we **destroy the silos**, that slow down development process so much. 

Obviously, it's a good moment to pinpoint some disadvantages of CDK. It's tool written by AWS for AWS, hence we got another vendor lock-in here. It's great for it's own ecosystem, hovever not ideal. There are some major drawbacks of using CloudFormation which I'm aware of. But it's not my intention to praise this particular tool, but draw attention to the philosophy CDK follows.

Luckily, there are various tools on the market that try to solve problems mentioned above with a different level of maturity, like [Pulumi](https://www.pulumi.com) or [cdktf](https://github.com/hashicorp/terraform-cdk), that allows you to use familiar programming languages and CDK constructs to define cloud infrastructure and provision it through [HashiCorp Terraform](https://www.terraform.io). That one is brilliant solution that connects advantages of CDK and great power of Terraform and it's huge base of providers, along with friendly community.

I sincerely encourage all software development teams and DevOps teams, that live in antipatterns I used to live in, to look into this attitude and try to implement it even experimentally. Adapting to the new working culture takes some time and effort on the every side of equation, but effect can be suprisingly satisfying for everyone.