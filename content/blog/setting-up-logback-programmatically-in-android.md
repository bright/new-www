---
author: azabost
tags:
  - android
  - kotlin
  - logging
date: 2024-09-24T11:18:26.946Z
meaningfullyUpdatedAt: 2024-09-24T11:18:27.854Z
title: Setting Up Logback Programmatically in Android
layout: post
image: /images/set_up_logback_programmatically_android.png
hidden: false
comments: true
published: true
language: en
---
**In my previous blog post, [Choosing the Right Logging Library for Android](/blog/choosing-the-right-logging-library-for-android-app/), I discussed how I decided to use SLF4J alongside Logback for logging in Android apps. This post will take that foundation a step further by demonstrating how to configure Logback programmatically, ensuring that logs produced through the SLF4J API are properly sent to both Logcat and Firebase Crashlytics.**

## Why Not XML?

While it's common to configure Logback using XML files in backend applications, in an Android app, programmatic configuration offers a more streamlined approach. Unlike in a backend environment, where XML configuration can enable features like hot-reloading or modular configuration files for different environments (e.g., dev, test, and production), these benefits are less relevant in the context of Android apps due to their lifecycle and constraints of the mobile environment. Therefore, configuring Logback directly in code allows for greater flexibility (e.g. more dynamic configuration with feature toggles or user consent), fewer dependencies (hence smaller APK size), and simpler integration with Android-specific components like Logcat and Firebase Crashlytics.

## The goal

To keep this post short and digestible, I will show you a very basic setup that would let you see the logs in Logcat and in Crashlytics (provided that your app is already integrated with Firebase).

<center><div className="image">![A diagram showing that all the code in the app using SLF4J API is forwarded to Logback, which in turn sends the logs to Logcat appender and Crashlytics appender](/images/logback-logcat-crashlytics.png "")</div></center>

If you're new to SLF4J and wonder how Logback is hidden behind SLF4J APIs, I recommend reading the [SLF4J manual](https://www.slf4j.org/manual.html) first.

## First steps

To configure Logback programmatically, you need to access the `LoggerContext` by casting SLF4J's `ILoggerFactory`. Since Logback may be initialized with some defaults, you should `stop()` it before changing the configuration:

```kotlin
fun configureLogback() {
    val loggerContext = LoggerFactory.getILoggerFactory() as LoggerContext
    loggerContext.stop()
}
```

## Appenders

To make Logback send logs to the actual destinations (like Logcat, Firebase, local files, you name it), you need Logback components called "appenders". There are a few appenders ready for reuse built into Logback, for example, a `FileAppender` can be used to write logs to local files. However, it should come as no surprise that Logback doesn't include the code necessary to send the logs to Android Logcat or to Firebase Crashlytics, because Logback is not an Android library and has no knowledge about Android APIs. (I assume you don't intend to use the Logback fork [logback-android](https://github.com/tony19/logback-android/) which I don't recommend for reasons mentioned in the [previous blog post](/blog/choosing-the-right-logging-library-for-android-app/).)

*You can read more about appenders in [Logback documentation](https://logback.qos.ch/manual/appenders.html).*

Let's see how easily we can integrate Logcat and Crashlytics logging into Logback.

### Logcat

To create a custom appender, you should create a class that extends either `AppenderBase` or `UnsynchronizedAppenderBase` and override the `abstract protected void append(E eventObject)` method.

Here's a working example of such an appender:

```kotlin
class LogcatAppender(
    private val messageLayout: Layout<ILoggingEvent>,
    private val tagLayout: Layout<ILoggingEvent>,
) : UnsynchronizedAppenderBase<ILoggingEvent>() {

    public override fun append(eventObject: ILoggingEvent) {
        val logcatLevel = eventObject.level.toLogcatLevel() ?: return

        val tag = tagLayout.doLayout(eventObject)
        val message = messageLayout.doLayout(eventObject)

        // Note: you may want to put Log.println behind an interface to make this class testable
        Log.println(logcatLevel, tag, message)
    }
}

fun Level.toLogcatLevel() =
    when (levelInt) {
        Level.ALL_INT, Level.TRACE_INT -> Log.VERBOSE
        Level.DEBUG_INT -> Log.DEBUG
        Level.INFO_INT -> Log.INFO
        Level.WARN_INT -> Log.WARN
        Level.ERROR_INT -> Log.ERROR
        Level.OFF_INT -> null
        else -> null
    }
```

In the example above I also used another Logback component called `Layout` which I haven't explained yet. It's a measure to separate the message formatting from the appender's logic. I'm going to use Logback's `PatternLayout` to configure the formatting because it's very convenient and reduces the amount of code we need to write.

Now, let me show you how to integrate Logback with this new `LogcatAppender`.

First, let's add a function that creates `LogcatAppender` and the `PatternLayout`s:

```kotlin
fun createLogcatAppender(loggerContext: LoggerContext): Appender<ILoggingEvent> {
    val tagLayout = PatternLayout().apply {
        context = loggerContext
        // %nopex prevents stacktraces from being printed in tags
        pattern = "%logger{0}%nopex"
        start()
    }

    val messageLayout = PatternLayout().apply {
        context = loggerContext
        pattern = "[%thread] %msg%n%exception"
        start()
    }
    return LogcatAppender(tagLayout = tagLayout, messageLayout = messageLayout).apply {
        context = loggerContext
        start()
    }
}
```

The `tagLayout` above is used to format the tag passed to Logcat, which by convention consists of a class name. While `%logger` would print a fully qualified class name, `%logger{0}` will only print the simple name.

`messageLayout` will print the thread name in square brackets followed by the message and the associated exception's stacktrace (if any) after a line separator.

*Examine [Logback documentation](https://logback.qos.ch/manual/layouts.html#ClassicPatternLayout) for more patterns. You can also write your own patterns, but I won't cover it in this post.*

I added `%nopex` to the `tagLayout` because `PatternLayout` has a nasty feature that implicitly adds the stacktrace of the associated exception to its formatting result (examine `%exception` [documentation](https://logback.qos.ch/manual/layouts.html#ex) for more details). Obviously, we don't want a stacktrace in Logcat's tag. Alternatively, you could subclass `PatternLayout` to disable this behavior and then remove `%nopex` from the pattern:

```kotlin
class NoImplicitExceptionsPatternLayout : PatternLayout() {
    init {
        setPostCompileProcessor(null)
    }
}
```

Now, go back to the initial code where you obtained a `LoggerContext`. Use it to get the "root" logger and attach the new appender to it like this:

```kotlin
val logcatAppender = createLogcatAppender(loggerContext)
val rootLogger = loggerContext.getLogger(Logger.ROOT_LOGGER_NAME)
rootLogger.addAppender(logcatAppender)
```

Since Logback [loggers are hierarchical](https://logback.qos.ch/manual/architecture.html), the appenders added to the root logger will be automatically inherited by all loggers e.g. `LoggerFactory.getLogger(Whatever::class.java)`. In short, it means that all logs will be forwarded to `LogcatAppender`.

### Crashlytics

Similarly, you can create a `CrashlyticsAppender`:

```kotlin
class CrashlyticsAppender(
    private val layout: Layout<ILoggingEvent>,
    private val logAllExceptions: Boolean,
) : AppenderBase<ILoggingEvent>() {

    override fun append(eventObject: ILoggingEvent) {
        // Note: you may want to put Firebase.crashlytics.log behind an interface to make this class testable
        Firebase.crashlytics.log(layout.doLayout(eventObject))
        recordExceptionIfRequested(eventObject)
    }

    private fun recordExceptionIfRequested(eventObject: ILoggingEvent) {
        val throwable = (eventObject.throwableProxy as? ThrowableProxy)?.throwable

        if (logAllExceptions && throwable != null) {
            Firebase.crashlytics.recordException(throwable)
        }
    }
}
```

The example above has an additional feature of reporting ["non-fatal" exceptions](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android#log-excepts) to Crashlytics whenever there is a throwable associated with a log event. You can delete the `logAllExceptions` flag and  `recordExceptionIfRequested` if you don't need it.

Now, you can create the appender with the desired message pattern:

```kotlin
fun createCrashlyticsAppender(loggerContext: LoggerContext): Appender<ILoggingEvent> {
    val layout = PatternLayout().apply {
        context = loggerContext
        pattern = "[%level] [%logger{0}] [%thread] %msg%n%exception"
        start()
    }
    return CrashlyticsAppender(layout = layout, logAllExceptions = true).apply {
        context = loggerContext
        start()
    }
}
```

And finally add it to the root logger:

```kotlin
val crashlyticsAppender = createCrashlyticsAppender(loggerContext)
rootLogger.addAppender(crashlyticsAppender)
```

## Results

Now, to test this setup, you only need to call `configureLogback()` somewhere (for example, in your `Application.onCreate()`) and add a few SLF4J usages such as:

```kotlin
val logger = LoggerFactory.getLogger(MainActivity::class.java)

// Somewhere else:
logger.info("Clicked")

// Somewhere else:
logger.error(
    "Clicked",
    IllegalArgumentException("Test exception", IllegalStateException("Test cause"))
)
```

You should see the logs in Logcat and, once the logs get sent to Firebase (e.g. due to a crash), in Crashlytics.

Here are a few screenshots from my demo app where I tested this setup:

<center><div className="image">![A screenshot of Logcat showing the expected logs](/images/logback-logcat-screenshot.png "")</div></center>

<center><div className="image">![A screenshot of Crashlytics dashboard showing a non-fatal exception](/images/logback-crashlytics-dashboard-screenshot.png "")</div></center>

<center><div className="image">![A screenshot of Crashlytics showing the expected logs attached to a crash](/images/logback-crashlytics-logs-screenshot.png "")</div></center>

You can find the complete code [here](https://github.com/azabost/android-logback-example/tree/basic-logcat-crashlytics).

_I may add more examples to that repo in the future, so make sure to check out the `basic-logcat-crashlytics` branch that will contain the code related to this post only)._

## Addendum

The appenders' code above is incompatible with Logback's XML configuration feature. For example, I'm pretty sure the appenders should have no-argument constructors and public properties as shown in [this article](https://www.baeldung.com/custom-logback-appender). Since I don't intend to configure Logback via XML in Android apps, I decided not to dwell on that topic in this blog post to keep the code simpler.

---

*Copyright notice:*

*The Android robot is reproduced or modified from work created and shared by Google and used according to terms described in the [Creative Commons](https://creativecommons.org/licenses/by/3.0/) 3.0 Attribution License.*
