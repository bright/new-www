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

<YouTubeEmbed url='https://youtu.be/gwM0SnHACMs?si=1-utjZt6h4rE8O3S' />

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

However, in some situations, **rounding may require adding more than one extra penny**. For example, consider splitting £9.35 into 3 separate payments. The result is £3.116666... In this scenario, two of the payments need to be rounded up to ensure the total matches the original amount:

<div className="image">![Bill splitting UI POS](/images/split-payment.png "Bill splitting UI POS")</div>

That's the business logic behind it but what about the code?

## How to represent decimals in payment software development

When handling decimals in code for monetary values using **floating-point types** like `float` and `double` is highly discouraged due to their inherent imprecision. Here's why, and what alternatives should be used instead.

### Problems with float and double

`Float` and `double` are designed to handle a wide range of values by approximating them, which can introduce rounding errors – a critical issue when dealing with money. Due to the way floating-point arithmetic works, numbers cannot always be stored exactly, leading to inaccuracies. For example, performing a calculation with float might result in values like 0.999999999 instead of 1. This lack of precision makes float and double unsuitable for representing currency.

### Recommended approaches for currency decimal coding

* **Use integers**

A common alternative is to represent monetary values in cents (or the smallest unit of the currency) using an integer type, such as `int` or `long`. For example, instead of representing $10.99 as 10.99 with a float, it can be stored as 1099 cents with an integer type. This avoids floating-point inaccuracies while still enabling exact arithmetic.

* **Use arbitrary precision types**

Many programming languages offer data types that handle decimals with greater precision. In **Java**, for instance, `BigDecimal` is a highly recommended option for monetary calculations, as it provides control over rounding and allows exact calculations without floating-point errors. Similarly, **Python**'s decimal type offers a way to handle monetary values precisely.

* **Control over rounding**

Using types like `BigDecimal` or `Decimal` also gives developers control over rounding behaviors, which is crucial for restaurant operations where rounding must comply with legal and business standards.

## Does your bill split cover all these scenarios?

While building POS payment solutions for retail and hospitality you will deal with decimals. Ensure your solution covers a variety of mathematical scenarios related to features like bill splitting. 

Do you struggle with implementing payment features? **We’ve been [scaling POS systems](/our-areas/pos-software-development/) for over a decade**, **contact us to discuss your solution**.