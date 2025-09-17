---
author: tomasz-l
secondAuthor: sebastian-r
tags:
  - iOS
  - Tuist
  - Firebase
date: 2025-09-17T18:00:00.000Z
meaningfullyUpdatedAt: 2025-09-17T18:00:00.000Z
title: Integrating Firebase into Tuist project
layout: post
image: to be added!
hidden: true
comments: true
published: true
language: en
---

Firebase is one of the most commonly used third-party library in iOS development. With functionalities ranging from Crashlytics, to analytics, feature flags... there is too much stuff to list all of it 😅
Today we will be focusing on integrating Firebase Crashlytics into our iOS app, with one caveat: it uses Tuist. Lo and behold, we might run into some strange behaviors!

## But wait, why Tuist?
If you ever worked in team, you might have faced conflicts in your Xcode projects. This is main idea from which Tuist originated. There is nothing original about that idea and many before did similar things. You may recal dedicated tools like xcode-gen but most probably you might be even using one right now: Cocoapods. Yeah if you thing about that it generates project as well 🙉

Thing that made Tuist interesting to me in the first place was that it is using `Swift` making it very familiar to developers in Apple ecosystem.

Right now Tuist is a very powerful tool that not only allows you to omit frustration fighting with project settings and conflicts (and random changes), but also optimise and bring your development to the next level.
Enough for now, that is mostly all that we need for now to continue. Nevertheless I highly encourage you to have a deeper look into [Tuist](https://tuist.dev) - thing you will not regret doing. 

## Why Crashlytics?
Answer here is simple: Crashlytics is battle tested tool that allows you control your app stability. It is free as well. And as we all know free is fair price to pay. You might stick to plain Xcode organiser insights or different tool, yet today is a day of Crashlytics.

## But there is more than one... 🧐
...way of integrating third parties using Tuist.

Indeed Tuist allows us to integrate third parties using its own system based on XcodeProj but there is second option too. One can integrate third party dependencies using plain Xcode SPM integration.

### Tuist project

Lets start with Tuist project structure. 
For detailed working code you can reference this demonstration repository: [tuist-firebase](https://github.com/TomaszLizer/tuist-firebase). At this stage we assume you have working Tuist project, but if not you can use reference above or create one with `tuist init`.

In order to enter project edit mode you need to run `tuist edit` command in project root. This will create and open Xcode project with three main files:
- Tuist.swift - it holds details of Tuist project itself
- Project.swfit - this is definition of what previously was our .xcodeproj file - all in Swift!
- Tuist/Package.swift - Package definition used for managing dependencies

Today we will be touching `Project.swift` as well as `Package.swift`.

### Xcode SPM path

Lets start with straightforward way - one that will be very familiar if you worked with SPM in Xcode before. In the beginning lets just start adding our dependency.

1. Add Firebase as a remote package in `Project.swift`:
   ```swift
   packages: [
      .remote(url: "https://github.com/firebase/firebase-ios-sdk", requirement: .exact("12.3.0"))
   ]
   ```

1. Add the required Firebase products to your app target dependencies, e.g.:
   ```swift
   dependencies: [
      .package(product: "FirebaseCrashlytics")
   ]
   ```

It might be confusing that we are defining this dependency in `Project.swift` and not in `Package.swift` but remember - `Project.swift` is descriptor of our `.xcodeproj`.

Now lets run `tuist generate` and lets see what happened. You should be greeted with similar view: Xcode project like any other one and Firebase dependencies resolving with SPM. Don't get attached too much to that - we will be getting rid of plain SPM integration later on.

// Xcode Image //

### Tweaking project for Firebase
So we included our dependency - now lets use it. For now lets stick to SPM integration as this part is mostly common for any method of Crashlytics integration.

Before we move forward you will also need to get your hands on `GoogleService-Info.plist` file. You can find it in your Firebase project settings.

1. Ensure dSYM files are being created by specifying correct debug information format:
    ```swift
    let baseSettings = SettingsDictionary()
        .debugInformationFormat(.dwarfWithDsym)
    let projectSettings = Settings.settings(base: baseSettings)
    let project = Project(
        name: "tuist-firebase",
        settings: projectSettings,
    [...]
    ```
    This is crucial part without which we won't be able to read crash data in Crashlytics console.

1. Add post-build script uploads dSYM files to Crashlytics automatically:
   ```swift
    Project(
        targets: [
            .target(
                [...]
                scripts: [
                    .post(
                        script: """
                        ${BUILD_DIR%/Build/*}/SourcePackages/checkouts/firebase-ios-sdk/Crashlytics/run
                        """,
                        name: "Upload Symbols to Crashlytics",
                        inputPaths: [
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}",
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Resources/DWARF/${PRODUCT_NAME}",
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Info.plist",
                            "$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/GoogleService-Info.plist",
                            "$(TARGET_BUILD_DIR)/$(EXECUTABLE_PATH)",
                        ]
                    )
                ]
            )
        ]
   )
   ```
   Note: script path will be different when using XcodeProj integration.

1. Place your `GoogleService-Info.plist` in `tuist-firebase/Resources` so it is bundled with the app.

1. Setup Firebase in your application.
    ```swift
    import Firebase
    [...]
    FirebaseApp.configure()
    ```

### Test your integration!
As we will uncover later on - this is extremely important part - we need to test that our integration works correctly. This can be as simple as adding fatalError somewhere in our app. I typically just add some button that does just that.

It is important to note, that while app is connected to debugger, firebase will not collect crash data, so you need to install your shiny app and disconnect debugger (just kill the run with stop in xcode). Then in order for the crash to be visible in the Firebase console, we need to run the app again - it will process and send crash reports. If everything is fine you should see your first crash pretty quick (typically up to few minutes).

### Tuist "native" integration
So what is wrong with our SPM integrated firebase? Well, everything... If you worked with SPM you may recall constant and somehow random reloading of dependencies. It is guaranteed to happen just after your transatlantic plane took off. And when you have quite a few dependencies in SPM (see how much we got just by getting Firebase) then it can get wonky as well.

Tuist takes Cocoapods approach which gives as many benefits. Instead of relying on SPM it creates. This allows for lots of clever things that Tuist does, including caching, dependency graph based testing, optimised builds. But again, just go and check out [Tuist.dev](https://tuist.dev) as there is too much of goodness there to even brief it meaningfully in this short article.

If you had peeked at attached repo, you might noticed that not much changed for this migration to happen, but lets wrap it up as if we just started.

1. Add Firebase as a remote package in `Package.swift`:
   ```swift
   Package(
        [...]
        dependencies: [
            .package(url: "https://github.com/firebase/firebase-ios-sdk", exact: "12.3.0")
        ]
   )
   ```

1. Add the required Firebase products to your app target dependencies in `Project.swift`:
   ```swift
    Project(
        [...]
        targets: [
            .target(
                [...]
                dependencies: [
                    .external(name: "FirebaseCrashlytics")
                ]
            )
        ]
    )
   ```

1. Ensure correct build settings, including dSYM creation and linking Objective-C code:
    ```swift
    let baseSettings = SettingsDictionary()
        .debugInformationFormat(.dwarfWithDsym)
        .otherLinkerFlags(["-ObjC"])
    let projectSettings = Settings.settings(base: baseSettings)
    let project = Project(
        name: "tuist-firebase",
        settings: projectSettings,
    [...]
    ```
    In addition to dSYM creation we added `-ObjC` linker flag - it is crucial here, but more on that later.


1. Add post-build script uploads dSYM files to Crashlytics automatically:
   ```swift
    Project(
        targets: [
            .target(
                [...]
                scripts: [
                    .post(
                        script: """
                        Tuist/.build/checkouts/firebase-ios-sdk/Crashlytics/run
                        """,
                        name: "Upload Symbols to Crashlytics",
                        inputPaths: [
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}",
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Resources/DWARF/${PRODUCT_NAME}",
                            "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Info.plist",
                            "$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/GoogleService-Info.plist",
                            "$(TARGET_BUILD_DIR)/$(EXECUTABLE_PATH)",
                        ]
                    )
                ]
            )
        ]
   )
   ```
   The only thing that changed here is path to script - it is obviously different due to different way of integrating SDK.


1. Place your `GoogleService-Info.plist` in `tuist-firebase/Resources` so it is bundled with the app.

1. Setup Firebase in your application.
    ```swift
    import Firebase
    [...]
    FirebaseApp.configure()
    ```

After migration to "proper" way of handling dependencies with Tuist we need to make one more step before `tuist generate`. Similarly to good old Cocoapods we have `tuist install`. It will fetch our dependencies, convert to projects and integrate into our main project using `xcworkspace` with child projects.

### What the fuss with ObjC
This is where funny things happens. In one of our projects we have stumbled once on a very strange issue upon migration to Tuist. Crash reports stopped working.

Debugging started - firstly lets add firebase debug flag. You can do that by adding `-FIRDebugEnabled` launch argument. To do that in Tuist we have to define scheme. We do so in `Project.swift` at the top level of Project definition:

```swift
Project(
    [...]
    schemes: [
        .scheme(
            name: "Tuist-Firebase-Debug",
            buildAction: .buildAction(targets: [.target("tuist-firebase")]),
            runAction: .runAction(
                configuration: .debug,
                arguments: .arguments(
                    launchArguments: [.launchArgument(name: "-FIRDebugEnabled", isEnabled: true)]
                )
            ),
        ),
    ]
)
```

This gives us ability to see rich logging from Firebase, including Crashlytics.

Keen observer might quickly notice this log:
```lldb
12.3.0 - [FirebaseCrashlytics][I-CLS000000] Completed report submission with id: [...]
```
Hence crash report was generated and seemingly sent, but why cannot I see that in Firebase console?

So we dove deeper, stepping into execution of crash report submission.

Searching for `Completed report submission with id` moves us to `FIRCLSReportUploader.m:216`. After adding breakpoint I can see that indeed we stepped here and sent something somewhere. But where? Lets check function that calls callback we are in, which is `-[GDTCORTransport sendDataEvent:onComplete:]` in `GDTCORTransport.m:56`. It in turn points us to `-[GDTCORTransformer transformEvent:withTransformers:onComplete:]` in `GDTCORTransformer.m:55` and that is the place for our next breakpoint to understand what is happening.

And then comes the realisation: breakpoint is not resolving: this symbol is unknown to compiler - something is very wrong here.

<center>
![Xcode unresolved breakpoint](/images/integrating-firebase-into-tuist-project/xcode-unresolved-breakpoint.png "Xcode unresolved breakpoint")
</center>

Turns out we had a bug in our project definition, linker flags in particular. Instead of `-ObjC` we have accidentally put `-Objc`.
Quick fix, one liner, or in this case: one character and we are golden 🙈


TODO: 
- Add banner image
- Add images throughout text
- Optimise images
