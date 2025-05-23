---
author: szymon-g
tags:
  - mobile development
  - iOS
  - flutter
date: 2025-05-23T05:58:15.308Z
meaningfullyUpdatedAt: 2025-05-23T05:58:16.115Z
slug: migrating-from-ios-app-to-flutter
title: Migrating from iOS App to Flutter – a Painless Getting Started Guide
layout: post
image: /images/from_ios_to_flutter_update.png
hidden: false
comments: false
published: true
language: en
---
Migrating iOS app from native to Flutter doesn't have to mean rewriting your entire app from scratch. If you have a working iOS app and you want to enjoy the benefits of Flutter you can introduce it gradually — a great way to **migrate iOS app to Flutter** without a full rewrite.

In this post, I'll show you step-by-step how to add Flutter to an existing iOS project, and the different ways to run Flutter views - from the simplest to more optimized ones.

## Adding flutter to an existing iOS application

To integrate Flutter into an existing iOS app, I followed the official [Add to App](https://docs.flutter.dev/add-to-app/ios/project-setup)   guide provided by the Flutter team.
The documentation outlines multiple integration paths - it's important to choose the one that best fits your project setup. In my case, I used the "Link and Embed frameworks in Xcode" approach. 

## Quick start: FlutterViewController with initialRoute

The easiest way to launch a Flutter view in an existing iOS app is to create a new `FlutterViewController` and set the initialRoute.

Flutter:

```dart
@pragma('vm:entry-point')
void routedMain() {
  runApp(RoutedApp());
}

class RoutedApp extends StatelessWidget {
  const RoutedApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (_) => const DefaultScreen(),
        '/about': (_) => const AboutScreen(),
      },
    );
  }
}
```

iOS:

```swift
struct RoutedFlutterScreen: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> FlutterViewController {
        let flutterEngine = FlutterEngine()
        flutterEngine.run(withEntrypoint: "routedMain", initialRoute: "/about")
        return FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
    }
    func updateUIViewController(_ uiViewController: FlutterViewController, context: Context) {}
}
```

This approach has a defect - each time a new FlutterEngine is created and the run() method is called, which starts the Flutter application from scratch. 

Why is this a problem?

The flutterEngine.run(...) method performs a full initialization of the Flutter engine, including loading the entire Dart VM runtime and loading the entire application. 

Worse yet, this call blocks the main thread and can cause the application to temporarily “hang”, or what is known as a UI freeze. From the user's point of view, the screen may look “cropped” before the Flutter view appears.

## Optimization: FlutterEngine singleton

To avoid delays every time the Flutter view is launched, a better approach is to prepare the FlutterEngine instance once - typically at application startup. This is most often done in the AppDelegate, where the engine is initialized and started only once during the app’s lifecycle.

iOS:

```swift
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    flutterEngine.run(withEntrypoint: "routedMain")
    return true
}
```

iOS:

```swift
let controller = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
```

By doing this, Flutter doesn’t need to be reloaded every time a Flutter screen is opened - the engine is already running, so transitions to Flutter views happen instantly.

Of course, calling flutterEngine.run(...) still takes time (in my case, ~233 ms on average), but this cost can be absorbed naturally during app startup, when other resources are being loaded anyway. This makes the delay imperceptible to the user, while giving you the benefits of a pre-warmed engine.

But beware - this approach has its limitations. If you run FlutterEngine.run(...) once with a specific entrypoint and initialRoute value, you can't change them later directly from iOS.

## Communication via MethodChannel

If you want to switch Flutter views dynamically, you can use MethodChannel instead of initialRoute.

iOS:

```swift
struct MethodChannelScreen: UIViewControllerRepresentable {
    let screenName: String
    let flutterEngine: FlutterEngine

    func makeUIViewController(context: Context) -> FlutterViewController {
        let controller = FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)

        let channel = FlutterMethodChannel(
            name: "com.example.events",
            binaryMessenger: controller.binaryMessenger
        )
        channel.invokeMethod("events", arguments: screenName)

        return controller
    }

    func updateUIViewController(_ uiViewController: FlutterViewController, context: Context) {}
}
```

Flutter:

```swift
@pragma('vm:entry-point')
void eventMain() {
  runApp(const EventScreen());
}

enum Event {
  loading, firstView, secondView;

  static Event? fromString(String value) {
    return Event.values.firstWhere(
      (e) => e.name == value,
      orElse: () => Event.loading,
    );
  }
}

class EventScreen extends StatefulWidget {
  const EventScreen({super.key});

  @override
  State<EventScreen> createState() => _EventScreenState();
}

class _EventScreenState extends State<EventScreen> {
  final _channel = MethodChannel('com.example.events');
  final ValueNotifier<Event> currentEvent = ValueNotifier(Event.loading);

  @override
  void initState() {
    super.initState();
    _channel.setMethodCallHandler((call) async {
      if (call.method == 'events') {
        final parsed = Event.fromString(call.arguments ?? "");
        if (parsed != null) {
          currentEvent.value = parsed;
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ValueListenableBuilder<Event>(
        valueListenable: currentEvent,
        builder: (context, value, _) {
          switch (value) {
            case Event.firstView: return FirstView();
            case Event.secondView: return SecondView();
            case Event.loading: return LoadingView();
          }
        },
      ),
    );
  }

  @override 
  void dispose() { 
    _channel.setMethodCallHandler(null); 
    super.dispose(); 
  }

}
```

To get around the limitation of not being able to change the initialRoute after FlutterEngine starts, we can take advantage of the communication between native code and Flutter using MethodChannel. This is a mechanism that allows us to exchange data and call methods between Dart and Swift (and vice versa).

In this approach:

* FlutterEngine is started once, at the start of the application  
* native code sends data to Flutter when the view is shown, e.g., telling it what screen should appear  
* Flutter responds to this data and dynamically switches the view

## Performance

Migrating an existing iOS app to Flutter introduces some performance overhead — particularly noticeable during app startup. I measured launch times in two different scenarios using Xcode's App Launch instrument:

* Launching the native iOS app **without** the Flutter framework
* Launching the iOS app **with** the Flutter framework embedded

All tests were conducted on an iPhone 12, in **release mode**, using the Instruments app. The app was **force-closed**, and the device was **rebooted before each run** to avoid any warm-start effects. Each result represents the **average of 10 separate runs**.

Here's a breakdown of the startup phases (in milliseconds):

| Scenario                         | Create the process | Frameworks initialize | Static Runtime Initialization |
|:--------------------------------:|:------------------:|:----------------------:|:-----------------------------:|
| Without Flutter framework        |     519.95 ms      |       81.23 ms         |           3.07 ms            |
| With Flutter framework embedded  |     512.27 ms      |      188.19 ms         |           6.88 ms            |

As shown above, the inclusion of the Flutter framework results in a 106.96 ms increase in the Frameworks initialize phase and a 3.81 ms increase in Static Runtime Initialization.

Additionally, I measured the average time for calling `flutterEngine.run()`, which was **~233 ms**. This call triggers the initialization of the Dart runtime and begins executing your Flutter entrypoint. Since this happens only once (if using a pre-warmed engine), the cost is incurred upfront but avoids delays during Flutter screen transitions.

## Migrate iOS app to Flutter – Summary

Migrating to Flutter in an existing iOS app doesn't have to be complicated. You can migrate gradually, starting with a single screen and choosing the approach that best fits your app's needs — that's the beauty of a gradual **migrate iOS app to Flutter** process.