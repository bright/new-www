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
Coordinators, FlowControllers... You name them! What are the motives for using them?  
It is not something unusual when inside `ViewController` A you find code that is responsible for transition to screen B. A problem with this approach is that out of a sudden you create a tight coupling between these two entities. 
Well... It's always good to ask a question - Is it a problem? If you're working on something simple then using this kind of navigation will surely be fine, however if you're up to something more complicated - adding a coordinator will surely help. Keep in mind, that adding a coordinator is not a high cost game - I tend to use them even in simple apps as they help me to organize my code better and give me a good look on how navigation in my app works. Adding a coordinator to your app will help you with:  
- Keeping your screens separated from each ather, which will allow you to modularise and reuse them easily.
- Controlling flow in parts of your app (You will probably have many different coordinators)  
- Dependency injection (Please follow me to "What?" part of this article where I'll elaborate on this a bit more)

## The discipline

A pure fact that you start using `MVVM` and `Coordinators` will not instantly make your code base clean. Guess what? You can still end up with `Massive ViewModels`! It's up to you whether you keep yourself tight and organize your code well. In my case, the reasoning for using `MVVM` was not caused by the fact of not being able to organize your code well, you can do it with `MVC` as well!



# How?  


## MVVM
Ok, so how do I use `MVVM`? How do I keep my `VM` clean? How do I use coordinators? Jump on board and let's see an example.  
I have to admit, that when I was putting my first leg into iOS development, I considered `ViewModel` as an object that holds values that my view presents. At that point I did not see that much value in using `ViewModels`. What changed my point of view is the approach that you can read about on [Microsoft patterns and practices](https://msdn.microsoft.com/en-us/library/hh848246.aspx). The core information for me was the fact that the `View` layer in Microsoft's approach was represented as `XAML` (quote: "with a limited code-behind that does not contain business logic"). Ok... So does it mean, that `ViewModel` is not only about holding values represented by our views? Can it also contain logic that drives these views? YES! Following this approach on iOS, advocates that you should keep your view layer simple and passive (which in case of MVVM would be both UIView and UIViewController) and move the logic to `ViewModel`. This is the first step that allows us to reach better testability and move our code far away from `UIKit`.

## Coordinator  

## Dependency Injection With Coordinators  
Packed with creation of viewmodels etc / should we move creation to Dependency Containers & outside of Coordinators reach? Or can we simply take our "FlowControllers" as creators of dependencies

## Reactive

Let's see an example of a `MVVM` together with `Coordinator`. This example will show a view that allows you to fetch user data from the backend, represent it on the screen and save it to some storage later on. You can find the example project here: ** TODO - github link ** 


Credits: 
http://merowing.info/2016/01/improve-your-ios-architecture-with-flowcontrollers/





*This article is cross-posted with [my personal blog](https://eliaszsawicki.com/).*