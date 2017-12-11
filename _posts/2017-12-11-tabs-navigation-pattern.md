---
layout: post
title: Tabs - navigation pattern on Android
author: radek
tags: ['android', 'tabs', 'layout', 'user interface', 'customization']
---
Proper organizing content in your Android application may be achieved with wide range of layouts and widgets. Today I'd like to focus on tabs, that is what components are dedicated to use tabs in application, what are key principles in using them and how to customize it's view.

## Basic concept

// intro todo

What is it for?

Key feature is to make user aware of alternate views and give the ability to frequent switching between them. It may help to organize data sets (music > rock, pop, jazz, swing) or views with similar aspect (music > all, recent, recommended).

What is it NOT for?

Apps with deep navigation structure or apps with single core functionality. It might not be easy to classify the application like that, but it won't fit in most cases.

If we are starting to design tab layout, first let's define some principles that we will follow. It might be important to say it before starting the implementation and keep it in mind.

> Each tab should be equally important

Sometimes it might be a little confusing, but try to bring it to the basics. There's a little example:
Good usage: Horrors, Comedies, Thrillers, Drama
Bad usage: Blog, Store, Contact Us, About

> Follow layout principles

Even if we are going to customize our view, there's some points that we'll never break. I know you might disagree with some, but in my opinion these are what keeps the layout clear and understandable for the user. First of all, present tabs as a single row, either horizontal or vertical. Second, always highlight selected tab, so the user knows where he is in the app. Third, do not nest the tabs. Fourth, adjust tab name or view to it's content, so to the photos section lead tab with name "photos", not e.g. "recording".

> Keep consistent design of the tabs

It may be problematic in two cases. One is size of the tab, which should be similar for each one. You should be avoiding long descriptions in the tab, because it is easier to adjust size of one-word tabs to each others. Second is if you decide to use something more than text tabs, like with images for example, you should keep the pattern for each one and do not combine image tabs with text tabs. It brings unnecessary mess.



The concept above should be pretty general and mostly applies not only to the Android apps. From now on let's write some code! And this is going to be very Android-specific ;)



## Default usage

First, for using ` android.support.design.widget.TabLayout` add design support dependency to `build.gradle`:

```
compile 'com.android.support:design:__NEWEST_VERSION_HERE__'
```

Then we can define TabLayout into layout xml. The very basic usage of TabLayout is to use it as any other view container:

```xml
<android.support.design.widget.TabLayout
        android:id="@+id/myTabLayout"
        android:layout_height="wrap_content"
        android:layout_width="match_parent">

        <android.support.design.widget.TabItem
            android:text="DOGS"
            android:layout_height="wrap_content"
            android:layout_width="wrap_content" />

        <android.support.design.widget.TabItem
            android:text="CATS"
            android:layout_height="wrap_content"
            android:layout_width="wrap_content" />

    </android.support.design.widget.TabLayout>
```

Mind that only TabItem instances can be added to TabLayout.

Then, to take some actions when the tab is selected, we have to add listener to out tab layout:

```kotlin
myTabLayout.addOnTabSelectedListener( object : TabLayout.OnTabSelectedListener{
            override fun onTabReselected(tab: TabLayout.Tab?) {}

            override fun onTabUnselected(tab: TabLayout.Tab?){}

            override fun onTabSelected(tab: TabLayout.Tab?) {
                Toast.makeText(applicationContext,tab!!.text,Toast.LENGTH_SHORT).show()
            }

        })
```

in `onTabSelected` method we have access to selected tab and all it's view elements, like e.g. text. Very useful is especially `position` field, which can be used as an index to different container or as a reference to another view.

#### Adding tabs programmatically

To add tabs programmatically instead of defining it into xml simply use `addTab()` method. To add tab with single text simply define it like that:

```kotlin
val tab = myTabLayout.newTab()
tab.text = "DOGS"
myTabLayout.addTab(tab)
```

#### Custom Tab view

Fun part is to finally add some more interesting view of our tabs instead of using only text. Let's combine the text with some nice images! Like this:

[image]

Define round background for our image under `res/drawable`:

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="oval">
    <solid android:color="#ffffff" />
    <size
        android:width="48dp"
        android:height="48dp" />
</shape>
```

Then `custom_tab.xml` under `res/layout`

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:background="#888"
    android:layout_marginTop="10dp"
    android:layout_marginStart="10dp"
    android:gravity="center">

    <ImageView
        android:padding="15dp"
        android:id="@+id/tabImage"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:scaleType="centerInside"
        android:background="@drawable/white_circle" />

    <TextView
        android:paddingTop="5dp"
        android:id="@+id/tabText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="#000"
        android:textSize="12sp" />

</LinearLayout>
```

Under `drawable` again add some images you want to use for your tabs. Let's say the are `dog.png` and `cat.png`. Now adding neat tab with your custom layout will be as easy as last time.

```kotlin
val tab = LayoutInflater.from(applicationContext).inflate(R.layout.custom_tab, null)
tab.tabImage.setImageResource(R.drawable.dog)
tab.tabText.text = "DOG"
myTabLayout.addTab(myTabLayout.newTab().setCustomView(tab))
```



##Little fancy customization

In the end I'd like to share with you my concept of TabLayout view, feel free to take same inspiration. Here's how it's gonna look like:

![SlideLayout](path)

To achieve that we'll need to override some TabLayout functionality! This is what we gonna start with:

```kotlin
class SlideLayout @JvmOverloads constructor(
        context: Context,
        attrs: AttributeSet? = null,
        defStyleAttr: Int = 0) : TabLayout(context, attrs, defStyleAttr) {

  	init {
        addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {

            override fun onTabSelected(tab: TabLayout.Tab) {
                tab.customView?.tabText?.setTypeface(null, Typeface.BOLD)
            }

            override fun onTabUnselected(tab: TabLayout.Tab) {
                tab.customView?.tabText?.setTypeface(null, Typeface.NORMAL)
            }

            override fun onTabReselected(tab: TabLayout.Tab) = Unit

        })
    }

}
```

The simplest change is to make tab's text bold when it is selected. We need `addOnTabSelectedListener` where we can implement tab's behavior on selection. Then just apply `typeface` as above! In xml definition remove highlight with following attribute:

```xml
<com.bob.tabs.SlideLayout
    ...
	app:tabIndicatorHeight="0dp"
```

First step done.

#### Center tabs

Next thing we gonna do is to always display tabs with selected tab in the center. Add this attribute to xml definition:

```xml
<com.bob.tabs.SlideLayout
    ...
    app:tabMode="scrollable"
```

It will allow tabs to get over the screen. In consequence selecting different tabs will scroll the whole layout and display selected one in the center if the rest of the tabs fill remaining part of the screen. That means few first and few last tabs won't be centralized but aligned to the edge of the parent view. But! We can change it! In `onLayout` method let's do some math. We will add padding to first and last tab, so it always be on the center, and that's how we could calculate it:

```kotlin
override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    super.onLayout(changed, l, t, r, b)

    val lastTabIndex = getTabContainer()?.childCount?.minus(1) ?: 0
    val firstTab = getTabView(0)
    val lastTab = getTabView(lastTabIndex)

    if (firstTab != null && lastTab != null) {
        val paddingLeft = width / 2 - firstTab.width / 2
        val paddingRight: Int = width / 2 - lastTab.width / 2

        ViewCompat.setPaddingRelative(getTabContainer(), paddingLeft, 0, paddingRight, 0)
    }
}

```

And these are helping methods:

```kotlin
private fun getTabContainer(): ViewGroup? = getChildAt(0) as? ViewGroup
private fun getTabView(position: Int): View? = getTabContainer()?.getChildAt(position)
```



#### Resizing

Now last feature! Let's make our tabs resizing when they away from center, so we could get the impression they are on the carousel. Define some zoom multiplicators and help array:

```kotlin
private val MAX_ZOOM = 1.0f
private val MIN_ZOOM = 0.6f
private var screenPos = IntArray(2)
```

Then do some math once again! This time we need to override `onDraw` method:

```kotlin
override fun onDraw(canvas: Canvas) {

        getTabContainer()?.let {
            for (i in 0 until it.childCount) {
                getTabView(i)?.let {

                    it.getLocationOnScreen(screenPos)
                    val pos = screenPos[0]
                    val width = it.width

                    val scale: Float
                    val tabCenter = pos + width / 2

                    if (tabCenter <= 0 || getWidth() <= tabCenter) {
                        scale = MIN_ZOOM
                    } else {
                        val sliderCenter = (getWidth() / 2).toFloat()
                        val distance = Math.abs(sliderCenter - tabCenter)
                        scale = MAX_ZOOM - (MAX_ZOOM - MIN_ZOOM) * distance / sliderCenter
                    }

                    /* View draw start in left top corner */
                    it.pivotY = 0f

                    it.scaleX = scale
                    it.scaleY = scale

                }
            }
        }

        super.onDraw(canvas)
    }
```

While calculating how much to scale the tab, we need to define how far away (`distance`) is our tab from the center (`sliderCenter`). Base on that we choose scale multiplicator between `MIN_ZOOM` and `MAX_ZOOM`.



That's it, sliding tabs ready to use!

![Slide Penguin GIF](/images/radek/sliding_penguin.gif)



Full code you can find on [my github](https://github.com/user/project). It contains even more functionality with scrolling and docking tabs in the center. Feel free to test it, use it and modify it!

#### References:

1. [Tabs / material.io](https://material.io/guidelines/components/tabs.html)
2. [TabLayout / developer.android.com](https://developer.android.com/reference/android/support/design/widget/TabLayout.html)
