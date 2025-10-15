---
author: szymek
tags:
  - Android
  - WorkManager
date: 2025-10-15T13:04:49.616Z
meaningfullyUpdatedAt: 2025-10-15T13:04:49.616Z
title: Got a ConnectivityException Crash? Read How to Solve it
layout: post
image: /images/android-connectivity-exception-too-many-requests.jpg
hidden: false
comments: true
published: true
language: en
---
**Have you seen the `ConnectivityException$TooManyRequests` exception in your Crashlytics dashboard? Perhaps you have noticed `WorkManager` as well? Don’t throw any stones yet! It might be something else that is causing it.**

<center>
  <div className="image">
![ConnectivityException in Android](/images/android-connectivity-exception-too-many-requests.jpg "ConnectivityException in Android")
  </div>
</center>

## Why is it crashing?

Android has implemented a protective measure against memory leaks that can occur when registering too many network callbacks using `ConnectivityManager.registerNetworkCallback` [method](https://developer.android.com/reference/android/net/ConnectivityManager#registerNetworkCallback(android.net.NetworkRequest,%20android.net.ConnectivityManager.NetworkCallback)). 

Android's `ConnectivityManager` imposes a limit on network callback registrations. Attempting to register more than 100 network callbacks will result in a `ConnectivityException$TooManyRequests` error, [as detailed in the official documentation](https://developer.android.com/reference/android/net/ConnectivityManager#registerBestMatchingNetworkCallback(android.net.NetworkRequest,%20android.net.ConnectivityManager.NetworkCallback,%20android.os.Handler)). For instance, continuously registering callbacks without proper deregistration will lead to an application crash. You can try that with the following code placed e.g. in your `MainActivity.onCreate` method.

```kotlin
repeat(100) {
   connectivityManager.registerNetworkCallback(...)
}
```

## WorkManager callback registration

When you create a `WorkRequest` with an online network constraint, it can register a network callback. However, registering 100 separate `WorkRequest` instances doesn't necessarily mean 100 network callbacks will be registered. The new _2.10.1_ version has reduced the likelihood of this occurring (see [changelog](https://developer.android.com/jetpack/androidx/releases/work#2.10.1) and the [change itself](https://android-review.googlesource.com/c/platform/frameworks/support/+/3588735)).

##  Is WorkManager the one to blame?

While `WorkManager` `WorkRequest` instances can indeed register network callbacks and potentially contribute to `ConnectivityException$TooManyRequests` crashes, it's not always the sole or primary cause.

It's crucial to consider that other parts of your application, or even third-party libraries, might be registering network callbacks. If these other sources are poorly managed, perhaps repeatedly registering callbacks without proper deregistration and then simply catching any resulting exceptions (including `ConnectivityException$TooManyRequests`), they could silently accumulate `NetworkCallback`s up to the system's 100-limit. In such a scenario, when `WorkManager` attempts to schedule a new `WorkRequest` with an online network constraint, its subsequent registration of a network callback would then trigger the `ConnectivityException$TooManyRequests` exception, as WorkManager in some versions does not implement a try-catch mechanism around this specific callback registration ([see explanation why here](https://issuetracker.google.com/issues/231499040#comment23)).

This makes it appear as though `WorkManager` is the culprit, when in reality, the issue might lie with other components consuming the available callback slots.

## What can be an alternative cause of the ConnectivityException$TooManyRequests?

Since it's not a `WorkManager`, we need to identify what's registering the other 99 network callbacks. You can directly search your code for network callback registrations, which might reveal the root cause. However, even if you find it, an additional verification step is recommended: examine heap dumps. Interact with your app thoroughly - navigate every screen, use all features, and repeat this process with network (Wi-Fi, cellular data, etc.) both on and off. Afterward, create a heap dump using [Android Profiler](https://developer.android.com/studio/profile).

Once you create a heap dump, search for `NetworkCallback`, then try to find references to your code or external libraries you use.

<div className="image">![ConnectivityException Profiler](/images/android-connectivity-exception-too-many-requests-profiler.png "ConnectivityException Profiler")</div>

In our case, the external Chat library we use was registering those callbacks using Coil when trying to load a lot of chat messages containing offline images queued to be sent.

**What was it in your case?**
