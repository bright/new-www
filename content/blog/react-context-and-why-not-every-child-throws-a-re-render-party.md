---
author: rafal-op
tags:
  - frontend
date: 2025-06-25T07:48:53.674Z
meaningfullyUpdatedAt: 2025-06-25T07:48:54.491Z
title: React Context and why not every child throws a re-render party
layout: post
image: /images/react_context.png
hidden: false
comments: false
published: true
language: en
---
**React Context is a powerful tool that makes it easy to share data across multiple components, helping to avoid a common issue known as *props drilling*. While Context is sometimes mistakenly treated as a state management solution - especially in comparisons with tools like Redux - its primary purpose isn't managing complex application state. In this article, however, I want to focus on debunking a different myth: the belief that all components inside a Context Provider automatically re-render when the context value changes.**

## Anatomy of Context

The **React Context API** revolves around two main components: the **Provider** and the **Consumer**. The Provider is a component that wraps part of your component tree and makes data (**value** property in the Provider) available to all its descendants. Any component within this tree can become a Consumer (but simply being inside the Provider doesn’t make a component a Consumer) allowing it to access the shared data exposed by the Provider, at which point it becomes a Consumer.
In short, the *Provider supplies the data*, and the *Consumers receive it -* no need to pass props manually through every level of the component tree.

### The Truth About Context and Re-renders

You may already know ([and here's more on that](/blog/keys-and-re-renders-in-react)) that when a context value changes, React will re-render all components that subscribe to that context.
But what about components that are simply nested inside the Provider and don’t use the context at all? Do they re-render too?
One common misconception - often discussed as a downside of using Context is that:

> All components inside a Provider re-render when the context value changes

This would indeed be inefficient if it were true. But the reality is more nuanced.

### Context and Its Children

Let’s look at a practical example ([available also here](https://reactplayground.vercel.app/#N4IgLgziBcBmCGAbCBTANCAbrK1QEsA7AExQA8A6AK1xHwFsAHAewCcwACAQUcY9lbN6HAOQUA9D0bUIZEQB1CDFuw4AlFPADGnAUNGtNOhUqZtOwDlsPwwKNc2acAvv0HCRNnQFpiQ8VqI+CiEYCaKWsyEEJyRofBEKKwcALwcfloArvQhYBQA5ihgAKKIKDmhAEIAngCSxAAUno5hAJQRUTEcgk6pVjZ2Dk4NcWAJhEnthD15hiRJDYoc6kZ51pp2peW5i4TLyxraeQDKYKz4OgCyzKRoS-uEmYiId3v7hzoU67YoWxVgDSkU2WU1aIAwUhkZBgdDMqg+YDQHEs3zsAGEonYyIiOJlUBjQuQcXiUKcfkiScVYLAUDoOK49MJ5CAvGBmQBuRQdaKcABy2QARkkCVjOGlUSgRUSGq1OYRuV1+fQhawpdiAAqCTD4UjJNINFEAC3wiGIc3prVSAD5kfc4l0ANqPZVJJGoMBKlUAXT6JLJdgaAAZZVy3pTqbSATLrba3st7ZwdX13bVCaxMEgGtGUjb3Z6Fnscxw9gBqDgARlaSIATIG6yH5XHukVMqw9tmbYFNKxU3Z05mdQ3ls4kQ6vQ37oYwK32-dlgAefOqzFEiia5ja3UcDOITIoFLAZ0q5xWuf7YBaY2mubOM-z8RLtV5debpKnt4N5xyhWcY6ZAUQNY+BCsQaJXsQfQdrG8adJwO57r6+IrtiDSPshYBDlYnTMGUFCIMw+SLCAf4AUBIFgSaEGGN4cy6igxDMhObxTjOHDzsQ+CYFaFGmtw0DIvBKDOPeHFcXKX6hgmHAAKrRP+gHnOR4GQZaRbAHa2G4fhhHMrJEDyWR9E8VRIR0QxIBMcsLFtmxonccplT8TEtgXCJnFWuJ34TGQKicKQCBPLomSEDo+BRNwvDRupzEtjZuz7GxaGEhqWo6m+Z4LiRCnAUZyniO+CULnpBmKbllEcPld4PoKwroS+aWsAVHCfuCIAxNUuFaBAtAUAKYB7NFyywJi3gQPgABeKD8dWhj0OJIDOM4QA)):

```
import React, { createContext, useContext, useState, useEffect } from "react";

const NumberContext = createContext();

const NumberContextProvider = ({ children }) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNumber(n => n + 1), 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <NumberContext.Provider value={number}>
      {children}
    </NumberContext.Provider>
  );
};

const SubscribedChild = () => {
  const value = useContext(NumberContext);
  console.log("SubscribedChild re-rendered");

  return <div>Child A: {value}</div>;
};

const UnsubscribedChild = () => {
  console.log("UnsubscribedChild rendered");

  return <div>Child B: static</div>;
};

export default function App() {
  return (
    <NumberContextProvider>
      <SubscribedChild />
      <UnsubscribedChild />
    </NumberContextProvider>
  );
}
```

According to the myth, you’d expect to see logs from both components every 2 seconds. But when you check the console, you’ll notice that **UnsubscribedChild** logs only once, while **SubscribedChild** logs on every update.

Why is that?
Only components that both are wrapped inside the Provider, and subscribe to the context using `useContext` or `<Context.Consumer>` will re-render when the context value changes.

The myth contains a grain of truth: sometimes, unintended re-renders can happen when a context contains multiple values, and even a change to one of them causes all subscribers to update - even if they only use part of the data.

That’s why it’s a good practice to:

1. Keep contexts focused and minimal
2. Avoid using a single context for large, frequently changing state
3. Create multiple small contexts instead of one "big store" shared by many components

However, we will focus on optimization techniques for Contexts another time.