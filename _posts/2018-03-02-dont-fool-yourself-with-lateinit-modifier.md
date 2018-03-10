---
layout: post
title: Don't fool yourself with lateinit modifier
image: /images/dont-fool-yourself-with-lateinit-modifier/risk_inside.jpg
author: azabost
crosspost: true
comments: true
hidden: true
tags: android kotlin
---

Kotlin language provides a nice and clean way to handle nullable variables in code so that it is less error prone. Unless you do it all wrong, of course.

# lateinit modifier #

Normally, all the non-nullable properties in Kotlin classes must be properly initialized. You can do it in several ways:

* in primary constructor,
* in initializer block(s),
* in the class body,
* with a getter*,
* with a delegate*.

_* Well, it's not an initialization per se, but it makes compiler aware that's not `null`_

But if your property is lifecycle-driven (e.g. a reference to a button which gets inflated during Android Activity lifecycle) or it is initialized through dependency injection, you cannot supply a non-null initializer and you must declare its type as nullable. This in turn will require you to use null checks every time you reference the property, which may be a bit inconvenient, especially if you are absolutely sure the property will get initialized at some point, before you access it for the first time.

Kotlin has a simple solution for such scenario, allowing you to mark the property with the `lateinit` modifier. Thanks to this, you can have a non-nullable type so that you don't have to check if it's `null` when referencing it. Of course, if you access the property before initialization, you'll get an `UninitializedPropertyAccessException`.

# Dos and dont's #

The described possibility, despite being a great feature, may also be tempting to overuse in places where the initialization is not so sure (e.g. conditional or just _too late_), making the code less null-aware, less predictable and more like Java, thus - naturally - you might be doubtful if certain usages are right or not. So here's my rule of thumb that I use when making decision if particular variable should be `lateinit` or just nullable. It's very subjective and it tends to change with time so feel free to share your own experiences in comments.

## Do #1: beginning of a lifecycle ##

You can intialize properties when your classes' lifecycle-beginning methods get invoked, e.g. `Activity.onCreate()`. It's a common case if you use a dependency injection framework like [Dagger](https://google.github.io/dagger/).

```kotlin
abstract class BaseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        AndroidInjection.inject(this)
        super.onCreate(savedInstanceState)
    }
}

class LoginActivity : BaseActivity() {

    @Inject
    lateinit var viewModelFactory: ViewModelProvider.Factory

    lateinit var viewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        viewModel = ViewModelProviders.of(this, viewModelFactory).get(LoginViewModel::class.java)

        setContentView(R.layout.login_activity)
    }
}
```

It's also very useful if you want to `getSystemService()`:

```kotlin
class MainActivity : AppCompatActivity() {

    lateinit var alarmManager: AlarmManager

    // This wouldn't work:
    // val alarmService = getSystemService(AlarmManager::class.java)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        alarmManager = getSystemService(AlarmManager::class.java)
}

```

Otherwise you would get an `IllegalStateException` saying that system services are not available to Activities before `onCreate()`.

You can also avoid `this` reference to escape during object construction [for thread-safety](https://wiki.sei.cmu.edu/confluence/display/java/TSM01-J.+Do+not+let+the+this+reference+escape+during+object+construction):

```kotlin
class MyActivity : AppCompatActivity() {

    lateinit var alien: Alien
    // instead of:
    // val alien = Alien(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        alien = Alien(this)
    }
}
```

## Do #2: crash-free approach ##

TBD

// You prefer the app to not work (fail silently) than to crash

## Do #3: documented design decision ##

TBD

// Something should be initialized and the dev team knows how to handle it

![Risk inside](/images/dont-fool-yourself-with-lateinit-modifier/risk_inside.jpg){: .center-image}

## Don't #1: undocumented design decision ##

TBD

// Something should be initialized but it's hidden, not obvious, undocumented and nobody remembers about it

## Don't #2: very late initialization ##

TBD

// Init just before `startActivityForResult` and access it in `onActivityResult`

## Don't #3: mutabiltiy ##

TBD

// `lateinit` must be `var`; `lazy` delegate can be used with `val`

## Don't #4: explicit nulling ##

TBD

// You need to assign `null` reference at some point, but why?

# How not to fool yourself? #

Make the property nullable if it makes better sense and improves null safety. `lateinit` might be good if used properly but it has its cons as well. Don't make it a replacement for `NullPointerException`.
