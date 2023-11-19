---
author: damian
tags:
  - spring
  - spring boot
  - java
  - jvm
  - kotlin
date: 2022-11-14T19:09:37.192Z
meaningfullyUpdatedAt: 2022-11-14T19:09:37.210Z
title: Managing Spring Boot Properties After Version 2.4
layout: post
image: /images/cover_managing_spring.png
hidden: false
comments: true
published: true
language: en
---
**Managing Spring Boot properties in multi-module application could be quite intimidating.
In this post, we take a look how Spring Boot will resolve properties conflicts and how to make our build more consistent. Changes
introduced in version 2.4 are going to help us. Let's review how to take advantage of new features and incorporate them into
the project.**

To better understand what version 2.4 brings we need to take a step back and remind ourselves how things used to work before 2.4 release.

## How Spring Boot deals with property overrides?

Let's take this basic example. We could try to define the same value twice in a single file. Like this:

```yaml
main:
  value: option-A
  value: option-B
```

But this will fail, and the application will crash at the boot. You can't override properties in the same file. But it's more than
fine to just create another property file (with a different format):

```yaml
# application.yaml

main:
  value: option-A
```

```properties
# application.properties

main.value=option-B
```

In this case, the system will pick up `option-B` since values from `.properties` files have higher priority over values from 
`.yaml` files. The full hierarchy of values looks like this: (starting from lowest to highest priorities)

1. Default value defined in code

```kotlin
@ConfigurationProperties(prefix = "main")
class MyConfigurationProperties {
    var value: String = "CODE_DEFAULT"
}
```

2. Property defined at default `.yaml` file
3. Property defined at default `.properties` file
4. Property defined at profile-specific `.yaml` file
5. Property defined at profile-specific `.properties` file
6. Environment variable
7. JVM option

## Properties in multi-module system

With that out of the way let's step up a notch and see how we could manage properties in a multi-module application.
To work on something real, let's assume our app contains 3 modules: main one, `moduleA` and `moduleB`.
The tree structure of that project would look like this:

```
├── src
│   ├── main
│   │   ├── resources
│   │   │   ├── application.yaml
├── moduleA
│   ├── src
│   │   ├── main
│   │   │   ├── resources
│   │   │   │   ├── application.yaml
├── moduleB
│   ├── src
│   │   ├── main
│   │   │   ├── resources
│   │   │   │   ├── application.yaml
```

Now if we define the same property in all three files which version is going to be picked up? Well... we could predict that is going to be the one 
from the main module and that would be correct. What if we remove the main `application.yaml` file? Then Spring Boot will pick up the value from one of the two
remaining files. Which one? It's non-deterministic. Let's avoid situations like this altogether. Any ambiguity is 
a potential risk hazard. And this is one is especially harmful since we might find out about our mistake when the app goes into production.

<div className="important-info">Contrary to what some people might assume, Spring Boot will not merge all tree config files from all the modules into a single file.
Only one version of the file will be used and the rest would be thrown away.</div>

One easy way out would be to define all properties in a single `application.yaml`. Not even creating dedicated yaml files per module. But we have those modules 
for a reason, most likely our intention was to keep all the logic encapsulated. So why we should spread module-specific properties outside?
It makes no sense. 

Before Spring Boot 2.4, we could have handled this problem by using `spring.profiles.include`. However, after 2.4 release this feature is no longer present.
Reasons for the deprecation are described in detail in the [blog post](https://spring.io/blog/2020/08/14/config-file-processing-in-spring-boot-2-4).
The short version is - this feature yield non-deterministic results. With that option out of the way, what's the alternative?

> When one door closes, another opens.

## What could be done after Spring Boot 2.4

Spring Boot 2.4 introduced `spring.config.import` which is much more predictable. The idea of that property is simple: we just point to the other sources that 
we would like to use in the final config file. Let's see how we could use this new feature in the multi-module application.

```yaml
# src/main/resources/application.yaml

spring:
  config:
    import:
      - moduleA.yaml
      - moduleB.yaml
```

In the main `application.yaml` file we are loading additional configs files specific to the modules present in the app. Let's create those files. With those changes our source
tree should look like this:

```
├── src
│   ├── main
│   │   ├── resources
│   │   │   ├── application.yaml
├── moduleA
│   ├── src
│   │   ├── main
│   │   │   ├── resources
│   │   │   │   ├── moduleA.yaml
├── moduleB
│   ├── src
│   │   ├── main
│   │   │   ├── resources
│   │   │   │   ├── moduleB.yaml
```

In the module dedicated files: `moduleA.yaml` and `moduleB.yaml` we can now place configuration specific to the module and that module alone.

```yaml
# moduleA/src/main/resources/moduleA.yaml

module-a:
  value: some value
```

Even if we are using `moduleA.yaml` file only for the module-specific/ custom properties it's still possible to override global properties inside that file. For instance, if we 
set app port `server.port=3000` inside `moduleA.yaml` that value might override the property from the main `application.yaml`. That could be confusing and breaks the original 
intention of profile-specific configuration. To make things neat and tidy let's prefix all properties with a custom namespace unique only to that module. For
instance, all properties inside `moduleA` have to start with `module-a`.

*To sum it up:*
Keep all the generic configurations inside the main `application.yaml` and only module-specific properties inside the module-specific files, only under module unique namespace.

### How does it work with custom profiles?

They still work as expected! Meaning, if we create `moduleA-prod.yaml` file alongside `moduleA.yaml` values from that file are going to be used to override properties from 
the base file. Neat! No additional changes are required to make it work!

### How does it work with integration tests?

If the test configuration is simple enough it's fine to just place it inside module-specific `application-test.yaml`, for instance:

```yaml
# moduleA/src/test/resources/application-test.yaml

module-a:
  value: some test value
module-b:
  value: test value for the other module
```

If the configuration is more extensive and it doesn't feel right to have it copy-pasted all over every test configuration file, plus the
configuration doesn't have to change from module to module, we can apply the same trick as before. By importing shared `moduleB` configuration file inside `application-test.yaml`:

```yaml
# moduleA/src/test/resources/application-test.yaml

spring:
  config:
    import:
      - moduleB.yaml

module-a:
  value: some test value
```

```yaml
# moduleB/src/main/resources/moduleB-test.yaml

module-b:
  value: shared testing property
```

Please notice that `moduleB-test.yaml` is inside `main` not `test` directory!

<div className="block-button"><h2>We are looking for backend developers (TS, Node.js)</h2><div>Join our team and work on projects such as the blockchain platform for humanitarian assistance, accounting software, or web therapy applications.</div><a href="/jobs/senior-backend-developer-typescript"><button>Apply and join our team</button></a></div>
