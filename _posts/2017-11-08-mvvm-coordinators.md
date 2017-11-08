---
layout: post
title: My motives for MVVM + Coordinators path
tags: [iOS, Swift]
comments: true
author: eliasz
hidden: false
excerpt: There are many different approaches to building an iOS application. MVC, MVP, MVVM, VIPER, Redux... You name others. I've been writing iOS apps for some time now, and I noticed that MVVM + Coordinators approach works pretty well for me. In this post I'd like to focus on "WHY?" I use it over other approaches, "HOW?" I use it in my apps and "WHAT?" things I find problematic or helpful with this approach.
---

There are many different approaches to building an iOS application. MVC, MVP, MVVM, VIPER, Redux... You name others. I've been writing iOS apps for some time now, and I noticed that MVVM + Coordinators approach works pretty well for me.
In this post I'd like to focus on "WHY?" I use it over other approaches, "HOW?" I use it in my apps and "WHAT?" things I find problematic or helpful with this approach.

# WHY?  

## The beginning
Starting iOS development is usually connected with learning basic patterns that you can use to solve problems that you will run into while struggling to create your first screens in the app. Most probably, the first pattern that will take care of your views and logic behind them will be `MVC` which is very popular among iOS developers (but not only them). This is mostly caused by the fact that Apple highly promotes this pattern across the `UIKit` framework and code examples that you can find in their tutorials.

## Is MVC bad?
Yes! It's the worst of all! It causes Massive ViewControllers to appear over your app... Jokes aside...  

No, it's not. I was really glad when I've recently read post ["Much ado about iOS app architecture" ](http://aplus.rs/2017/much-ado-about-ios-app-architecture/). I cannot say that I fully agree with everything that is being said there, but there were parts that I can surely identify myself with. Why was I glad to read this? Because of this sentence:  
```
"No one is forcing you to implement multiple DataSources in one Controller. To initiate network calls in viewDidLoad. To parse JSONs in UIViewController. To hard-wire Views with Singleton instances."  
```

Many developers blame `MVC` for it's horrible mess and chaos which in fact... is created by developers themselves. If you lack discipline, then even `VIPER` will not help you. Certain patterns may make it easier to structure the code properly and keep it clean, but it's always up to you whether you keep the discipline or not.

Should I use `MVC` if it is not that bad in the end? As a skilled consultant I should probably say "it depends". `MVC` obviously has it's own pros and cons and I bet you can find many great articles that will help you to make up your mind.

## Why MVVM?  
If `MVC` is not that bad, then what are my motives for following the `MVVM` path? Just to name a few of them:  
- Allows me to move a big portion of my code far away from `UIKit` ([Which gives ability to test this code faster - as macOS frameworks ](https://eliaszsawicki.com/are-your-views-dumb-enough/)).  
- Allows me to test the logic that drives my views easier.  
- It works really well with reactive programming approaches.  

So now, after adopting the principles of `MVVM` pattern, I'm able to have my passive views (as dumb as possible) and my logic that drives my views which is also separated from the UIKit.  

Why not going any further with the division approach that patterns like `VIPER` target really well? Well... you can do that. However, I'd say that these kind of patterns could be an easy overikill for a small/medium sized apps and personally, I've never used `VIPER` in a big project before (But I'd be glad to hear your opinion on this!).  
I feel that `MVVM` works really well if you want to keep your solutions easy to understand while having an ability to easily test your code and have a nice separation from UIKit-dependant parts of your code.

## Coordinators  
Coordinators, flow controllers, 



# How?








*This article is cross-posted with [my personal blog](https://eliaszsawicki.com/).*