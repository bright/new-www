---
author: piotr
tags:
  - java
  - gradle
  - maven
  - jreleaser
date: 2025-04-24T10:00:00.000Z
meaningfullyUpdatedAt: 2025-04-24T10:00:00.000Z
slug: publishing-to-maven-central-with-jreleaser
title: Publishing to Maven Central with JReleaser from GitHub
layout: post
image: /images/jreleaser-github.png
hidden: false
comments: false
published: true
language: en
---

**Publishing Java libraries to Maven Central is a crucial step for sharing your work with the wider Java community. While the process has traditionally been complex, JReleaser simplifies this workflow significantly, especially when integrated with GitHub Actions. This guide walks you through configuring JReleaser to publish your multi-module Gradle project to Maven Central directly from GitHub.**

## Contents:

[Introduction to JReleaser and Maven Central](/blog/publishing-to-maven-central-with-jreleaser/#introduction-to-jreleaser-and-maven-central)

[Configuring JReleaserExtension in build.gradle.kts](/blog/publishing-to-maven-central-with-jreleaser/#configuring-jreleaserextension-in-buildgradlekts)

[Setting up PublishingExtension and the staging-deploy directory](/blog/publishing-to-maven-central-with-jreleaser/#setting-up-publishingextension-and-the-staging-deploy-directory)

[Maven Central's special requirements](/blog/publishing-to-maven-central-with-jreleaser/#maven-centrals-special-requirements)

[Environment variables for jreleaserRelease task](/blog/publishing-to-maven-central-with-jreleaser/#environment-variables-for-jreleaserrelease-task)

[GPG signing with armored keys](/blog/publishing-to-maven-central-with-jreleaser/#gpg-signing-with-armored-keys)

[Common misconception: JReleaser vs Gradle signing plugin](/blog/publishing-to-maven-central-with-jreleaser/#common-misconception-jreleaser-vs-gradle-signing-plugin)

[References and resources](/blog/publishing-to-maven-central-with-jreleaser/#references-and-resources)

## Introduction to JReleaser and Maven Central

[JReleaser](https://jreleaser.org/) is a release automation tool that simplifies the process of releasing and publishing Java projects. It handles various tasks including creating GitHub releases, generating changelogs, and publishing artifacts to Maven Central. When combined with GitHub Actions, it creates a powerful, automated release pipeline.

Maven Central is the primary repository for Java libraries, making your artifacts easily accessible to developers worldwide through Maven, Gradle, or other build tools. Publishing to Maven Central requires meeting specific requirements and following a particular process, which JReleaser helps streamline.

## Configuring JReleaserExtension in build.gradle.kts

To use JReleaser with Gradle, you need to apply the JReleaser plugin and configure the JReleaserExtension. Here's a sample configuration from a multi-module project:

```kotlin
plugins {
    // Other plugins
    id("org.jreleaser") version "1.17.0"
}

// Project configuration

configure<org.jreleaser.gradle.plugin.JReleaserExtension> {
    gitRootSearch = true
    project {
        description = "Your project description"
        authors = listOf("Your Organization")
        license = "MIT"
        links {
            homepage = "https://github.com/your-org/your-repo"
            bugTracker = "https://github.com/your-org/your-repo/issues"
            contact = "https://yourorganization.com"
        }
        inceptionYear = "2025"
        vendor = "Your Organization"
        copyright = "Copyright (c) ${LocalDate.now().year} Your Organization"
    }

    release {
        github {
            commitAuthor {
                name = "Your Organization"
                email = "info@yourorganization.com"
            }
        }
    }

    signing {
        active = Active.ALWAYS
        armored = true
    }

    deploy {
        maven {
            mavenCentral {
                register("sonatype") {
                    active = Active.ALWAYS
                    url = "https://central.sonatype.com/api/v1/publisher"
                    subprojects.filter { it.name != "examples" }.forEach { project ->
                        stagingRepository(project.layout.buildDirectory.dir("staging-deploy").get().asFile.path)
                    }
                }
            }
        }
    }
}
```

This configuration:
- Sets project metadata (description, authors, license, etc.)
- Configures GitHub release settings
- Enables GPG signing with armored keys
- Sets up Maven Central deployment for all subprojects except "examples"

The `gitRootSearch = true` setting is particularly important for multi-module projects as it tells JReleaser to search for the Git root directory, ensuring proper version detection.

## Setting up PublishingExtension and the staging-deploy directory

Before JReleaser can publish your artifacts to Maven Central, you need to publish them to a local staging directory. This is done using Gradle's PublishingExtension:

```kotlin
subprojects {
    // Apply necessary plugins
    apply(plugin = "maven-publish")

    // Configure Java for source and javadoc jars
    java {
        withJavadocJar()
        withSourcesJar()
    }

    // Configure publishing
    configure<PublishingExtension> {
        publications {
            register<MavenPublication>("maven") {
                from(components["java"])
                pom {
                    name.set(project.name)
                    description.set(project.description ?: project.name)
                    url.set("https://github.com/your-org/your-repo")
                    licenses {
                        license {
                            name.set("MIT")
                            url.set("https://github.com/your-org/your-repo/blob/main/LICENSE")
                        }
                    }
                    developers {
                        developer {
                            id.set("your-org")
                            name.set("Your Organization")
                            email.set("info@yourorganization.com")
                        }
                    }
                    scm {
                        connection.set("scm:git:git://github.com/your-org/your-repo.git")
                        developerConnection.set("scm:git:ssh://github.com:your-org/your-repo.git")
                        url.set("https://github.com/your-org/your-repo")
                    }
                }
            }
        }

        repositories {
            maven {
                url = layout.buildDirectory.dir("staging-deploy").get().asFile.toURI()
            }
        }
    }
}
```

The `staging-deploy` directory serves as a temporary storage location for your artifacts before JReleaser picks them up for publishing to Maven Central. This two-step process allows for validation and preparation of artifacts before the final publishing step.

## Maven Central's special requirements

Maven Central has specific requirements for artifacts:

1. **Complete POM information**: Your POM must include:
   - Project coordinates (groupId, artifactId, version)
   - Project name, description, and URL
   - License information
   - Developer information
   - SCM (Source Control Management) information

2. **Required artifacts**:
   - Main JAR file
   - Sources JAR
   - Javadoc JAR

3. **GPG signatures**: All artifacts must be signed with a GPG key that has been published to a public keyserver and registered with Sonatype.

4. **Sonatype account**: You need a Sonatype OSSRH (OSS Repository Hosting) account with permissions for your group ID.

5. **Coordinates validation**: Your group ID should be a domain you control or have permission to use.

The new Maven Central portal (central.sonatype.com) has streamlined the publishing process compared to the older Nexus Repository Manager, and JReleaser is fully compatible with this new approach.

## Environment variables for jreleaserRelease task

When running the `jreleaserRelease` task in a GitHub Actions workflow, you need to set several environment variables:

```yaml
env:
  JRELEASER_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  JRELEASER_GPG_PASSPHRASE: ${{ secrets.MAVEN_CENTRAL_GPG_PASSPHRASE }}
  JRELEASER_GPG_SECRET_KEY: ${{ secrets.MAVEN_CENTRAL_GPG_PRIVATE_KEY }}
  JRELEASER_GPG_PUBLIC_KEY: ${{ secrets.MAVEN_CENTRAL_GPG_PUBLIC_KEY }}
  JRELEASER_MAVENCENTRAL_USERNAME: ${{ secrets.MAVEN_CENTRAL_USERNAME }}
  JRELEASER_MAVENCENTRAL_PASSWORD: ${{ secrets.MAVEN_CENTRAL_PASSWORD }}
```

These variables are:

- **JRELEASER_GITHUB_TOKEN**: Used to authenticate with GitHub for creating releases
- **JRELEASER_GPG_PASSPHRASE**: The passphrase for your GPG key
- **JRELEASER_GPG_SECRET_KEY**: Your GPG private key for signing artifacts
- **JRELEASER_GPG_PUBLIC_KEY**: Your GPG public key
- **JRELEASER_MAVENCENTRAL_USERNAME**: Your Maven Central (Sonatype) username
- **JRELEASER_MAVENCENTRAL_PASSWORD**: Your Maven Central (Sonatype) password

You need to add these secrets to your GitHub repository settings to make them available to your workflow.

## GPG signing with armored keys

JReleaser's signing configuration includes an important setting: `armored = true`. This setting affects the format of the GPG keys expected by JReleaser.

When `armored = true`, GPG keys must be in ASCII-armored format, which is a text-based representation of the binary key data. This format is more suitable for storing in GitHub secrets and environment variables.

To export your GPG keys in ASCII-armored format:

```bash
# Export public key
gpg --armor --export your-key-id > public-key.asc

# Export private key
gpg --armor --export-secret-key your-key-id > private-key.asc
```

The content of these files (including the BEGIN and END markers) should be stored in the corresponding GitHub secrets.

## Common misconception: JReleaser vs Gradle signing plugin

A common misconception in many blog posts and tutorials is that you need to configure the standard Gradle signing plugin separately when using JReleaser. This is incorrect.

JReleaser handles the signing of artifacts during the deploy step, so there's no need to apply and configure the `signing` plugin in your Gradle build. The signing configuration in the JReleaserExtension is all you need.

If you were to use both, you would end up with double-signed artifacts, which is unnecessary and can cause confusion.

The correct approach is:
1. Configure PublishingExtension to publish unsigned artifacts to the staging directory
2. Configure JReleaserExtension with signing enabled
3. Let JReleaser handle the signing and publishing to Maven Central

## References and resources

For more information on publishing to Maven Central and using JReleaser, check out these resources:

- [JReleaser Documentation](https://jreleaser.org/guide/latest/)
- [JReleaser Maven Central Example](https://jreleaser.org/guide/latest/examples/maven/maven-central.html)
- [Sonatype OSSRH Guide](https://central.sonatype.org/publish/publish-guide/)
- [GPG Setup for Maven Central](https://central.sonatype.org/publish/requirements/gpg/)
- [Maven Central Requirements](https://central.sonatype.org/publish/requirements/)
- [Working with PGP Signatures](https://central.sonatype.org/publish/requirements/gpg/)

**Note: A full working example of the configuration described in this blog post is available at [https://github.com/bright/spring-modulith-gcp](https://github.com/bright/spring-modulith-gcp).**

By following this guide, you should be able to set up an automated publishing pipeline that releases your Java libraries to Maven Central directly from GitHub using JReleaser, making your artifacts available to the wider Java community with minimal manual intervention.
