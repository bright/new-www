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

That's it, that is what we're going to work with. App looks like this:


### Who's got context?

### Using external libraries
Tune up our component and use some external library.
