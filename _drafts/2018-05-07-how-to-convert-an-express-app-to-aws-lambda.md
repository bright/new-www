---
layout: post
title: How to convert an express app to AWS Lambda?
author: piotr
hidden: true
tags: aws cloudformation lambda cloudform
comments: true
crosspost: true
image: /images/lambda/lambda.png
---

In this post we will see how to convert an existing express application to AWS Lambda. This can help reduce AWS bill even by an order of magnitude. We will also use [cloudform](https://github.com/bright/cloudform) to describe the CloudFormation stack.

![lambda](/images/lambda/lambda.png)

## An express app

For our example to be complete we need an express application, obviously.