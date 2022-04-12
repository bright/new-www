---
author: rafal h
tags:
  - tips&tricks
  - xss
  - security
  - js
date: 2021-07-02T10:57:20.701Z
title: XSS - are you sure you are protected?
layout: post
image: /images/blog_post_xss.png
hidden: false
comments: true
published: true
---
As a developer, you probably have heard what [XSS](https://owasp.org/www-community/attacks/xss/) is and how to defend against it by escaping user input. You also probably might have heard that modern frontend frameworks like React or Angular are XSS safe (due to escaping). Still, though there are some XSS caveats worth remembering: 

Imagine you have a form where the user adds an address to his page/Facebook/Instagram etc. You might have HTML code like:


`<a href="https://brightinventions.pl/">User page</a>
`

When taking input from the user which later will be displayed in a href tag (or any other "new link" click tag-like frame) it is important to validate the protocol of the URL. User can simply add their page with javascript protocol and execute XSS.


`<a href="javascript:alert('XSS!');">User page</a>`


To conclude: to defend against XSS, besides escaping user input do validate the protocol of URL. Let me know if you have any other interesting thoughts when it comes to XSS!