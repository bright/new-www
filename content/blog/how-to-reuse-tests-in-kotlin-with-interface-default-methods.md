---
author: maciej-n
tags:
  - Kotlin
  - QA
date: 2023-05-04T08:19:27.670Z
meaningfullyUpdatedAt: 2023-05-04T08:19:29.371Z
title: How to Reuse Tests in Kotlin with Interface Default Methods
layout: post
image: /images/kotlin_resuse_tests_blog.png
hidden: false
comments: true
published: true
---
**Writing test code can be tedious and time-consuming, especially when we need to test multiple implementations of the same interface. Fortunately, Kotlin provides a powerful feature called "interface default methods" that can help us to reuse our test code for multiple implementations.**

<InstagramEmbed url='https://www.instagram.com/p/CanUPIjAH3z/?igshid=YmMyMTA2M2Y=' />

## Let’s imagine, that we have an implementation we want to test

```kotlin
interface StringCalculator {

    fun lengthOf(string: String): Int

    fun upperCaseOf(string: String): String
}

class SlowStringCalculator : StringCalculator {

    override fun lengthOf(string: String): Int {
        sleep(100)
        return string.length
    }

    override fun upperCaseOf(string: String): String {
        sleep(100)
        return string.toUpperCase()
    }
}
```

## We added test interfaces with default methods to test our implementation

```kotlin
interface FirstExamplesUsingString : HasTestCalculator {

    @Test
    fun `string length is correct`() {
        assertEquals(stringCalculator.lengthOf("ab"), 2)
    }
}

interface SecondExamplesUsingString : HasTestCalculator {

    @Test
    fun `string uppercase is correct`() {
        assertEquals(stringCalculator.upperCaseOf("abc"), "ABC")
    }
}
```

## Now we can compose a class from our interfaces and their default methods

```kotlin
class SlowStringCalculatorTests : SecondExamplesUsingString, FirstExamplesUsingString {
    override val stringCalculator = SlowStringCalculator()
}
```

✅  string uppercase is correct()


✅  string length is correct()

## But after some time we added a new(faster) implementation of our StringCalculator

```kotlin
class FastStringCalculator : StringCalculator {

    override fun lengthOf(string: String): Int {
        return string.length
    }

    override fun upperCaseOf(string: String): String {
        return string.toUpperCase()
    }
}
```

## And now we can reuse our test to apply them to our new implementation (and add more)

```kotlin
class FastStringCalculatorTests : SecondExamplesUsingString, FirstExamplesUsingString {
    override val stringCalculator = FastStringCalculator()

    @Test
    fun `another test for fast calculator`() {
        val startTime = currentTimeMillis()
        stringCalculator.upperCaseOf("abc")
        val endTime = currentTimeMillis()
        assertTrue(endTime - startTime < 100)
    }
}
```

✅  another test for fast calculator()


✅  string uppercase is correct()


✅  string length is correct()

**Check out the [repository](https://github.com/bright/dev-tips/blob/main/kotlin/ReuseTestsWithInterfaceDefaultMethods.kt). Have you enjoyed this bright dev tip? More to come!**