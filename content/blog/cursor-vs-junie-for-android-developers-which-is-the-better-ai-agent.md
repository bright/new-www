---
author: szymek
tags:
  - android
  - AI
  - agent
date: 2025-05-15T08:49:54.616Z
meaningfullyUpdatedAt: 2025-05-15T08:49:54.629Z
slug: cursor-vs-junie-for-android
title: Cursor vs Junie for Android Developers. Which Is the Better AI Agent?
layout: post
image: /images/cursor-junie.jpg
hidden: true
comments: false
published: true
language: en
---
**Junie and Cursor — two prominent AI agents — have entered the realm of Android development. Let's explore their strengths and weaknesses across different aspects of the development process.**

<div className="image">![Cursor vs. Junie for Android Development](/images/cursor-junie.jpg "Cursor vs. Junie for Android Development")</div>

## AI Agents for Android development

Plenty of AI tools are popping up that can really speed up Android development. Let's dive into what's currently available and check out some cool options we have right now.

Among the most powerful AI tools out there are what people call AI Agents. These guys can automatically change your existing files, add completely new ones, or even whip up entire code modules, all based on what you ask them to do. You just switch to the Agent or Code mode in your tool and tell it how it can help.

## Samples

Here are some examples of requests you could make that might be super helpful and boost your productivity:

* Write unit tests for my `ViewModel` class, making sure to match the code style used in your `OtherViewModelTest` class.
* Migrate all the Jetpack Compose Material 2 Composables in your project over to Material 3.
* Change how file uploads are handled by WorkManager. Instead of one `WorkRequest` per upload, use a single `WorkRequest` for multiple files with an upload queue stored in a Room database. Also, make sure to expose detailed updates about the queue and the status of each upload using a Coroutines Flow.
* Create Jetpack Compose Composables that perfectly match the screen layout shown in the design image file `design.jpg`.
* Figure out why the app is crashing with a provided stacktrace: `<stacktrace>`. Once you know why, make that part of the code safer.
* Replace all the direct `colorResource(R.color.<color>)` calls in the code with the right `MaterialTheme` color defined in my Jetpack Compose theme.
* Describe the reported bug and indicate the suspected area in the code that may require modifications. It should prompt you with suggestions on how to fix this bug.

## Cursor

While it doesn't have official, deep Android support, Cursor is still pretty useful and can lend a hand in many situations. It's actually an IDE based on Visual Studio, called Cursor itself. You can install Android plugins to help with development, but honestly, it won't replace the top-tier Android IDEs from Jetbrains, like Android Studio and IntelliJ IDEA.

### How does it work?

You just go into Agent mode, give Cursor the relevant context files it needs, and tell it what you want to achieve. You can even attach a design image file for it to generate Composables or XML layouts from. Make sure to give it as many context files as possible, because the more context Cursor has, the more accurate the results will be.

**Pros:**

* Really fast - usually finishes after a few seconds.
* You can pick which AI model you want to use.
* Has a "Thinking mode" which is great for trickier or less clear problems, like debugging or figuring out why an exception happened.
* Awesome for generating small bits of boilerplate code (maybe up to a few files).

  * Writing unit tests based on a component to test

**Cons:**

* Android support isn't super convenient.

  * Cannot run app or unit tests.
  * Lacks network, memory, and UI analyzer tools.
* Needs very specific file context; without enough info, the results can be useless.

  * Automatically generated tests may fail to compile or employ coding patterns not typical of your project.
* Often spits out boilerplate code that doesn't even compile.
* Can get stuck in a loop if you e.g. ask it to make tests pass by repeatedly running and fixing them.

## Junie

It's not available right in Android Studio yet. However, you can find it in IntelliJ IDEA Ultimate, which actually has decent Android development support. It comes with an Android plugin that gives you Jetpack Compose preview, Logcat, debugger, Network Inspector, Build Variants selector, Profiler, and a whole lot more that should cover most of your Android needs! You might miss some less common features bundled with Android Studio, like Firebase integration or the App Links Assistant, but for most things, it's got you covered.

### How does it work?

You just select Code mode. You can add context files using the '+' icon or by mentioning file/class names. Then, just tell it what you need! You can't directly attach an image to the prompt, but you can drop the image file into your repository temporarily and tell Junie to use it as a reference. This way, it can generate Jetpack Compose or XML layouts based on that image. If you don't give Junie context, it's pretty likely to search for relevant info on its own. For instance, if you ask it to write code to save a data class object to SharedPreferences, Junie will probably look for any serialization library you're already using and suggest using that to handle storing complex data types.

**Pros:**

* Pretty accurate, gives results that make more sense and feel more insightful than Cursor.

  * If serialization is needed, it looks for existing examples in the project.
  * If unit testing mocks are needed, it looks for existing mocking libraries
  * When code changes affect other classes, it tries to make everything play nicely together.
  * Does not leave your code not compiling
* Can totally write unit tests and even fix them on the spot if they're busted.

  * If a unit test doesn't compile or pass, it keeps trying to fix it until it does.
  * Haven't seen it get stuck in an infinite loop yet, which is cool.

**Cons:**

* Yeah, it's slower.

  * Processing more complex stuff just takes a good chunk of time.
  * Sometimes fixing all the unit tests in just one file means a separate AI request for each one, plus running the test, which can seriously chew up 10-20 minutes sometimes.
  * Creating a single unit test class for a typical Android ViewModel took around 3 to 5 minutes.
  * Migrating approximately 30 Composables from Jetpack Compose Material2 to Material3 within a specific package took around 20 minutes.