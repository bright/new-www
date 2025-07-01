---
author: szymon-g
tags:
  - mobile
  - kotlin
  - iOS
date: 2025-07-01T11:04:39.557Z
meaningfullyUpdatedAt: 2025-07-01T11:04:39.566Z
slug: one-codebase-ios-android-kotlin-multiplatform
title: One Codebase for iOS and Android with Kotlin Multiplatform
layout: post
image: /images/blog_post_kmp_phone.png
hidden: false
comments: false
published: true
language: en
---
In this article, I'll guide you step-by-step through creating a shared library, with a focus on implementing it for iOS via an XCFramework.

## Setting Up a Kotlin Multiplatform Library

In Android Studio, I created a new project using the **"Kotlin Multiplatform Library"** template.  
During the setup, there's an option for iOS framework distribution, where you can choose between:

* Regular Framework (built for one architecture)  
* XCFramework (supports all architectures)  
* CocoaPods (iOS dependency manager)

I selected XCFramework because it fit my needs best and offered an easy way to integrate the shared code into the iOS project.

## Adding a Shared Kotlin Class

Next, I added a simple Kotlin class to the shared module:

```kotlin
class KotlinMultiplatformClass {
    fun greeting(): String {
        return "Hello from Kotlin Multiplatform!"
    }

    fun sum(a: Int, b: Int): Int {
        return a + b
    }
}
```

This class is compiled into the shared library and will be available on both iOS and Android.

## Using the Shared Library on Android

On Android, using the shared code is straightforward. You just add the shared module as a dependency and use the class directly in Kotlin code. No extra setup is needed beyond the standard Gradle configuration.

## Using the XCFramework in iOS

To generate the .xcframework file, I used a Gradle task provided by the Kotlin Multiplatform plugin. This task can be executed from the Gradle tool window in Android Studio. Once the task completes, the .xcframework is available in the build output directory.

To use the shared Kotlin code in an iOS project, I added the generated .xcframework to my Xcode project by including it in the project settings. After that, I imported the Kotlin module in the relevant Swift files.

Swift using:

```swift
import YourFrameworkName
```

Once imported, I could create an instance of the shared Kotlin class and call its methods directly in Swift:

```swift
let kotlinMultiplatform = KotlinMultiplatformClass()
print(kotlinMultiplatform.greeting())
```

That’s it\! The Kotlin logic is now fully accessible in Swift, and I can use the same logic on both platforms.

## Kotlin Multiplatform Tutorial – Conclusion

Kotlin Multiplatform makes it incredibly easy to share core logic between Android and iOS. By using an XCFramework, you can integrate your shared Kotlin code into any iOS project with minimal setup.   
If you're maintaining two codebases and want to unify shared business logic, Kotlin Multiplatform is absolutely worth exploring.