---
author: damian
tags:
  - spring boot
  - spring
  - graalVM
  - jvm
date: 2022-12-09T08:00:34.658Z
meaningfullyUpdatedAt: 2022-12-09T08:00:36.243Z
title: Spring Boot and the Holy GraalVM
layout: post
image: /images/spring-boot-holy-graal.png
hidden: false
comments: true
published: true
language: en
---
**With the release of Spring Boot 3.0, we get official support for GraalVM native builds. Does it mean that we can finally free 
ourselves from the overhead of JVM? How do native builds improve the performance of the app? Where is a tradeoff and is it worth making? 
In this post, we will try to get some answers to those questions. With some Monty Python references along the way.**

<center><img src="/images/spring-boot-holy-graal-sacred-task.png"  width="700" title="Look well, Developer, for this is your sacred task to seek this Grail." /><center>Look well, Developer, for this is your sacred task to seek this Grail.<br></br> © Monty Python and the Holy Grail (1975)</center></center>

Spring Native [project](https://github.com/spring-projects-experimental/spring-native) is now officially part of the Spring Boot 3.0 release. 
With it, on our side, we can compile Spring Boot projects directly to executables native to the OS, completely omitting Java's VM. 
Therefore now we can easily run the binary on a system without JRE installed. This is pretty wild! But you might ask why would we 
ever want to do that. Well... there are a couple of reasons.

JVM was a way to streamline building software that would run on any device, despite OS being installed.

> Write once and run anywhere

It's all great, but maybe you don't  need this. Maybe you are building a web app and it only needs to run on a Linux OS 
somewhere in the cloud. In this case JVM is just an unnecessary overhead, that will slow us down.

With [GraalVM](https://www.graalvm.org/) AOT (ahead-of-time) compilation we can achieve just that. And since it comes freely with Spring Boot 3.0
it has never been a better time to start running your app on directly on the bare metal... or on the cloud's virtualized compute service.

<div class="important-info">All the tests were made on MacBook Pro with Intel I7-9750H and 16GB of RAM. Benchmark app was running on GraalVM CE 22.3.0. 
Numbers are an average from 10 consecutive runs.</div>

## Clean start

Let's start by looking at the blank app, straight from the [Spring Initializer](https://start.spring.io/) with no additional dependencies, to get the reference point.
I will be testing compile time, the final file size will be native or JAR, start-up time and memory allocated by the process.

### Compilation time

Compiling an app to the native image takes much longer than building a JAR. In my tests, the average native image took **1m 37s** to compile, and building
JAR took only **4s** - this is almost **25x longer**. That's a lot, but we should expect that, AOT is performing some optimisation
at the compilation step. In the default HotSpot, JVM's JIT approach those things are postponed until the runtime. AOT compiler is also 
doing things that JIT will never attempt to do, for instance, AOT will check which resources are never used and can throw away classes
from the final build. With JIT we always take everything from the classpath into the final JAR. 

### File size

File size of the app will be also significantly larger with the native build. In my tests, the blank app took **45.3MB** of disk space while the JAR weighed
only **14.4MB**. The size difference is caused by the fact that the native build is a standalone executable. It does not require any other dependencies like
JRE to be started. Meaning we have to pack everything that we might need from JRE inside the binary. JAR will utilize JRE, therefore it can contain only the
source code of our app.

<center><img src="/images/spring-boot-holy-graal-bridge-of-death.png" width="700" title="WHAT... is your quest? Improvements!"  /><center>WHAT... is your quest? Improvements!<br></br> © Monty Python and the Holy Grail (1975)</center></center>

Ok. So native image takes longer to compile and weighs more. So far not so great, but let's move to the good parts!

### Startup time

Spring Boot apps are infamous for their long startup time. Classpath scanning is one of the things that causes the problem. Since AOT pushes that process to the 
compile time we are seeing a massive improvement in that regard. During my tests JAR needed **0.774s** to boot, while native binary needed only **0.017s**. 
It's **45 times** improvement.

### Memory usage

Memory usage also seems to be improved. Blank JAR had to allocate **125MB** of memory while the native build only need **27MB**. That's another place where we can 
see the benefits of withdrawing JVM.

Summary of all the numbers in a table:

|              | JIT    | AOT    |
| ------------ | ------ | ------ |
| Compile time | 4s     | 1m 37s |
| File size    | 14.4MB | 45.3MB |
| Startup time | 0.774s | 0.017s |
| Memory usage | 125MB  | 27MB   |

## 1000 Beans

So far we tested the blank app, but what will happen if we would fill up our project with some code. To test this I've made 1000 empty Beans.

<center><img src="/images/spring-boot-holy-graal-camelot.png" width="700" title="1000 Beans! It's only a meaningless model... Shhh"  /> 
<center><s>Camelot!</s> 1000 Beans! It is only a meaningless model... Shhh<br></br> © Monty Python and the Holy Grail (1975)</center>
</center>

The idea of this test is to see how Beans discovery time would improve the startup time of the AOT build.

|              | JIT    | AOT    |
| ------------ | ------ | ------ |
| Compile time | 11s    | 1m 32s |
| File size    | 15.9MB | 47MB   |
| Startup time | 1.943s | 0.043s |
| Memory usage | 314MB  | 42MB   |

Comparing those numbers we can tell that both versions take a hit on the startup time. In both cases, the app needs **2.5x** more time to boot. But since the base value of
the native binary is much smaller, then the overhead doesn't look that bad. Additionally, we can tell that the native build is much less memory hungry with an 
increase of lines of code. RAM allocated by native binary is **1.5x** times greater over the base value, while JAR needed to allocate **2.5x** as much memory. 

## Sample app

Let's test something closer to the real-life scenario. I will reuse the benchmark app from the 
[previous blog post](https://brightinventions.pl/blog/cost-of-layered-architecture). 

It's a sample app that is just repackaging DTOs and
pushing them from left to right. (Something that happens way often in the code that we would like to admit). One of the conclusions from that post was how helpful 
JIT is, optimising our code on the fly. Can we count on the same help with the native build? Well... no.

|           | JIT   | AOT   |
| --------- | ----- | ----- |
| No warmup | 606ms | 681ms |
| Warmup    | 373ms | 642ms |

<center><img src="/images/spring-boot-holy-graal-flesh-wound.png" width="600" title="No JIT optimisation? It's just a flesh wound."  /><center>No JIT optimisation? It's just a flesh wound.<br></br> © Monty Python and the Holy Grail (1975)</center></center>

As you can tell by the numbers if we allow JIT to warm up, the same task will be executed in just 60% of the original time. We don't have the same improvement 
on the native build, execution time remains similar no matter how much time we spend warming up the code.

If you are thinking about utilising native builds on prod, please benchmark your code carefully.
You might be surprised that your app is running slower if you heavily relied on JIT optimisation which is not possible with AOT.

## Conclusion

To sum it up with AOT build we are trading longer compile time and larger file size for much faster boot time and lower memory usage. I can think of one place where this 
tradeoff makes perfect sense - it's the cloud! If you are running your code on the cloud then give it a try. Please keep in mind that to use GraalVM natively with 
Spring Boot you need to upgrade to version 3.0 or higher. That could be a challenge in itself, especially since Spring Boot 3.0 is using 
Java 17 as a baseline. Before the upgrade check the full [laundry list](https://spring.io/blog/2022/05/24/preparing-for-spring-boot-3-0).

<div className="block-button"><h2>We are looking for backend developers (TS, Node.js)</h2><div>Work on projects such as the blockchain platform for a top global humanitarian agency, accounting software, or web therapy application. Remote work or hybrid (Gdańsk, Poland).</div><a href="/jobs/senior-backend-developer-typescript"><button>Apply and join our team</button></a></div>
