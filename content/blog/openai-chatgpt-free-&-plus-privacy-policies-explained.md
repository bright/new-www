---
author: rafal h
tags:
  - AI
  - ChatGPT
  - OpenAI
  - LLM
  - privacy
  - security
date: 2024-01-23T08:56:15.196Z
meaningfullyUpdatedAt: 2024-01-23T08:56:16.383Z
title: "OpenAI ChatGPT Free & Plus Privacy Policies Explained"
layout: post
image: /images/open_ai_privacy.png
hidden: true
comments: true
published: true
language: en
---
**Have you ever wondered how to stop OpenAI from learning from your data while keeping the history of your chats? We’ve got the solution for that! As our apps are gaining superpowers by integrating and using OpenAI features we should stop for a moment and think about the privacy of various solutions. Hopefully, this blog post will help you make smart decisions and allay doubts. If you just want to understand the basic privacy rules of OpenAI solutions, this article is also for you.**

<div className="image">![OpenAI privacy](../../static/images/open_ai_privacy.png"")</div>

It is the start of 2024. You might remember that we had a blog post about development trends for 2023 https://brightinventions.pl/blog/software-development-trends/ - one of them was about GPT. Frankly speaking, this was quite a good prediction - GPT’s and OpenAI are taking the world. There are more and more use cases for LLM’s in the apps we create every day - summary of the text, similarity check or sentiment analysis. We have started to use them for chatbots, virtual copilots or assistants to ease our everyday lives. LLM field of development is moving at a very fast pace, giving out new exciting features every day. 

Every day, new LLM solutions are deployed, both closed source like Bard from Google (with PaLM and Gemini), Claude from Anthropic and open source like LLama from Meta or Mistral. Still, LLMs are often associated with OpenAI company. That might be due to the fact that their solution was first in the market, they tend to have developed unbeatable GPT-4 (which competition claims (or not?) to overrun) and easy, straightforward access to API. They are also backed up by Mircosoft gigant, both in founding and infrastructure.

Generally speaking, OpenAI is a default “goto” address for anybody who would like to use LLM or integrate it into his app. Having that in mind, I will describe most of the relevant OpenAI solutions from the least private to the most private ones. I will also add a word or two about Microsoft Azure OpenAI service. All of the data that you will find here is up to date 11.01.2024. Please note though that in the end if your use case is a complicated one you should consult a lawyer and OpenAI yourself :).

## OpenAI Trust Portal

This is your go-to place for privacy and security when it comes to OpenAI. https://trust.openai.com/ Upon this page, we can see that OpenAI is CCPA, GDPR, SOC2 and SOC3 compliant (OpenAI not ChatGPT - please note the difference). You can download or request security papers from OpenAI. You can see the status of their infrastructure, all privacy policies, PII usage, data processing agreement or terms of service. It’s highly recommended to start your privacy journey here!

## ChatGPT Free Privacy and Data Security

With the free version of ChatGPT via web panel, you can use GPT-3.5 chats. Also, recently it should allow you to use Whisper API via iOS and Android WebApps. By default, it keeps a history of your chats. ChatGPT web has an opt-out model of data processing which you submit. On their page we can read
> When you use our non-API consumer services ChatGPT or Labs, we may use the data you provide us to improve our models.
> <cite>OpenAI trust portal [1]</cite>
[1]: https://trust.openai.com/?itemName=data_privacy&source=click

>
- that simply means that data you submit can be used to train the model. If you wonder how the data you provide is stored/processed later they say,
> We remove any personally identifiable information from data we intend to use to improve model performance. We also only use a small sampling of data per customer for our efforts to improve model performance.
> <cite>OpenAI trust portal [2]</cite>
[2]: https://trust.openai.com/?itemName=data_privacy&source=click

You can opt out of this behavior in the settings of your ChatGPT profile

<div className="image">![ChatGpt history training](../../static/images/ChatGPT_history_training.png "")</div>

What is important to mention is that
> This setting does not sync across browsers or devices. You will have to disable chat & history on each device/browser
> <cite>OpenAI help portal [3]</cite>
[3]: https://help.openai.com/en/articles/7730893-data-controls-faq

