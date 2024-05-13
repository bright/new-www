---
author: szymon-ch
tags:
  - JavaScript
  - web development
  - performance
date: 2024-05-13T05:35:42.792Z
meaningfullyUpdatedAt: 2024-05-13T05:35:42.804Z
slug: refactoring-from-sync-to-async-in-javascript
title: "Unblocking the Main Thread: Refactoring from Sync to Async in JavaScript"
layout: post
hidden: false
comments: true
published: true
language: en
---
**Synchronous work in JavaScript often presents itself as a single, uninterrupted task that must be completed before the next operation can proceed. However, one key characteristic of synchronous work is its potential divisibility: it can typically be broken down into numerous smaller tasks, each requiring less time to execute individually. We'll leverage this characteristic to our advantage, splitting the workload into manageable chunks.** 

By doing so, we can unblock the main thread and return to the next task later on, allowing it to progress incrementally until it's completed in its entirety. This approach not only prevents the main thread from becoming overwhelmed but also ensures that critical operations can proceed without unnecessary delay.

## The impact on the performance of synchronous processing

Let's break down a typical scenario where we have a large array and want to process each element.

```tsx
// Define a function to process a single element synchronously
function processElementSynchronously(element: number): void {
    // Perform computation for the element
    // Example: Some heavy computation here
    console.log(`Processing element ${element}`);
}

// Define a function to process the array synchronously
function processArraySynchronously(array: number[]): void {
    for (let i = 0; i < array.length; i++) {
        processElementSynchronously(array[i]);
    }
}

// Example usage: Process an array of numbers synchronously
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processArraySynchronously(numbers);
```

In the synchronous version of our example, we iterate over each element of the array and process it synchronously using the **`processElementSynchronously`** function. While this approach may seem straightforward, it can have detrimental effects on the performance and responsiveness of our application. **Processing the array synchronously means that each element is processed one after the other, blocking the main thread until all elements have been processed**. What does this mean for users? They can't do anything with your app. To them, **it looks like the app is stuck**. That's not good, right?

You may consider marking our **`processElementSynchronously`** function with the **`async`** keyword, assuming it will operate asynchronously. While this is true, the catch is that **we're merely deferring execution, which still occurs on the main thread, thereby causing blocking**.

You might also think about employing a Web Worker and shifting our workload there. However, **not all tasks are suitable for execution within a worker**. Workers lack access to the DOM, preventing any manipulation. If your task involves interacting with the DOM, it must be executed on the main thread. Consider React, for example. It doesn't utilize Web Workers yet manages to prevent thread blocking. How does it achieve this?

## Breaking down tasks and introducing asynchronicity

The key here is to **break down the work into smaller tasks and defer their execution**. This way we ensure that **the main thread remains unblocked**, providing a smoother user experience.

We'll achieve this by splitting the array into individual elements and processing each element separately using **`setTimeout`**.

```tsx
// Define a function to process a single element
function processElement(element: number): void {
    // Perform computation for the element
    // Example: Some heavy computation here
    console.log(`Processing element ${element}`);
}

// Define a function to process the array asynchronously
function processArrayAsync(array: number[], index: number): void {
    // Check if there are elements left in the array
    if (index < array.length) {
        // Process the current element
        processElement(array[index]);

        // Schedule the processing of the next element after a delay using setTimeout
        window.setTimeout(() => {
            processArrayAsync(array, index + 1);
        }, 0);
    }
}

// Example usage: Process an array of numbers asynchronously
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processArrayAsync(numbers, 0);
```

In this simplified code sample, we define a function **`processArrayAsync`** that takes an array and an index as parameters. Inside this function, we process each element of the array one by one using **`setTimeout`**. This allows each element to be processed asynchronously, giving the main thread time to handle other tasks and maintain responsiveness

It's important to note that even when we provide a timeout of 0 milliseconds, [the browser may delay the execution slightly](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html). To mitigate this effect and ensure that the main thread still remains unblocked, **we can introduce a deadline of 40 milliseconds**. This allows more work to be completed swiftly without noticeably impacting the user experience.

```tsx
// Define a function to process a single element
function processElement(element: number): void {
    // Perform computation for the element
    // Example: Some heavy computation here
    console.log(`Processing element ${element}`);
}

// Define a function to process the array asynchronously with a deadline
function processArrayAsyncWithDeadline(array: number[], index: number): void {
    const deadline = 40; // Set a deadline of 40 milliseconds

    const startTime = window.performance.now(); // Get the start time

    // Process the elements of the array within the deadline
    while (index < array.length && window.performance.now() - startTime < deadline) {
        processElement(array[index]);
        index++;
    }

    // Check if there are remaining elements to process
    if (index < array.length) {
        // Schedule the processing of the remaining elements after a delay using setTimeout
        window.setTimeout(() => {
            processArrayAsyncWithDeadline(array, index);
        }, 0);
    }
}

// Example usage: Process an array of numbers asynchronously with a deadline
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processArrayAsyncWithDeadline(numbers, 0);
```

In this code sample, we define a function **`processArrayAsyncWithDeadline`** that takes an array and an index as parameters. Inside this function, we use a while loop to process elements of the array within a deadline of 40 milliseconds. We continuously check the elapsed time using `window.performance.now()` **to ensure that we don't exceed the deadline. If the deadline is not met, we schedule the processing of the remaining elements using** `setTimeout` to allow the main thread to handle other tasks and maintain responsiveness.

While this approach ensures that our tasks don't exceed a specific time limit, it's crucial to understand that the **browser's workload can vary**. There may be other tasks competing for resources in the queue, making it challenging to guarantee that the browser will always have 40 milliseconds available to execute our work.

## What about setImmediate?

In the past, developers often favored **`setImmediate`** over **`setTimeout(func, 0)`** for scheduling immediate tasks. The **`setImmediate`** function provided a more efficient means of executing code immediately after the current task completed, without the artificial delay of zero milliseconds seen with **`setTimeout`**.

However, with recent updates to browser environments, **`setImmediate`** is no longer supported. This leaves developers seeking alternatives to replicate its behavior. One such solution involves leveraging the **`MessageChannel`** API as a substitute, providing a way to emulate the immediate task execution previously offered by **`setImmediate`**.

```tsx
// Shim for setImmediate using MessageChannel
function setImmediate(callback: () => void): void {
    const channel = new MessageChannel();
    channel.port1.onmessage = callback;
    channel.port2.postMessage(undefined);
}

setImmediate(() => {
    console.log("This task is executed immediately in the next tick.");
});
```

This workaround not only g**uarantees immediate execution but also circumvents the 4ms minimum delay imposed by browsers on** **`setTimeout`**. It's even employed internally by [React for scheduling work.](https://github.com/facebook/react/blob/2c022b847ed2171c59d37db9f71b394e0082ae3f/packages/scheduler/src/forks/Scheduler.js#L532)

## No need to hurry? Wait for idle time

For less critical tasks, we can utilize a new API called **`requestIdleCallback`**. This API allows us to schedule work to be executed during idle periods when the browser's main thread is not busy with other high-priority tasks. By leveraging **`requestIdleCallback`**, **we can ensure that our less important tasks are executed efficiently without impacting the overall performance of the application**. Let's explore how we can implement this alternative approach.

```tsx
// Define a function to process a single element
function processElement(element: number): void {
    // Perform computation for the element
    // Example: Some heavy computation here
    console.log(`Processing element ${element}`);
}

// Define a function to process the array asynchronously with requestIdleCallback
function processArrayAsyncWithRequestIdleCallback(array: number[], index: number): void {
    // Schedule the processing of the array elements using requestIdleCallback
    window.requestIdleCallback((deadline) => {
        // Process the elements of the array until the deadline is reached
        while (index < array.length && deadline.timeRemaining() > 0) {
            processElement(array[index]);
            index++;
        }

        // Check if there are remaining elements to process
        if (index < array.length) {
            // Schedule the processing of the remaining elements in the next idle period
            processArrayAsyncWithRequestIdleCallback(array, index);
        }
    });
}

// Example usage: Process an array of numbers asynchronously with requestIdleCallback
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processArrayAsyncWithRequestIdleCallback(numbers, 0);
```

In this code sample, we define a function **`processArrayAsyncWithRequestIdleCallback`** that takes an array and an index as parameters. Inside this function, we schedule the processing of the array elements using **`requestIdleCallback`**.

**`requestIdleCallback`** is a browser API that allows us to perform work during idle periods when the browser's main thread is not busy with other tasks. When we pass a callback function to **`requestIdleCallback`**, the browser invokes it during an idle period, providing a **`deadline`** object as an argument. This **`deadline`** object contains information about how much time is left until the next frame is committed.

Within the callback function, we use a **`while`** loop to process array elements until the deadline is reached or there are no more elements left to process. We check the remaining time using the **`deadline.timeRemaining()`** method, which returns the amount of time (in milliseconds) left until the deadline. This allows us to use the available time in the most efficient way, ensuring that our tasks are executed without blocking the main thread for extended periods. If there are remaining elements to process, we schedule the processing of the next batch of elements in the next idle period.

**We need to consider the scenario where the browser might be overwhelmed with tasks**, leading to our **`requestIdleCallback`** not being executed. In such cases, **we can provide a timeout value** to ensure that our callback gets executed even if the browser is too busy to handle it immediately. 

```tsx
// Define a function to process a single element
function processElement(element: number): void {
    // Perform computation for the element
    // Example: Some heavy computation here
    console.log(`Processing element ${element}`);
}

// Define a function to process the array asynchronously with requestIdleCallback
function processArrayAsyncWithRequestIdleCallback(array: number[], index: number): void {
    // Schedule the processing of the array elements using requestIdleCallback
    window.requestIdleCallback((deadline) => {
        const now = window.performance.now();

        // Process the elements of the array until the deadline is reached
        while (index < array.length && (deadline.timeRemaining() > 0 || (deadline.didTimeout && window.performance.now() - start < 40))) {
            processElement(array[index]);
            index++;
        }

        // Check if there are remaining elements to process
        if (index < array.length) {
            // Schedule the processing of the remaining elements in the next idle period
            processArrayAsyncWithRequestIdleCallback(array, index);
        }
    });
}

// Example usage: Process an array of numbers asynchronously with requestIdleCallback
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
processArrayAsyncWithRequestIdleCallback(numbers, 0);
```

During the execution of **`requestIdleCallback`**, if the timeout specified in the options object is reached before the callback is executed, **`deadline.didTimeout`** will be set to **`true`**, indicating that the callback has indeed timed out.

By incorporating this check into our while loop condition, we ensure that the loop terminates if either the deadline is met or the callback times out. If the callback times out, **`deadline.timeRemaining()`** will return 0, but **`deadline.didTimeout`** will be **`true`**, allowing us to gracefully handle the timeout scenario. We also incorporate additional limit, similar to the one used before, to still split work into smaller parts.

## Conclusion

In this blog post, we've witnessed how traditional synchronous tasks can monopolize the main thread, resulting in sluggish performance and unresponsive interfaces.

However, we've discovered an escape hatch, allowing us to **convert synchronous workflows into asynchronous ones, enabling the browser to manage additional tasks such as user interaction events**. Initially, we employed **`setTimeout`** with a 40ms deadline. Later, we transitioned to using **`setImmediate`** through the **`MessageChannel`** shim, which enabled us to bypass the 4ms clamp. While this approach is effective for urgent tasks, it may not be the optimal choice for non-urgent work that can be deferred until the browser is free.

Fortunately, a novel solution presents itself in the form of the **`requestIdleCallback`** API. This tool enables us to **schedule tasks during periods of browser inactivity and precisely measure available processing time and determine when to return control back to the browser**. Moreover, in instances of browser overload, the timeout parameter offers a means to enforce execution after a specified delay.

By adopting these strategies, we can enhance the user experience of our web applications, optimizing performance and responsiveness.

Happy coding!