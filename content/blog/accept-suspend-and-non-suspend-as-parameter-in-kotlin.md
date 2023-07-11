---
author: lukasz
tags:
  - Kotlin
  - development
date: 2023-07-11T07:17:46.598Z
meaningfullyUpdatedAt: 2023-07-11T07:17:47.078Z
title: Accept Suspend and Non-Suspend as Parameter in Kotlin
layout: post
image: /images/blogpost_tip_kotlin.png
hidden: false
comments: true
published: true
language: en
---
**Kotlin as always comes with a smart and simple solution. 😀 Check out this tip!**

<InstagramEmbed url='https://www.instagram.com/p/Ca4pOETg38k/' />

Instead of creating two analogous functions just to be able to provide both suspend and regular functions as parameters, like so:

```kotlin
fun doSomethingBeforeAndAfter(
nonSuspendAction: () -> Unit
) {
  somethingBeforeAction()
  nonSuspendAction()
  somethingAfterAction()
}

suspend fun doSomethingBeforeAndAfterForSuspendableActions(
 suspendAction: suspend () -> Unit
) {
  somethingBeforeAction()
  suspendAction()
  somethingAfterAction()
}
```

If you can define your function as ‘inline’, it will also make it accept both suspend and non-suspend functions as parameters:

```kotlin
inline fun doSomethingBeforeAndAfter(
 action: () -> Unit
) {
  somethingBeforeAction()
  action()
  somethingAfterAction()
}
```

Check out our [repo](https://github.com/bright/dev-tips/blob/main/kotlin/AcceptSuspendAndNonSuspendAsParameter.kt)! Hope you enjoyed this Kotlin tip. 🙂