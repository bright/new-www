---
crosspost: true
author: azabost
tags:
  - gradle
  - maven
  - android
  - kotlin
  - java
  - bintray
  - jcenter
  - migration
  - jar
  - dependency
  - cache
  - repository
date: 2021-05-26T12:01:21.342Z
title: Migrating away from Bintray/JCenter when there is no alternative repository
layout: post
image: /images/blog_post_elephant.png
hidden: false
comments: true
published: true
---
## TL;DR version

If you can't find a library (Maven dependency) you need for your project
after Bintray/JCenter (or another similar service) shutdown, but you still
have it in your local Gradle cache, you can easily set up your own local
Maven repository with that library as a replacement and keep the files
for as long as you need (see
[Finding the cached dependencies in Gradle cache](#finding-the-cached-dependencies-in-gradle-cache)
and
[Setting up a local Maven repository](#setting-up-a-local-maven-repository)
paragraphs for the details).

## Just a little context

A few months ago JFrog
[announced it is sunsetting](https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/)
some of its services, including Bintray and JCenter, where a lot of
dependencies are hosted. According to
[MvnRepository](https://mvnrepository.com/), there are
[841,529 indexed jars](https://mvnrepository.com/repos/jcenter) on
JCenter and its popularity has been increasing very rapidly over the
recent years 🚀

## A surprising turn of events

Bintray and JCenter shutdown was planned on May 1st, 2021, although on
April 27th, JFrog updated their original announcement, stating that they
"will keep JCenter as a read-only repository indefinitely". It sounds
very comforting yet, in spite of that, I couldn't access a few
dependencies anymore. I think some of them were hosted on JCenter, at
least according to MvnRepository, so it surprised me quite a bit, but
maybe I had some additional issues, possibly a misconfiguration like a
[wrong order of the repositories declarations in Gradle](https://stackoverflow.com/questions/33528294/is-gradle-possible-to-use-maven-repository-with-higher-priority-than-jcenter#:~:text=Gradle%20will%20look%20for%20a,that%20contains%20the%20requested%20module.&text=aside%20the%20fact%2C%20that%20at,that%20order%20of%20repositories%20matter.)
(can't remember now 😅).

Anyway, since some of my dependencies were hosted on Bintray as well, I
decided it would be better to simply migrate away from both Bintray and
JCenter. So I tried, and I failed quite miserably at first, which lead
me to an uncommon solution to this problem.

## Theory vs practice

When you read some blog posts and articles about the planned
Bintray/JCenter shutdown and migration paths, they all claim you can
simply switch over to a different Maven repository (preferably, Maven
Central). What they usually don't mention is that you can consider
yourself really lucky if you succeed.

In many cases, you will find it impossible to switch over for some
reason, e.g. either there is no other Maven repository hosting the
libraries you need, or it will turn out the library authors planned a
migration only for the newer or upcoming releases of their libraries.
Sometimes updating the dependency version doesn't cause much trouble,
especially if it's your direct dependency you are familiar with and if
it's backward compatible. It becomes much harder when these dependencies
are transitive or when their newer versions turn out to require a lot of
additional work on the client's side.

When I reviewed all the unresolvable dependencies, it became clear to me
it's not going to be like a walk in the park but quite the opposite.

## How to find all the missing dependencies at once

Even though I was still able to build my project locally thanks to
Gradle cache, the automated continuous integration builds on TeamCity
were failing (and it's also how I found out about the problem in the
first place) with errors like:

```
> Could not resolve com.datadoghq:dd-sdk-android:1.5.1.
  Required by:
      project :app > project :datadog
   > Could not resolve com.datadoghq:dd-sdk-android:1.5.1.
      > Could not get resource 'https://dl.bintray.com/datadog/datadog-maven/com/datadoghq/dd-sdk-android/1.5.1/dd-sdk-android-1.5.1.pom'.
         > Could not GET 'https://dl.bintray.com/datadog/datadog-maven/com/datadoghq/dd-sdk-android/1.5.1/dd-sdk-android-1.5.1.pom'. Received status code 403 from server: Forbidden
```

Running the following command allowed me to find all the unresolvable
dependencies quickly:

```bash
./gradlew :app:dependencies | grep FAILED | grep -v "project :"
```

Explanation:

* `:app:dependencies` simply lists all the projects dependencies since
  `app` is the main application module,
* `grep FAILED` filters the output so that only the unresolvable
  dependencies are printed,
* `grep -v "project :"` filters out the unnecessary module dependencies
  in a
  [multi-project build](https://docs.gradle.org/current/userguide/multi_project_builds.html)
  which could also be reported as `FAILED`.

*You will probably see some duplicated entries in the console output, so
you may want to try getting rid of them with some additional commands
etc., but it was good enough for me.*

The output may look like this (first 10 lines):

```
     |    +--- com.linkedin.dexmaker:dexmaker:2.21.0 FAILED
|    +--- com.google.android:flexbox:1.0.0 FAILED
     +--- com.android.volley:volley:1.1.1 FAILED
|    |    +--- com.linkedin.dexmaker:dexmaker:2.21.0 FAILED
|    +--- com.google.android:flexbox:1.0.0 FAILED
|    +--- com.android.volley:volley:1.1.1 FAILED
     |    +--- com.linkedin.dexmaker:dexmaker:2.21.0 FAILED
|    |    +--- com.linkedin.dexmaker:dexmaker:2.21.0 FAILED
|    +--- com.amitshekhar.android:debug-db:1.0.6 FAILED
|    |    |    +--- com.google.android:flexbox:1.0.0 FAILED
```

## How to find your dependencies in other Maven repositories

Now, knowing which dependencies you miss, you can use a service like
[MvnRepository](https://mvnrepository.com/) to see if there are other
Maven repositories hosting them. For example, in case of this
dependency:

```
|    +--- com.linkedin.dexmaker:dexmaker:2.21.0 FAILED
```

you will see
[on this page](https://mvnrepository.com/artifact/com.linkedin.dexmaker/dexmaker/2.21.0)
that:

* this particular version, i.e. `2.21.0`, is hosted only on JCenter;
* a newer version, `2.28.1`, is hosted on Maven Central.

![dexmaker-2.21.0](/images/migrating-away-from-bintray-jcenter-when-there-is-no-alternative-repository/dexmaker-2.21.0.png "Dexmaker 2.21.0 is hosted only on JCenter")

![dexmaker-2.28.1](/images/migrating-away-from-bintray-jcenter-when-there-is-no-alternative-repository/dexmaker-2.28.1.png "Dexmaker 2.28.1 is hosted on Maven Central")

In this case, you can't use any other Maven repository to get the
current dependency version, but you can try to update it.

*By the way, Dexmaker maintainers stated they won't migrate the older
version
[here](https://github.com/linkedin/dexmaker/issues/172).*

## How to enforce a transitive dependency version

Since, in most cases, Dexmaker is not going to be your direct
dependency, but a transitive one (in my case it is used by a popular
Kotlin mocking library,
[MockK](https://github.com/mockk/mockk/)), you won't be able to simply
change the version somewhere in your Gradle config file.

To update a transitive dependency version, you can use the
[constrains](https://docs.gradle.org/6.8.3/userguide/dependency_constraints.html)
like:

```
dependencies {
    constraints {
        implementation("com.linkedin.dexmaker:dexmaker:2.28.1") {
            because("The default version used by MockK 1.9.3 is hosted on JCenter only")
        }
    }
}
```

or you can use a
[resolution strategy](https://docs.gradle.org/6.8.3/userguide/resolution_rules.html),
e.g.:

```
allprojects {
    configurations.all {
        resolutionStrategy {
            force("com.linkedin.dexmaker:dexmaker:2.28.1")
        }
    }
}
```

## Dependencies I couldn't find elsewhere

Unfortunately, the story doesn't end here. Updating the dependencies may
lead to further issues. Some of them may be mutually incompatible while
others will require updating some parts of the code in your project
which can take a lot of effort. Moreover, it may turn out the library
author doesn't maintain it anymore or simply didn't have enough time to
upload it to a different Maven repository like Maven Central (which, by
the way,
[is said to be very strict in terms of validation](https://github.com/linkedin/dexmaker/issues/172)).

In all these cases you may need to keep the current dependency version
somehow. I will explain how to do it in the next paragraphs so keep
reading 🙂.

I decided to keep the following dependencies which I couldn't find
anywhere else:

* `com.datadoghq:dd-sdk-android:1.5.1` (direct)
* `com.savvi.datepicker:rangepicker:1.3.0` (direct)
* `com.google.android:flexbox:1.0.0` (transitive)
* `com.android.volley:volley:1.1.1` (transitive)
* `com.linkedin.dexmaker:dexmaker:2.21.0` (transitive)
* `com.sunmi:printerlibrary:1.0.13` (direct)

## Finding the cached dependencies in Gradle cache

Thankfully, Gradle caches the dependencies locally, so I was able to
find all of them easily. By default, you should check your user's home
directory: `~/.gradle`.
[Here you can find a full explanation of the directories' layout](https://docs.gradle.org/current/userguide/directory_layout.html).

You can run a command like this to find the cached dependency files:

```bash
find ~/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker
```

and it will print an output like:

```
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/bdfd84d002e265ab7cf7f54a71a17717f831a57d
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/bdfd84d002e265ab7cf7f54a71a17717f831a57d/dexmaker-2.21.0-javadoc.jar
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/423b7b6e4d772e274ba03646284b0cea83faca56
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/423b7b6e4d772e274ba03646284b0cea83faca56/dexmaker-2.21.0.pom
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/680f2dbbb51f2892a4fdbbd9269d628e0b3270b3
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/680f2dbbb51f2892a4fdbbd9269d628e0b3270b3/dexmaker-2.21.0.jar
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/2e6b7df791ab40f340dfd2cb41acd62bb057af82
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/2e6b7df791ab40f340dfd2cb41acd62bb057af82/dexmaker-2.21.0-sources.jar
```

Now you need just a few additional steps to preserve these precious
files in your VCS for as long as you need and share them with your
teammates.

## Setting up a local Maven repository

You can use any directory you want as a Maven repository using a Gradle
snippet like this one:

```
repositories {
    maven {
        url = uri("${rootProject.projectDir}/libs")
    }
}
```

*(You may want to put it inside `allProjects { ... }` block.)*

As a result, the `libs` directory in the root project's directory will
be searched for the dependencies just like all the other Maven
repositories. Of course, you can name that directory as you wish.

The chosen directory must be prepared according to the Maven repository
layout. To be honest, I'm not sure which documentation on this topic is
the official one, but I found
[this one](https://cwiki.apache.org/confluence/display/MAVENOLD/Repository+Layout+-+Final)
and I examined the local `~/.m2/repository` directory to figure it out.

For Dexmaker I created the following directory:

```
libs/com/linkedin/dexmaker/dexmaker/2.21.0
```

As you can see, I mapped my Gradle cache structure into Maven repository
layout like this:

| Gradle cache                         | Maven repository      |
| ------------------------------------ | --------------------- |
| ~/.gradle/caches/modules-2/files-2.1 | libs                  |
| com.linkedin.dexmaker                | com/linkedin/dexmaker |
| dexmaker                             | dexmaker              |
| 2.21.0                               | 2.21.0                |

Then I copied all the files from Gradle cache to `libs` using the
following command:

```bash
find ~/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0 -type f -exec cp -v {} libs/com/linkedin/dexmaker/dexmaker/2.21.0 \;
```

which printed this output:

```
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/bdfd84d002e265ab7cf7f54a71a17717f831a57d/dexmaker-2.21.0-javadoc.jar -> libs/com/linkedin/dexmaker/dexmaker/2.21.0/dexmaker-2.21.0-javadoc.jar
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/423b7b6e4d772e274ba03646284b0cea83faca56/dexmaker-2.21.0.pom -> libs/com/linkedin/dexmaker/dexmaker/2.21.0/dexmaker-2.21.0.pom
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/680f2dbbb51f2892a4fdbbd9269d628e0b3270b3/dexmaker-2.21.0.jar -> libs/com/linkedin/dexmaker/dexmaker/2.21.0/dexmaker-2.21.0.jar
/Users/azabost/.gradle/caches/modules-2/files-2.1/com.linkedin.dexmaker/dexmaker/2.21.0/2e6b7df791ab40f340dfd2cb41acd62bb057af82/dexmaker-2.21.0-sources.jar -> libs/com/linkedin/dexmaker/dexmaker/2.21.0/dexmaker-2.21.0-sources.jar
```

and that's how Dexmaker 2.21.0 became a part of the Git repository.
After repeating this process for all the other missing dependencies, I
was able to build the project successfully again 🎉

*Featured image by
[Luroka](https://pixabay.com/users/luroka-9240270/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3522487)
from
[Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3522487)*