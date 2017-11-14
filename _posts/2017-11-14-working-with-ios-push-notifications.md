---
layout: post
title: Working with iOS push notifications
author: mateusz
hidden: true
tags: ['ios', 'push notifications', 'firebase', 'swift']
comments: true
---

Push notifications, also known as remote notifications, are a tremendously useful feature of mobile applications. They can be used for sending users marketing offers, increase users engagement by providing a personalised content, implementing a chat or even triggering some action to be performed in the background. And what's really useful, users don't have to keep their app opened.

Sounds great, isn't it? Yes, but it's necessary to understand how push notifications work and learn how to set them up properly to avoid unnecessary hassle.

## iOS 10 novelties

iOS 10, in addition to short text message, playing a notification sound, and setting a budge number on the app's icon, has expanded iOS push notifications capabilities with:

- **media attachments** (images, gifs, audio, video),
- expanding detail view with **3D Touch**,
- **notifications actions** allowing user to take immediate actions.

In [example](https://medium.com/@prianka.kariat/ios-10-notifications-with-attachments-and-much-more-169a7405ddaf) presented below, there is an iOS 10 push notification with image attached and "Like" action button.

![gif](https://cdn-images-1.medium.com/max/800/1*2ngvD9Tqp3TXjdWwVDMqEQ.jpeg)

This allows developers to increase push notifications quality and get even more from this versatile feature.

## The server

Push notifications **are sent from the server** to `Apple Push Notification service` directed to one or more specific devices that has registered to the `APNs`. This means that we need to set up a server that will gather **device tokens** from mobile devices and send the notifications. It might sound quite complicated, but don't worry, there are plenty of ready-made solutions that can be used, even for free.

Let's glance on the most popular services that support both iOS and Android:

- [**Firebase Cloud Messaging** by Google](https://firebase.google.com)
- **[Pusher](https://pusher.com)**
- **[Mixpanel](https://mixpanel.com)**

Each of these services offers also other features like analytics, A/B testing, crash reporting, real-time database or even authentication, but you don't have to use any of it.

Note that using a 3rd party solution has its **downsides**, like:

- If you decide to send push notifications from **your own server**, you will need to communicate with the service you've used instead of the `APNS` directly, or you'll have to reconfigure your mobile app.
- You must be aware, that your data is sent through servers that you don't control, it might concern you regarding your data protection policy.
- Some services are free until you reach some limit, for example Mixpanel lets you create only [up to 1000 user profiles for free](https://mixpanel.com/pricing/#people).
- When a service is being closed down, you have limited time to migrate to another service. Such an example was the [Parse service shut down on January, 2017](http://blog.parse.com/announcements/moving-on) .

## Firebase

For purpose of this post we'll use the [`Firebase Cloud Messaging`](https://firebase.google.com). It's an interesting solution because since I/O 2016, when Google  turned Firebase into an unified mobile platform, it has replaced the `Google Cloud Platform` as the default solution for Android handling push notifications. This means that we can use the same service for sending push notifications to both platforms, while using the default implementation on Android.

`FCM` inherits `GCM`'s core infrastructure, but simplifies the client development. `GCM` is still supported but all new client-side features will be available on `FCM` only. `Firebase Cloud Messaging` uses the `Apple Push Notification service` to send messages to you iOS app.

There is no need to duplicate instructions how to setup Firebase, so if you haven't done it yet please follow [those instructions](https://firebase.google.com/docs/ios/setup).

## Certificates

// Apple Developer Center

## Project configuration

// Xcode configuration

## Code

// App Delegate, etc.

// No need to send device token manually if we're using 3rd party solution and won't disable method swizzling

## Testing

Houston - https://github.com/nomad/houston

## Silent notifications

// What is it? First introduced in iOS 9

// It's not working in iOS 11.0 - 11.0.3! Fixed in iOS 11.1

## Sky is the limit

// Summary
