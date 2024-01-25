---
author: rafal h
tags:
  - AI
  - ChatGPT
  - OpenAI
  - LLM
  - privacy
  - security
  - enterprise
  - team
date: 2024-01-25T13:56:15.196Z
meaningfullyUpdatedAt: 2024-01-25T13:56:16.383Z
title: OpenAI ChatGPT Team & Enterprise Privacy Terms Explained
layout: post
image: /images/open_ai_privacy.png
hidden: true
comments: true
published: true
language: en
---
**Recently OpenAI introduced new business plans: ChatGPT Team and Enterprise. Which plan gives you more control over data retention? Which one might comply with the security regulations in your company? Let’s delve into the OpenAI privacy terms to find answers!**

<div className="image">![OpenAI privacy](../../static/images/openai-chatgpt-free-plus-privacy-policies-explained/open_ai_privacy.png "")</div>


In my last [blog post](/blog/openai-chatgpt-free-plus-privacy-policies-explained/) we have been tackling privacy terms when using basic, individual ChatGPT Free & Plus subscriptions. The control of the privacy there is quite limited but taking several precautions, as mentioned in the blog post, might be enough for you.

## OpenAI Trust Portal
I have already mentioned it in the last post but it’s worth reminding. **[OpenAI Trust portal](https://trust.openai.com/) is your go-to place for privacy and security when it comes to OpenAI.** Upon this page, we can see that OpenAI is CCPA, GDPR, SOC2, and SOC3 compliant (OpenAI, not ChatGPT - note the difference). Here you can download or request security papers from OpenAI. You can see the status of their infrastructure, all privacy policies, PII usage, data processing agreement, or terms of service. Highly recommended to start your privacy journey here!
## OpenAI Enterprise Privacy
Another interesting place to visit is **[Enterprise Privacy portal](https://openai.com/enterprise-privacy)**. It gives you more **insight into how your data is used if you choose an enterprise/business way of interacting with ChatGPT**.

## ChatGPT Team Privacy and Data Security

It’s a recently introduced ChatGPT solution for small businesses. It is slightly **more pricey than ChatGPT Plus** and it requires at least two licenses. **It adds extra features like higher message caps and the possibility to create and share custom GPTs with the rest of the workspace.**

From a privacy point of view, the most important thing is that **OpenAI doesn’t train on our data with this plan:**
<blockquote>
    <div>We do not train on your business data (data from ChatGPT Team, ChatGPT Enterprise, or our API Platform)</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

<blockquote>
    <div>We do not use your ChatGPT Team, ChatGPT Enterprise, or API data, inputs, and outputs for training our models.</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

That means that Team data is excluded from training by default. As opposed to individual subscriptions for ChatGPT we have an opt-in model here.

Also, when using the Team plan, **we have Admin console and Admin roles**. As we can read in the policy:
<blockquote>
    <div>Workspace admins have control over workspaces and access</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

**Data is stored for 30 days after deleting from the system**. End users from our team are in control of how long conversations are retained:
<blockquote>
    <div>Each of your end users controls whether their conversations are retained. Any deleted or unsaved conversations are removed from our systems within 30 days, unless we are legally required to retain them. Note that retention enables features like conversation history, and shorter retention periods may compromise product experience.</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

**Now, when our data is stored, who can see it?** Here’s an OpenAI explanation:
<blockquote>
    <div>Within your organization, only end users can view their conversations. Workspace admins have control over workspaces and access. Our access to conversations stored on our systems is limited to (1) authorized employees that require access for engineering support, investigating potential platform abuse, and legal compliance and (2) specialized third-party contractors who are bound by confidentiality and security obligations, solely to review for abuse and misuse</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

When it comes to **compliance with the product**, we can see it's still **a working process**:
<blockquote>
    <div>SOC 2 compliance coming soon</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>
 For GDPR
<blockquote>
    <div>we are able to execute a Data Processing Addendum (DPA) with customers for their use of ChatGPT Team, ChatGPT Enterprise, and the API in support of their compliance with GDPR and other privacy laws. Please complete our DPA form to execute a DPA with OpenAI.</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

## ChatGPT Enterprise Privacy and Data Security

ChatGPT Enterprise is designed with larger organizations in mind for utilizing ChatGPT.

You have to ask support to get individual quota about the pricing and you are obliged to buy multiple licenses. Apart from extra functionalities like **unlimited GPT-4 queries**, there are also some additional privacy features to discuss. Apart from what is available in the Team plan, the **workspace admins have control of data retention**: 
<blockquote>
    <div>You control how long your data is retained (ChatGPT Enterprise)</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>
<blockquote>
    <div>Your workspace admins control how long your data is retained. Any deleted conversations are removed from our systems within 30 days, unless we are legally required to retain them. Note that retention enables features like conversation history, and shorter retention periods may compromise product experience</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>
Having the admin’s control over data retention is a huge difference compared to the Team plan where
<blockquote>
    <div>Each of your end users controls whether their conversations are retained.</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

For compliance, same as the Team plan we are **eligible for GDPR compliance but it is already SOC 2 compliant:**
<blockquote>
    <div>ChatGPT Enterprise has been audited and certified for SOC 2 Type 1 compliance (Type 2 coming soon).</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

Also, we have a **SAML SSO authentication option:**
<blockquote>
    <div>Enterprise-level authentication through SAML SSO (ChatGPT Enterprise and API)</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

For both enterprise plans, there is information that 
<blockquote>
    <div>Data encryption at rest (AES-256) and in transit (TLS 1.2+)</div>
    <footer>[Enterprise Privacy portal](https://openai.com/enterprise-privacy)</footer>
</blockquote>

Hopefully, this post has given you some insights into privacy in ChatGPT Team and Enterprise and its opt-in model. We’ve analyzed services designed for business. **In the next blog post, I will dive into the last enterprise solution proposed by OpenAI**. This will be OpenAI API which grants the best possibilities when it comes to data control & privacy. We will **compare it with Azure OpenAI** service which is a common alternative when using API. Stay tuned!



