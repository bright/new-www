---
author: azabost
tags:
  - android
  - kotlin
  - logging
date: 2024-09-11T14:54:40.321Z
meaningfullyUpdatedAt: 2024-09-11T14:54:40.344Z
title: Choosing the Right Logging Library for Android App
layout: post
image: /images/all-your-logs.png
hidden: true
comments: true
published: true
language: en
---
**While choosing a logging library for an Android app, I explored multiple options, seeking a flexible solution that is highly configurable, supports multiple logging destinations, and can be dynamically configured at runtime. In this post, I'll share the factors that influenced my decision, some problems I encountered, and the solution I ended up with.**

## The requirements

When selecting a logging solution for an Android app, several factors need to be considered to ensure it meets the specific requirements of both the platform and the project. Here are the key aspects I considered for the project I was working on (I'm fully aware your needs may be different):

1. **Android Compatibility**: The library must work on Android, which has certain Java-related limitations. Not all Java APIs are available (e.g. [System.Logger](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/System.Logger.html)), not everything works on low Android versions (such as Lollipop), and some standard logging libraries depend on features unsupported by Android.

2. **Testability**: The logging solution should not interfere with unit testing by requiring additional setup or mocks. Ideally, it should get out of the way, allowing tests to run without having to mock or provide stubs for the logging framework. However, it wouldn't hurt if I could enable some simplified logs in tests to facilitate troubleshooting when needed.

3. **Modularity**: The library should work well across a large codebase split into multiple modules, including non-Android modules (plain Kotlin modules). Also, I wouldn't like the whole codebase to become tightly coupled with the particular logging implementation.

4. **Multiple Logging Destinations**: It should support multiple logging destinations, such as Logcat, remote services (like Logstash, DataDog, or Crashlytics), and local files. I don't want to clutter my code with direct usages of all the APIs (e.g. `Firebase.crashlytics.log("message")`). A single log statement should do the job.

5. **Configuration Flexibility**: The library should offer a high degree of configuration flexibility to meet various needs. For example, I needed to:

    * configure different logging level thresholds for each destination;
    * configure different formats of log records for each destination;
    * handle some logs in a special manner
        * e.g. report a "non-fatal" error to Crashlytics whenever there's an exception associated with a log record.

6. **Runtime Configurability**: The framework should be configurable at runtime, allowing features such as logging destinations or logging level thresholds to be changed based on user choices, feature flags, or other dynamic conditions.

7. **Proven and Stable**: Last but not least, it would be ideal to use a well-established, battle-tested solution that does not compromise the app's stability and maintainability.

Given these complex requirements, developing a custom logging solution seemed to be a huge maintenance burden so I decided to explore existing libraries.

### Why Not Use Timber?

While Timber is a popular logging solution for Android, it doesn't meet my specific needs. For example, it has a direct dependency on the Android framework, making it unsuitable for use in non-Android modules. Even if there was a multiplatform variant of Timber, it wouldn't meet other criteria related to configuration flexibility.

_Actually, the same can be said about the vast majority of logging libraries I reviewed._

### Why Not Something New?

I realize there are a lot of logging libraries out there. Some of them are multiplatform, which by definition means that I should be able to make them work in both Android and plain Kotlin modules. However, the solutions I found were not as well-established as I wished for. I hope to see Kotlin Multiplatform logging libraries receive more attention in the future.

### Considering JUL (java.util.logging)

At some point, I seriously considered using `java.util.logging` (JUL), but after reading the documentation and several discussions (such as [this one](https://stackoverflow.com/questions/11359187/why-not-use-java-util-logging)) that made strong arguments in favor of SLF4J over JUL, I decided to focus on SLF4J.

### Exploring SLF4J and Its Backends

I turned to SLF4J (Simple Logging Facade for Java), which I was already quite familiar with (thanks to our own, simple implementation: [slf4android](https://github.com/bright/slf4android)), but I needed to determine the most suitable backend (AKA "binding") for my needs. After some research, I found that the most flexible options were [Logback](https://logback.qos.ch/index.html) and [Log4j2](https://logging.apache.org/log4j/2.12.x/). While comparing their capabilities, I even learned about some awesome features I would get for free (such as Mapped Diagnostic Context) if only I could make them work in my project.

By the way, using SLF4J brings more benefits, such as the ability to process logs created by other libraries, potentially giving even more context for troubleshooting production issues. I think this diagram explains it well:

<center><div className="image">![A diagram showing that both your code and libraries that you use in your app can use a single API (that is slf4j-api) which then delegates the logging to a particular backend (such as Logback or Log4j2)](/images/slf4j-diagram.png "")</div></center>

_There are certainly more benefits to using SLF4J, but I'm not going to cover all of them in this post._

### Log4j2: A Dead End for Android

Log4j2 initially seemed promising, especially when I learned about its [Kotlin-friendly API](https://logging.apache.org/log4j/kotlin/index.html), but I quickly ran into compatibility issues with Android. When I added the dependency, the build failed with the following error:

```
MethodHandle.invoke and MethodHandle.invokeExact are only supported starting with Android O (--min-api 26): Lorg/apache/logging/log4j/util/ServiceLoaderUtil;callServiceLoader(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/Class;Ljava/lang/ClassLoader;Z)Ljava/lang/Iterable;
```

I discovered that Log4j2 requires Java 8 so I hoped that enabling [core library desugaring](https://developer.android.com/studio/write/java8-support) would solve the problem, but it turned out that these specific APIs are not supported below Android O.

Since I couldn't increase the minimum Android API level to 26, I moved on to Logback.

### Logback: Initial Challenges

At first, I encountered a similar issue with Logback: the latest versions require Java 11 and APIs unavailable on Android. This resulted in a runtime crash with the error:

```
java.lang.NoSuchMethodError: No virtual method getModule()Ljava/lang/Module; in class Ljava/lang/Class; or its super classes (declaration of 'java.lang.Class' appears in /apex/com.android.art/javalib/core-oj.jar)
```

I also found an [Android-specific fork of Logback](https://github.com/tony19/logback-android) that resolves some of these compatibility issues and provides features tailored for Android. However, this fork introduced several problems, such as:

* **Lack of Clarity on Compatibility**: There is ambiguity regarding its compatibility with the classic Logback library; the versioning scheme was changed at some point without explanation.
* **No Binary Compatibility**: The fork is not binary-compatible with the classic Logback library, which can make running unit tests for logging configuration on the JVM (that is, without [Robolectric](https://robolectric.org/)) either impossible or cumbersome ([issue reference](https://github.com/tony19/logback-android/issues/365)).
* **Unoptimized ProGuard Rules**: I realized the current version contains [unoptimized ProGuard rules](https://github.com/tony19/logback-android/blob/d6ed2017fb87e30e8b32d794523ac29c24123c87/logback-android/consumer-rules.pro) that unnecessarily keep much more code than I needed (it almost completely disables code shrinking for the whole library).
* **Limited Maintenance**: The author (a sole maintainer) seems to have limited time to address the existing problems, as noted in a [discussion thread](https://github.com/tony19/logback-android/discussions/329).

### The Solution: Logback 1.3.x

Eventually, I discovered from the [Logback documentation](https://logback.qos.ch/dependencies.html) that the older `1.3.x` branch of Logback is compatible with Java 8 and appears to be maintained. After switching to this version, I made a few necessary adjustments, such as adding ProGuard rules:

```proguard
# There is no servlet-related code in Android so R8 complains
about this class because it's used internally by Logback.
# However, we don't need it in runtime so the warning can be
# safely ignored and the referring code should be deleted from
# the release APK anyway.
-dontwarn javax.servlet.ServletContainerInitializer

# When Logback parses the log patterns such as "%msg" it looks
# for the appropriate converters mapped to the keywords (such as "msg")
# and instantiates them via reflection. Therefore, all the classes
# which implement Converter interface must be kept in the release APK.
-keep class * extends ch.qos.logback.core.pattern.Converter
```

and modifying packaging options:

```kotlin
packaging.resources.excludes.add("META-INF/INDEX.LIST")
```

I also kept the desugaring enabled.

With these changes, I successfully integrated SLF4J and Logback into my Android project, and it allowed me to cover all the requirements with ease.

_For the record, [here's the link](https://mvnrepository.com/artifact/ch.qos.logback/logback-classic/1.3.14) to the specific Logback dependency I used._