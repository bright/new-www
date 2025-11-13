---
author: rafal-op
tags:
  - frontend
date: 2025-11-13T10:33:04.574Z
meaningfullyUpdatedAt: 2025-11-13T10:33:05.084Z
slug: why-js-math-does-not-math
title: Why JS Math Doesn’t Math?
layout: post
image: /images/blogpost_blog_js_math_image.png
hidden: false
comments: false
published: true
language: en
---
**In this article, we’ll explore why JavaScript’s floating-point calculations behave the way they do, and what’s really going on under the hood.**

This post has two parts. The first (this one) gives a high-level overview of floating-point arithmetic in JavaScript. The second dives into the low-level mechanics and calculations, so you can see exactly what happens behind the scenes.

<div className="image">![JavaScript math](/images/blogpost_blog_js_math_image.png "JavaScript math")</div>

## Is JavaScript broken?

You’ve probably heard people say that JavaScript is a “broken” language and sometimes it really seems that way. One of the most famous examples is how JavaScript handles floating-point arithmetic. Adding simple numbers can produce strange, unexpected results. It’s funny, but the truth is, this isn’t actually JavaScript’s fault. The behavior comes from the number system it’s built on - a specification shared across many programming languages.

## JS’s math don’t maths

Let’s debunk a famous myth. Try adding 0.1 and 0.2 in JavaScript. You’d expect 0.3, right? Instead, you get `0.30000000000000004`. Even this simple calculation seems to confuse JS!
*„JS floating-point numbers system is broken”*

## Counting in Binary

At their core, computers only understand binary, a language of 0s and 1s. To perform calculations, we first need to represent our numbers in this form. If you’re not interested in the details of the conversion process (see the section below), here are the binary approximations for our example numbers:

`0.1 - 0.0001 1001 1001 1001…`

`0.2 - 0.0011 0011 0011 0011…`

### Bonus. How to convert decimal values into binary

If you’re not into the technical details, you can skip this part—but it’s actually quite simple and can be useful. To convert a fraction to binary, all you need to do is multiply it by 2. If the result is greater than or equal to 1, you write a binary 1 for that step; otherwise, it’s 0. Then, if you wrote 1, subtract 1 from the result and repeat:

1. `0.1 * 2 = 0.2  → binary 0`
2. `0.2 * 2 = 0.4  → binary 0`
3. `0.4 * 2 = 0.8  → binary 0`
4. `0.8 * 2 = 1.6  → binary 1`
5. `(1.6 - 1) * 2 = 0.6 * 2 = 1.2 → binary 1`
6. `(1.2 - 1) * 2 = 0.2 * 2 = 0.4 → binary 0`
7. `0.4 * 2 = 0.8 → binary 0`
8. `0.8 * 2 = 1.6 → binary 1`
9. `…`

As you can see, the process starts repeating the same numbers — and that’s totally normal. Later, I’ll explain how we handle numbers like this. By the way, you can also get the same result in JavaScript using:\
*(0.1).toString(2)*

### Infinitely repeating binary fractions

Floating-point numbers like 0.1 and 0.2 are **infinitely repeating binary fractions**. What does that mean? When you try to convert 0.1 into binary, the digits enter an endless loop, they repeat forever. This proves that some decimal numbers simply cannot be represented exactly in binary. We can only store an approximation. So, how does JavaScript handle these numbers anyway?

## IEEE math

JavaScript [uses](https://262.ecma-international.org/16.0/index.html?_gl=1*14nfdzv*_ga*MTM1MjExMjkxMC4xNzYwNjk4MDcy*_ga_TDCK4DWEPP*czE3NjA2OTgwNzEkbzEkZzEkdDE3NjA2OTgwOTgkajMzJGwwJGgw#sec-ecmascript-language-types-number-type) 64-bit double-precision floating-point numbers, following the IEEE 754 standard (first version defined in 1985). This standard isn’t unique to JavaScript, it’s also used in many other languages like Python, Kotlin, C#, and more. (Try the same calculation in one of those languages, you might be surprised by the results!) The IEEE 754 standard lets computers represent repeating decimal numbers, like 0.1 and 0.2, using finite binary approximations. But how does it actually do that?

### IEEE-754 binary format

The IEEE-754 standard defines how computers handle decimal number calculations. It requires numbers to be converted into a specific binary-like format. Without diving into all the details (which I’ll cover in an upcoming post), the key point is that IEEE-754 uses a finite representation. This means it won’t exactly match the “ideal” binary results we saw earlier for 0.1 and 0.2. 

For example, the IEEE-754 values for our numbers are:
`0.1 → 0 01111111011 1001100110011001100110011001100110011001100110011010
(in decimal: 0.100000001490116119384765625)`

`0.2 → 0 01111111100 1001100110011001100110011001100110011001100110011010
(in decimal: 0.20000000298023223876953125)`

Adding these two values gives:
`0.100000001490116119384765625 + 0.20000000298023223876953125`

And that’s why we get the “unexpected” result! If you’re curious about how these IEEE binaries are actually created, hang tight, I’ll go through the full process in the next post. For now, just trust these values.

## What's next

Now you know why JavaScript sometimes “can’t math” and how floating-point numbers are stored behind the scenes. In the next post, we’ll dig deeper into the actual calculations and see exactly how these tiny rounding quirks happen. Stay tuned!

Read more:

1. [To ‘b’ or Not to ‘b’: The Semantic Status of HTML ‘b’ Tag](https://brightinventions.pl/blog/semantic-status-of-html-b-tag/)  
2. [Understanding the Hoisting Behavior of let and const](https://brightinventions.pl/blog/let-const-hoisting/)  
3. [JavaScript Types De-Objectified](https://brightinventions.pl/blog/javascript-types-deobjectified/)  
4. [Eye on ‘i’ — Understanding ‘i’ as a Semantic Element](https://brightinventions.pl/blog/understanding-i-as-semantic-element/)  
5. [Breaking Down the “alt” Attribute Myth in img Tag Best Practices](https://brightinventions.pl/blog/breaking-down-alt-attribute/)  
6. [The Truth About Keys and Re-Renders in React](https://brightinventions.pl/blog/keys-and-re-renders-in-react/)  
7. [React Context and why not every child throws a re-render party](http://blog/react-context-rerenders/)