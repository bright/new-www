---
author: fjablonski
tags:
  - ios
  - mobiledev
  - mobile
  - mobile development
date: 2024-05-08T13:26:07.112Z
meaningfullyUpdatedAt: 2024-05-08T13:26:07.134Z
title: Adding PrivacyInfo to Your iOS App
layout: post
image: /images/privacy_info_ios.png
hidden: false
comments: true
published: true
language: en
---
**Read a tutorial on how to add a Privacy Manifest to your codebase, which has been required by Apple since the beginning of May 2024.**

<div className="image">![](/images/privacy_info_ios.png "")</div>

Starting from May 1, Apple demands the addition of a Privacy Manifest to your codebase. This file provides an explanation why your app is using 'SDKs that require a privacy manifest and signature'.

Find more info [here](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files).

## **Do I have to take action?**

If you received an email from AppStoreConnect containing the phrase:

> ITMS-91053: Missing API declaration

Then you are among the lucky ones who have to add it. Thankfully, this email will also include every *NSPrivacyAccessedAPITypes* that you need to incorporate, like the mysterious-sounding *NSPrivacyAccessedAPICategoryFileTimestamp*

## **Let’s dive in**

To add PrivacyInfo.xcprivacy (which is a regular .plist file), first click on your project in the Project Navigator.

![](https://lh7-us.googleusercontent.com/PuixoEkbPgWrXfCseMQ5FAYLu-qjJ-8VNKocFyCK4dTA8Krc6TgOUQC_m8vGCIxMvLrx9wUw5JtGSJ5tJ-IhYHhMO9lL8fY6W4aI0oplYmvpfRTDm3roamLa7LTQg2gFcvHjw64XIAJ4To3SNCheChQ)

And then on File -> New -> File… 

Search for Privacy

![](https://lh7-us.googleusercontent.com/WKMaDUuJuS4ITfudLZ42WLiDcJY4YdA0oDN8Tkpj7hm3Nw-kLBVOPXSNYk9Gu4V05zELrvf5CK7Qn7oiQIB5SeoQQ8a0elIHt59Ft7MPrXnNYay5nVWHHaSZzpY4Pw4HyoAcklgqyLTKGSiJBaA7sSU)

Then add it to your main target. Keep in mind that the path matters! Apple is really strict about where you place this file. You can find more information [here](https://developer.apple.com/documentation/bundleresources/placing_content_in_a_bundle).

If you're using Tuist or XcodeGen, don't forget to add this new file to your configuration as well :).

![](https://lh7-us.googleusercontent.com/BAD9_podCYU8FwWanvcN0hAyN_F-AXXGIzi-g9uIITLw0zqvNvVVjebMzuIqV0PV-wHfUtUAYkkErpQhT5WTG1xgHltE43HJxakTukAiN2h-3AZVFhZyiW98sXkrEqqgXuUcbyhRpCB3hSVF7ToRTn0)

Or if you are using Tuist version 4.10+ you can use the dedicated struct example [here](https://github.com/tuist/tuist/blob/main/fixtures/ios_app_with_privacy_manifest/Project.swift). 

## **Explain yourself**

In my case, I had to add an explanation about the usage of creationDate for files, so I'll use it as an example. A list of APIs which require an explanation along with their respective justification codes can be found [here](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).

For now, you don't need to add an explanation for using a specific API. You just have to type the code. In my case, it was DDA9.1.

Then, my file looked as follows.

![](https://lh7-us.googleusercontent.com/uCrFxa88yywu4ffvQSfyRRljopNtcqWCWLn4v3j6nAs-OTIMMoJRXzv1YN6O6Rr2lshUDwOZ8MP4ySfeH1WgYcDohiRaex1I0494yW4mUGMH3O1cuLTQP2oirPJPdwkerjosf8pNLlTWDclDWvY_DIk)

And a bit more self-exploratory xml version

![](https://lh7-us.googleusercontent.com/4FQFE9B2rfIKN4GHYB1i5kq8RWOcwPY5FnS3HKvad9zPszt3jAOQKR4aFHoyFNld-WbTWWp2HAOv9VsJvWVw27XCrNAkIQ_7t7hLACB9CeBAU1yIg9wencGuiV--v7oUqQWQVIFFpSXOTfAOTFuUGJ4)

And that's all, folks! Read through each explanation carefully (even though it's written in a difficult legal language), and choose the one that best describes your usage.

If you have more questions, feel free to contact me :).