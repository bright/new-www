---
author: azabost
tags:
  - android
  - kotlin
  - gradle
date: 2025-04-08T10:33:40.018Z
meaningfullyUpdatedAt: 2025-04-08T10:33:40.028Z
title: Navigating Kotlin Module Naming Conflicts in Android Gradle Projects
layout: post
hidden: false
comments: false
published: true
language: en
---
# Navigating Kotlin Module Naming Conflicts in Android Gradle Projects

**TL;DR:** Structuring multi-module Android projects often leads to wanting identical sub-directory names (like `feature/navigation`). Historically, this caused build failures due to `.kotlin_module` file collisions. A common workaround was prefixing module names (e.g., `feature/featureNavigation`), but this hurts readability and can cause issues with Windows' maximum path length. This post explains that the Android Gradle Plugin (AGP) *currently* mitigates this collision by default, making prefixing less necessary *for now*. We discuss why we've decided to stop prefixing, embracing cleaner names, and detail our contingency plan using `settings.gradle` mapping if the problem ever returns.

## Setting the Scene: The Initial Challenge

A few years ago, while structuring our multi-module Android project, we encountered a tricky issue related to Gradle module naming and directory structure. We wanted to organize related features under common parent directories, like this:

```
project-root/
  - catalog/
    - navigation/ # Desired Gradle module: :catalog:navigation
    - ... other modules related to "catalog" feature ...
  - payments/
    - navigation/ # Desired Gradle module: :payments:navigation
    - ... other modules related to "payments" feature ...
```

However, this seemingly logical structure hit a snag.

## The `.kotlin_module` File Collision Problem

The Kotlin Gradle plugin generates metadata files for each module, typically named `<module_name>_debug.kotlin_module` or `<module_name>_release.kotlin_module`. The problem was that the `<module_name>` part only used the *simple* name of the module's directory (`navigation` in both cases above), ignoring the parent path (`catalog` or `payments`).

This meant both modules generated files with the *exact same names* (e.g., `navigation_debug.kotlin_module`). When the Android Gradle Plugin (AGP) tried to package these files into the final APK, it resulted in a file collision error.

```
More than one file was found with OS independent path 'META-INF/navigation_release.kotlin_module'
```

At the time, these `.kotlin_module` files were understood to be potentially necessary for Kotlin reflection (via the `kotlin-reflect` API) to work correctly. Therefore, common workarounds for packaging conflicts, like using `pickFirst` packaging options or simply excluding these files entirely, seemed too risky. Even if *our* code didn't use reflection directly, we couldn't be certain that none of our third-party dependencies relied on it.

## Our Initial Workaround: Prefixing Module Names

To avoid the conflict while preserving the (potentially required) `.kotlin_module` files, we adopted a module naming convention that included the parent directory name as a prefix:

```
project-root/
  - catalog/
    - catalogNavigation/ # Gradle module: :catalog:catalogNavigation
  - payments/
    - paymentsNavigation/ # Gradle module: :payments:paymentsNavigation
```

This ensured unique simple module names (`catalogNavigation`, `paymentsNavigation`), leading to unique `.kotlin_module` file names (e.g., `catalogNavigation_debug.kotlin_module`, `paymentsNavigation_debug.kotlin_module`) and resolving the packaging conflict.

**However, this prefixing approach had notable downsides:**

1.  **Reduced Readability:** Module names like `catalogNavigation` are longer and arguably less intuitive than a simple `navigation` within the context of its parent `catalog` directory. This repetition can make the project structure feel slightly more cumbersome.
2.  **Windows Path Length Limit Issues:** In deeply nested projects, combining long parent directory paths with these prefixed module directory names could easily exceed the default `MAX_PATH` (260 characters) [limit on Windows](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation). This often prevented developers using Windows from successfully cloning the repository or building the project without manually enabling long path support in the Windows Registry or via Group Policy – a potentially annoying hurdle for contributors.

## Fast Forward: New Information Emerges

Recently, through [discussions on relevant issue trackers](https://youtrack.jetbrains.com/issue/KT-9770/Allow-to-exclude-.kotlinclass-.kotlinmodule-other-.kotlin-files-from-packaging-to-android-APK) involving folks from Google and JetBrains, we learned something crucial: **the Android Gradle Plugin (AGP) now defaults to excluding `.kotlin_module` files during APK packaging.**

The rationale seems to be that Kotlin isn't currently utilizing these files in the Android context, and their future necessity is uncertain. This effectively means the original naming collision problem *doesn't currently exist* for APK builds.

However, there's a catch: if Kotlin *does* start relying on these files in the future, and AGP consequently stops excluding them, the original collision problem could reappear for everyone who isn't prefixing their modules.

## The Dilemma: To Prefix or Not To Prefix?

This new information, combined with the known drawbacks of prefixing (readability and Windows path limits), presented us with a choice:

1.  **Continue Prefixing:** Stick with our `catalogNavigation`, `paymentsNavigation` convention. It's safe against potential future issues but suffers from reduced readability and potential Windows path length problems.
2.  **Stop Prefixing:** Revert to the more intuitive `navigation` module name within both `catalog` and `payments` directories. This improves readability and avoids path length issues but relies on Google and JetBrains finding a permanent solution *before* the problem potentially resurfaces.

## Our Decision and Contingency Plans

Considering the current state of AGP and weighing the pros and cons, we decided to **stop prefixing** our module names and embrace the cleaner structure.

Our reasoning is that the collision problem doesn't exist *today*, and might *never* come back. We prefer the improved clarity and the elimination of Windows path length concerns offered by the simpler naming convention.

**However, we also have contingency plans.** If the `.kotlin_module` collision issue returns in the future, we have two main strategies to address it *without* renaming the actual directories:

### Plan A: Mapping Logical Module Names in `settings.gradle`

We can rename the *logical Gradle module names* using the `settings.gradle(.kts)` file:

```kotlin
// settings.gradle.kts

// Keep the clean directory structure: catalog/navigation
// But define a unique logical Gradle module path: :catalog:catalogNavigation
include(":catalog:catalogNavigation")
project(":catalog:catalogNavigation").projectDir = file("catalog/navigation")
```

**Pros:**
- Keeps file system structure clean (`catalog/navigation`) and avoids Windows path limits.

**Cons:**
- Requires updating dependency declarations in `build.gradle(.kts)` files (e.g., change `implementation(project(":catalog:navigation")`) to `implementation(project(":catalog:catalogNavigation"))`).
- Requires remembering the logical module path (`:catalog:catalogNavigation`) when running specific Gradle tasks (e.g., `./gradlew :catalog:catalogNavigation:assemble`)

### Plan B: Using the -module-name Kotlin Compiler Option

Alternatively, we can keep the Gradle module names consistent with the directory structure (`:catalog:navigation`) and directly control the name used for the `.kotlin_module` file via [compiler arguments](https://kotlinlang.org/docs/compiler-reference.html#module-name-name-jvm) in each affected module's `build.gradle(.kts)`:

```kotlin
// In catalog/navigation/build.gradle.kts
android {
    kotlinOptions {
        freeCompilerArgs += listOf("-module-name", "catalog_navigation")
        // Groovy: freeCompilerArgs += ["-module-name", "catalog_navigation"]
    }

    // or
    // compileOptions {
    //     kotlinOptions.freeCompilerArgs += ...
    // }
}
```

**Pros:**

- Keeps file system structure clean (`catalog/navigation`) and avoids Windows path limits.
- Keeps Gradle module paths (`:catalog:navigation`) and dependency declarations (`implementation(project(":catalog:navigation"))`) intuitive and unchanged.
- Gradle task invocation remains straightforward (`./gradlew :catalog:navigation:assemble`).

**Cons:**
- Requires adding specific `kotlinOptions` configuration to each module that could potentially conflict. Less centralized than the `settings.gradle` approach.


We find the trade-offs of either plan acceptable. The potential future migration seems less disruptive than maintaining prefixed names indefinitely, especially since the need for this migration might never arise.


## Conclusion

While the `.kotlin_module` file collision was a genuine issue in the past, changes in AGP's default behavior have currently mitigated it for Android development. We've opted for cleaner, non-prefixed module names. We accept the small risk that we might need to implement one of our contingency strategies (`settings.gradle` mapping or `-module-name` flag) in the future if the underlying conditions change. For now, we benefit from a more readable, logical, and friendly project structure.