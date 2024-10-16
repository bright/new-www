---
author: azabost
tags:
  - android
  - kotlin
  - logging
  - proguard
date: 2024-09-11T09:38:22.222Z
meaningfullyUpdatedAt: 2024-09-11T09:38:23.101Z
slug: preserving-unobfuscated-class-names-in-slf4j-logs
title: Preserving Unobfuscated Class Names in SLF4J Logs
layout: post
image: /images/skyfall-2012-q’s-ben-whishaw-hacking-scene.-youtube-2024-09-10-22-28-06.png
hidden: false
comments: true
published: true
language: en
---
**In this post, I'll share a problem I encountered while introducing the [SLF4J](https://www.slf4j.org/) and [Logback](https://logback.qos.ch/) into an existing Android project integrated with Logstash for remote logging. This setup was effective for monitoring and debugging, but the use of [code obfuscation](https://developer.android.com/build/shrink-code) tools like R8/ProGuard caused log messages to be hard to trace back to their source due to obfuscated class names. Here's how I solved this challenge and the trade-offs we considered.**

## Problem Overview

The project was integrated with [Logstash](https://www.elastic.co/logstash) using a custom solution that sent log messages for analysis in [Kibana](https://www.elastic.co/kibana).

When we introduced SLF4J as a logging facade, a specific issue arose: the Logstash integration had no mechanism to de-obfuscate the class names used in SLF4J loggers which appeared obfuscated in the log messages visible in Kibana, making it challenging to understand where the logs originated from. This made the logs less useful for debugging and monitoring production issues.

## Logging scenarios

Since the project was entirely in Kotlin, we identified three main logging scenarios:

1. Logger as a property of a class. This approach is used in singletons or other classes with relatively few instances. Here’s an example:

    ```kotlin
    class MyClass {
        private val logger = LoggerFactory.getLogger(MyClass::class.java)
    }
    ```

2. Logger as a property of a companion object. This method is most useful for classes that have many instances, such as `data class`, but can be used in other places too:

    ```kotlin
    data class SomeData(val id: String) {
        companion object {
            private val logger = LoggerFactory.getLogger(SomeData::class.java)
        }
    }
    ```

3. Logger as a top-level property for top-level functions:

    ```kotlin
    private val logger = LoggerFactory.getLogger("com.example.SomeUtilities")
    
    fun doSomething() {
        logger.debug("Doing something")
    }
    ```

## Alternative solutions considered
To address the obfuscation issue, we considered two main approaches:

### Preserving original class names using R8/ProGuard rules
   
The primary solution was to use custom ProGuard rules to prevent the obfuscation of class names specifically for the classes containing SLF4J logger instances.

    * Pros: This preserves the original class names in log messages, making them easier to trace back while allowing the rest of the code to remain obfuscated.

    * Cons: It does expose some class names, but only where logging is essential, which was deemed an acceptable trade-off in our context.

### Hardcoding logger names

Alternatively, instead of passing a class to `LoggerFactory`, we could always hardcode the logger names.

    * Pros: This method would preserve the class name in the logs without exposing the actual class names directly in the obfuscated code. The hardcoded strings still expose the names, but it is somewhat harder for an attacker to figure out compared to directly keeping the original class names unobfuscated.

    * Cons: It would be cumbersome to maintain in a large codebase, introducing risks of typos and inconsistencies.

After discussing both approaches with the team, we decided on a general rule: to use custom ProGuard rules to preserve the original names only for classes with SLF4J loggers. However, we decided to deviate from this rule in the specific scenario of top-level functions, where we chose to hardcode the names if needed.

## Custom ProGuard rules
Here’s how I implemented the chosen solution:

```proguard
# Don't obfuscate the names of classes containing a Logger.
-keepclasseswithmembernames class * {
    org.slf4j.Logger *;
}

# Don't obfuscate the names of enclosing classes when their companion objects contain a Logger.
-if class **$* {
    org.slf4j.Logger *;
}
-keepclasseswithmembernames class <1>
```

After applying these rules, I rebuilt the project and verified that the log messages in Kibana displayed the correct, unobfuscated class names.

Additionally, I ran `dexdump` on the DEX files from the unzipped APK to confirm that everything else in the classes affected by the ProGuard rules remained properly obfuscated. I also compared the `mapping.txt` files generated before and after this addition to ensure there were no unwanted side effects from the new rules.

## Outcome and Benefits

By applying these custom ProGuard rules, we achieved the following:

* Readable Logs: Preserved original class names in log messages for better traceability during production issue investigations.

* Controlled Exposure: Exposed only the necessary class names, minimizing the risk of reverse engineering.

* Maintainability: This solution required fewer changes and was easier to maintain than hardcoding logger names.

## Conclusion

When integrating SLF4J into an Android project with a remote logging setup (like Logstash), it's essential to balance readability, security, and maintainability. We found that preserving class names using ProGuard rules was the best solution for our needs, while hardcoding logger names for top-level functions was a suitable exception to our general approach. However, other teams might choose differently, depending on their project's specific requirements and constraints.