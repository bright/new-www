---
author: rafal-op
tags:
  - frontend
date: 2024-12-18T10:07:01.990Z
meaningfullyUpdatedAt: 2024-12-18T10:07:02.557Z
slug: javascript-types-deobjectified
title: JavaScript Types De-Objectified
layout: post
image: /images/blogpost_js_types.png
hidden: false
comments: false
published: true
language: en
---
**Some individuals mockingly claim that JavaScript lacks types. While it’s true that we don’t explicitly define types in our code, this doesn’t negate their existence. JavaScript operates as a dynamically typed language, where types are tied to values rather than variables, and are determined at runtime. Within our JavaScript applications, we work with various types of values. This dynamic nature of types often sparks one of the most popular myths in the frontend environment.**

## The Myth of Everything as an Object

While learning JavaScript, I’ve encountered at least once the phrase:

> In JavaScript, everything is an object.

I understand why people might say that, but unfortunately, it’s a misleading statement. In the following section of this article, I will provide a comprehensive explanation of this topic. We’ll delve into mechanisms like **Boxing** and explore why some individuals tend to perceive everything as an object.

## Understanding the Reality: A Closer Look at Primitive and Object Types

JavaScript comprises two distinct types: [primitive types and object types](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types).

### Primitive Types

Among these, there exist seven primitive types: **string**, **number**, **boolean**, **null**, **undefined**, **symbol**, and **bigint**. It’s crucial to note that none of these are object types, contrary to the myth. However operator **typeof** for null value returns **object** because, in JavaScript's early design, [null was assigned the same internal tag as objects (p.13)](https://dl.acm.org/doi/pdf/10.1145/3386327). This behavior originates from the very first implementation of JavaScript (called **Mocha**) and has remained unchanged since then to maintain compatibility with older code.

#### Immutability

Primitive types possess unique characteristics such as **immutability**; once assigned, their values cannot be changed directly, although a new value can be assigned to the variable (using **var** or **let** keyword). 

```
let age = 30; 
age = 32; // we assign a new value to the variable "age", we do not change the previous one
```

We can further understand immutability by considering a string value, for instance, and attempting to alter one of its characters:

```
let name = "John"
name[2] = "e"

console.log(name) // John
```

#### Passed by value

Another characteristic of primitive data types is that they are **passed by value**. What does this mean? Let’s examine the snippet below. 

```
let num = 30;
let secondNum = num; // 30, copy of a value from "num" variable is made

num = 40;

console.log(num) // 40
console.log(secondNum) // 30

secondNum = 50;

console.log(num) // 40
console.log(secondNum) // 50
```

When assign one variable to another, a **copy of the value**. Both variables, even if they appear connected, do not reference each other. The value stored in the “num” variable is copied when assigned to the “secondNum” variable. Consequently, any changes made to “num” or “secondNum” will not affect any other variable.

#### No properties / methods

Moreover, it’s important to note that primitive type values **lack methods (functions) and properties**, which can be puzzling. Attempting to access properties like “length” in the snippet below might seem perplexing. We’ll delve deeper into this concept shortly. However, for now, trust me, this code is absolutely correct:

```
let name = "John"

console.log(name.length) // ???
```

### Object Type

The simplest way to define object types is as “**anything that is not a primitive type**”. Arrays and functions are also considered object types. 

#### Contains properties / methods

Objects are complex structures that contain **properties and methods**, defined as key-value pairs. We can access these properties using e.g. dot notation (object.property), as demonstrated below:

```
const person = {
  name: "Jack",
  sayHi(){
    console.log("Hi!")  
  }
};

// object.property
person.name // "Jack"

// object.method
person.sayHi() // "Hi!"
```

Previously, I mentioned that a **string** is a primitive type, yet I also attempted to use it as an object (by accessing the length property with *name.length*). Rest assured, everything will soon become clear.

#### Mutability

The next characteristic of object values is **mutability**, in contrast to primitive types, which are immutable. This means that we can modify the property values of our objects:

```
const person = {
  age: 30
}

person.age = 31

console.log(person.age) // 31
```

#### Passed by reference

Another crucial aspect of object types is that values assigned to variables as objects are **passed by reference**, not by value (copy) as with primitive data types. This mechanism can be a bit tricky to grasp. When you create a variable that holds an object, you’re actually storing a **reference** to that object, rather than the object itself. Think of this reference as a sticky note containing the coordinates in memory where the object is located. This reference concept doesn’t apply to primitive types.

How does this affect your code? Let’s consider an analogy. Suppose your sister owns a car and lends it to you. Unfortunately, you accidentally scratch it. Now, the car isn’t just yours; it’s also your sister’s, and the scratch affects both of you. You didn’t make a copy of her car. Similarly, when you use a reference to an object and modify it, every variable that references that object will be affected. The object mutates, and all references to it point to the mutated object.

```
const mySistersCar = {
  name: "Honda",
  isBroken: false
}

const myCar = mySistersCar;

myCar.isBroken = true;

console.log(mySistersCar.isBroken) // true, oops
```

## Boxing

Now that we have a basic understanding of **objects** and **primitive types**, let’s revisit the **Boxing** mechanism I mentioned earlier. This mechanism explains why I attempted to access a property of a string, even though primitive types don’t have properties. The snippet is correct:

```
let name = "John"

console.log(name.length)
```

But how does this work? **Boxing** is an **implicit** **mechanism**, meaning it occurs automatically without direct intervention. It’s responsible for encapsulating our primitive value within the corresponding object for that specific type. This operation is temporary, so we cannot directly access the created object; we can only interact with our primitive value.

[When attempting to access properties or methods](https://262.ecma-international.org/10.0/index.html#sec-getv) of a primitive type like a string in JavaScript, the language automatically creates an object wrapper (such as a String object — using [toObject method](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toobject)) to facilitate this access. For instance, when working with strings, JavaScript generates a String object, which grants access to properties like “length” through its prototype (String.prototype.length). It’s important to note that nearly every object in JavaScript, including representations of primitive types like String, is built upon the Object prototype (Object.prototype). This insight partially supports the concept that “everything in JavaScript is an object”, or more accurately, inherits from the Object type.

```
let name = "John"

name.length; // Here new object will be created
```

## Summary

JavaScript’s types are a fundamental aspect of the language and entail complex mechanisms. While this can be confusing for individuals accustomed to statically-typed languages, it’s these intricacies that make JavaScript an incredibly dynamic language. Understanding the distinction between primitive and object types, as well as how they operate under the hood, is crucial for ensuring code predictability and functionality.

- - -

##### Take a look at our earlier blog post debunking frontend myths:

1. [To 'b' or Not to 'b': The Semantic Status of HTML 'b' Tag](/blog/semantic-status-of-html-b-tag/)
2. [Understanding the Hoisting Behavior of let and const](/blog/let-const-hoisting/)