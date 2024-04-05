---
layout: post
title: Branding & Flavoring
date: 2021-01-08T12:12:12.000Z
meaningfullyUpdatedAt: 2021-01-08T12:12:12.000Z
image: /images/branding_and_flavoring.png
author: wojciech
tags:
  - typescript
  - types
  - candies
  - veggies
hidden: false
comments: true
published: true
language: en
---
## Introduction

TypeScript language mainly uses structural typing. In structural typing, an element is considered to be compatible 
with another if, for each feature within the second element's type, a corresponding and identical feature exists in the 
first element's type. Sometimes this behavior may allow us to write erroneous code. 

## Example

Let's imagine a function which calculates candy price based on their weight and price per unit:

```typescript
// Create a type for our candy
type Candy = {
  pricePerUnit: number
  weight: number
}

// Create a function from our example
const calculateCandyPrice = (candy: Candy) => candy.pricePerUnit * candy.weight

// Create a type with similar structure to type Candy
type Veggie = {
  pricePerUnit: number
  weight: number
}

// Declare variables based on our types
declare const candyDrops: Candy
declare const broccolis: Veggie

// Is this function safely typed? 
calculateCandyPrice(candyDrops)                          // OK 
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // OK 
calculateCandyPrice(broccolis)                           // OK 
```

TypeScript compiler does not throw an error, even though we as programmes see that this behavior may not be desired. 
This problem can be solved by nominal typing. Nominal typing means that two variables are type-compatible if and only if 
their declarations name the same type. TypeScript unfortunately does not have such a syntax feature. There are some 
methods which we can use to omit that problem. 

## Branding

Branding concept is a technique in which we add a unique field which will make our type differ from another types. 
What is important we do not need to assign any value there because it only exists for TypeScript compiler. 

```typescript
type Candy = {
  __brand: "Candy"
  pricePerUnit: number
  weight: number
}

type Veggie = {
  __brand: "Veggie"
  pricePerUnit: number
  weight: number
}

const calculateCandyPrice = (candy: Candy) => candy.pricePerUnit * candy.weight

declare const candyDrops: Candy
declare const broccolis: Veggie

calculateCandyPrice(candyDrops)                          // OK 
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // Error
calculateCandyPrice(broccolis)                           // Error
```

We can also create generic type for our branding: 

```typescript
type Brand<T, BrandT> = T & { __brand: BrandT }

// Similar type as before
type Candy = Brand<{ pricePerUnit: number, weight: number }, "Candy">
```

Changing primitive value to branded value requires manual casting:

```typescript
type CandyID = Brand<string, "CandyID">

const candyId = "some-long-id" as CandyID // Brand<string, "CandyID">
```

To make our code cleaner we can use these helpers to change our type to be nominal or reversed: 

```typescript
const toCandyID = (id: string) => id as CandyID
const fromCandyID = (id: CandyID) => id as string

const candyIdTo = toCandyID('some-long-id-1') // Brand<string, "CandyID">
const candyIdFrom = fromCandyID(candyIdTo)    // string
```

Bear in mind that branding has got two cons:

1. Compiler allow us to read `__brand` property

```typescript
const brandProperty = candyDrops.__brand // OK 
```

2. A raw object passed to the function as an argument stopped working

```typescript
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // Error
```

## Flavoring

Flavoring concept is a technique in which we add a unique **optional** field which will make our type differ from another 
types. This difference between *branding* and *flavoring* allow us to pass a raw object as an argument to the function. 
Unfortunately we still can access `__flavor` property.

```typescript
type Candy = {
  __flavor?: "Candy"
  pricePerUnit: number
  weight: number
}

type Veggie = {
  __flavor?: "Veggie"
  pricePerUnit: number
  weight: number
}

const calculateCandyPrice = (candy: Candy) => candy.pricePerUnit * candy.weight

declare const candyDrops: Candy
declare const broccolis: Veggie

calculateCandyPrice(candyDrops)                          // OK 
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // OK
calculateCandyPrice(broccolis)                           // Error
```

We can also create generic type for our flavoring:

```typescript
type Flavor<T, FlavorT> = T & { __flavor?: FlavorT }

// Similar type as before
type Veggie = Flavor<{ pricePerUnit: number, weight: number }, "Veggie">
```

We do not need to cast primitive values manually using this technique.

## Conclusion

To sum up those two techniques - it is commonly used that if we use *branding* and *flavoring* we use *branding* for 
primitive types while *flavoring* for objects. We can use 
[conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) for that:

```typescript
type Nominal<T, NameT> = T extends object ? Flavor<T, NameT> : Brand<T, NameT>
```

Alternatively we can use other more sophisticated techniques to achieve nominal typing or libraries such as:
[newtype-ts](https://github.com/gcanti/newtype-ts) or [io-ts](https://github.com/gcanti/io-ts).
