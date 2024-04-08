---
author: eliasz
tags:
  - iOS
date: 2016-08-21T22:00:00.000Z
meaningfullyUpdatedAt: 2016-08-21T22:00:00.000Z
title: ReactiveCocoa UI bindings with Rex
layout: post
image: /images/bright_team-compressor.jpg
comments: true
published: true
---
Today, we will take a closer look at [Rex](https://github.com/RACCommunity/Rex) - ReactiveCocoa extensions. I find Rex pretty helpful when working with ReactiveCocoa, especially creating UI bindings.

If you are binding your view model with UI layer, Rex will let you do it much easier with it's extensions to `UIControls`. Here are some examples of `Rex` usage.

UIButton
---
```swift
let cocoaAction = CocoaAction(action) { _ in }

//without Rex
button.addTarget(cocoaAction, action: CocoaAction.selector, forControlEvents: .TouchUpInside)

//with Rex extensions
button.rex_pressed.value = cocoaAction
```

UITextField, UILabel, MutableProperty
language: en
---
```swift
var titleValue = MutableProperty<String?>(nil)

//without Rex
textField.rac_textSignal().subscribeNext {
  self.titleValue.value = $0 as? String
}

titleValue.producer.startWithNext {
  self.label.text = $0
  self.label.hidden = $0?.characters.count < 5
}

//with Rex
titleValue <~ textField.rex_text
titleLabel.rex_text <~ titleValue
titleLabel.rex_hidden <~ titleValue.producer.map({ $0?.characters.count < 5 })
```

You can clearly see that `Rex` makes our bindings much easier to read and understand. These are just examples, but you can find much more interesting properties like `rex_selectedSegmentIndex` for `UISegmentedControl` or `rex_on` for `UISwitch`. Moreover, `Rex` comes with some handy signal transformations, so go check it out!

*This article is cross-posted with my [my personal blog](http://eluss.github.io/).*
