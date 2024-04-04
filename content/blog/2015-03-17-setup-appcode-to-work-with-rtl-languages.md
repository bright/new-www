---
layout: post
excerpt: >-
  How to make iOS Simulator work with Right-To-Left languages when it's started
  from AppCode?
title: Setup AppCode to start Simulator in RTL mode
modified: 2015-03-17T00:00:00.000Z
tags:
  - iOS
comments: true
author: mateuszklimek
date: '2015-03-16T23:00:00.000Z'
meaningfullyUpdatedAt: '2015-03-16T23:00:00.000Z'
image: /images/laptop_coding.jpg
published: true
language: en
---
# Question
How to make iOS Simulator work with Right-To-Left languages when it's started from AppCode?
# Answer
Paste these two parameters:
```xml
-AppleTextDirection YES 
-NSForceRightToLeftWritingDirection YES
```

into `program arguments' in Run/Debug Configuration.
<br/><br/>
![appcode-rtl-config](../../static/images/appcode-rtl-config.png "")
<br/><br/>
Keep in mind that if you kill the app and start it again in simulator, parameters **wouldn't be** included for the new process. Thus the app will start in the common LTR mode.
The only way to restart the app in RTL is to run the app from AppCode again.


See this post on my [personal blog](http://mklimek.github.io/setup-appcode-to-work-with-rtl-languages/).
