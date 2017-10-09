---
layout: post
title: Quick look on a Strategy Pattern using Swift
author: kwysocki
tags : [iOS, swift, design patterns, strategy pattern]
comments: true
hidden: true
---

![Image Title](/images/quick-look-on-a-strategy-pattern-using-swift/strategy.jpg){: .center-image}


Let's take a quick look on one of the design patterns that should help us to write good Object-Oriented code.
The basic assumption of Strategy Pattern is that you can define many implementations that will conform to the protocol.

Take a look at a simple example that can be used in iOS applications


Firstly create a `protocol` which contains a method. In our case it will be:

## Define protocol

<script src="https://gist.github.com/k8mil/51c2bef4373a063aeafc9d9cb605d9e9.js"></script>

## Create strategies

Ok, most of the iOS apps use an `UIImage` to represent images in applications. The `UIImage` instance can be used to produce two different data representations of image `UIImagePNGRepresentation` and  `UIImageJPEGRepresentation`. Let's create classes that handle this stuff.

<script src="https://gist.github.com/k8mil/69fbffb20630cd273ed84a5ee2149f90.js"></script>

Now, as you can see - both classes conforms to an `ImageRepresentation` protocol but they are differ by an implementation. Each class represents different STRATEGY.

## Create client

The last thing - create a client that uses one of the `ImageRepresentation` strategies.

<script src="https://gist.github.com/k8mil/5b44740021d9bba904cda4de47939e94.js"></script>

## Usage

<script src="https://gist.github.com/k8mil/48ee90472babb961ab789966d7e2ed7a.js"></script>

## Conclusions

The cool thing about Strategy Pattern is that we can change our strategy at runtime.
While using the Strategy Pattern we definitely conform to "Open-Close" SOLID principle. Our client is open for extensions by changing the strategy without changing client implementation(close for modification).

Our code is more readable. Let's think how above code could look like without Strategy Pattern:

### Using Switch

<script src="https://gist.github.com/k8mil/5be7d283e6e08052683af1c79405ce91.js"></script>

### or using multiple functions

<script src="https://gist.github.com/k8mil/8c6b66a014629604963b05799ab2a980.js"></script>

Both of this solutions definitely are not on the same line with CleanCode. Also, it might be hard to maintain that kind of code. The switch statement can grow with the next cases - what if we have to handle a 10, 20 or 100 strategies? The second one is even worse because we will continue to duplicating the similar methods to handle each case. And the last but not least, the `ImageRepresenter` with Strategy Pattern included will be easiest to test.
