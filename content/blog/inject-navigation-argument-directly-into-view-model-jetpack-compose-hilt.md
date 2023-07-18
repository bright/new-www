---
author: radek
tags:
  - Android
  - JetpackCompose
  - Hilt
  - navigation
date: 2023-07-18T07:14:04.171Z
meaningfullyUpdatedAt: 2023-07-18T07:14:04.710Z
title: How to Inject Navigation Argument Directly into View Model with Jetpack
  Compose and Hilt
layout: post
image: /images/android_hilt_blog_post.png
hidden: false
comments: true
published: true
language: en
---
**When using the Jetpack Compose navigation you may sooner or later come across the problem of passing arguments between the screens. The solution is fairly well described in the official [Android documentation](https://developer.android.com/jetpack/compose/navigation). Let's follow the documentation and go over a few issues that you might encounter on the way.**

## The problem

Following the official documentation we’re ending up with a `NavHost` setup, defined routes and the following view model setup:

```kotlin
class UserViewModel(
    savedStateHandle: SavedStateHandle,
    private val userInfoRepository: UserInfoRepository
) : ViewModel() {

    private val userId: String = checkNotNull(savedStateHandle["userId"])
    private val userInfo: UserInfo = userInfoRepository.getUserInfo(userId)

    // ...
}
```

With this approach we don’t add a lot of code to the view model in order to retrieve the desired navigation argument. Yet there might be two issues to consider:

* With more arguments we keep putting more code to the view model class,
* If we want to write tests for our view model we need to mock the `SavedStateHandle` and any repository we’re using, like `UserInfoRepository` in the example above.

## Hilt to the rescue

<GiphyEmbed url='https://giphy.com/gifs/baywatch-hasselhoff-the-hoff-yI73Iv1vLqJCo' />

Using Hilt we can add an in-the-middle module that could resolve `SavedStateHandle` and pass the actual navigation argument directly to the view model.

```kotlin
@Module
@InstallIn(ViewModelComponent::class)
object UserScreenNavigationArgModule {

    @Provides
    @ViewModelScoped
    fun provideUserInfo(
        savedStateHandle: SavedStateHandle,
        userInfoRepository: UserInfoRepository,
    ): UserInfo {
        val userId: String = checkNotNull(savedStateHandle["userId"])
        return userInfoRepository.getUserInfo(userId)
    }
}
```

```kotlin
@HiltViewModel
class UserViewModel(
    private val userInfo: UserInfo
) : ViewModel() {
    // ...
}
```

Just two remarks:

* Install the module in the `ViewModelComponent` class
* Narrow the scope using the `@ViewModelScoped` annotation

## Links

If you need to test this solution on a working example I’ve prepared one.

Sample app: https://github.com/radek-bright/demo-navigation-arguments

## Side Note: Motivation

P.S. for a background reference. In the not-so-distant past, when using Dagger2 and Fragments, we could have skipped injecting `Bundle` objects into view models and take advantage of a custom per-fragment navigation argument module that we could include with `@ContributesAndroidInjector`. I’m not going to go through the process, but just for the reference the core looked like this:

```kotlin
@Module
interface InjectorModule {
    @ContributesAndroidInjector(modules = [ArgsModule::class])
    fun contributeMyFragment(): MyFragment
}

@Module
class ArgsModule {
    @Provides
    fun provideMyArgument(fragment: MyFragment): MyArgument =
        fragment.arguments?.getSerializable("MY_ARGUMENT_KEY") as MyArgument
}

class MyFragmentViewModel @Inject constructor(
    private val myArgument: MyArgument,
)
```

<GiphyEmbed url='https://giphy.com/gifs/TheDemocrats-dnc-democrats-dncigf-DXC8bM9ZM4Wn3PDvK7' />
