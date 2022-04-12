---
author: maciej
tags:
  - automation testing
  - QA
  - karaoke
date: 2020-08-17T11:45:17.768Z
title: What do test automation and karaoke have in common?
layout: post
image: /images/blog_post_cover_karoke.png
hidden: false
comments: true
published: true
---
A well-known strategy for explaining the unexplainable and adding context and meaning to something complex and obscured is using a metaphor. Engineers usually find automation testing hard to describe in detail, especially to a less-technical person. It is a process rather than an action or idea and there are so many different properties of it and variables in it that it can be tough to wrap one’s head around it. That is why I came up with a quirky comparison that hopefully will make things clearer - with the karaoke, something common in many cultures and most importantly, fun.

## Realizing the need

Settling down into a routine of work and sleep can easily spoil even the most fulfilling job or a dream life. We seek ways of spicing things up by constantly trying new sports, exotic food or popular TV series but then there’s the ultimate approach. Realizing that you need karaoke may not be easy. It might even be painful to accept that something frightening and challenging at the same time can turn out not only to be fun but also beneficial.

The last sentence can also be applied to a process of introducing automation testing into a project. It is challenging and won’t be done overnight but in most of the long-term projects there comes a moment when you have to do it. Automation testing reduces the time and cost of QA-related activities, improves the general understanding of the end user’s need, provides statistics describing the quality of the product and enables supporting old versions of it. When to start automating? The easiest answer is: before the cost of manual testing exceeds the cost of automation testing.

![automation testing](/images/automationkaraoke/graph.png)

A simplified graph above shows that the cost of manual testing grows along with the complexity and size of the product because testers have increasingly more test cases to cover over time. Automation testing means a big initial cost but then steadily adding new tests is generally cheaper. The graph obviously does not apply to every project and its individual needs. Also, it should not lead to the conclusion that manual testing can be somehow replaced by automation testing. These two processes should coexist within the project and complement each other. Which brings me to my next point...

## Building a team

I do not mean to say that going to a karaoke bar alone is impossible. Some people have the guts and the talent to pull off a masterful performance on their own. Others though, prefer to assemble a team of friends to both support each other and enjoy the night together - a pack of people with different voices, temperaments, stage experience. Some are ready to nail those high notes, some prefer to support the stars as backup singers.

![karaoke](/images/automationkaraoke/forja2-mx-r2kxuoOFtHY-unsplash.jpg)

Making the most of teammates’ strengths is the key to having great results, also in testing. Automation testers usually need to have at least some amount of experience and programming skills. But it doesn’t mean that they should lack the creativity and dexterity usually ascribed to the manual testers. It is also important to take experience into consideration. Usually, there has to be a mentor, someone who can guide the inexperienced colleagues, someone who has already heard a standing ovation after nailing the Bohemian Rhapsody.

Another important factor is the understanding of quality assurance and communication. Good testers are usually double-agents: they are not only improving the processes and gathering documentation to make the team’s work easier but also understanding the requirements and discussing the end user’s needs with the client. Having such people in your team is invaluable as they will not only do their job but also have an extremely positive impact on yours. It takes a singer to sing but an artist to please both the band members and the audience.

## Making sure you understand the process

It may be trivial but planning and understanding automation testing is sometimes more crucial than executing it. Like ordering a particular song or booking a table next to the scene, testing always has rules. Understanding who is the person you should ask if that old forgotten Nirvana’s song is available or where to get drinks is an equivalent of understanding what the key functionalities that need to be covered by tests are, what kind of scenarios can be problematic, which level of automation pyramid we are talking about.

Also, setting the right time frames is essential to track the performance of the team and seeing possible issues ahead of time. Start with selecting tools that suit the project’s needs and teammates’ skills. Define the scope of automation and try to divide into sprints or prioritize it on the Kanban board depending on what approach you prefer. Design the framework, develop tests, execute them, measure the results.

Last but not least, define some clear exit criteria to be able to tell when the product’s quality is satisfying. These steps seem to be obvious but failing to understand the automation process means ending up maintaining non-conclusive tests, fixing software instead of adding new functionalities and therefore increasing the costs instead of minimizing them. Or being stuck on stage with your legs shaking because you don’t recognize the melody of a song that you’re about to sing.

## Decisions, decisions…

Picking the right song at the right moment is the only way to avoid being the only person having fun. A slow love ballad after a great, energetic performance might be a mood-killer.

Choosing the right automation tools or framework is exactly the same. Selenium might be popular but it is not necessarily a good fit for every project. Another issue to take into consideration is using the pre-gathered team properly. Choose who is responsible for defining scripting standards, good practices and documentation and who feels better just sticking to the requirements and writing the quality code. We don’t want our automation to be a screech but rather a song. Select a tool that will make gathering measure metrics and presenting them to the client easier. Finally, we get to choose what the key features that we want to cover with automation testing right away are and which have a lower priority and can wait. Making these decisions may be a turning point in how the project is managed and how satisfied the client is.

## Time to shine

I’d love every fellow tester to enjoy this moment. We get to work, treating the project as a blank page and release our creativity, continuing to cover our app with a comfy blanket of well-written tests.

It doesn’t mean it would be easy, though. Sometimes forging a test case absolutely valid from a manual tester’s point of view into the code can be hard to achieve. The lack of understanding from the developers can make this challenge very difficult. Being able to identify regression bugs or technical boundaries of the programming language may seem to be impossible to overcome. Requirements can be vague and the lack of time will surely be a problem once or twice. But as entering the stage and actually singing, automation testing is tough and the only way to find out if it works out is to actually perform it.

I’d also like testers to think about this process of developing and executing tests as a learning experience. There’s so much to improve - not only the actual code but also the communication, the good practices we habituate, the communication, the bond we, as a team, have with the customer.

![karaoke](/images/automationkaraoke/bruno-emmanuelle-Gi6-m_t_W-E-unsplash.jpg)

## Once the dust settles…

Imagine it’s 2 am, you’re desperate for a taxi and there’s this ringing noise in your ears. But somehow it feels good. The only thing left is to get back home and then text your friends in the morning (well, maybe around noon) to ask them to rate your yesterday’s performance.

In most projects there comes a time when developing new automation tests is not needed anymore. While the exit criteria may vary, the decision to stop testing is usually made based on the cost or the test coverage.

In the first case we simply run out of resources when either the time or the budget are exhausted. It is a potentially dangerous situation because hitting the brake before the finish line would mean compromising on the quality of the end product. What is the point of testing if it doesn’t lead to confidence about the software?

The second case, on the other hand, is usually a well-thought decision. We defined a threshold of test coverage that would satisfy our needs a long time ago, while planning the testing scope in the first place. We’ve achieved a complete functional coverage of the main features and have confidence that there are no critical issues left. A good practice is running all the tests once more, publishing and reviewing the results and discussing if anything else can be done. This approach will allow the team to be aware of the existing issues, risks, and based on them to make the right decision - whether to stop testing or not.

This decision is also never definitive. If there’s a plan to add a new module or there are some critical bugs that have not been spotted, the process will be restarted. Even if you don’t feel like going tonight, there will be plenty of karaoke organized nearby soon.

## Conclusion

Test automation is an integral part of testing software in general. It has to be well-planned and swiftly executed. The initial process of introducing the automation to the project and assembling a team of testers has a crucial impact on the quality of the product and how much time it will take to finish it. Understanding different stages and properties of the process and the importance of well-timed decision making are the key to minimize the cost of software development. Documentation and test results should be analyzed frequently in order to be able to track the progress we have made and end the development of automation testing when the exit criteria are met.

Last but not least, please do consider karaoke when planning your next team retreat.