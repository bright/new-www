---
author: szymon-g
tags:
  - flutter
  - mobile development
  - android
date: 2025-06-04T11:38:58.354Z
meaningfullyUpdatedAt: 2025-06-04T11:38:58.365Z
title: "How to Migrate Android App to Flutter: Step-by-Step Guide"
layout: post
image: /images/from_android_to_flutter_update.png
hidden: false
comments: false
published: true
language: en
---
If you already have an existing app written in Android and want to gradually introduce Flutter (e.g., one screen at a time), the good news is: **you don’t need to rewrite the entire project**. You can successfully ***migrate your Android app to Flutter*** step by step.

In a previous blog post, I showed how to [migrate from iOS app to Flutter](https://brightinventions.pl/blog/migrating-from-ios-app-to-flutter/). In this article, we’ll focus on the Android side of the journey and explore multiple ways to integrate Flutter into your existing native app.

Let’s see how we can ***migrate an app from native Android to Flutter*** with minimal friction and maximum flexibility.

### **Project setup**

The official Flutter documentation provides detailed steps for integrating Flutter into an Android project: [Flutter Add-to-App – Android Project Setup](https://docs.flutter.dev/add-to-app/android/project-setup)

In this post, we'll skip the basic configuration and go straight to the part developers care about most: **how to launch Flutter screens from your Android app**.

We'll look at several methods \- from the simplest one to more advanced use cases involving cached engines and inter-platform communication.

### **Default FlutterActivity**

This is the simplest way to launch Flutter from Android \- without specifying custom routes or entrypoints. Perfect for testing or initial migration.

```kotlin
context.startActivity(FlutterActivity.createDefaultIntent(context))
```

In Dart, your app entrypoint might look like:

```dart
void main() {
  runApp(const DefaultScreen());
}
```

### **Cached FlutterEngine**

Creating and caching a **FlutterEngine** gives you more control and allows reuse across multiple launches, improving performance.

```kotlin
val engine = FlutterEngine(context)
engine.dartExecutor.executeDartEntrypoint(DartExecutor.DartEntrypoint.createDefault())
FlutterEngineCache.getInstance().put("engine_id", engine)
```

Then launch Flutter using the cached engine:

```kotlin
val intent = FlutterActivity
  .withCachedEngine("engine_id")
  .build(context)
context.startActivity(intent)
```

### **Custom entrypoint \+ initialRoute**

This lets you define a custom Dart function instead of the default main(), and you can also control which screen Flutter starts with using initialRoute.

```dart
@pragma('vm:entry-point')
void routedMain() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (_) => Text('Default'),
      '/about': (_) => Text('About screen'),
    },
  ));
}
```

```kotlin
val engine = FlutterEngine(context)
engine.navigationChannel.setInitialRoute("/about")
engine.dartExecutor.executeDartEntrypoint(
    DartExecutor.DartEntrypoint(
        context.assets,
        FlutterMain.findAppBundlePath(),
        "routedMain"
    )
)
FlutterEngineCache.getInstance().put("engine_id", engine)

val intent = FlutterActivity
  .withCachedEngine("engine_id")
  .build(context)
context.startActivity(intent)
```

### **Communicating with Flutter via MethodChannel**

For advanced integration, you can use a MethodChannel to dynamically send data from Android to Flutter \- like which screen to show or what state to update.

```kotlin
val engine = FlutterEngine(context)
engine.dartExecutor.executeDartEntrypoint(...)
FlutterEngineCache.getInstance().put("engine_id", engine)

val channel = MethodChannel(engine.dartExecutor.binaryMessenger, "com.example.events")
channel.invokeMethod("events", screenName)

startActivity(FlutterActivity.withCachedEngine("engine_id").build(context))
```

```dart
@pragma('vm:entry-point')
void eventMain() {
  runApp(const EventScreen());
}
```

```dart
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

### **Which method should I use?**

Not sure which approach is right for your use case? Here's a practical guide:

* **You want to quickly test or prototype a Flutter screen. Use Default FlutterActivity**

  This method is very easy to set up and doesn’t require any extra configuration. However, it creates a new FlutterEngine every time the screen is launched, which results in noticeably slower startup. It’s best suited only for internal testing and proof-of-concept work.

* **You want to reuse the Flutter engine and display a specific screen. Use Cached FlutterEngine with initialRoute or custom entrypoint**

  This method gives you better performance by caching the FlutterEngine, so the app doesn’t need to initialize Flutter on each launch. Additionally, it allows you to set the initial route or entry function, which is useful for showing predefined screens. Ideal for integrating simple, self-contained Flutter screens such as about pages.

* **You need full control and want to pass data or interact with Flutter dynamically. Use MethodChannel communication**

  This is the most flexible and powerful approach. It allows two-way communication between Android and Flutter at runtime, enabling you to send data. Perfect for scenarios where Flutter needs to be deeply integrated into your app’s business logic or dynamic flows.

  ### **Migrate Android app to Flutter – Summary**

Migrating from native Android to Flutter doesn’t have to be all-or-nothing. You can start small \- with a single screen \- and expand gradually as your team gains experience and confidence. This hybrid approach lets you test Flutter’s benefits in production without risking the stability of your entire app.