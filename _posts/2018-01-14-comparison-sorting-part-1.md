---
layout: post
title: Comparison sorting part 1
tags: [sorting, algorithm, bubble, insertion, selection, gnome, cocktail]
comments: true
author: grzesiek
hidden: true
excerpt: Sorting data is one of the most important tasks that computers have been doing since they were invented. Over those years developers have found many ways of doing it. 
---

Sorting data is one of the most important tasks that computers have been doing since they were invented. Over those years developers have found many ways of doing it. Some of these ways are quite fast, others involve  interesting methods and finally there are some which are practically useless, but still it is better to know more than to know less, so it’s better to learn them  in free time.

For this series of blog posts I will divide sorting algorithms by their complexity:

**Group 1:** which average case complexity is n^2, like bubble, insertion sort

**Group 2:** which average case complexity is nlog(n), but worst is n^2, like quick, library sort

**Group 3:** which worst-case complexity is nlog(n), like merge, heap sorts

Today I will show you a few examples from the first group. They are used mostly by beginners because they are the simplest ones. Unfortunately, there is a cost of their simplicity - long working time. N^2 complexity doesn’t sound bad when we talk about small data chunks like 100 elements - it’s just 10,000 operations. But when our program has to sort 1 million elements it takes 1 trillion of operations to do. Let’s move to real coding now. I’m going to use Kotlin, but it’s easy to translate every algorithm into other languages.


### 1) Bubble

A very simple algorithm, usually the first one that young programmer learns. Its idea is to compare each element with the next one and move bigger one to the right, which at the end of one loop finds the biggest element of an array. Then do it again and again excluding the elements that had been already found in the previous loops.

```kotlin
fun bubbleSort(array: IntArray) {
   var index = array.size-1
   var temp: Int
   for(i in 0..index) {
       for(j in 1..index) {
           if(array[j-1] > array[j]) {
               temp = array[j-1]
               array[j-1] = array[j]
               array[j] = temp
           }
       }
       index--
   }
}
```


### 2) Insertion

Another basic algorithm. What it does is taking all elements one by one and putting them in the right place by comparing each  to every previously checked element.

```kotlin
fun insertionSort(array: IntArray) {
   val index = array.size-1
   var temp: Int
   var j: Int
   for(i in 1..index) {
       temp = array[i]
       j = i - 1
       while(j >= 0 && array[j] > temp) {
           array[j+1] = array[j]
           j--
       }
       array[j+1] = temp
   }
}
```


### 3) Selection

As its name suggests it selects the smallest element of the collection and puts it in the beginning. It repeats without previously found elements until our collection is sorted.

```kotlin
fun selectionSort(array: IntArray) {
   val number = array.size-1
   var minimum: Int
   var index: Int
   var temp: Int
   for(i in 0..number) {
       minimum = array[i]
       index = i
       for(j in i+1..number) {
           if(array[j] < minimum) {
               minimum = array[j]
               index = j
           }
       }
       if(i != index) {
           temp = array[i]
           array[i] = array[index]
           array[index] = temp
       }
   }
}
```


### 4) Gnome

It’s like combining insertion with bubble sort. We check every element in a single loop and swap it with the previous one as long as it’s not in the right place.

```kotlin
fun gnomeSort(array: IntArray) {
   val index = array.size-1
   var pos = 0
   var temp: Int
   while(pos < index) {
       if(pos == 0 || array[pos] >= array[pos-1]){
           pos++
       } else {
           temp = array[pos]
           array[pos] = array[pos - 1]
           array[pos - 1] = temp
           pos--
       }
   }
}
```


### 5) Cocktail

It’s also called bidirectional bubble sort - going forward it compares elements looking for the the biggest one and going backward it seeks the smallest one.

```kotlin
fun cocktailSort(array: IntArray) {
   var index = array.size-1
   var temp: Int
   for(i in 0..index) {
       for(j in 1..index) {
           if(array[j-1] > array[j]) {
               temp = array[j-1]
               array[j-1] = array[j]
               array[j] = temp
           }
       }
       for(g in index downTo 1) {
           if(array[g-1] > array[g]) {
               temp = array[g-1]
               array[g-1] = array[g]
               array[g] = temp
           }
       }
       index--
   }
}
```


So, now when we’re done with the code, let’s look at the results.

**Sample #1:** 100 arrays of 1000 integer numbers:

```
Avg of bubble sort: 3.388
Avg of insertion sort: 0.407
Avg of selection sort: 0.4
Avg of gnome sort: 2.07
Avg of cocktail sort: 5.729
```

**Sample #2:** 100 arrays of 10000 integer numbers:

```
Avg of bubble sort: 393.34
Avg of insertion sort: 38.57
Avg of selection sort: 38.77
Avg of gnome sort: 316.04
Avg of cocktail sort: 643.56
```

Increasing the amount of data 10 times has caused these time multiplications: 

```
Bubble: ~116 times longer
Insertion: ~95 times longer
Selection: ~97 times longer
Gnome: ~115 times longer
Cocktail: ~112 times longer
```


As we can see for all algorithms increasing the amount of data 10 times has caused time to increase around 100 times, which confirms that their complexity is n^2. Insertion and selection sorts are a little bit better, but it’s still n^2, so we should use it as a last resort.


That’s all for this part. Soon I will prepare the comparison of algorithms from group 2.


**PS.** This post has assured me of one thing - Internet lies. Most sources say that comb sort average- and worst-case complexity is n^2, but my tests prove different. After a long research I have even found a book which says  about nlog(n) complexity. You could read more about that soon. 