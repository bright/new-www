---
author: rafal-op
tags:
  - frontend
date: 2025-01-14T11:10:43.651Z
meaningfullyUpdatedAt: 2025-01-14T11:10:43.665Z
title: Eye on 'i'
layout: post
hidden: false
comments: false
published: true
language: en
---
**[In one of my earlier articles](/blog/semantic-status-of-html-b-tag/), I discussed a common misconception about HTML, focusing on the true purpose of the ‘b’ tag. In this article, I’ll dive into another myth in the frontend development world, one that’s closely related to that previous discussion.**

## The myth

Similar to the misconceptions about the `<b>` tag, there’s also a common misunderstanding surrounding the `<i>` tag, which goes like this:

> *The ‘i’ tag isn’t semantic, it just applies italic styling to text*

As with many myths, there’s a kernel of truth here. By default, the `<i>` tag does apply italic styling to the text it wraps. Historically, that was indeed its primary purpose. According to [HTML4 Specs](https://www.w3.org/TR/html401/present/graphics.html#edef-I), role of the `<i>` tag is specified as:

> Renders as italic text style

and it is group under “Font style elements” (same as 'b' from one of the previous myths)

The `<i>` tag is often compared to `<em>`, which is regarded as "`<i>` with semantic meaning”. This comparison, while popular, isn’t entirely accurate.

## The Truth

Nowadays, `<i>` has additional semantic meaning coupled with the default styles behavior. Current HTML specification, which describes `<i>` tag as the one responsible for fragment of text with alternate voice or for term which is for example technical definition, taxonomy name or idiom:

> The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts

In contrary, em tag — which also will be displayed by default as a italic text — is responsible for marking stress emphasis of the content

<p>Do it <em>now</em>!</p>