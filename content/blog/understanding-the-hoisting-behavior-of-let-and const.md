---
author: rafal-op
tags:
  - frontend
date: 2024-11-26T10:52:00.028Z
meaningfullyUpdatedAt: 2024-11-26T10:52:00.693Z
slug: let-const-hoisting
title: Understanding the Hoisting Behavior of let and const
layout: post
image: /images/blogpost_let_const_hoisting.png
hidden: false
comments: false
published: true
language: en
---
**[Following our discussion on Frontend gotchas](/blog/semantic-status-of-html-b-tag/) let’s delve into JavaScript's intricate behavior: hoisting. I’ll be shedding light on a prevalent myth surrounding this mechanism, particularly associated with the “let” and “const” keywords.**

<div className="image">![Understanding the Hoisting Behavior of let and const blogpost banner](/images/blogpost_let_const_hoisting.png "")</div>

## **The myth: let and const are not hoisted**

> **Hoisting** is a mechanism that relocates **variables declarations** (those declared using the “**var**” keyword) and **function declarations** to the top of their respective scope within the code. 

The traditional definition of **hoisting** often focuses on variables declared with the **var** keyword and **[functions declarations](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#prod-HoistableDeclaration)**, leaving out the behavior of variables/constants declared using **let** and **const** (alongside various other JavaScript features like **classes**, although we’ll concentrate on variables/constants for clarity). This omission can lead to a misconception about hoisting. While it’s true that the hoisting mechanism isn’t experienced in the same way with **let** and **const** it doesn’t imply that it doesn’t exist for them. There’s a *grain of truth* behind this myth, highlighting a nuanced aspect of hoisting for these declarations. 

### Is hoisting even real?

It's important to emphasize that this **relocation** isn't a literal process. Instead, it acts as a mental model that helps us grasp how the **JavaScript engine** operates **before code execution**, particularly regarding variable and function declarations and their **memory allocation**. An intriguing aspect of hoisting is that it allows you to call a function before its definition appears in the code, as the entire function declaration, including its body, is lifted to the top of its scope.

## The truth behind hosting of let and const

Within JavaScript, in tandem with variable hoisting, an auxiliary mechanism comes into play when a variable is declared using **var**. This mechanism, according to [ECMAScript docs](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-variable-statement), in adherence to hoisting principles, **initializes** the variable with an **undefined** value:

> A var statement declares variables that are scoped to the running execution context's VariableEnvironment. Var variables are created when their containing Environment Record is instantiated and are initialized to undefined when created

Consequently, this initialization permits the utilization of the variable without triggering any errors.

```
console.log(a) // here we can access "a" variable

var a = "abc";

// Console: undefined
```

### Declaration and initialization

Before we unravel the truth behind a common myth, let’s lay down definitions for two crucial operations: “**declaration**” and “**initialization**.”

The **declaration** process marks the creation of variables/constants using keywords like **var**, **let**, or **const**, establishing their presence within a given scope.

```
var a; // declaration of variable "a"
let b; // declaration of variable "b"
const c; // this is not allowed - const has to be initialized with the value
```

The **initialization** is the phase where a value is assigned to a declared variable or constant.

```
var a; // declaration of variable "a"
a = 1 // initialization of "a" with the value 1

let b; // declaration of variable "b"
b = 2; // initialization of "b" with the value 2

const c = 3; // declaration of constant "c" with initialization with the value 3
```

It’s important to note that while this section provides a foundational understanding of **declaration** and **initialization**, the intricate mechanisms behind these processes fall outside the scope of this article.

## Hoisting for let and const

In the preceding section, we highlighted that variables defined with the **var** keyword are **hoisted** and **initialized** with an **undefined** value. But what about their counterparts, **let** and **const**?

Variables and constants declared using **let** and **const** are indeed hoisted as well. This might seem surprising, so let’s clarify this with an example to address any potential confusion.

Consider the scenario where an attempt is made to access not defined variable:

```
console.log(a)

// Console: ERROR: ReferenceError: a is not defined
```

As you’ve noticed, the error encountered is a **ReferenceError** stating “**a is not defined**”. 

In the case of **var** declaration (*var a*), this error wouldn't persist (resulting in **undefined** output in the console). How would a similar scenario unfold with declarations using **let** and **const** keywords?

```
console.log(a)

let a = "abc"

// Console: ???

console.log(b)

const b = "abc"

// Console: ???
```

As mentioned earlier, both **let** and **const** declarations are **hoisted** in JavaScript. However, attempting to access variables declared with these keywords before their initialization results in a **ReferenceError** (the same type as in the example above). The error message, “**Cannot access 'a' before initialization”** (or **“Cannot access ‘b’ before initialization”** for **const**), distinguishes this scenario from trying to access an entirely non-existent (**not defined**) variable.

Given your understanding of the distinction between **declaration** and **initialization**, **hoisting** primarily involves shifting the **declaration** to the top of the **variable’s scope**. However, the error message often refers to “**initialization**”. To expand on the concept, it’s essential to note that both **var** and **let** variables are **implicitly initialized** with the **undefined** value, albeit unintentionally. Nevertheless, when attempting to access a **let** variable before its definition, this initialization mechanism doesn't occur, [ECMAScript docs](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) describes it as:

> let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment. The variables are created when their containing Environment Record is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated

 As highlighted earlier in the article, only **var** variables are initialized with the undefined value after the **hoisting** phase.

### Temporal Dead Zone

The absence of the behavior involving **undefined** initialization during hoisting for **let** and **const** declarations leads to errors when attempting to hoist them. While hoisting moves the declarations of variables/constants to the top of their scope, accessing uninitialized variables/constants declared with **let** and **const** isn't possible.

This behavior introduces what we refer to as the “**Temporal Dead Zone**”. It encapsulates the code block from the beginning of the scope (where the block defines the scope for **let** and **const**) until the point where the variable/constant is initialized. Entering this **Temporal Dead Zone** triggers the error we encountered earlier: “**Cannot access 'a' before initialization**".

## Summary

The discussion on **hoisting** often revolves around **var** variables, often overlooking the nuanced behavior of **let** and **const**. Unlike **var** variables, which are **hoisted** and **initialized** with **undefined**, **let** and **const** variables/constants undergo **hoisting without initialization**. This leads to the **Temporal Dead Zone**, a crucial concept that underlies the myth that **let** and **const** are not hoisted.

Claiming that **let** and **const** are not hoisted is a simplification  -  it’s a mental shortcut. In reality, we cannot use these variables/constants before their **declarations** not because they are not hoisted, but because they **lack initialization**. This is evident in the **ReferenceError** message: “**Cannot access ‘a’ before initialization**”. The **Temporal Dead Zone** is the key to understanding this behavior.

- - -

##### Take a look at our earlier blog post debunking frontend myths:

1. [To 'b' or Not to 'b': The Semantic Status of HTML 'b' Tag](/blog/semantic-status-of-html-b-tag/)