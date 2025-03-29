---
author: rafal-op
tags:
  - frontend
date: 2025-03-29T20:05:57.271Z
meaningfullyUpdatedAt: 2025-03-29T20:05:57.287Z
title: Do React Keys Prevent Re-Renders?
layout: post
hidden: false
comments: false
published: true
language: en
---
**Let’s explore a concept in React that is often misunderstood: *keys*. When rendering collections in React, developers frequently use the map function to iterate over items and generate components. However, React requires an additional step: specifying a unique key for each item in the collection. This requirement, often emphasized in React’s documentation (and reinforced by console warnings), is crucial for efficient rendering and maintaining component state across re-renders. To understand why keys are important and often misunderstood, let’s start from the basics.**

## **How React reacts?**

Every React component undergoes a series of lifecycle steps. To simplify, these steps can be categorized as: **initial rendering** (mount), **re-rendering** (update), and component **removal** (unmount). For now, we’ll focus on the first two phases. React handles these operations in three distinct steps: the **trigger step**, the **render step**, and the **commit step**.

### **Trigger step**

The trigger phase is the starting point for any re-render in React. It occurs whenever an update is necessary, such as when a **component’s state changes**, a **parent component re-renders**, or a **subscribed context value updates**. These actions signal React to check if any part of the component tree needs to be updated, prompting the process to move into the render step.

### **Render step**

The render phase marks the next step in React’s component lifecycle. It occurs during the initial mount and whenever updates are triggered (in the trigger phase). During this phase, React performs **reconciliation**, a process driven by a **diffing algorithm** that utilizes both the **Virtual DOM** and the **React Fiber** architecture. Based on the comparison of the previous and updated representations of the component tree, React determines the component’s output, which is essentially the UI. For child components, React recursively invokes their render functions (or component logic in functional components) and those of their descendants to ensure the entire component tree is re-evaluated.

### **Commit step**

Based on the diffing process, React updates only the necessary parts of the real DOM during the commit phase. It’s important to note that just because a component’s render function is called, it doesn’t guarantee a DOM update for that component, as **rendering and DOM updates are separate processes**. Understanding this distinction is crucial for addressing a common myth, which I’ll explain in the next section.

## **Does keys prevent re-renders?**

A common myth surrounding keys is the belief that:

> Keys prevent re-renders of unchanged components

Keys play a crucial role in helping React efficiently match elements between renders. While their function extends beyond this, we’ll focus on their role in DOM updates for simplicity. However, it’s important to note that **keys alone do not prevent re-renders**. React’s default behavior is to re-render all items in a collection whenever the parent component updates, even if the individual items remain unchanged — unless specific optimization techniques are applied.

Let’s explore this with an example involving a **List** component and an Item component. When the List component’s state is updated (e.g. a new item is added), the **render** phase is **triggered**. During this phase, React determines what changes need to be applied to the real DOM. It does this by iterating through the List and its child components, invoking their render methods/component’s function execution.

What happens to the existing *n* elements in the collection after adding a new item? According to the myth, they shouldn’t be re-rendered — but is that really true? Not quite.

### **Keys role in DOM updates**

Keys helps us identifies specific elements. They indeed plays non-directly role in performance optimization but not by avoiding re-renders. Let’s try it on a simple example ([also available on the playground](https://reactplayground.vercel.app/#N4IgLgziBcBmCGAbCBTANCAbrK1QEsA7AExQA8A6AK1xHwFsAHAewCcwACAQUcY9lbN6HAOQUA9D0bUIZEQB1CDFuw4AlFPADGnAUNGtNOhUqZtOwDlsPwwKNc2acAvv0HCRNnQFpiQ8VqI+CiEYCaKWsyEEJyRofBEKKwcALwcfloArvQhYBQA5ihgAKKIKDmhAEIAngCSxAAUno5hAJQRUTEcgk6pVjZ2Dk4NcWAJhEnthD15hiRJDYoc6kZ51pp2peW5i4TLyxraeQDKYKz4OgCyzKRoS-uEmYiId3v7hzoU67YoWxVgDSkU2WU1aIAwUhkZBgdDMqg+YDQHEsmVQpx+HFcemE8hAXjAuIA3IoOtFOFI+g1WqkAHzI+6GMCZVh7AA8ABl8F1xDTiYRnHzSV1OV00lTafS3nEugBtfB2egQJGoMC1BUQAC6fVRKHRdgaMvuy0s+GI0A4l1sAAsKKx4CQhOLnK99siOKbzZawDa7Q76E6XRwNa1BVLOpx4MRiGrypTqSk6cAjVZwxwJgB3GPCNIms0W622+1+f3UgXJlVZiANEbMuaq9XxukyigtrKsOuVpEZrPBvnLMuEBlFZl7Xau1nEfCYGnJ5asgBGmTAYCiHCiAGEgloANYpYCR6MK5w0rhR90K1niRfLqIzt6u4Dy8oQCj0eCMatP+iNyWu12MkcOA5Ll61jbcUGqPcvwoU1XC-KCjw4Hk+z-ZxWmcZNL0nad7hDRQByFTgRVA7MOAaE0FUxH8kzDaJmDKChEGYfJFjoSi5lIVhcSRaDTTwwc3gAlkgMYGlHwVGDiGcS9RL5AiJjIFROFIBAnnJXg+RAZxnCAA))

```

```

Our setup contains 2 components — List which handles state changes and Item, which is representation of a single element from the collection. On initial render we will see in console something similar to:

```

```

That’s quite straightforward, isn’t? Let add a new item by clicking in ‘add item’ button. Based on the myth — we should see one additional log in the console (let’s clear the console to make it easy to see). Let’s try it:

```

```

That’s strange — there are 3 new logs (5 together with those 2 displayed previously). And that’s totally expected behavior.

How React handles all those changes? As mentioned earlier — every state change will re-render state-owner component and all components inside of it — so both List and all the Items. Keys doesn’t preserve that.

However, there’s a grain of truth in the idea: **keys help React efficiently manage updates to the real DOM**. **By identifying which items have changed, keys ensure only the new elements are added or updated in the DOM, leaving unchanged elements intact**. Let’s try it, this time focusing on DOM updates, not components re-renders. Open dev tools of your browser and find the structure which represents List component. The initial markup looks like this:

![](https://cdn-images-1.medium.com/max/1600/1*goRlm_M7t93brExNvwXX7Q.png)

Now, let’s add a new item:

As you can see — there will be a blink which shows you what changes are applied to DOM — only one element is highlighted — newly added item.

## **Summary**

React keys are a powerful tool for improving app performance, particularly in dynamic lists, by helping React minimize unnecessary DOM operations and optimize the reconciliation process. However, while keys are important, it’s crucial to **understand their actual role** in the re-rendering process. They do **not prevent re-renders**; instead, they ensure that React can efficiently update and track changes to list items.

- - -

##### Take a look at our earlier blog post debunking frontend myths:

1. [To ‘b’ or Not to ‘b’: The Semantic Status of HTML ‘b’ Tag](/blog/semantic-status-of-html-b-tag/)
2. [Understanding the Hoisting Behavior of let and const](/blog/let-const-hoisting/)
3. [JavaScript Types De-Objectified](/blog/javascript-types-deobjectified/)
4. [Eye on ‘i’ — Understanding ‘i’ as a Semantic Element](/blog/understanding-i-as-semantic-element/)
5. [Breaking Down the “alt” Attribute Myth in img Tag Best Practices](/blog/breaking-down-alt-attribute/)