---
layout: post
title: Understanding Covariants, Contravariants, and Invariants on JVM Generics Example (Part I - Java)
author: michalk
hidden: true
image: /images/understanding-covariants-contravariants-and-invariants-on-jvm-generic-example-part-i-java/pexels-monstera-6238297.jpg
tags: [blog, programming, java, jvm]
---

Thinking about generics types in programming languages, I have mixed feelings. On the one hand, we as devs love to simplify business problems to code instructions and try to find similarities to avoid duplication. On the other hand, we would like to keep the code simple and understandable by everyone in the team, especially thinking about newcomers to quickly onboard them and get them up to speed to bring value to the customer.
Generics are one of those things that can be really powerful and allow to build of reusable code which can be used broadly across the whole project or even exported to a dedicated repo and become a library. Imagine a situation when there is no option to use well-known generic collections like `List<T>` or `Map<K,V>` and for each type we want to store in such a container, we need to build it on our own from scratch.
However, working on entirely generic code can drive someone crazy. It also might require a lot of focus and it's definitely not the code one could read just like a novel.

> *"With great power comes great responsibility."* [Someone, somewhere]

When working with types we might hear words like "covariant", "contravariant" or "invariant". At the very beginning, it sounds really mathematical and looks like taken directly from the university. That's why we will leave aside the formal definition and go straight to examples.


## Covariance

Let's consider two classes written in Java

```
class Animal {
}

class Dog extends Animal {
}
```
And the list of Animals with instances of both dog and animal added

```
List<Animal> animals = new ArrayList<>();
animals.add(new Dog());
animals.add(new Animal());
```

We're able to add both Animal type and Dog subtype to our list of Animals. However, we're not able to declare a list of animals and assign a list of dogs to it.

```
List<Dog> dogs = new ArrayList<>();
List<Animal> animals = dogs; // compilation error
```

Also, we are not able to pass a list of dogs to a function that takes `List<Animal>` as an argument.
```
public void processAnimals(List<Animal> animals) {
}
List<Dog> dogs = new ArrayList<>();
processAnimals(dogs); // compilation error
```

By definition, we can call a certain generic type `K<T>` covariant if two conditions are satisfied:

- A is a subtype of B
- `K<A>` is a subtype of `K<B>`

Looking back at our dogs and animals we can say that 1) is true but 2) is false. This might mean that List in Java is not covariant.


Fortunately, there is a way to achieve covariant with Java lists. We can use a `? extends T` wildcard which means that it will accept any subtype of `T`.

```
List<Dog> dogs = new ArrayList<>();
List<? extends Animal> animals = dogs;
```
The same goes for generic functions with a type that extends the subtype.

```
public void processAnimals(List<? extends Animal> animals) {

}

List<Dog> dogs = new ArrayList<>();
processAnimals(dogs);
```

Both snippets are completely correct from a compilation perspective. 


## Contravariance

What if we would like to pass supertype of `T` to some collection or method? Let's go back to our Animals and Dogs example.

```
List<Animal> animals = new ArrayList<>();
List<Dog> dogs = animals; // compilation error
```

The following code won't compile, as we cannot pass animals a list of less specific types  dogs which are more specific. The same goes for method arguments:

```
public void processDogs(List<Dog> dogs) {

}
List<Animal> animals = new ArrayList<>();
processDogs(animals); // compilation error
```

This is exactly what we would call contravariance which according to definition needs to satisfy two conditions (for generic type `K<T>`):
A is a subtype of B (the same as in covariance)
`K<B>` is a subtype of `K<A>` (opposite to covariance)


Similarly to covariance, Java is giving us its hand by providing a wildcard to achieve contravariance: `? super T`. It is called Lower Bounded Wildcard. This way we can achieve the generic type that would accept the supertype of `T`.

```
List<Animal> animals = new ArrayList<>();
List<? super Dog> dogs = animals;
```

The same goes for method:

```
public void processDogs(List<? super Dog> dogs) {

}
List<Animal> animals = new ArrayList<>();
processDogs(animals);
```

## Invariance

The third situation which might happen is the case in which for our generic type `K<T>` there is no subtyping relation either way. Again, by definition, there are two conditions that need to be satisfied:
- A is a subtype of B (the same as in covariance and contravariance)
- `K<A>` is not a subtype of `K<B>` and `K<B>` is not a subtype of `K<A>`

That's exactly what happens when we won't do any of the wildcards listed. Going back to the example from the very beginning:

```
List<Dog> dogs = new ArrayList<>();
List<Animal> animals = dogs; // compilation error
```

We will get a compilation error which means that the first part of condition 2) will be satisfied. Let's try the other one:

```
List<Animal> animals = new ArrayList<>(); 
List<Dog> dogs = animals; // compilation error
```

Voila, also a compilation error! This means that the following generic type is invariant.

## Summary
Covariance, Contravariance, and Invariance might sound scary at first glance, however, they can be easily explained by looking at generics in Java. It is worth mentioning that the presented behavior is related to type erasure in Java Generics which in short means that our types only live in compilation time and are wiped out in runtime. This design decision has many other (sometimes unwanted) consequences which deserve a dedicated article.
In the next part, we will look at how Java's younger, modern brother Kotlin is dealing with those three aspects on the JVM Platform.

![Use generics wisely](/images/understanding-covariants-contravariants-and-invariants-on-jvm-generic-example-part-i-java/use-generics-wisely.jpeg)
