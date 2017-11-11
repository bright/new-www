---
layout: post
title: Putting native in react native on android
author: radek
tags: ['android', 'react-native', 'java', 'platform specific']
---

Using custom native components in react native is common thing, so sooner or later you may have to write some functionality in native language and use it in your application. Let me show some simple example how to do that.

### One: write proof of concept in separate application
Our simple android-specific app will show the user information when headset is plugged in or out. It involves several native interactions:
* app lifecycle interaction while registering or unregistering listeners
* sending and receiving data with intents
* showing informations by toasts
* using application context

Assuming you are familiar with creating native android applications example below will be very easy. Our app use one activity with simple  layout, that later is gonna be irrelevant. Start with private field that will be used with our activity:

~~~~
private Context mContext;

private final BroadcastReceiver mHeadsetPlugReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(Intent.ACTION_HEADSET_PLUG)) {
            boolean plugged = (intent.getIntExtra("state", 0) == 1);
            String message = plugged ? "Headset plugged in" : "Headset plugged out";
            Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show();
        }
    }
};
~~~~

Remembering reference to application context may be skipped here, because we can always call `getApplicationContext` method within our Activity. `BroadcastReceiver` is an abstract class and describes behaviour on receiving informations via Intent.

Registering listener looks like this:

```
private void registerBroadcastReceiver() {
    IntentFilter filter = new IntentFilter();
    filter.addAction(Intent.ACTION_HEADSET_PLUG);
    registerReceiver(mHeadsetPlugReceiver, filter);
}
```

`registerReceiver` method is an Activity's method and may be invoked on Context class object.

In `onCreate` method save reference to application context and register broadcast receiver:

```
mContext = this;
registerBroadcastReceiver();
```

At the end, following clean coding principles, unregister receiver when closing application using Activity's `unregisterReceiver` method:

```
@Override
protected void onDestroy() {
    unregisterReceiver(mHeadsetPlugReceiver);
    super.onDestroy();
}
```

That's it, that is what we're going to work with. App looks like this when plugging the headset in:

![native app](/images/putting-native-in-rn/screenshot1.png)

Let's use it in our RN project!


### /react-project/android
In your react project directory there is `android` folder. It's structure looks like every android project and you may open it with Android Studio for convenient navigation. Source files are under `/app/src/main/java/{some}/{packages}/` and here we will add our code. We will have to pack our functionality in a specific way. Check `MainApplication.java` file first. It's extending `Application` class and implements `ReactApplication` interface. Take a look at `getPackages` method:

```
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage()
  );
}
```

Application written in react-native is build like any other android application, but react-native packages are added in real time and it is specified here. You may write any native code and link it here, but you have to add it as `ReactPackage` and add it to `getPackages`. In the simplest way we will need two files:
* package
* module

First create package file that implements `com.facebook.react.ReactPackage` interface. It's got three methods and it's basic implementation looks like this:

```
public class MyHeadsetLibPackager implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new MyHeadsetLibModule(reactContext));

        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}

```

The most important part is to initialize module in `createNativeModules` method:

```
modules.add(new MyHeadsetLibModule(reactContext));
```

MyHeadsetLibModule is how we name our second class. It will contain all functionality of our library. It is necessary to extend `com.facebook.react.bridge.ReactContextBaseJavaModule` class for that.


```

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class MyHeadsetLibModule extends ReactContextBaseJavaModule {

    public MyHeadsetLibModule(ReactApplicationContext reactContext) {

        super(reactContext);

        /*
            Our starting point.
        */

    }
}

```



### Gradle

```
dependencies {
    ...
    compile "com.facebook.react:react-native:+"
    ...
}

```


### Who's got the context?

### Using external libraries
Tune up our component and use some external library.
