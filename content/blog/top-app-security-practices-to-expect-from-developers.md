---
author: rafal h
secondAuthor: izabela
tags:
  - security
  - mobile
  - app
date: 2021-06-22T08:09:07.016Z
title: Top app security practices to expect from developers
layout: post
image: /images/security-apps.jpg
hidden: false
comments: true
published: true
---
**Are you going to hire a software development agency? Make sure that it will take care of your app security. Learn about best practices for software security. Be aware of what to expect from your developers’ team.**

![app security](/images/security-apps.jpg)

## OWASP rules must be a security bible

[OWASP Top Web Application Security Risks](https://owasp.org/www-project-top-ten/) **is a must-follow guide for every web developer** (and mobile as well). When you hire a [software development company](https://brightinventions.pl), make sure that they are not only familiar with OWASP but also follow it.

## Ensure that developers use security automation

Of course, **every [app development](/our-areas/web-development/) process should include a code review**. Nevertheless, it is **wise to use automation security as well**. Ensure that the developer team who works on your software, uses tools to double-check the security of your product. One of the most popular security tools is **Sonar Cube**. Also, it is recommended to use **Dependabot** built into GitHub.

Also, your development team should know how to **manage secrets**. They should follow common security practises. First of all, using tools like **GPG Suite** to safely share secrets. Second of all, using solutions like **Bitwarden** to make sure that secrets are stored and are accessible by each team member. Other important practices are: encrypting the disks, using proper password retention policy and Multi-Factor Authentication (MFA). Last but not least, VPN is a must!

## Don’t hesitate to use tools given by cloud providers

When it comes to software security (especially infrastructure security) the best practice is clear: **don’t reinvent the wheel**. Just use tools given by cloud providers.

Let’s take AWS as an example. It provides a few tools worth mentioning. One of them is **Web Application Firewall (WAF)** which helps to secure our apps from web exploits and bots. Another one is **Key Management Service (KMS)** that helps to manage your keys used to encrypt data. Also, it is reasonable to use **AWS Secrets Manager** which enables you to manage secret values safely, API keys, and other secret data. Developers who use AWS stack should deeply know these tools. 

Of course, using those tools may be costly. Yet it is better to pay for security tools than deal with financial and branding repercussions that often follow the security breach. 

## Conduct regular infrastructure reconnaissance scans

When your software is developed and you’ve met all the requirements mentioned earlier, it’s time to consider **infrastructure reconnaissance scans**. Your developer team should do scans regularly to double-check if your system has vulnerabilities related to issues such as: **various code injections, broken authentication or some sensitive data exposure**. In order to do that you can use tools like **Burp Suite** which allows for the request manipulation. Another important tool is **Shodan** that browses for open port, software and used dependencies vulnerability. Also, a significant part is to do reconnaissance infrastructure via certificate search engines like **crt.sh**.

## Follow the local law

Following security rules **helps to meet legal requirements**. A great example is European Union General Data Protection Regulation (GDPR). According to the UE law data breach can result in up to 20 million euros fine! Another important legal issue are software licenses. Remember to use the software which license isn’t too restrictive.

## The key to successful app development security

As you can see, **app development security isn’t a secret knowledge** possessed by elites. In the end, the most important fact is just to **follow the security guides** (btw this is an important [guide](https://owasp.org/www-pdf-archive/OWASP_Application_Security_Verification_Standard_4.0-en.pdf)) and **execute the best possible security work** from the developer team. 

**Are you looking for a software consulting studio? [Estimate your project!](/start-project)**