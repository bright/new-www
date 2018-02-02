---
layout: post
title: How to publish a library to a Maven repository with maven-publish plugin
author: piotr
hidden: true
tags: maven jcenter jvm  gradle kotlin
comments: true
crosspost: false
image: /images/publish-library/announce.jpg
---

A seasoned developer now and then creates a piece of code that he or she would like to _re use_ in a different project. When such time comes it is useful to know how to publish a library so that it can easily be incorporated into a different project. In this post I will describe how to publish a Kotlin library to [JCenter](https://bintray.com/bintray/jcenter) with `maven-publish` and `com.jfrog.bintray` Gradle plugins.

# Gradle Maven plugins

The first step is to apply [Maven plugin](https://docs.gradle.org/current/userguide/maven_plugin.html). The plugin adds support for deploying artifacts to Maven repositories. Note that in case of multi-project build e.g. [ShouldKO](https://github.com/bright/shouldko) the Maven plugin should be applied to every project that defines some artifact to be published. You can use `allprojects` to apply to all projects e.g.:

```groovy
allprojects {
    repositories {
        jcenter()
        mavenCentral()
    }

    // required by junit platform runner
    apply plugin: 'kotlin'
    apply plugin: 'maven'

    group "pl.miensol.shouldko"
}
```

For the [`com.jfrog.bintray`](https://github.com/bintray/gradle-bintray-plugin) to work nicely with Maven artifacts we need to apply additional Gralde plugin. The [`maven-publish`](https://docs.gradle.org/current/userguide/publishing_maven.html) which provides ability to publish artifacts in Maven format. All we need to do is to `apply plugin: 'maven-publish'` in the main project.

# Define Maven publishing

The [`com.jfrog.bintray`](https://github.com/bintray/gradle-bintray-plugin#step-7-define-artifacts-to-be-uploaded-to-bintray) relies on properly defined [Maven Publications](https://docs.gradle.org/current/userguide/publishing_maven.html). The Gradle DSL allows us to define them easily based on project properties e.g.

```groovy
publishing {
    publications {
        hamcrest(MavenPublication) {
            def project = project(':hamcrest')
            from project.components.java
            artifact project.sourcesJar { // not required, includes sourcesJar with correct classifer
                classifier "sources"
            }
            groupId group
            artifactId project.name
            version project.version
        }

        core(MavenPublication) {
            def project = project(':core')
            from project.components.java
            artifact project.sourcesJar {
                classifier "sources"
            }
            groupId group
            artifactId project.name
            version project.version
        }
    }
}
```

The above Maven Publications include sources artifact. However, one needs to define it first as it is not included by default when applying `java` or `kotlin` plugins to a Gradle project. This is easily done as follows:

```groovy
allprojects {
    task sourcesJar(type: Jar, dependsOn: classes) {
        from sourceSets.main.allSource
    }
}
```

# Project versioning

The [Semantic Versioning](https://semver.org/) scheme is widely accepted as a standard when it comes to libraries. 