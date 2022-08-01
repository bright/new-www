---
author: adam-w
tags:
  - design
  - Architecture
  - development
  - backend
date: 2022-08-01T09:40:29.170Z
title: A quick introduction to the event-driven architecture
layout: post
image: null
hidden: true
comments: true
published: true
---
Publishing events can be a really good replacement for direct calls and in many cases, they are a better solution. With the use of events, we can invert the direction of dependency and better express our intention.\
I think examples explain things more clearly, so without further due let us jump into it.

- - -

The Customer component store and processes the customers' data (including customers’ addresses).\
The billing component (responsible for sending people bills) must have an up-to-date customer’s address all the time.

### Direct call

With direct calls our system can be designed like this:


![direct call](https://cdn-images-1.medium.com/max/1600/1*2HYzwsw97YIVTH6i-43gHQ.png)

When an address is changed on the customer side a request is sent to the billing with a change command. In this case, the customer has a dependency on the billing. It is a very easy approach that every developer should understand.

### Event notification 

By using the event notification pattern we inform all entities which listen to the change.

![event-notification](https://cdn-images-1.medium.com/max/1600/1*5oQn9dpZtd2rfQr0CCIarw.png)

It’s no longer a Customer's responsibility to **explicitly** inform the billing about the change. The direction of dependency is inverted and the Customer doesn't know nor care about the listeners. The design allows us to add more services that need to know about the address change without adding changes to the Customer.

In this pattern, an event carries only a reference to the changed object. After receiving an event, Billing has to request the required data. It is also worth mentioning that our **system notifies about the fact that change happened**. It is **not** commanding other services to change their state.

### The Event-Carried state pattern

The variation of the event notification pattern is the event-carried state pattern.\
In comparison to the event notification pattern, events in the event-carried state pattern contain changed data.

![event-carried state pattern](https://cdn-images-1.medium.com/max/1600/1*xHcllOYbVBwr18BNOnuKQg.png)

The main benefit here is no need for requesting data after receiving an event.\
The question here is: what state should an event carry? 

We can distinguish two types:

* **Delta Events**
* **Fat Events**

  **Delta events** are small focused events and contain only properties that have changed. They should express the clear intent of the event. `AddressChanged` event is a good example of that.\
  **Fat events** as the name suggests include more information. In our case, it could be an event `CustomerChanged`. Such an event would be sent on customer properties change (so also on address change). This approach can reduce the number of sent events, but it’s harder to maintain and change since many listeners depend on a single event. The threat is also an additional state for specific listeners which in the way break the single responsibility principle. \
  **Delta events are easier to maintain and change but they add more complexity on the producer side.**

### What should I pick?

Let’s complicate our example with additional services.\
Besides updating the address in billing we also want to update the address in reporting service and send an email to a user through the email service.

![summary](https://cdn-images-1.medium.com/max/1600/1*TjPTzSUkOrJjiHolyrQE0g.png)

Billing and reporting are notified about an address change through the `events`(either event notification or Event-Carried state). But why do we send a direct call to the email service instead of listening to the event? Assuming that we have one email service in our architecture we rather don’t want our service to depend on the all services that want to send an email.

### Summary

The thing to consider before choosing our strategy is what direction of dependency we prefer and this is a case-by-case decision to make. \
The events ensure very loose coupling between services, but with this strength comes its great weakness. It is easier to lose control of processes in your system. You don’t know who is listening to the events until run-time. It’s harder to understand, debug and modify compare to the standard approach.

So as always they are trade-offs of every approach but having these patterns in our toolbox will help us design better systems.