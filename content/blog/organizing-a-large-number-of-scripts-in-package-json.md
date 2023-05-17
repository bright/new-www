---
author: radek-l
tags:
  - development
  - JavaScript
date: 2023-05-17T13:01:57.863Z
meaningfullyUpdatedAt: 2023-05-17T13:01:57.898Z
title: Organizing a Large Number of Scripts in Package.json
layout: post
image: /images/blogpost_tip_packagejson.png
hidden: false
comments: true
published: true
---
**When it comes to managing a large number of scripts in your project's package.json file, it can quickly become challenging to navigate. However, there are simple steps you can take to make your scripts more organized and easier to read. In this short tutorial, we'll explore how adding separators can improve the readability of your package.json.**

<InstagramEmbed url='https://www.instagram.com/p/CjAVVlkIXbu/' />

Using separators in your scripts object helps create clear sections and group related scripts together. Let’s do it in a few simple steps:

“Scripts” object with no separators:

```javascript
"scripts": {
    "help": "scripts-help -w 40",
    "tsc": "tsc",
    "tscwatch": "tsc --watch",
    "serve": "serve ./site/"
  },

```