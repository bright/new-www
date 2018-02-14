---
layout: post
title: Your first chart in Android App
author: radek
hidden: true
tags: ['android', 'UI', 'chart', 'CSV']
comments: true
image: /images/radek/chart_mobile.jpeg
---

If you ever needed to add a chart to your Android app you certainly heard about [MPAndroidChart](https://github.com/PhilJay/MPAndroidChart) by [PhilJay](https://github.com/PhilJay). If not, consider use this powerful library. Let me show you how easy it is to start!

### Goal
Let's build a sample app which displays linear chart. Data, provided for it, will be static. To make it a little bit more interesting we're going to provide data with `.csv` file. It is very simple format for storing table-based data in form of text files where values are separated with comas (Coma Separated Values). We'll use [`OpenCSV`](http://opencsv.sourceforge.net/) library to parse it.

### Dependencies
```
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
```

```
dependencies {
    ...
    implementation "com.github.PhilJay:MPAndroidChart:v3.0.3"
    implementation "com.opencsv:opencsv:4.1"
}

```

### dfgdfgfd

`FoodSearch.kt`  
``` kotlin
package com.bi.chartapp

data class FoodSearch(
        val id: String,
        val googleTopic: String,
        val week_id: String,
        val value: Int
) {
    override fun toString(): String = "$id::$googleTopic::$week_id::$value"
}
```


`Parser.kt`
``` kotlin
package com.bi.chartapp

import com.opencsv.CSVReaderBuilder
import java.io.Reader

class Parser {

    companion object {

        fun toDataSet(reader: Reader): List<FoodSearch> {

            val csvReader = CSVReaderBuilder(reader)
                    .withSkipLines(1)
                    .build()

            val foodSearches = mutableListOf<FoodSearch>()
            var record = csvReader.readNext()

            while (record != null) {
                foodSearches.add(FoodSearch(record[0], record[1], record[2], record[3].toInt()))
                record = csvReader.readNext()
            }

            return foodSearches
        }
    }
}
```

`/app/res/raw`: `banana_bread.csv` & `frozen_yogurt.csv`
``` csv
id,googleTopic,week_id,value
banana-bread,/m/04cym9,2004-01,30
banana-bread,/m/04cym9,2004-02,31
banana-bread,/m/04cym9,2004-03,24
banana-bread,/m/04cym9,2004-04,27
```

`colors.xml`
``` xml
<color name="banana">#ffe100</color>
<color name="yogurt">#0085c7</color>
```

`MainActivity.kt`
``` kotlin
inner class MyAxisFormatter : IAxisValueFormatter {
    override fun getFormattedValue(value: Float, axis: AxisBase?): String {
        return if (value.toInt().rem(52) == 0) "${startingYear + value.toInt() / 52}"
        else ""
    }
}
```

``` kotlin
private fun configureSetLayout(set: LineDataSet, color: Int) {

    set.color = color
    set.fillColor = color
    set.setDrawCircles(false)
    set.mode = LineDataSet.Mode.CUBIC_BEZIER
    set.setDrawFilled(true)
    set.fillAlpha = 50 // 0-255

}
```

``` kotlin
private fun getEntriesFromCSV(rawResId: Int, label: String): LineDataSet {

    val stream = resources.openRawResource(rawResId)
    val data = Parser.toDataSet(stream.reader())
    val entries: MutableList<Entry> = ArrayList()

    data.mapIndexed { index, foodSearch ->
        entries.add(
                Entry(index.toFloat(), foodSearch.value.toFloat(), foodSearch)
        )
    }

    return LineDataSet(entries, label)
}
```

``` kotlin
val bananaDataSet = getEntriesFromCSV(R.raw.banana_bread, "Banana Bread")
val yogurtDataSet = getEntriesFromCSV(R.raw.frozen_yogurt, "Frozen Yogurt")
```

``` kotlin
val bananaColor = resources.getColor(R.color.banana, null)
val yogurtColor = resources.getColor(R.color.yogurt, null)

configureSetLayout(bananaDataSet, bananaColor)
configureSetLayout(yogurtDataSet, yogurtColor)
```

``` kotlin
lineChart.data = LineData(
    bananaDataSet,
    yogurtDataSet
)
```

``` kotlin
lineChart.xAxis.valueFormatter = MyAxisFormatter()
lineChart.xAxis.granularity = 52f
```

``` kotlin
lineChart.isHighlightPerTapEnabled = false
lineChart.isHighlightPerDragEnabled = false
lineChart.isScaleYEnabled = false
```

### Refs:
[Wiki](https://github.com/PhilJay/MPAndroidChart/wiki) & [Issues](https://github.com/PhilJay/MPAndroidChart/issues)
