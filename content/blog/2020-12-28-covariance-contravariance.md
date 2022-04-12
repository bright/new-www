---
author: wojciech
tags:
  - typescript
  - types
  - sets
  - math
  - vehicles
date: 2020-12-28T12:12:12.000Z
title: Covariance & Contravariance
layout: post
image: /images/blog_post_covariance.png
hidden: false
comments: true
published: true
---
## Introduction

Covariance and contravariance - two buzzwords from a programming language's world, what do they mean? Let's find out in three steps!

## Step 1 - Sets

This topic is not so straightforward so let's start with an intuitive example from life with a little of mathematical knowledge. Think about a vehicle and a motorbike. Vehicle is a superset for a motorbike and motorbike is a subset for a vehicle.

<p align="center">
  <img src="/images/covariance-contravariance/graph-1.png" alt="First-graph"/>
</p>

You can see clearly that motorbike set being a subset of vehicle set means that this set is smaller than vehicle superset, but it also is more specific - You can say that motorbike is a vehicle but not every vehicle is a motorbike + You cannot specify vehicle type inside a vehicle set, but you can do that in a motorbike set. Here is a little of TypeScript code to make it clearer:

```typescript
interface Vehicle {
    brand: string;
    start: () => void;
}
interface Motorbike extends Vehicle {
    // Motorbike has all the properties from Vehicle and some more
    numberOfWheels: number;
}

const vehicle: Vehicle = { ... }
const motorbike: Motorbike = { ... }

// validate assignment to different types
const expectVehicle: Vehicle = motorbike      // OK
const expectMotorbike: Motorbike = vehicle  // Error
```

## Step 2 - HOT concept

Before we jump into covariance and contravariance let's introduce one more concept - **HOT** which stays for higher order type. HOT is an abstract that takes type as an argument and returns another type. **Generics types are HOT.**

```typescript
const simpleVehicle: Vehicle = { ... }
const simpleMotorbike: Motorbike = { ... }

// example of HOT
interface ExampleHOT<T> {
    additionalProperty: string
    element: T;
    fn: (elem: T) => string
}

const complexVehicle: ExampleHOT<Vehicle> = { ... }
const complexMotorbike: ExampleHOT<Motorbike> = { ... }
```

We use HOT as a kind of function that creates complex types based on simple types provided as a parameter (also known as component). Covariant and contravariant are characteristics describing specific HOTs:

* Covariance - is a characteristic of HOT, which says that relation between subtypes of given type is similar to the relation between subtypes of component.
* Contravariance - is a characteristic of HOT, which says that relation between subtypes of given type is inverted to the relation between subtypes of component.

<p align="center">
  <img src="/images/covariance-contravariance/graph-2.png" alt="Second-graph"/>
</p>

In TypeScript:

* Type which function takes as parameter is contravariant
* Type which function returns is covariant

## Step 3 - Complex Example

To better understand those terms let me create more complex graph and TypeScript code as a description

<p align="center">
  <img src="/images/covariance-contravariance/graph-3.png" alt="Third-graph"/>
</p>

```typescript
type Vehicle = {
    brand: string
}

type Car = {
    brand: string
    fuelSource: string
}

type SUV = {
    brand: string
    fuelSource: string
    weight: number
}

type Covariant<T> = () => T
let covariantVehicle: Covariant<Vehicle> = { ... }
let covariantCar: Covariant<Car> = { ... }
let covariantSUV: Covariant<SUV> = { ... }
covariantCar = covariantVehicle  // Error 
covariantCar = covariantSUV      // OK

type Contravariant<T> = (x: T) => void
let contravariantVehicle: Contravariant<Vehicle> = { ... }
let contravariantCar: Contravariant<Car> = { ... }
let contravariantSUV: Contravariant<SUV> = { ... }
contravariantCar = contravariantVehicle  // OK 
contravariantCar = contravariantSUV      // Error
```

## Conclusion

The goal of this text is to introduce and explain mechanics that rule in the world of static typing. This knowledge could be very helpful in organizing functions, data structures, and their interfaces that make static typing possible. This subject lies at the root of languages with types, so it is essential to understand them completely.