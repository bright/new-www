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
**WorkManager is a powerful tool, but with great power comes great responsibility. Is it always completely safe to use? In this article, we will discuss a few potentially dangerous situations related to WorkManager. We will focus on the inconsistency of Workers, which can be edited or removed over time.**

**<br/>**

## **Custom WorkerFactory and @AssistedInject**

Let's face it, nowadays injecting dependencies into a [Worker](https://developer.android.com/reference/androidx/work/Worker) class is common and nearly inevitable. Our background work often requires sending a request using e.g. Retrofit service, saving something in the database using *Dao* or simply separating logic from Worker. It would be great if we could inject these dependencies directly into the Worker. Without dependency injection, Workers would not be so powerful. WorkManager creates Workers on its own by default. It expects the Worker to have a constructor with two parameters (Context and [WorkerParameters](https://developer.android.com/reference/androidx/work/WorkerParameters)). So how do we provide our dependencies there?

### How to inject dependencies using Dagger 2

One of the most common practices is to create a custom [WorkerFactory](https://developer.android.com/reference/androidx/work/WorkerFactory) and [@AssistedInject.](https://dagger.dev/dev-guide/assisted-injection.html) Once we prepare our Assisted factories, we can create workers on our own using WorkerFactory. Here is a sample:

```kotlin
class CustomWorkerFactory @Inject constructor(
    private val workerFactories: Map<Class<out ListenableWorker>, @JvmSuppressWildcards MyWorkerAssistedFactory>
) : WorkerFactory() {

    override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters
    ): ListenableWorker? {
        return workerFactories.entries
            .find {
                Class.forName(workerClassName).isAssignableFrom(it.key)
            }
            ?.value
            ?.create(appContext, workerParameters)
    }
}
```

It assumes that we are able to inject our custom-assisted factories, which will help us create Workers using only Context and WorkerParameters. For providing such factories, [please see Assisted Injection documentation](https://dagger.dev/dev-guide/assisted-injection.html). \
This code works fine, however there is one issue with it. If you rename, move or delete the Worker’s class and you had a work request scheduled for the class before modification, then the `Class.forName(workerClassName)` is going to throw `ClassNotFoundException`. It’s because WorkManager stores class names in its local database and it doesn’t track class modifications. Once WorkManager saves a particular class name, it’s going to stay in the database until the associated request is completed.\
Here is a sample scenario showing how this situation can happen:

1. Create `SyncDataWorker` class and install the app
2. Turn off Wi-Fi and cellular data
3. Schedule a work request with the constraint of having a network available
4. Modify `SyncDataWorker` class to `SyncWorker` and install the app
5. Turn on Wifi or cellular data and wait for the Worker to start work
6. If work is not scheduled, please use the following ADB command to debug WorkManager and see if the WorkRequest is enqueued:

`adb shell am broadcast -a "androidx.work.diagnostics.REQUEST_DIAGNOSTICS" -p "your.package.name"`

1. The app should crash soon with the `ClassNotFoundException`

In order to fix this issue we can simply wrap the `Class.forName(workerClassName)` invocation with a try-catch statement:

```kotlin
class SafeWorkerFactory @Inject constructor(
    private val workerFactories: Map<Class<out ListenableWorker>, @JvmSuppressWildcards MyWorkerAssistedFactory>
) : WorkerFactory() {

    override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters
    ): ListenableWorker? = try {
        workerFactories.entries
            .find {
                Class.forName(workerClassName).isAssignableFrom(it.key)
            }
            ?.value
            ?.create(appContext, workerParameters)
    } catch (e: ClassNotFoundException) {
        println("Class not found thrown!!!")
        e.printStackTrace()
        null
    }
}
```

Now if there was some deprecated class name in the WorkManager’s storage, we won’t encounter a crash due to ClassNotFoundException being thrown. Of course, the request won’t execute, but we’ll talk about it further in this blog.

### How to inject dependencies using Hilt

Hilt made it all easier for you. In order to use it for the WorkManager configurations you need to add the following dependency to your project:

```kotlin
implementation("androidx.hilt:hilt-work:<newest_version>")
```

It provides an already existing safe `HiltWorkerFactory` ready to be used. This factory also uses `Class.forName` to get the Worker class by its name, but it’s wrapped with a try-catch statement already. This factory is ready to be injected out of the box once you add Hilt dependency - you don’t need to provide it on your own.\
It works together with `@HiltWorker` annotation which you should add over your `Worker` class.\
It looks more or less like this:

```

```

Having this code, you’re ready to go. You can use WorkManager and enqueue work requests with assisted injection.

## **Any other dangers?**

Well, we are covered in terms of catching `ClassNotFoundException`, but is it completely safe? Well... It depends!\
Imagine an `OfflinePaymentWorker` that is supposed to synchronise offline payments with your backend. Now, you requested a work request for this Worker and it hasn’t completed yet. Then if you e.g. change the name of the Worker from `OfflinePaymentWorker` to `SyncOfflinePaymentsWorker` and install the app, you won’t sync outstanding work requests, because our safe factories would return `null` instead of an actual Worker. You could lose critical data about the payments.\
That’s why you have to be always mindful about the Worker changes you introduce. Just keep in mind that WorkManager can store some incomplete work requests in it’s storage and modifying your Worker class might make them impossible to execute.

### **What to do to prevent losing your data?**

Well, there are many approaches you can take. The most obvious one is to keep the old Worker and adjust only the logic - don’t delete it, move it or change the name. The downside of it, is that once you introduce a critical data sync Worker, it probably going to stay with you forever because theoretically, you are never sure if every task in the field has been executed or not.\
There are other approaches as well, here is the last one that I am going to present. Instead of relying on WorkManager to store your data in a work request, you could store the critical data in your own storage like SharedPreferences or SQLite database. In other words instead of doing this:

```

```

you could store the `data1` and `data2` values in SQLite Database as a single row representing a work that has to be executed and then create a Worker that would synchronise all of the remaining data from the database:

```

```

This way you won’t lose critical data if you modify or remove your Worker class. You would still have it in your database and you would be able to synchronise it in one way or another.

## **Summary**

We have to be mindful of our Workers and make sure that modifying or removing them is not going to cause some issues for our business.\
What else do you do to keep WorkManager work safe? Share in the comments!