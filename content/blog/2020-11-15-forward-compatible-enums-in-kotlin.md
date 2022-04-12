---
crosspost: true
author: azabost
tags:
  - enum
  - kotlin
  - serialization
  - forward compatibility
date: 2020-11-17T18:49:00.000Z
title: Forward compatible enums in Kotlin
layout: post
image: /images/blog_post_forward_compatible.png
hidden: false
comments: true
published: true
---
A few years ago Adam outlined
[8 steps to keep your API sane](/blog/8-steps-to-keep-your-api-sane)
in his blog post which I really recommend if you haven't seen it yet.
The second step there, "be liberal in what the app accepts", is quite a
specific one because it is applicable not only to the backend side of
the API but also, if not the most, the clients of that API.

I cannot stress enough the importance of that rule in the "offline
first" apps. Let's take a look at some example.

## Example: 9GAG post tags

This is a screenshot where you can see a part of the tags list from the
9GAG Android app.

![9GAG post tags list](/images/forward-compatible-enums-in-kotlin/9gag-categories.jpg)

At least some of these tags look like they could have the appropriate
translations, e.g. the "Music" tag. I'm not saying 9GAG actually
translates them, but it would be understandable if they did. In case of
Android, we could use the
[string resource XML files for translations](https://developer.android.com/guide/topics/resources/localization)
like this:

*src/main/res/values/strings.xml*

```xml
<resources>
    <string name="tag_music">Music</string>
    <string name="tag_art">Art</string>
</resources>
```

*src/main/res/values-pl/strings.xml*

```xml
<resources>
    <string name="tag_music">Muzyka</string>
    <string name="tag_art">Sztuka</string>
</resources>
```

Although there are many ways to implement the same thing, it seems quite
reasonable to create an enum class for all the tags so that we can
easily store the string resource identifiers with the translations
there.

```kotlin
enum class PostTag(@StringRes val nameRes: Int) {
    MUSIC(R.string.tag_music),
    ART(R.string.tag_art)
}
```

Each 9GAG post could be described with these tag enums like this:

```json
{
  "content": "Lorem ipsum...",
  "tags": ["MUSIC", "ART"]
}
```

The client app could parse these enums and show the appropriate
translated tag names.

```kotlin
val postTagsNames = post.tags.map {
    context.getString(it.nameRes)
}
```

## Forward incompatible enums

Let's assume we use
[kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization)
library in the Android app to parse the JSON response bodies from the
API. The default and simplest approach to enum serialization will
probably look like this:

* add `@Serializable` annotation to the `PostTag` enum class
* the library will use the
  [`name` property](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-enum/name.html)
  to serialize and deserialize enums

Let's now imagine the backend developers extended the API by adding more
post tags, e.g. a "Books" tag (encoded to string as `"BOOKS"`), while
the Android app haven't been updated yet. With the simple approach
above, the app will most probably fail to deserialize the new and
unknown enum value `"BOOKS"` if a post contains one. In such case, we
will get the following exception:

```
kotlinx.serialization.SerializationException: com.example.9gag.posts.PostTag does not contain element with name 'BOOKS'
```

### Fallback enum value

While searching for a solution to this problem, we may find other people
implementing custom serializers with a dedicated "fallback enum value"
like in
[this article](https://medium.com/livefront/kotlinx-serialization-json-deserializer-with-a-fallback-79dd6e9d471f).
That approach requires us to add yet another enum value upfront and
configure the serialization library to use `FALLBACK` value whenever it
deserializes an unexpected string in JSON.

```kotlin
enum class PostTag(@StringRes val nameRes: Int) {
    MUSIC(R.string.tag_music),
    ART(R.string.tag_art),
    FALLBACK(R.string.tag_fallback)
}
```

As a result, the app will treat all the unknown enum values as the
fallback value. I think it's better than nothing as it allows the app to
handle the unknown values somehow, e.g. by ignoring them, but it's not
perfect either.

First of all, if we want to just ignore the unknown values, it doesn't
make sense to create a dedicated string resource (like
`R.string.tag_fallback`), but we have to do that because `nameRes`
property is non-nullable. On the other hand, if we make it nullable to
get rid of the unwanted resource, we will have to check the nullability
every time we process the post tags which is unnecessarily burdensome.

There's another one, even more important downside of the fallback enum
value approach. If our app caches the data from the API but we overwrite
the unknown values with said fallback value, we inevitably lose the
original values the app received. If we later update the client app by
adding the support for the `BOOKS` value, we will be forced to fetch the
data from the API again in order to restore the `BOOKS` tag value in the
post.

Of course, there are much more negative consequences possibly caused by
losing the original enum values, especially if we consider other types
of apps and features, but let's focus on solving the problem first.

## Forward compatibility of enums with [codified](https://github.com/bright/codified)

We came up with a better solution over a year ago, and it has been
working really well since then. In short, instead of using a fallback
enum values, we wrapped all the enums we send and receive from the APIs
in a dedicated, generic sealed class allowing us to handle the unknown
enum values very easily.

With
[codified library](https://github.com/bright/codified) we get the
ability to:

* serialize and deserialize both known and unknown enum values
* force the developers to handle both cases in
  [exhaustive `when` expressions](https://kotlinlang.org/spec/expressions.html#exhaustive-when-expressions)
* preserve the unknown enum string codes (instead of overwriting them)
* use custom string codes (i.e. different than enum names) for each enum
  value

In case of our exemplary `PostTag` enum class, all we need to do thanks
to the
[codified library](https://github.com/bright/codified) is:

* implement `Codified<String>` interface in enum class

  ```kotlin
  enum class PostTag(
      override val code: String, // allows using a custom string instead of enum's name
      @StringRes val nameRes: Int
  ) : Codified<String> {
      MUSIC("MUSIC", R.string.tag_music),
      ART("ART", R.string.tag_art)
  }
  ```
* declare the serializer object

  ```kotlin
  object PostTagCodifiedSerializer : KSerializer<CodifiedEnum<PostTag, String>> by codifiedEnumSerializer()
  ```
* use the serializer wherever we want

  ```kotlin
  @Serializable
  data class Post(
      val content: String,
      @Serializable(with = PostTagCodifiedSerializer::class)
      val tags: List<CodifiedEnum<PostTag, String>>
  )
  ```

When we deserialize the `Post` object from JSON and access the `tags`
property, we can:

* map all the known values to their translated names:

  ```kotlin
  val knownPostTagsNames = post.tags
      .mapNotNull { it.knownOrNull() }
      .map { context.getString(it.nameRes) }
  ```
* check if the particular enum value is known or not and handle all the
  possible cases

  ```kotlin
  val tag: CodifiedEnum<PostTag, String> // = ... get one from post.tags
  when (tag) {
      is CodifiedEnum.Known -> when (tag.value) {
          MUSIC -> TODO()
          ART -> TODO()
      }
      is CodifiedEnum.Unknown -> TODO()
  }
  ```
* get the original string value: `tag.code()`

We can easily create the enum wrapper for any known `PostTag`:
`PostTag.MUSIC.codifiedEnum()`.

We can also create a wrapper for an unknown value and preserve the
provided string code: `"BOOKS".codifiedEnum<PostTag>()`

## Conclusion

If you want to keep your API sane and create offline first applications,
you should consider the forward compatibility of your enums. Check out
[codified](https://github.com/bright/codified) and give it a try - it
will make your life much easier.

*Note: codified version `1.1` uses `kotlinx.serialization` version
`0.20.0`. Support for version `1.0.0` and later is coming soon.*

*Image by [Gerd
Altmann](https://pixabay.com/users/geralt-9301/) from [Pixabay](https://pixabay.com/)*