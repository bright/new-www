---
layout: post
title: Adding features to your chart on Android
author: radek
hidden: true
tags: ['android', 'chart', 'live data', 'dynamic data']
comments: true
image: /images/radek/tuning.jpg
---

In the [previous post](https://brightinventions.pl/blog/charts-on-android-1/) I did show you how to make basic setup of android linear chart using [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart) library. Now I'll show you some features I found usefull.

![tuning](/images/radek/tuning.jpg)


## Live Data

## Custom tap chart event handling

## Viewport

Let's say you want to put readability aside, remove labels and axises with all that white spaces and make pure chart view fill the screen. Labels/ axis configuration is obvious, just disable them:

``` kotlin
    lineChart.axisLeft.isEnabled = false
    lineChart.axisRight.isEnabled = false
    lineChart.xAxis.isEnabled = false
    lineChart.description.isEnabled = false
    lineChart.legend.isEnabled = false
```
Unfortunately it does not make the job done. As you can see below there are still space between chart and parent view left.

![default viewport](/images/radek/chart_viewport_1.png)

How to disable chart padding? Library provides us simple way to modify chart's `Viewport`. In this case call method `setViewPortOffsets(0f,0f,0f,0f)` on chart object. It sets chart's offset (padding) to 0. Just remember all viewport modifications got to be called **after** data is set up.

##### BUT...!
It's a solution you need to be caution with. What does the documantation say about using this approach?
> USE THIS ONLY WHEN YOU KNOW WHAT YOU ARE DOING.

Why? In short adventure with chart's viewport I came across one problematic issue. Offset seems to be recalculated independently and every other view besides chart itself doesn't know about the change. This causes some render problems, for example like this:

![viewport issue](/images/radek/chart_viewport_2.png) 

Displayed value is the mentioned "other view" that does not know about the offset change, so edge values are cut. Keep this in mind modifying viewport! For more viewport modifications check out the project's [wiki page](https://github.com/PhilJay/MPAndroidChart/wiki/Modifying-the-Viewport).

## Drawable Values

If you need to mark any value in some special way you may define `Entry`'s `icon` property. It's an instance of a `Drawable` class, so it's very easy to layout the icon in resource file and then apply  it to the Entry. In our example let's mark with red dot each value that differs from the previous one more than *15* to see every bigger "jump" on the chart.

Define any drawable resource, for example 20x20 red oval:
``` xml
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <size android:width="20dp" android:height="20dp" />
    <solid android:color="#ff0000" />
</shape>
```

Now add some code to `getEntriesFromCSV` method. Before adding new `Entry` to an array, add the Drawable as the icon's property if the point fulfills the condition:

``` kotlin

data?.mapIndexed { index, foodSearch ->
    val entry = Entry(index.toFloat(), foodSearch.value.toFloat(), foodSearch)

    if (index != 0 && (foodSearch.value > data?.get(index - 1)!!.value + 15 ||
                    foodSearch.value < data?.get(index - 1)!!.value - 15)) {

        val icon = resources.getDrawable(R.drawable.ic_balloon, null)
        entry.icon = icon
    }

    entries.add(entry)
}

```

In order to see the icons, set the *drawIcons* flag to `true` on each `DataSet` object:

``` kotlin
bananaDataSet.setDrawIcons(true)
yogurtDataSet.setDrawIcons(true)
```

Thank's to that icons are displayed over specified entries:

![icons over values](/images/radek/chart_icons_1.png)