---
author: rafal-op
tags:
  - frontend
date: 2025-02-12T10:13:40.481Z
meaningfullyUpdatedAt: 2025-02-12T10:13:41.782Z
slug: understanding-i-as-semantic-element
title: Eye on 'i' - Understanding 'i' as a Semantic Element"
layout: post
image: /images/blogpost_blog__i_tag.png
hidden: false
comments: false
published: true
language: en
---
**[In one of my earlier articles](/blog/semantic-status-of-html-b-tag/), I discussed a common misconception about HTML, focusing on the true purpose of the `<b>` tag. In this article, I’ll dive into another myth in the frontend development world, one that’s closely related to that previous discussion.**

<div className="image">![Understanding i as a Semantic Element](/images/blogpost_blog__i_tag.png "")</div>

## The myth surrounding 'i' and semantics

Similar to the misconceptions about the `<b>` tag, there’s also a common misunderstanding surrounding the `<i>` tag, which goes like this:

> *The ‘i’ tag isn’t semantic, it just applies italic styling to text.*

As with many myths, there’s a kernel of truth here. By default, the `<i>` tag does apply italic styling to the text it wraps. Historically, that was indeed its primary purpose. According to [HTML4 Specs](https://www.w3.org/TR/html401/present/graphics.html#edef-I), role of the `<i>` tag is specified as:

> Renders as italic text style.

and it is group under “Font style elements” (same as 'b' from one of the previous myths).

The `<i>` tag is often compared to `<em>`, which is regarded as "`<i>` with semantic meaning”. This comparison, while popular, isn’t entirely accurate.

## The truth of 'i's semantic role

Nowadays, the `<i>` tag has gained additional semantic meaning beyond its default styling behavior. According to the [current HTML specification](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-i-element), the `<i>` element represents text in an alternate voice or mood, or set apart to indicate a different quality, such as taxonomic names, technical terms, idioms, or transliterations. Here’s how the specification defines the `<i>` element:

> The `<i>` element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.

In contrast, the `<em>` tag—which is also displayed as italicized text by default - [conveys stress or emphasis on the content](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-em-element), for example:\
`<p>Do it <em>now</em></p>`\
This indicates that "now" should be read with added emphasis.

## Impact on accessibility

Unfortunately, despite carrying semantic meaning, the `<i>` element is still treated as plain text by many [popular accessibility tools](https://www.tpgi.com/screen-readers-support-for-text-level-html-semantics/). For instance, while Chrome DevTools identifies the `<em>` element and labels it as "emphasis," it categorizes the `<i>` element as "static text," placing it in the same category as a standard `<p>` element or a `<b>` element.


<center>
<div className="image">![Difference between i and em tag in chrome dev tools](/images/i-tag-a11y.png "")</div>
</center>
## Summary

The `<i>` tag, originally used for italic styling, now carries semantic meaning in modern HTML, indicating text in an alternate voice or mood, such as technical terms or idioms. While it differs from the `<em>` tag, which denotes emphasis, accessibility tools still often treat `<i>` as regular text, limiting its semantic impact. Understanding this distinction is crucial for better web development and accessibility practices.

- - -

##### [](https://brightinventions.pl/blog/javascript-types-deobjectified/#take-a-look-at-our-earlier-blog-post-debunking-frontend-myths)Take a look at our earlier blog post debunking frontend myths:

1. [To 'b' or Not to 'b': The Semantic Status of HTML 'b' Tag](/blog/semantic-status-of-html-b-tag/)
2. [Understanding the Hoisting Behavior of let and const](/blog/let-const-hoisting/)
3. [JavaScript Types De-Objectified](/blog/javascript-types-deobjectified/)