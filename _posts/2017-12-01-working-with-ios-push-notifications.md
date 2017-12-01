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

Push notifications **are sent from the server** to `Apple Push Notification service` directed to one or more specific devices that has registered to the `APNs`. This means that we need to set up a server that will gather mobile **devices tokens** and use them to send push notifications through `APNs`. It might sound quite complicated, but don't worry, there are plenty of ready-made solutions that can be used, even for free.

Let's glance on the most popular services that support both iOS and Android:

- [**Firebase Cloud Messaging** by Google](https://firebase.google.com)
- [**Pusher**](https://pusher.com)
- [**Mixpanel**](https://mixpanel.com)

Each of these services offers also other features like analytics, A/B testing, crash reporting, real-time database or even authentication, but you don't have to use any of it.

Note that using a 3rd party service has its **downsides**, like:

- If you decide to switch to **your own server**, you'll need to communicate with the service you've used instead of the `APNS` directly, or you'll have to reconfigure your mobile app.
- You must be aware, that your data is sent through servers that you don't control, so it might concern you regarding your data protection policy.
- Some services are **free until you reach some limit**, for example, Mixpanel lets you create only [up to 1000 user profiles for free](https://mixpanel.com/pricing/#people). It might be expensive if your app becomes popular.
- When a service is being closed down, you have limited time to migrate to another provider. Such situation has already happened with a very popular platform for mobile developers maintained by Facebook called **Parse**, which was [shut down on January, 2017](http://blog.parse.com/announcements/moving-on). The project is now [open source](http://docs.parseplatform.org) and you can set it up on your own machine, but you can't use it out of the box anymore.

## Firebase

For purpose of this post we'll use the [`Firebase Cloud Messaging`](https://firebase.google.com). It's an interesting solution, especially that on I/O 2016 Google have turned Firebase into an unified mobile platform, that has replaced the `Google Cloud Platform` as the default solution for handling push notifications on Android. This means that we can use the same service for sending push notifications on both platforms, while using the default implementation on Android.

`FCM` inherits `GCM`'s core infrastructure, but simplifies the client development. `GCM` is still supported but all new client-side features will be available on `FCM` only. `Firebase Cloud Messaging` uses the `Apple Push Notification service` to send messages to your iOS app.

There is no need to duplicate instructions how to setup Firebase, so if you haven't done it yet please follow [those instructions](https://firebase.google.com/docs/ios/setup).

## Certificates

First, we need to generate `APNs SSL Certificate` or `APNs Authentication Key` to allow our notification server (Firebase) to connect to the `APNs`.

Configuration with auth keys is recommended as they are the more current method for sending notifications to iOS, but they might be problematic since they are bigger. This happened to me when I wanted to upload Base64 coded auth key to the AWS using Cloud Formation configuration.

To enable push notifications service in application identifier:

1. Log in to [Apple Developer Center](https://developer.apple.com).

2. Open **Certificates, IDs & Profiles**.

3. Open applications identifiers on the left pane: **Identifiers** -> **App IDs**.

4. Find your application identifier and **Edit** its services.

5. Enable **Push Notifications**.

    ![image](/images/working-with-ios-push-notifications/apple-dev-enable-service.png)

To generate `APNs SSL Certificate` on [Apple Developer Center](https://developer.apple.com):

1. Choose **Create Certificate...** for Development or/and Production.

    ![image](/images/working-with-ios-push-notifications/apple-dev-certificates.png)

    **Note:** If you expect push notifications to work in app distributed via TestFlight, you'll need to use the **Production SSL Certificate**.

2. Read instructions, **Continue**, and upload your **Certificate Singing Request** (CSR file) exported from your **Keychain**.

3. **Download** the certificate and finish the process with **Done** button.

To generate `APNs Authentication Key` on [Apple Developer Center](https://developer.apple.com):

1. Open **Keys** -> **All** on the left pane.

2. Create a New Key by tapping at (+) sign.

3. Fill **Key Description**, select **APNs** key service and **Continue**.

4. Download the key, make sure you keep it securely and finish the process with **Done** button.

Now we need to upload generated key or certificate to **Firebase**.

1. Log in to [Firebase Console](https://console.firebase.google.com) and select your project.

2. Open your **Project settings** from left pane.

    ![image](/images/working-with-ios-push-notifications/firebase-project-settings.png)

3. Open **CLOUD MESSAGING** tab.

4. Under **iOS app configuration** upload your key or certificate.

    ![image](/images/working-with-ios-push-notifications/firebase-certificates.png)

    Note that you can't use `APNs auth key` and `APNs certificate` simultaneously.

## Project configuration

// Xcode configuration

// Signing issues

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
