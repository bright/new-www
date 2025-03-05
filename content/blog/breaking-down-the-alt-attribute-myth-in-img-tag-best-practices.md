---
author: rafal-op
tags:
  - frontend
date: 2025-03-05T08:55:11.365Z
meaningfullyUpdatedAt: 2025-03-05T08:55:12.296Z
slug: breaking-down-alt-attribute
title: Breaking Down the "alt" Attribute Myth in <img> Tag Best Practices
layout: post
image: /images/blogpost_blog__alt_image.png
hidden: false
comments: false
published: true
language: en
---
**As frontend engineers, embracing Accessibility (A11y) is our commitment to ensuring that our websites are welcoming to individuals with various disabilities. In this article, I will delve into a crucial aspect of A11y — the utilization of techniques that facilitate a seamless experience for visually impaired users.**

<div className="image">![](/images/blogpost_blog__alt_image.png "")</div>

## Introduction

One widely discussed practice is employing the **alt** attribute for all **`<img>`** tags, a simple yet impactful method to enhance the accessibility score of our pages. However, as we explore this approach, we’ll uncover nuances and consider scenarios where this practice may not only be unnecessary but potentially disruptive for users relying on screen readers.

## The alt attribute

The **alt** attribute serves a dual purpose. It acts as a fallback description in scenarios where an image fails to download or display correctly, and, crucially, contributes to **Accessibility** by providing screen readers with valuable descriptive content.

Commonly, discussions about the **alt** attribute carry an additional assertion: that it is a required attribute (and should always contain a description). While the **alt** attribute definitely helps with web **accessibility**, we'll explore situations where its insistence might be misunderstood, challenging existing beliefs and helping create a more balanced view of its role in building an inclusive online experience. Our myth can be defined as follows:

> The ‘alt’ attribute is required for the HTML `<img>` tag

<div className="image">![Usage of the alt attribute and it's effect when image is broken](/images/alt-img.png "")</div>

In the attached image, the effective utilization of the **alt** attribute is clearly evident, providing a descriptive and helpful description for an image that, for various reasons, may not be visually displayed. As we delve deeper into the subsequent section of this article, our focus will shift toward **Accessibility**. Here, we'll examine scenarios where the improper use of the alt attribute may pose challenges for users navigating the page, underscoring the significance of thoughtful and considerate implementation to enhance the overall user experience.

## When to Embrace and When to Pause?

While the **alt** attribute generally enhances our webpage by providing a description of images, it’s important to acknowledge that its use isn’t universal. There are instances where caution is advised. Specifically, when featuring images that complement the content, employing the **alt** attribute becomes crucial for delivering a meaningful description. This practice not only aligns with the right approach in web development but also ensures accessibility for users across various platforms, including web browsers and screen readers.

### Navigating Alt Attribute Omissions

Conversely, there are instances where refraining from using the **alt** attribute is advisable, mainly to avoid potential disruptions. 

#### Decorative images

One such scenario involves images that serve as mere embellishments rather than integral components of the page’s content. In essence, if an image is purely decorative and doesn’t contribute to a comprehensive understanding of the main content, omitting the **alt** attribute is a considered choice. Consider [MDN](https://developer.mozilla.org/) as an example. In the background, there’s a decorative image (specifically an `<svg>`, but it could be an `<img>`). This image is non-essential for comprehending the presented content, rather, it serves as a visual addition. If any issues arise with displaying this image, there’s no imperative to provide a description such as “*decorative image*” or “*mandala*”. Importantly, users relying on screen readers will seamlessly bypass this non-essential image without any disruption to their exploration of the page, as the main content remains unaffected by its absence.

<div className="image">![MDN Homepage with mandala pattern in the background](/images/mdn.png "")</div>

#### Images associated with corresponding text

Similarly, another scenario where using the **alt** attribute is discouraged involves images already associated with corresponding text. Taking a closer look at [Mozilla's page](https://www.mozilla.org/en-US/careers/listings/), specifically the **Products** menu with product/service options, each image (in this case, an `<img>` tag) is accompanied by the respective product/service name. In such cases, providing an **alt** attribute for a potentially malfunctioning image becomes redundant. The adjacent text carries enough information, ensuring that even if the image fails to load, the content’s understanding remains intact. If the product icon is displayed without accompanying text, it is essential to provide an alt attribute for accessibility.

<div className="image">![Mozilla careers menu](/images/mozilla-careers.png "")</div>

#### Images with text, associated with corresponding text

In more complex scenarios, such as when an image contains text (rather than being a simple icon), it may be possible to omit the alt attribute. This can be the case when the text is presented adjacent to the image in a way that screen readers can easily read, or when the text is purely decorative. See the example below for clarification:

<div className="image">![Image that shows example of image that doesn't require alt attribute](/images/firefox-question.png "")</div>

The text under the image matches the text on the image, making it easy to follow along without needing an extra alt attribute — no redundancy.

#### Summary

To sum up, you can skip the alt attribute in a few cases. First, for purely decorative images that add no meaningful content. Second, when images contain text that’s either decorative or already presented nearby. Third, you can also avoid it for redundant images, such as an icon next to a text that says the same thing.

### Alt Attribute Dilemma

How should we approach the absence of the **alt** attribute? Is it advisable to omit it entirely or include an empty string? Remarkably, these two scenarios yield disparate outcomes.

The recommended approach involves providing a meaningful **alt** attribute for instances where a fallback message is desired. In this case, screen readers will articulate the assigned value, and the browser will display the placeholder icon, contributing to an optimal accessibility experience.

When the **alt** attribute is absent, a fallback is automatically provided in the form of a placeholder icon, ensuring visibility for broken images and the screen reader reading the **src** attribute as a fallback. 

Conversely, employing an empty **alt** attribute (*alt=””,* which will be interpreted by Chrome dev tools as a just *‘alt’*) results in a `<img>` tag with 0x0 dimensions, the absence of the placeholder icon, and no acknowledgment by the screen reader, effectively concealing the image’s existence. 

<div className="image">![Code snippet that highlights distinctions in the usage of the alt attribute in various cases](/images/code-snippet-alt.png "")</div>

Presented below is a table that highlights and summarizes the distinctions between the three approaches

<div className="image">![Table that highlights distinctions in the usage of the alt attribute in various cases](/images/alt-summary.png "")</div>

In conclusion, when addressing scenarios where the **alt** attribute is deemed unnecessary and potentially disruptive, opting for an empty string as the value proves to be the most advantageous choice. This decision benefits both the web browser by eliminating the broken image icon and any additional text, and screen readers seamlessly bypass the image without registering its presence.

## Hands-On Exploration: Experience it Yourself!

Curious to witness the examples described earlier in action? Our focus will be creating a setup that allows us to experience these distinctions using a screen reader. To explore these differences, we’ll use the code snippet provided above

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alt attribute presentation</title>
  </head>
  <style>
  </style>
  <body>
    <img src="../path-to-image.jpg" alt="Cat photo" />
    <br />
    <img src="../path-to-image.jpg" />
    <br />
    <img src="../path-to-image.jpg" alt="" />
  </body>
</html>
```

To simulate a screen reader experience, we can utilize the “**Screen Reader**” Google Chrome extension (as well as built-in OS Voice Over), accessible [here](https://chromewebstore.google.com/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn?hl=pl&utm_source=ext_sidebar).

<div className="image">![Screen Reader Google Chrome extension logo](/images/screen-reader-logo.png "")</div>

Now, simply open the HTML file in your browser and activate the extension. Once enabled, you’ll notice an orange border highlighting the currently focused element. In the backdrop, you’ll find the document’s title, “*Alt Attribute Presentation*”. The first focused element will be “*Cat Photo*”, where, due to a broken image path, the **alt** attribute will be read aloud. To navigate to the next element, use the shortcut `Ctrl + Cmd + Arrow Down` (on Mac), and you’ll hear the path for the image (“*path-to-image*”). Significantly, attempting to advance reveals that the scenario involving an empty string as the **alt** attribute value is not considered, a choice that proves beneficial in certain cases, as demonstrated earlier.

## Summary

While incorporating the **alt** attribute is generally considered a best practice and is highly recommended, it’s crucial to engage in thoughtful consideration. We need to ask ourselves if the additional description truly enhances the accessibility (**A11y**) of our page. In certain scenarios, this extra information might prove troublesome for both screen readers and web browsers. Occasionally, it becomes essential to challenge the norm and prioritize the best possible experience for our visitors. Furthermore, mastering the ability to discern between various approaches to define the **alt** attribute allows us to choose the most fitting one for our specific case.

- - -

##### [](https://brightinventions.pl/blog/javascript-types-deobjectified/#take-a-look-at-our-earlier-blog-post-debunking-frontend-myths)Take a look at our earlier blog post debunking frontend myths:

1. [To 'b' or Not to 'b': The Semantic Status of HTML 'b' Tag](/blog/semantic-status-of-html-b-tag/)
2. [Understanding the Hoisting Behavior of let and const](/blog/let-const-hoisting/)
3. [JavaScript Types De-Objectified](/blog/javascript-types-deobjectified/)
4. [Eye on 'i' - Understanding 'i' as a Semantic Element](/blog/understanding-i-as-semantic-element/)