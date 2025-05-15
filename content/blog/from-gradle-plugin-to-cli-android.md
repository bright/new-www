---
author: filip-g
tags:
  - android
  - kotlin
  - gradle
  - firebase
date: 2025-05-15T10:33:40.018Z
meaningfullyUpdatedAt: 2025-05-15T10:33:40.028Z
slug: from-gradle-plugin-to-cli-android
title: From Gradle Plugin to CLI: A More Flexible Way to Distribute Android Apps with Firebase App Distribution
layout: post
image: /images/blog_post_android_gradle_CLI.png
hidden: false
comments: false
published: true
language: en
---

**Firebase App Distribution is a fantastic tool for continuous delivery, providing an easy way to manage pre-release builds and sharing them with testers.   
For a long time in our project, the [Firebase App Distribution Gradle plugin](https://firebase.google.com/docs/app-distribution/android/distribute-gradle) was a convenient way to automate this process directly within our build scripts.   
However, as our project’s complexity grew, particularly with the introduction of new flavor dimensions, we encountered limitations that led us to explore a more flexible alternative: the Firebase CLI.**

## The Convenience (and Limitations) of the Gradle Plugin

Initially, the Firebase App Distribution Gradle plugin was more than enough for our project. All we had to do was to apply the plugin in the `build.gradle` file and configure the `firebaseAppDistribution` closure by specifying appId, service account file and testers group. Since we had 2 flavors at that time \- `staging` and `live`, we could also configure each of them separately:

```groovy
plugins {
  id("com.google.firebase.appdistribution")
}

android {
  flavorDimensions += "environment"
  productFlavors {
    create(“staging”) {
      dimension = "environment"
      firebaseAppDistribution {
        appId = // staging App Id
        groups = // testers group
        releaseNotes = "Bug fixes and improvements"
      }
    create(“live”) {
      dimension = "environment"
      firebaseAppDistribution {
        appId = // live App Id
        groups = // testers group
        releaseNotes = "Bug fixes and improvements"
      }
    }
  }
}
```

This setup allowed us to upload both variants of the app to App Distribution from a CI workflow, by using a single Gradle command `appDistributionUploadStagingRelease` or `appDistributionUploadLiveRelease`.

### Growing project complexity

This worked perfectly well until our app received a second branding, which forced us to create a new flavor dimension \- *brand*.   
Adding the second flavor dimension resulted in having 4 merged flavors instead of 2:  
```
brand1Live
brand1Staging
brand2Live
brand2Staging
```

Since all those 4 app versions had different App IDs in the Firebase console, we also needed 4 different App Distribution plugin setups.

Unfortunately, at the time of writing this blog post (May 2025), the plugin doesn’t allow that, as there exist only 3 versions for the `firebaseAppDistribution` configuration function:  
```kotlin
fun org.gradle.api.Project.firebaseAppDistribution()
fun org.gradle.nativeplatform.BuildType.firebaseAppDistribution()
fun com.android.build.api.dsl.ProductFlavor.firebaseAppDistribution()
```

They allow to configure the App Distribution:

* once for the entire project  
* for every individual build type  
* for every individual flavor

There’s no way to combine 2 flavors together, or one flavor with one build type.  
To achieve it, we would need a 4th version, defined for example for `com.android.build.api.variant.ApplicationVariant`, as this class contains the definitions for all flavors and build types.

## The Flexibility of the Firebase CLI

This is where the Firebase CLI became our preferred solution.  It provides a direct interface to interact with various Firebase services, including App Distribution, via command-line.  Since it’s decoupled from the Gradle build logic, it gives us full control over which build artifact gets distributed, perfectly solving our flavor dimension targeting problem.

### How to Use the Firebase CLI for App Distribution

The easiest way to install Firebase CLI is to use Node Package Manager. Most of the CI systems have it installed already. In case it’s not available straight away, please refer to the [official installation docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Once we have `npm` command available, we can install the CLI using a single terminal command:

```bash
npm install -g firebase-tools
```

Now we should have access to the `firebase` command which is an entry point to the Firebase CLI.  
Then, we just need to invoke the `appdistribution:distribute` command.

This command however, requires authentication. 

### CLI Authentication

CLI auth can be obtained in 2 ways: with Firebase Token, or Service Account File.  
The token approach is considered deprecated, hence we haven’t used it.  
It also requires a machine with an installed browser, as the token can be obtained only after performing a successful Google Auth.  
For more info please refer to [official docs](https://firebase.google.com/docs/cli#cli-ci-systems-firebase-token).

The option with Service Account File is much easier to implement in a CI environment.  
It just requires a single file available through a system environment variable. The file itself can be obtained from Google Cloud Console.   
For a step-by-step guide, please check the [official docs](https://firebase.google.com/docs/app-distribution/authenticate-service-account?platform=android).

The last step \- creating a `GOOGLE_APPLICATION_CREDENTIALS` environment variable is crucial. Without this, the upload will fail, as the `appdistribution:distribute` command uses this env during runtime.

### Uploading the app

After fulfilling the authentication requirements, we can finally upload the build by calling:

```
firebase appdistribution:distribute "path/to/the/build/file" \ 
  --app FIREBASE_APP_ID \
  --groups "internal-testers,qa-team" \
  --release-notes "Bug fixes and improvements"
```

Parameters breakdown:  
`"path/to/the/build/file"` \- a required argument pointing to the APK or AAB file  
`--app` \- The App ID for your Android app in Firebase. You can find this in your Firebase project settings under "General".  
`--groups` \- a comma-separated list of tester groups you want to distribute the build to. You can manage groups in the Firebase console.  
`--release-notes` \- release notes for the testers. You can also use `--release-notes file` /`path/to/notes.txt` to provide notes from a file.  
If you are using token authentication, an additional `--token` parameter will be required.

For a complete list of available parameters, please refer to the [official docs](https://firebase.google.com/docs/app-distribution/android/distribute-cli?apptype=apk#step_2_distribute_your_app_to_testers).

Alternatively, instead of splitting the CLI usage into separate steps for installation and execution, we can make use of `npx` to run the `firebase`, command directly from a remote `npm` package:

```
npx --yes firebase-tools \
  appdistribution:distribute "path/to/the/build/file" \ 
    --app FIREBASE_APP_ID \
    --groups "internal-testers,qa-team" \
    --release-notes "Bug fixes and improvements"
```

Using `--yes` parameter allows to bypass any prompts that would appear during the execution.

### Uploading the build from CI

In the case of our project, we are using GitHub Actions as a CI solution. It gives an option to define values for all the above parameters as inputs to a single workflow, so the decision on what app to upload can be done by simply passing appropriate arguments when dispatching the workflow.

Even though our final CI workflow is a bit more complex, you can check a simple implementation in the [following gist](https://gist.github.com/fgrzeskowiak/473a0ececdfdff55f96e19dcf1e2cdfc).

## Conclusion

While the Firebase App Distribution Gradle plugin is a convenient entry point, the Firebase CLI offers superior flexibility and control, especially when dealing with complex Android build configurations involving multiple flavor dimensions. 

By decoupling the build and upload steps and allowing you to explicitly specify the artifact to distribute, the CLI provides a solution that scales better with the complexity of your app variants.

If you've hit limitations with the Gradle plugin due to your build setup, or simply need more control over your distribution process, switching to Firebase CLI might be a cure for that.