---
author: kamil-b
tags:
  - ios
  - development
date: 2023-07-26T06:53:35.469Z
meaningfullyUpdatedAt: 2023-07-26T06:53:36.097Z
title: Focusing Tests in Quick. A Tip for iOS Developers
layout: post
image: /images/blogpost_tip_ios.png
hidden: false
comments: true
published: true
language: en
---
**When writing unit tests in Quick, you can easily change it to `fit` to have a focused test – then only this one will execute. It is great for debugging. Check it out!**

<InstagramEmbed url='https://www.instagram.com/p/CkiXZj8DMtv/' />

In Quick you can focus on specific test with use of `fit`. Just change `it` to `fit` and only this test will run. It’s especially useful when we want to ensure that another test does not activate our breakpoint.

Similarly to fit you can focus groups of tests with use of `fcontext` and `fdescribe`. Then only tests within such group will run.

## Focusing test use case example

Let's say we are currently working only on the context where a user doesn't have available funds then instead of context we can write `fcontext` which means – focused context and only test cases from this context will be performed. 

```swift
 describe("Credit Card") {
            context("User has available funds to transfer") {
                beforeEach {
                    ...
                }
                it("Should show enabled button") { @MainActor in
                    ...
                }
                
                it("Should show transaction options") { @MainActor in
                    ...
                }
            }
            
            fcontext("User doesn't have available funds to transfer") {
                beforeEach {
                    ...
                }
                
                it("should show disabled button") { @MainActor in
                    ...
                }
                
                it("should show transactions history") { @MainActor in
                    ...
                }
            }
        }
```

Now only tests under the context of the user without any funds will be performed. You need to admit it's rather quick. I'll let myself out… 

**Have you enjoyed this bright dev tip? Let us know in the comments!**