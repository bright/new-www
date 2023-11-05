---
author: szymek
tags:
  - Android
  - Kotlin
  - Hilt
  - WorkManager
date: 2023-11-03T11:52:35.005Z
meaningfullyUpdatedAt: 2023-11-03T11:52:36.020Z
title: Use WorkManager safely and mindfully
layout: post
hidden: false
comments: false
published: false
language: en
---
**WorkManager is a powerful tool, but is it always completely safe to use? In this article, we will discuss a few potentially dangerous situations. We will focus on the inconstancy of Workers, which can be edited or removed over time.**

**<br/>**

## **Custom WorkerFactory and @AssistedInject**

Let's face it, nowadays injecting dependencies into a [Worker](https://developer.android.com/reference/androidx/work/Worker) class is common and nearly inevitable. Our background work often requires sending a request using e.g. Retrofit service, saving something in the database using *Dao* or simply separating logic from Worker. It would be great if we could inject these dependencies directly into the Worker. Without injecting dependencies, Workers would not be so powerful. WorkManager creates Workers on its own by default. It expects the Worker to have a constructor with two parameters (Context and [WorkerParameters](https://developer.android.com/reference/androidx/work/WorkerParameters)). So how do we provide our dependencies there?

##### How to inject dependencies using Dagger 2

One of the most common practice is to create a custom [WorkerFactory](https://developer.android.com/reference/androidx/work/WorkerFactory) and [@AssistedInject.](https://dagger.dev/dev-guide/assisted-injection.html)  Once we prepare our Assisted factories, we can create workers on our own using WorkerFactory. Here is a sample:

```kotlin
class CustomWorkerFactory @Inject constructor(
    private val workerFactories: Map<Class<out ListenableWorker>, @JvmSuppressWildcards Provider<MyWorkerAssistedFactory>>
) : WorkerFactory() {

    override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters
    ): ListenableWorker? {
        val foundEntry = workerFactories.entries.find {
            Class.forName(workerClassName).isAssignableFrom(it.key)
        }
        return foundEntry
            ?.value
            ?.get()
            ?.create(appContext, workerParameters)
    }
}
```

It assumes that we are able to inject our custom-assisted factories, which will help us create Workers using only Context and WorkerParamteres. For providing such factories, [please see Assisted Injection documentation](https://dagger.dev/dev-guide/assisted-injection.html).

// show issue with common worker factory and ClassNotFoundException crashes

// show how to fix it with a try-catch and introduce to Hilt usage

##### How to inject dependencies using Hilt

// show how Hilt overcomes this issue

<br/>

## **Any other dangers?**

// show that we should be mindful when editing and removing Workers and why

## **Summary**