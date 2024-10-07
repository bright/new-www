---
author: izabela
secondAuthor: klaudiusz
tags:
  - POS
date: 2024-10-07T07:55:31.749Z
meaningfullyUpdatedAt: 2024-10-07T07:55:31.776Z
slug: decimals-pos-bill-splitting-restaurants
title: Managing Decimals in POS Bill Splitting for Restaurants
layout: post
image: /images/pos_payment_decimals_blog_cupdate.png
hidden: false
comments: true
published: true
language: en
---
**You might think that bill splitting in restaurants is straightforward – you just need to divide the bill among all customers. So, what's the challenge? Well, it comes down to something we might overlook: decimals. Just try splitting 10 pounds among three people. That's when decimals really come into play.**

<div className="image">![decimals bill splitting](/images/pos_payment_decimals_blog_cupdate.png "decimals bill splitting")</div>

Let's explore a scenario depicted in a mockup of a [bill split system we implemented for Just Eat POS](/projects/pos-bill-splitting/).

## Decimals in restaurant bill split case study

Imagine three people deciding to share one pizza (presumably, they have light appetites). The total bill is £6.49. Dividing £6.49 by three results in 2.16333333333... Rounding it down to £2.16 might seem fair since each payment is equal, but then the total collected doesn't match the bill – there's a penny missing!

<div className="image">![Bill splitting UI](/images/split-payment_before.png "Bill splitting UI")</div>

No business wants to lose these pennies on a larger scale. On the other hand, rounding each payment up to £2.17 isn't a perfect solution either, as it results in an overpayment of 2 pence.

As you can see, decimals are important, in some cases, they can be a matter of life or death. Yet that’s another, rather [tragic story about 28 soldiers](https://www-users.cse.umn.edu/~arnold/disasters/patriot.html) who died because decimals were, let's say, “neglected”. 

**So, what can we do about these “annoying” decimals in POS systems?**

## Rounding-up mechanism in bill splitting

While developing a [bill-splitting feature for our UK-based point-of-sale (POS) system](/projects/pos-bill-splitting/), our team adheres to **specific rounding-up rules** when the total bill cannot be evenly divided. In cases like the one provided earlier (dividing £6.49 by three), **the last payment needs to include an extra penny**. This small adjustment ensures that the sum of the split payments matches the total amount of the bill.

<div className="image">![Bill splitting UI POS](/images/split-payment_pizza.png "Bill splitting UI POS")</div>