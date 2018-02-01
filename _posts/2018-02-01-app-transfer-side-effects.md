---
layout: post
title: Side effects of transferring iOS application
author: mateusz
hidden: true
tags: ['itunes connect', 'app store', 'ios', 'certificates']
comments: true
---

When the time you are selling your long-developed application comes, or you are about to make a great deal and buy some fancy app you probably do not bother about the transition process. Although Apple has [described the steps in details](https://help.apple.com/itunes-connect/developer/#/deved688524f), you should consider potential consequences before starting the transition.

You should also make sure that the application [meets all criteria](https://help.apple.com/itunes-connect/developer/#/devaf27784ff) and **is eligible for the transfer**. What is most important, the app must have had at least version that has been released to the App Store and no version of the app were using an **iCloud entitlement** or a **Passbook entitlement**.

## Backup data

Once the application is moved to a new account **it is no longer available** on old account. This means that the initiator will lose all information about the app including the metadata, dates when it was available on the App Store, pricing, sales, or downloads statistics. You should back up all those information for your records, as there is no possibility to get it back after the transition.

## Prepare yourself

![image](/images/app-transfer-side-effects/breakdance.jpg)

If your application uses any of these features, you need to take some additional actions:

- **Auto-renewable subscriptions** - if an app is using this kind of subscriptions then probably backend verifies their validity. To make sure that recipient will be able to validate subscription during the transition, the initiator needs to generate an app-specific shared secret **before** initiating a transfer and share the code with recipient so he could set up his own validation. Once the app transfer is complete, the recipient should generate a new shared secret so the users outside his organization had no longer access to it.

- **Apple Pay** - the merchant ID is not transferred along with the app. The transaction continues to be successful as long as the original certificates are valid. When submitting an update, the recipient needs to generate a new merchant ID.

- **Keychain** - when submitting the first update after the transition you will receive an email warning about **Potential Loss of Keychain Access**. After app transition the Team ID changes so the application-identifier turns from `[old-team].pl.brightinventions.app` to `[new-team].pl.brightinventions.app`, which results in a loss of keychain access. After users update their app, it will not find an authentication token and ask for a re-login. Keychain sharing also continues to work only until the app is updated and needs to be replaced with a keychain group created by the recipient.

- **Push notifications** - client SSL certificates for push notifications are not transferred so the recipient needs to create his own certificates and upload them to the his service (backend, Firebase, etc.).

Additionally, if an app is a part of a cross-app **Multiplayer Compatibility Matrix** it will no longer be compatible with or appear in other app's matrix. Similarly, if an app is part of an **app bundle**, you will no longer be able to view the app bundle's history.

## It takes time

![image](/images/app-transfer-side-effects/hairy-hand.jpg)

Processing the app transfer can take up to two business days. During this time you will not be able to edit the app metadata, rights, pricing, and in-app purchases, so you should make sure you will not need any urgent changes during this time.

Transferring the app is **unnoticeable to the users** and properly prepared should not affect them in any way. However you should update the **terms of service** and the **data protection** conditions so they match the new owner policies. 

Transferring an application to another account is not difficult, but it requires to understand the process and make some preparations, especially if you are using push notifications, keychain, Apple Pay, auto-renewable subscriptions or when your application is a part of cross-app Multiplayer Compatibility Matrix or app bundles.
