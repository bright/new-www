---
layout: post
title: Different iOS build configurations than Debug and Release in React Native
author: mateusz
tags: ['react native', 'ios', 'build configurations']
comments: true
hidden: true
image: /images/react-native-custom-ios-build-configurations/build-configurations.png
---

Default iOS build configurations, **Debug** and **Release**, might be enough for the beginning, but sooner or later you will probably need to extend the number of build configurations in your app. While this is pretty straightforward in native development, unfortunately, it is not in React Native.

## Build configurations

To manage build configuration go to project settings ([PROJECT]->Info):

![image](/images/react-native-custom-ios-build-configurations/project-target.png)

You can easily add a new build configuration by **duplicating an existing one**. Duplicate Debug configuration for development and Release configuration for Test Flight and App Store build. You can also rename any configuration by double-clicking on it quickly.

![image](/images/react-native-custom-ios-build-configurations/build-configurations.png)

#### Debug vs Release

Debug configuration builds the complete symbolic debug information without any code optimizations to facilitate debugging applications. In Release configuration code execution is optimized and symbolic information is not included in build which results in smaller size of the final executable. Release builds will execute faster although due to compiler optimizations you can expect differences in memory layout or initialization which might result in so-called "Release-only" bugs.

#### Run build configuration

Above steps are enough to set up new build configurations in native development. To run the app in build configuration open **scheme** and change Run build configuration:

![image](/images/react-native-custom-ios-build-configurations/select-build-configuration.png)

## Problems in React Native

Remember to check that your TypeScript code has compiled (if any) that the packager is running. To start the iOS app in React Native with build configuration specified you can simply run:

```react-native run-ios --configuration Stage```

Unfortunately, this will fail for any Release-based configuration with error saying that it cannot find `RCTBundleURLProvider` in AppDelegate:

> AppDelegate.m:2:9: 'React/RCTBundleURLProvider.h' file not found

We need to add missing **Header Search Paths** and **Library Search Paths** in target build settings ([TARGET]->Build Settings) for new Release build configurations.

![image](/images/react-native-custom-ios-build-configurations/build-settings-search-paths.png)

Add entry to **Headers Search Paths** for each new Release build configuration:

```$(BUILD_DIR)/Release-$(PLATFORM_NAME)/include```

![image](/images/react-native-custom-ios-build-configurations/header-search-paths.png)

Add entry to **Library Search Paths** for each new Release build configuration:

```$(BUILD_DIR)/Release$(EFFECTIVE_PLATFORM_NAME)```

![image](/images/react-native-custom-ios-build-configurations/library-search-paths.png)

Now you can start the app in specified build configuration:

```react-native run-ios --configuration Stage```

**Remember do to the same for Test target otherwise this command will fail.**

## Every cloud has a silver lining

Defining iOS build configurations different than Debug and Release in React Native can be really frustrating without any previous experience. However, with little guidance it can be quick and painless process.

If you are interested how to set up different Google configurations for each build configuration I recommend you [reading this tutorial](https://brightinventions.pl/blog/ios-google-configuration-per-environment). Although it is written for native development, you can **set up Run Scripts exactly the same in React Native**.
