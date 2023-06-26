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
language: en
---
**When it comes to managing a large number of scripts in your project's package.json file, it can quickly become challenging to navigate. However, there are simple steps you can take to make your scripts more organized and easier to read. In this short tutorial, we'll explore how adding separators can improve the readability of your package.json.**

<InstagramEmbed url='https://www.instagram.com/p/CjAVVlkIXbu/' />

Using separators in your scripts object helps create clear sections and group related scripts together. Let’s do it in a few simple steps:

## “Scripts” object with no separators:

```javascript
"scripts": {
    "help": "scripts-help -w 40",
    "tsc": "tsc",
    "tscwatch": "tsc --watch",
    "serve": "serve ./site/"
  },
```

Prints the available commands with `npm run` as:

Scripts available in dev-tips@1.0.0 via `npm run-script`:

```javascript
  help
    scripts-help -w 40
  tsc
    tsc
  tscwatch
    tsc --watch
  serve
    serve ./site/
```

## But when separators are used like so:

```javascript
"scripts": {
    "help": "scripts-help -w 40",
    "\n========== Building ==========": "",
    "tsc": "tsc",
    "tscwatch": "tsc --watch",
    "\n========== Serving ==========": "",
    "serve": "serve ./site/"
  },
```

## The available commands are printed in a much more readable form:

Scripts available in dev-tips@1.0.0 via `npm run-script`:

```javascript
  help
    scripts-help -w 40
  
========== Building ==========
    
  tsc
    tsc
  tscwatch
    tsc --watch
  
========== Serving ==========
    
  serve
    serve ./site/

```

Check out [Github repository](https://github.com/bright/dev-tips/blob/main/javascript/grouped-commands-in-package.json).

More bright dev tips are coming soon!
