---
layout: post
title: TypeScript tips from Kotlin developer - const
author: piotr
hidden: true
tags: TypeScript Kotlin const immutability
comments: true
crosspost: true
image: /images/kotlin/kotlin-logo.png
---

Nowadays I mostly code in [Kotlin programming language](https://kotlinlang.org/). I got interested in it when I started working on a Java 7 codebase and quickly got fed up with the language. At [Bright Inventions](https://brightinventions.pl) we often use TypeScript for both back-end, front-end and mobile development so I though I would share some thoughts and tips for TypeScript learned when using Kotlin. In particular this post is about constant variables.

## Use `const` whenever possible

[Using immutable variables](https://hackernoon.com/5-benefits-of-immutable-objects-worth-considering-for-your-next-project-f98e7e85b6ac) aids reasoning about flow and state of a program. It helps compiler to provide more intelligent hints especially when dealing with nullable types.

In Kotlin a `val` keyword denotes a variable which value does not change after initialization e.g.:

```kotlin
val x: Int
val y = 3
x = 2
x = 20 // Error: Val cannot be reassigned
y = 30 // Error: Val cannot be reassigned
```

In [TypeScript](https://www.typescriptlang.org/) such situation is handled with `const`:

```TypeScript
const x: number // Error: 'const' declarations must be initialized
const y: number = 3

y = 30 // Error: Cannot assign to 'y' because it is constant or read-only property
```

## Compilers love `const`

The first way in which compiler gets smarter when we use `const` is null checks. When you enable [`strictNullChecks`](https://www.typescriptlang.org/docs/handbook/compiler-options.html), which you should, both Kotlin and TypeScript compiler understand if something can or cannot be null.

```TypeScript
const firstName: string | null = getFirstName();
let lastName: string | null = getLastName();

if(firstName !== null && lastName !== null) {
    setTimeout(() => {
        console.log(firstName.length)
        console.log(lastName.length) // Error: Object is possibly 'null'
    })
}
```

## Compilers catch bugs with `const`

Because `const` and `val` can only be assigned once compilers can prevent another class of bugs. Take a look at the code example blow. There is a bug 🐛 that could easily be avoided had we used `const` instead of `let`.

```TypeScript
let firstName: string = person.firstName
let lastName: string = person.lastName

const parsed = parseFormData((data: {name: string }) => {
    let first: string | null, last: string | null
    let parts = data.name.split(' ')
    lastName = parts[0]
    firstName = parts[1]
    return { firstName: first, lastName: last }
})

if (parsed.firstName !== firstName || parsed.lastName !== lastName) { 
    // submit changes
}
```

You have probably spotted the bug. Chances are though, especially if you are like me, that after long hours when the coffee level in your blood drops substantially below the required level, it will take long minutes to figure out the cause. There is a very easy remedy though. With `firstName` and `lastName` declared as constant variables the compiler catches the bug for us!