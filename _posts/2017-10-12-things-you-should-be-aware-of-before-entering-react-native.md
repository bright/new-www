---
layout: post
title: React Native - The things that you shoud be aware of before coming onboard
tags: iOS
comments: true
author: eliasz
---
 
React Native is a neat piece of technology that I get along pretty well with. Creating multiplatform apps using shared codebase and having a great feedback loop sounds really promising and after hearing such things you may start wondering "Why the hell am I not using RN?!". Well... As you probably know, many things aren't all that shiny after you go past the happy-path tutorials. In this post I'd like to give you my perspective on things that I found problematic, frustrating or things that I just wasn't prepared for while entering the React Native world. However, this will be a perspective of iOS developer who had a lot of fun with while developing with RN.

Please do not mistake this post with a "React Native - The things that should discourage you from using it". In fact I really like React Native for many reasons (![I've written about it here]())! My point is to make you aware of what difficulties you may find on the RN path, which will hopefully make you better prepared for them and will result with less frustration and great development experience.  

* This post has been written on 12.10.2017, keep in mind that currently things may look different! *

#Let's start!

##1. The "Do-It-Yourself" approach  
If you are a native developer since forever, then coming into RN will be something completely new to you.
You have to keep in mind, that there will be many times where there won't be an existing solution for your usecase and the only way to push the project will be to write the whole solution yourself, adapt existing open-source project to your needs or simply fix a bug in a library. Well... This wouldn't be a surprising thing for a native developer, however react-native itself is also a dependency that may require fixes at times and by any means is not a final version yet. You probably didn't have to fix things in UIKit before ;)

##2. Leaky abstractions
Android and iOS are different platforms. It's not surprising that things may work differently. It's pretty hard to cover all cases under one universal abstraction. Sometimes you probably wouldn't event want to have a universal API for both Android and iOS, because this would mean giving up on some platform specific features that you might still want to cover with your RN code. Be prepared, that there will still be places where you will yell "Hey! I've had it in Swift!". Well... Maybe it's not covered by RN yet?

##3. Things may not work always in the same way  
Even if you use the same API and it feels great, keep in mind this simple rule. If you are writing a multi-platform app, then you should test it on those platforms separately. You will run into places, where certain implementation works on iOS, but behaves slighly different on Android. Some basic examples I can think of are:  
- A scrollView, that will result in slightly different experience while scrolling (programmatically or with your finger) on both platforms
- By default an android view will render with transparent backgrounds, while iOS will render them white.  

##4. Project configuration  
You change a name of a build configuration in Xcode for your React Native project, and suddenly you realise that you are not able to compile it anymore. What's wrong? Well... you start reading the React Native library (You can do it, because it's open source!) code that is responsible for building the project and you find out, that other configurations than `Debug` or `Release` are not fully supported. Things like this happen and it's good to be aware of issues like this beforehand. If you find issues like this remember, that you are not alone! There is a great community that will surely help you!  
But remember - don't come with "Give me!" approach ;)
Example project configuration issue - https://github.com/facebook/react-native/issues/11813#issuecomment-331519708

##5. Navigation  
As a native dev, whole navigation stack is focused around pushing/popping/dismissing controllers. You have a specific api for that and everything is working fine... If you come to RN world... There are many navigation libraries that will wait for you. It will be very hard to come up with a goot fit at first. You may end up with something that will turn out to be not as pleasant as you expected. I'm currently a happy user of ![React Native Navigation by Wix](https://github.com/wix/react-native-navigation). It should be fine for you, but if you're missing something... contribute!
Be aware that there you won't find a standarized way to solve navigation as you used to do in you iOS/Android apps.


##6. Bridging existing android/iOS libraries  
Many platform-specific libraries that you will use in React Native will in fact be native libraries bridged to javascript API. This is important to know, because in order to use a fresh version of your favourite swift library, you will also need an updated version of the library that bridges the API to JS. This may cause delay in having such updates, unless you go with do-it-yourself approach.  

##7. Dependencies, dependencies, dependencies  
If you come from the web background, then you will not be surprised at all, but if you are a native dev, then I guess that you did not have that many dependencies in your project. If you think that you actually have many of them, then wait until you see the dependency tree in your RN project. Even at the start of the project, they will reach a high number. It may look scray, but you'll probably get used to it. You have to switch your way of thinking when you start working on JS based projects. Normally you turn your IDE on and compile the code / run tests. Here you will have to bring your own test runner / transpiler and work with that.

##8. Debugging  
I have to admit that debugging the code that I've written in RN projects is not as pleasant as in IDEs that you are now using. Some of the text editors will support debugging, but in my case I've been using Typescript for my project, which means that it was a bit harder to setup the debugger in a text editor. I ended up debugging my code in chrome dev tools many times. By any means, it is not a horrible experience, but you will surely feel the difference compared to debugging in your IDE. 

##9. Are you flexible with the app?

##10. Learning React Native

##11. Your background

##12. You don't have to use pure JS

##13. You don't have to setup your project from the ground


These points should not discourage you from entering the world of React Native. I've had a great time with it and I'm really looking forward to seeing how this technology evolves in the future.  
Well... you should surely avoid RN if you don't want to experience the feeling of longing after coming back to Native-Native development. There will be many things in Native development that you won't feel comfortable with after trying RN ;)

