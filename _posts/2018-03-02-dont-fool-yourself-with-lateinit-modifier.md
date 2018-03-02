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

Kotlin language provides a nice and clean way to handle nullable variables in code so that it is less error prone. Unless you do it all wrong.

# lateinit modifier #

Normally, all the non-nullable properties in Kotlin classes must be properly initialized. You can do it in several ways:

* in primary constructor,
* in initializer block(s),
* in the class body,
* with a getter,
* with a delegate.

But if your property is lifecycle-driven (e.g. a reference to a button which gets inflated during Android Activity lifecycle) or it is initialized through dependency injection, you cannot supply a non-null initializer and you must declare its type as nullable. This in turn will require you to use null checks every time you reference the property, which may be a bit inconvenient. Especially if you are absolutely sure the property will get initialized at some point, before you access it for the first time.

Kotlin has a simple solution for such scenario, allowing you to mark the property with the `lateinit` modifier. Thanks to this, you can have a non-nullable type so that you don't have to check if it's `null` when referencing it. Of course, if you access the property before initialization, you'll get an `UninitializedPropertyAccessException`.

This possibility may be tempting to overuse in places where the initialization is not so sure, making the code less null-aware and more like Java.

![Risk inside](/images/dont-fool-yourself-with-lateinit-modifier/risk_inside.jpg){: .center-image}

# Ugly example #

I had an unpleasant opportunity to see something like this:

``` kotlin
class AccountCache {
    lateinit var accountHistoryObservable: Observable<BookingHistoryResponse>

    fun updateAccountHistory() {
        accountHistoryObservable = apiClientService.getCustomerBookingHistory().cache()
    }
}
```

getting initialized conditionally:

``` kotlin
class LoginFragment : Fragment() {

    @Inject
    lateinit var accountCache: AccountCache

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        // ...
        loginButton.setOnClickListener {
            login()
        }
    }

    fun login() {
        // ...
        accountCache.updateAccountHistory()
        // start MainActivity
    }
}
```

so that it can be later used here:

``` kotlin
class MainActivity : BaseActivity() {

    @Inject
    lateinit var accountCache: AccountCache

    override fun onCreate(savedInstanceState: Bundle?) {
        // ...
        accountCache.accountHistoryObservable.subscribe(
            // ...
        )
    }
}
```

At some point the app was enhanced with saving user session so that the user doesn't have to log in manually again when the app is launched again. Guess what? `LoginFragment` has been skipped, `MainActivity` has started and the app crashed with `UninitializedPropertyAccessException`.

Looks like typical Java `NullPointerException` issue? Yes, this is exactly the same problem, just the name of the exception has changed.

The conclusion from this example is very simple: don't fool yourself with `lateinit`.

# How not to fool yourself? #

Use nullable types.

That's all actually. And that's why Kotlin has nullable types - so that you can use them and be aware of possible issues. And no, you won't remember to initialize that `lateinit` property. And even if you will, your teammates won't. Just make everyone a favor and write code in a safe manner that doesn't depend on human mind.
