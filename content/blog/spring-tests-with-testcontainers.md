---
author: maciej-n
secondAuthor: adam-w
date: 2024-03-05T13:42:10.428Z
meaningfullyUpdatedAt: 2024-03-05T13:42:10.443Z
title: Spring tests with TestContainers
layout: post
image: /images/frame-45.png
hidden: false
comments: true
published: true
language: en
---
# Introduction

In the world of software development, making sure our apps are up to scratch before they go live is crucial. But here's the catch: testing them in a way that mirrors what happens in the production may not be so straightforward. That's where TestContainers come into the picture. It’s a handy library that lets us bring in real databases, web browsers, and more, all within Docker containers managed through code, to make our tests as close to a real-life environment as possible.

### From simulation to a real environment

Back in the day, we'd often rely on simulated services or in-memory databases for testing, which was okay but could be better. They just couldn't fully mimic the complexities of real-life scenarios. This mismatch could lead to apps breaking down in the real world even though they passed all tests with flying colors. We couldn't test persistence to ensure, that our data meets all DB constraints. TestContainers help us dodge this bullet by letting us test with the actual tools and services our app will interact with, but in a safe, controlled environment.

### Enhanced testing

In this article, we’re diving into how to integrate TestContainers into Spring integration tests, a powerful framework widely used in Java/Kotlin applications for enterprise-level development. Spring’s inherent complexity, combined with the need for consistent and reliable testing, makes the integration of TestContainers particularly beneficial.

We are also going to use the testFixtures plugin to create reusable Spring annotation, which will be used to set up Postgres TestContainer for our domain module’s tests.

## What is TestContainers?

TestContainers is an open-source set of libraries that supports JUnit tests, providing lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container. It simplifies the process of creating unit and integration tests by providing a programmable environment that is both controlled and isolated. This is particularly useful for testing database interactions, message queues, web applications, and other services that are typically complex to set up and manage for testing purposes.

You can read more about TestContainers in the [official documentation](https://testcontainers.com).


## What is TestFixtures?

testFixtures in the context of software development is a concept related to testing, particularly automated testing. Test fixtures are a set of preconditions or inputs that are used to consistently test a piece of software.


The testFixtures Gradle plugin is a feature in Gradle, a popular build automation tool, designed to facilitate the sharing of code and resources between the main source set and the test source set in a project. This plugin is particularly useful in Java and other JVM-based projects.

# Example

As the example, we reused the code prepared by us for the article [How to integrate a Spring Boot app with Grafana using OpenTelemetry standards](https://grafana.com/blog/2023/10/30/how-to-integrate-a-spring-boot-app-with-grafana-using-opentelemetry-standards).



## Project structure

We have modified the project structure as presented below:

```
spring-observability-bootstrap
├── appointment
│   ├── main
│   └── test
├── database
│   ├── main
│   ├── test
│   └── testFixtures
└── src
├── main
└── test
```

We extracted :database module, so the database configuration is separated from the business logic. From now on, if we want to use the database in a new module, we can just add a dependency to the :database module:

``` kotlin
implementation(project(":database"))
```

All dependencies required to configure the Postgres database were moved to the `:database` module.



We also created a new `:appointment` module, containing business logic responsible for the appointments management feature. This is the module, which we are going to add our integration tests into.

## Problem

Most Spring + TestContainers tutorials show you how to integrate TestContainers with JUnit, but in most cases, you also have a framework, that runs your tests, like Spring in our case. In case of Spring, these tutorials instruct you to create an abstract test class and extend all your Database test classes with this abstract class to run test containers, which is not the best practice as the “Composition over inheritance” rule says.

What most of these tutorials are showing you is the way to:

1. Start Spring context
2. Start TestContainer
3. Inject TestContainer configuration into Spring context.

This may be problematic for a couple of reasons:

* Spring may require running services before starting the Spring Context
    * Some Spring Beans, like liquibase or flyway, need Datasource before being instantiated, so we would like to have the database running before the Spring context starts.
* Reusable containers
    * Starting a new docker container takes time. If you create a container field in your test classes and annotate it with @Container, as integration with JUnit suggests, then you are starting a new container for each test class
* Non-compliance with the “Composition over inheritance”
    * Some tutorials suggest sharing container object between classes by the use of base abstract class. But what if we want to start 2 different test containers for one test class? For example Postgres as Database and Redis as cache? Do we need to create another abstract class extending from `PostgresTestContainerTest` called `PostgresAndRedisTestContainerTest`? And if we need only Redis, we create a third one only for Redis? It’s not a good approach.
* Reusable Spring Context
    * Even if you optimize your tests to share containers by base classes, this does not mean, that these tests will share Spring Context. Starting a new Spring Context is also time-consuming for bigger projects. It may be also a good approach to configure your tests(or at least groups of tests) to share Spring Context.

## Solution

Lucly, we came up with the solution, that may solve all of these problems!

What we can do instead is pre-configure Spring Context to set up TestContainers during the Spring Context initialization phase. We are going to use the `@ContextConfiguration` annotation. It requires passing initializer extending `ApplicationContextInitializer`. Our `PostgresTestContainersInitializer` looks like this:



```kotlin
class PostgresTestContainersInitializer :
    ApplicationContextInitializer<ConfigurableApplicationContext> {
    override fun initialize(applicationContext: ConfigurableApplicationContext) {
        val postgresSqlContainer = PostgresSQLContainer<Nothing>("postgres:15.4")

        postgresSqlContainer.start()

        // should shut down container on context close
        applicationContext.beanFactory.registerSingleton("postgresSqlContainer", postgresSqlContainer)

        TestPropertyValues.of(
            mapOf(
                "spring.datasource.url" to postgresSqlContainer.jdbcUrl,
                "spring.datasource.username" to postgresSqlContainer.username,
                "spring.datasource.password" to postgresSqlContainer.password,
            )
        ).applyTo(applicationContext)
    }
}
```


The overridden `initialize()` method does 3 things:

* Create PostgresSQL Container:
    * A `PostgresSQLContainer` object named `postgresSqlContainer` is created using the image `postgres:15.4`. This step initializes a `PostgresSQL` container using the specified Docker image.
* The `start()` method is called on the postgresSqlContainer object to start the container.
* Register Container in `ApplicationContext`:
    * The `PostgresSQL` container is registered as a singleton bean in the Spring application context. This allows the container to be managed and accessed within the Spring application.
* Should shut down container on context close
* Set Database Properties:
    * `TestPropertyValues` is used to set various properties related to the database. These properties include the database URL (`jdbcUrl`), `username`, and `password`. These values are retrieved from the postgresSqlContainer object.
* The `applyTo()` method applies these properties to the applicationContext. This ensures that the Spring application can connect to the PostgreSQL database running in the Docker container using these properties.

Then we can annotate our Spring Test classes with annotation:
`@ContextConfiguration(initializers = [PostgresTestContainersInitializer::class])`


If we want to keep it pretty, we can create our custom annotation over `@ContextConfiguration`:

```kotlin
@ContextConfiguration(initializers = [PostgresTestContainersInitializer::class])
annotation class PostgresTestContainer
```

And use it like this:
```kotlin
@SpringBootTest
@PostgresTestContainer
internal class AppointmentServiceTest {
...
}
```


That’s it!

Now you only need this one `PostgresTestContainer` annotation, to run Postgres TestContainer for your Spring Test.



You can access the full code in our [example repository](https://gitlab.com/bright.dev/spring-observability-bootstrap).