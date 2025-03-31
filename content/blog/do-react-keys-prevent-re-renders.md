---
author: rafal-op
tags:
  - frontend
date: 2025-03-31T08:30:41.377Z
meaningfullyUpdatedAt: 2025-03-31T08:30:42.044Z
slug: keys-and-re-renders-in-react
title: The Truth About Keys and Re-Renders in React
layout: post
image: /images/react_keys_re-renders.png
hidden: false
comments: false
published: true
language: en
---
**Let’s explore a concept in React that is often misunderstood: *keys*. When rendering collections in React, developers frequently use the map function to iterate over items and generate components. However, React requires an additional step: specifying a unique key for each item in the collection. This requirement, often emphasized in React’s documentation (and reinforced by console warnings), is crucial for efficient rendering and maintaining component state across re-renders. To understand why keys are important and often misunderstood, let’s start from the basics.**

<div className="image">![](/images/react_keys_re-renders.png "")</div>

## **How React reacts?**

Every React component undergoes a series of lifecycle steps. To simplify, these steps can be categorized as: **initial rendering** (mount), **re-rendering** (update), and component **removal** (unmount). For now, we’ll focus on the first two phases. React handles these operations in three distinct steps: the **trigger step**, the **render step**, and the **commit step**.

### **Trigger step**

The trigger step is the starting point for any re-render in React. It occurs whenever an update is necessary, such as when a **component’s state changes**, a **parent component re-renders**, or a **subscribed context value updates**. These actions signal React to check if any part of the component tree needs to be updated, prompting the process to move into the render step.

### **Render step**

The render step marks the next step in React’s component lifecycle. It occurs during the initial mount and whenever updates are triggered (in the trigger step). During this phase, React performs **reconciliation**, a process driven by a **diffing algorithm** that utilizes both the **Virtual DOM** and the **React Fiber** architecture. Based on the comparison of the previous and updated representations of the component tree, React determines the component’s output, which is essentially the UI. For child components, React recursively invokes their render functions (or component logic in functional components) and those of their descendants to ensure the entire component tree is re-evaluated.

### **Commit step**

Based on the diffing process, React updates only the necessary parts of the real DOM during the commit step. It’s important to note that just because a component’s render function is called, it doesn’t guarantee a DOM update for that component, as **rendering and DOM updates are separate processes**. Understanding this distinction is crucial for addressing a common myth, which I’ll explain in the next section.

## **Does keys prevent re-renders?**

A common myth surrounding keys is the belief that:

> Keys prevent re-renders of unchanged components

Keys play a crucial role in helping React efficiently match elements between renders. While their function extends beyond this, we’ll focus on their role in DOM updates for simplicity. However, it’s important to note that **keys alone do not prevent re-renders**. React’s default behavior is to re-render all items in a collection whenever the parent component updates, even if the individual items remain unchanged  -  unless specific optimization techniques are applied.

Let’s explore this with an example involving a **List** component and an **ListItem** component. When the List component’s state is updated (e.g. a new item is added), the **render** phase is **triggered**. During this phase, React determines what changes need to be applied to the real DOM. It does this by iterating through the List and its child components, invoking their render methods/component’s function execution.

What happens to the existing *n* elements in the collection after adding a new item? According to the myth, they shouldn’t be re-rendered — but is that really true? Not quite.

### **Keys role in DOM updates**

Keys helps us identifies specific elements. The key point here is to follow the specific [rules for assigning keys](https://react.dev/learn/rendering-lists#rules-of-keys) in React to ensure they serve their purpose correctly and efficiently. Keys indeed plays non-directly role in performance optimization but not by avoiding re-renders. Let’s try it on a simple example ([also available on the playground](https://reactplayground.vercel.app/#N4IgLgziBcBmCGAbCBTANCAbrK1QEsA7AExQA8A6AK1xHwFsAHAewCcwACAQUcY9lbN6HAOQUA9D0bUIZEQB1CDFuw4AlFPADGnAUNGtNOhUqZtOwDlsPwwKNc2acAvv0HCRNnQFpiQ8VqI+CiEYCaKWsyEEJyRofBEKKwcALwcfloArvQhYBQA5ihgAKKIKDmhAEIAngCSxAAUno5hAJQRUTEcgk6pVjZ2Dk4NcWAJhEnthD15hiRJDYoc6kZ51pp2peW5i4TLyxraeQDKYKz4OgCyzKRoS-uEmYiId3v7hzoU67YoWxVgDSkU2WU1aIAwUhkZBgdDMqg+YDQHEsmVQpx+HFcemE8hAXjAuIA3IoOtFOFI+g1WqkAHzI+6GMCZVh7AA8ABl8F1xDTiYRnHzSV1OV00lTafS3nEugBtfB2egQJGoMC1BUQAC6fVRKHRdgaMvuy0s+GI0A4l1sAAsKKx4CQhOLnK99siOKbzZawDa7Q76E6XRwNa1BVLOpx4MRiGrypTqSk6cAjVZwxwJgB3GPCNIms0W622+1+f3UgXJlVZiANEbMuaq9XxukyigtrKsOuVpEZrPBvn7MtvBlFZl7Xau1nEfCYGnJ5asgBGmTAYCiHCiAGEgloANYpYCR6MK5w0rhR90K1niRfLqIzt7jp5312u4Dy8oQCj0eCMatv+iNjgOS5etY23FBqj3P8KFNVw-0go8OB5VpnFnQDxEfZNL0nad7hDRQByFTgRRA7MOAaE0FUxACkzDaJmDKChEGYfJFjoSi5lIVhcSRKDTTwwghyZFlAKCGlXwVaDiGcS9RL5AiJjIFROFIBAnnJXg+RAZxnCAA))

```javascript
import React, { useState } from "react";

const App = () => {
  return <List />;
};

const List = () => {
  const [items, setItems] = useState([
    { id: Math.random() },
    { id: Math.random() },
  ]);

  const addItem = () => {
    const newItem = { id: Math.random() };
    setItems((currentItems) => [...currentItems, newItem]);
   };
  
  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <ul>
        {items.map((item) => <ListItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
};

const ListItem = ({ item }) => {
  console.log("item render", item.id);

  return <li>{item.id}</li>;
};

export default App;
```

Our setup consists of two components: **List**, which manages state changes, and **ListItem**, which represents a single element from the collection. During the initial render, the console output will look something like this:

```
item render 0.9271951880982141
item render 0.9720048278427091
```

That seems pretty straightforward, right? Now, let's add a new item by clicking the **Add Item** button. According to the common belief, we should see just one additional log in the console. To make it clearer, let's first clear the console. Ready? Let’s give it a try:

```
// 1st (initial) render
item render 0.9271951880982141
item render 0.9720048278427091

// 2nd render (re-render)
item render 0.9271951880982141
item render 0.9720048278427091
item render 0.738685209572542
```

That’s odd - we see **three** new logs (five in total if we count the initial two). But surprisingly, this is actually the expected behavior.

So, how does React handle all these changes? As mentioned earlier, every state change triggers a re-render of the component that owns the state, along with all of its child components - in this case, both the **List** and all its **Item** components. Notice that even using keys doesn't prevent this.

However, there’s a grain of truth in the idea: **keys help React efficiently manage updates to the real DOM**. **By identifying which items have changed, keys ensure only the new elements are added or updated in the DOM, leaving unchanged elements intact**. Let’s try it, this time focusing on DOM updates, not components re-renders. Open dev tools of your browser and find the structure which represents List component. The initial markup looks like this:

<div className="image">![Initial markup of list component](/images/zrzut-ekranu-2025-03-30-o-18.46.17.png "")</div>

Now, let’s add a new item. As you might notice, there's a slight blink that highlights the changes applied to the DOM — but only the newly added item gets highlighted. 

<div className="image">![Newly added list item](/images/zrzut-ekranu-2025-03-30-o-18.47.15.png "")</div>

I've prepared a [playground](https://reactplayground.vercel.app/#N4IgLgziBcBmCGAbCBTANCAbrK1QEsA7AExQA8A6AK1xHwFsAHAewCcwACAQUcY9lbN6HAOQUA9D0bUIZEQB1CDFuw4AlFPADGnAUNGtNOhUqZtOwDlsPwwKNc2acAvv0HCRNnQFpiQ8VqI+CiEYCaKWsyEEJyRofBEKKwcALwcfloArvQhYBQA5ihgAKKIKDmhAEIAngCSxAAUno5hAJQRUTEcgk6pVjZ2Dk4NcWAJhEnthD15hiRJDYoc6kZ51pp2peW5i4TLyxraeQDKYKz4OgCyzKRoS-uEmYiId3v7hzoU67YoWxVgDSkU2WU1aIAwUhkZBgdDMqg+YDQHEsmVQpx+SNRv1gsBQOkxqA0sA4rj0wnkIC8YApAG5FB1opwpH0Gq1UgA+ZH3QxgTKsPYAHgAMvguuJ2XTCM5JQyuiKumlWRyuW84l0ANr4Oz0CBI1BgWraiAAXT6WPRdga6vuy0s+GI0A4l1sAAsKKx4CQhErnK99siOPbHc6wG6PV76D6-Rxja0ZarOpwgjEiWbCShYA1Hs84-SE4yOPBiMRDeUWWyUpzgDarImOBMAO6l4RpO0Op2u92evyRtnSmv65sQBojPlzA1Giuc9UUWdZVjjodIxvN2OS5b9wj3LHFHF4gFKysq-1qzjMABGqFYmCSfUbTsyYzA+CiAHlL0kb6wR-RH7YX9EU7Hv6HC-k+AEQBQsBsMU2guj+f7PlEQHVm8IG1tEzBlBQiDMPkiwgAAIq+lwPuBUTpEU+4oA6FJImB-7IeuIHOLmaEkmxNb4MSDTJmARJfGOuRsqh6EXleX4UOJn4oLxor8RmgkLrkSKiehVguvgiDEPKYCOmcmToDWG5sf6zh5v6PJ8nsh5VsZHDSdeSQUMQopxBMOissxG7Mb6HDqmuFndEU1kcLs-oCq5mDsvZArno+YAUVEADCQRaAA1ikwBFiW2rOOyXDFoG2oCuI8VgIlhAxexywCk8wWwFlfFEvl9m2lq5SQfQ8CMCOHX0EB4XqbVunNhw6UoNUWX9RQ9quP1015Rw4ptRwrStOZNUcKVTzVRF4hRXta2SpusqcKN2osnal2scqalqlhKA4XhBH9cF8ysHRxXlLNxCcW8Vn8ttQTssAM1zaVIMnfG5AqJwpAIE8TK8DSIDOM4QA) with an additional **[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)** to help visualize this behavior more clearly. In the console, you'll see logs showing the re-rendering of all items (each item’s id is printed). However, when it comes to actual DOM mutations, only **one mutation** is detected — the insertion of the newly added item.

```
DOM Mutation detected: 
  Mutation Record {
    addedNodes: NodeList [li]
    attributeName: null
    attributeNamespace: null
    nextSibling: null
    oldValue: null
    previousSibling: li
    removedNodes: NodeList []
    target: ul
    type: "childList"
    [[Prototype]]: MutationRecord
  }

```

This distinction between React re-renders and real DOM changes is exactly what this example demonstrates.

Is it possible to modify this default behavior and make only the newly added items re-render? The short answer is yes — there are techniques to achieve that. However, let's save those for another time.

## **Summary**

React keys play a crucial role when working with dynamic lists by helping React accurately identify which items have changed, been added, or removed. This allows React to update the UI correctly during the **reconciliation** process. However, it's important to understand their true purpose: **keys do not prevent re-renders**. Instead, they help React maintain consistency and efficiently match elements between renders.

- - -

##### Take a look at our earlier blog post debunking frontend myths:

1. [To ‘b’ or Not to ‘b’: The Semantic Status of HTML ‘b’ Tag](/blog/semantic-status-of-html-b-tag/)
2. [Understanding the Hoisting Behavior of let and const](/blog/let-const-hoisting/)
3. [JavaScript Types De-Objectified](/blog/javascript-types-deobjectified/)
4. [Eye on ‘i’ — Understanding ‘i’ as a Semantic Element](/blog/understanding-i-as-semantic-element/)
5. [Breaking Down the “alt” Attribute Myth in img Tag Best Practices](/blog/breaking-down-alt-attribute/)