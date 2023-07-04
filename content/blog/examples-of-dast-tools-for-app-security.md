---
author: rafal h
tags:
  - development
  - QA
  - security
date: 2023-04-25T12:01:23.242Z
meaningfullyUpdatedAt: 2023-04-25T12:01:23.988Z
title: Examples of DAST Tools for App Security
layout: post
image: /images/dast_tools_cover.png
hidden: false
comments: true
published: true
language: en
---
**DAST tools are essential for testing the security of applications from the outside, simulating an attacker's perspective and identifying vulnerabilities that could be exploited. Check DAST tools that we use and recommend!**

## What are DAST Tools?

**DAST stands for Dynamic Application Security Testing**. DAST tools often provide the ability to proxy requests, record them, tamper with them, replay them, inject parameters, build a site map by crawling, and more.

<EbookDynamic sectionTitle='Read more about software security tools in a free ebook' ebookName='25-Tools-And-Extra-Tactics-For-App-Security-Ebook.pdf' ebookDescription='Looking for more ways to secure your digital product? Our free ebook is packed with additional tools and resources. Download it now!'  ebookImage='/images/cover_ebook_security.png' ebookAlt='ebook security cover' />

## DAST tools to consider for software security

Here are two DAST tools that are worth consideration.

**[OWASP Zap](https://owasp.org/www-project-zap/)**

* OWASP ZAP (Zed Attack Proxy) is a popular DAST tool available as freeware.
* With ZAP, you can run the proxy with a browser of your choice, and a site map is created as you navigate the page.
* ZAP's automatic scanner for requests is ongoing, alerting you to security issues as they arise, such as missing security headers or exposed data.
* You can navigate the page manually or use ZAP Spider to build a site map, and ZAP keeps a history of requests, allowing you to retry them with changed payloads.

**[Burp Suite](https://portswigger.net/burp)**

* Burp Suite is another DAST tool worth considering, with more extensions and better community support than ZAP.
* The Community Edition of Burp Suite offers some features for free, such as Repeater.
* To get started with Burp Suite, open a web browser from the Burp Community Edition app, and requests should be visible in the HTTP history.
* Like ZAP, Burp Suite allows you to build a site map by navigating the page manually or using the Burp Spider tool and keeps a history of requests.
* In the Community Edition of Burp Suite, you also have the option to inject various payloads (Intruder), check token randomness (Sequencer), decode the data (Decoder), or compare it (Comparer).

DAST tools play a crucial role in application security testing. Play a little bit with OWASP ZAP and Burp Suite and choose one that suits your needs best.

<EbookDynamic sectionTitle='Discover more software security tools in a free ebook' ebookName='25-Tools-And-Extra-Tactics-For-App-Security-Ebook.pdf' ebookDescription='Expand your security toolkit by downloading our free ebook today.'    ebookImage='/images/cover_ebook_security.png' ebookAlt='ebook security cover' />
