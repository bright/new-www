---
author: azabost
tags:
  - kotlin
  - android
  - gradle
  - testing
date: 2025-06-27T15:00:30.778Z
meaningfullyUpdatedAt: 2025-06-27T15:00:30.794Z
slug: current-test-fixtures-support-android
title: The Current Status of Test Fixtures Support in Android
layout: post
image: /images/test-board.jpg
hidden: false
comments: false
published: true
language: en
---
# The Current Status of Test Fixtures Support in Android

**While test fixtures have been available in Gradle since 2019, their support in the Android Gradle Plugin is still evolving. With AGP 8.5, Kotlin sources in test fixtures are now supported in Android modules, but this feature remains experimental and is hidden behind a feature flag. Although a powerful tool for sharing test utilities across modules, test fixtures support in Android is not yet widely known or documented.**

## The Evolution of Test Fixtures Support

[Test fixtures](https://docs.gradle.org/current/userguide/java_testing.html#sec:java_test_fixtures) were first introduced in Gradle 5.6 back in 2019. This feature allows developers to create and share test utilities across modules, making it easier to maintain consistent testing approaches throughout a project.

However, Android developers had to wait a few years before this functionality became available in their ecosystem. Test fixtures support was not added to the Android build system until the release of [Android Gradle Plugin and Android Studio Chipmunk](https://developer.android.com/build/releases/past-releases/agp-7-2-0-release-notes#test-fixtures).

## Initial Limitations

The initial implementation of test fixtures in AGP had significant limitations. The support was better for Java than for Kotlin, creating a frustrating experience for many Android developers who had embraced Kotlin as their primary language.

Specifically, an Android module (such as a library or application) could consume test fixtures from a standard Kotlin module (one using the Kotlin Gradle Plugin instead of the Android Gradle Plugin) without issue. The limitation was that
an Android module itself could only define test fixtures written in Java, not Kotlin. This limitation was tracked in [Google's issue tracker](https://issuetracker.google.com/issues/219687418).

## Recent Improvements

AGP 8.5 introduces support for Kotlin sources in test fixtures within Android modules. This improvement is currently behind an experimental flag, which might explain why it hasn't received much attention yet. The feature was tracked in [this issue](https://issuetracker.google.com/issues/259523353).

## Configuration Differences

While test fixtures are supported in both standard Kotlin and Android modules, the configuration process differs between them. Getting started requires knowing about the experimental support and understanding the specific setup needed for each module type.

For a standard Kotlin module, enabling test fixtures is straightforward:

```
plugins {
    id("kotlin")
    id("java-test-fixtures") // <-- this
}
```

However, Android modules cannot use the `java-test-fixtures` plugin. Instead, they require a different configuration:

```
plugins {
    id("com.android.library")
    kotlin("android")
}

android {
    testFixtures.enable = true // <-- this
}
```

Enabling Kotlin support in test fixtures for Android modules currently requires the following feature toggle in your `gradle.properties` file:

```
android.experimental.enableTestFixturesKotlinSupport=true
```

What currently makes this situation particularly challenging is that the [official Gradle documentation](https://docs.gradle.org/current/userguide/java_testing.html#sec:java_test_fixtures) omits the specific configuration required for Android modules. This can mislead developers into thinking that test fixtures should be enabled in the same manner across all module types.

Moreover, the experimental flag for Kotlin support is not documented in the official Android documentation. This lack of documentation makes it difficult for developers to discover and utilize this feature, even though it has been available since AGP 8.5. The missing documentation is likely due to the experimental status of the feature, as experimental features often remain undocumented until they become stable.

## Conclusion

While test fixtures support was added to Android significantly later than to Java or Kotlin, its arrival is a positive development. The recent addition of Kotlin support for test fixtures in Android modules is a welcome improvement that will make it easier for Android developers to create and share test utilities across their projects.

This enhancement allows for more consistent testing approaches and better code organization, ultimately leading to more maintainable Android applications.