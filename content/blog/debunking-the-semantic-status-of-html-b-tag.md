---
author: rafal h
date: 2024-11-15T07:19:24.034Z
meaningfullyUpdatedAt: 2024-11-15T07:19:24.057Z
title: Debunking the Semantic Status of HTML <b> Tag
layout: post
image: ""
hidden: false
comments: false
published: true
language: en
---
In this article, I delve into the subtle differences between the `<b>` and `<strong>` HTML tags. I highlight their shared ability to visually emphasize text while also underscoring their unique semantic implications. Despite their apparent visual resemblance, these tags diverge significantly in their semantic roles, which in turn affects **accessibility**, **SEO**, and best practices in web markup.

## Understanding semantic tag

What is that “**semantic tag**” from the title? Semantic tags in HTML serve a specific purpose by encapsulating meaningful information about the content or structure of an element. They significantly boost **accessibility** (A11y) and search engine optimization (**SEO**), all while enhancing the readability of your code.

## The myth: `<b>` Is Not About Meaning

The myth revolves around the distinction between the `<b>` tag, primarily used for styling text to be bold, and the `<strong>` tag, which conveys semantic meaning by indicating important content.

You’ve likely heard that:

> `<b>` isn’t considered a semantic tag

Alternatively, you might have heard:

> `<b>` is used for styling purposes to make text bold, while `<strong>` holds semantic significance, emphasizing important content

There’s a misconception that `<b>` lacks semantic significance, while `<strong>` holds a deeper meaning, creating confusion about their appropriate usage.

It’s fascinating that if you inquire with ChatGPT about the differences between `<b>` and `<strong>` tags, you’ll encounter the myth I’m referring to:

<div className="image">![](/images/b-vs-strong.png "")</div>

Myths like this one often had some truth in the past. For instance, `<b>` was indeed linked with “bold” styling without conveying any specific meaning. Even the HTML4 specification categorized it under “**Font style elements**” \[1], explicitly stating its rendering as bold text style:

> B: Renders as bold text style.

This association with mere visual styling persisted until the HTML5 standard was introduced, bringing changes to these interpretations.

## The truth behind `<b>` versus `<strong>`

The evolution of HTML standards is fascinating. In the current HTML5 documentation, the `<b>` tag resides within the “**Text level semantics**” section \[2], marking a significant shift from its previous association in HTML4. Similar to its HTML4 counterpart, browsers still apply additional styles to the `<b>` element, rendering text bold as specified. However, in HTML5, `<b>` carries a semantic meaning, emphasizing its intended usage for specific purposes rather than simply applying font weight \[3]. Even on MDN’s specification for the `<b>` element, it’s referred to as “The Bring Attention To” element, \[4] highlighting its evolved role.

It’s intriguing: both `<b>` and `<strong>` can make the text bolder visually (but should not be used just to make text bold), yet they each carry distinct semantic meanings. At first impression, they may seem alike, but their semantics differ subtly, shaping their intended use in distinct ways.

`<b>` is not as impactful as `<strong>` according to HTML documentation, as it doesn’t inherently convey extra significance or importance. It’s suggested \[2] for instances like highlighting:

> \[…] key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.

A meaningful illustration of `<b>` usage would be:

`<p>The <b>primary</b> colors are red, blue, and yellow.</p>`

Here, no specific importance is attributed to the word “primary”  -  it is a **keyword**.

On the contrary, `<strong>` emphasizes the **significance**, **gravity**, or **urgency** of a specific part within the text, without altering the overall meaning of the content itself \[5]:

`<p><strong>Attention!</strong> All passengers must fasten their seatbelts during the flight.</p>`

## Impact on accessibility 

As noted earlier, semantic tags are generally intended to improve **accessibility** (A11y), but the practical difference between `<b>` and `<strong>` tags in this area is less significant than one might expect. While these tags have distinct semantic meanings - support for their unique purposes is not consistently implemented across all screen readers. As a result, in many cases, they behave exactly the same \[6] (just like a common text tag).

To observe this firsthand, you can enable VoiceOver on your computer or install a screen reader extension in your browser to test how these tags are interpreted. This discrepancy between specification and real-world implementation reveals a gap that still exists in how accessibility tools handle semantic tags.

## Summary

The rapid evolution of standards and specifications in various frontend technologies can be challenging to keep up with. It’s easy to miss subtle but impactful changes, especially when online resources offer conflicting information. I hope this article helped clarify the semantic differences between the `<b>` and `<strong>` tags, highlighting the unique roles each one plays.

### References

**\[1] HTML4 `<b>` spec**\
https://www.w3.org/TR/html401/present/graphics.html#edef-B

**\[2] HTML5 `<b>` spec**\
https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-b-element

[](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-b-element)**\[3] Using `<b>` and `<i>` elements**\
https://www.w3.org/International/questions/qa-b-and-i-tags

**\[4] `<b>`: The Bring Attention To element**\
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b[](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b)

**\[5] HTML5 `<strong>` spec**\
https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element

**\[6] Screen Readers support for text level HTML semantics**\
https://www.tpgi.com/screen-readers-support-for-text-level-html-semantics/