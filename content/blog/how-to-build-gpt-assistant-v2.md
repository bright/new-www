---
author: Rafal H
tags:
  - AI
  - OpenAI
  - GPT
  - Assistant
  - RAG
date: 2024-06-24T13:56:15.196Z
meaningfullyUpdatedAt: 2024-06-24T13:56:16.383Z
title: Using OpenAI Assistant v2 API to Build Your Own Knowledge Base Chatbot in 5 Minutes
layout: post
image: /images/GPT_assistant_v2.png
hidden: false
comments: true
published: true
language: en
---
<div className="image">![GPT assistant](../../static/images/GPT_assistant_v2.png "")</div>

**Some time ago, I created a [blog post](/blog/how-to-build-gpt-assistant/) on how to build your own chatbot using OpenAI's Assistant API in its v1 Beta. Since then, OpenAI has introduced v2 Beta [updates](https://platform.openai.com/docs/assistants/whats-new), and [GPT-4o](https://openai.com/index/hello-gpt-4o/) has been released. Let's delve into these developments to see how they can enhance our capabilities.**

## Assistant v2 API Updates
OpenAI has introduced some cool new features in the v2 API that we can leverage for our bots:
- **Improved file retrieval & parsing** - We can now import more knowledge files, parallelize them, and use them more efficiently than before. The notion of `vector stores` has been introduced, which allows for more efficient file searches.
- **More granularity in user control** - We can adjust the temperature for bot outputs (to control creativity), change the Top P setting, which affects bot diversity, and set the maximum number of tokens to control spending.
- **New models** - In addition to using fine-tuned models in the v2 API, we also have the option to use OpenAI's flagship model, GPT-4o. [GPT-4o is twice as fast and twice as cheap compared to GPT-4 Turbo](https://community.openai.com/t/announcing-gpt-4o-in-the-api/744700), although it is still [10x more expensive](https://openai.com/api/pricing/) than `GPT-3.5-turbo-0125` but is worth considering if you need more power for your use case.

## How to Create an Assistant?

If you followed my [blog post](/blog/how-to-build-gpt-assistant/) and created a v1 bot via Playground, you should be able to easily migrate to v2 using the new API version.

If you are starting from scratch, you need to create an OpenAI account and load it with resources. Then, head over to the [assistant tab](https://platform.openai.com/assistants) and click on the `Create` button.

First, enter the name of your assistant. Follow the provided instructions and select a model depending on your use case and the balance between "intelligence" and the number of queries your bot will handle (knowledge size, potential user count, etc.). In the retrieval part of the menu, add files that will be your external knowledge fed into the chatbot. For this tutorial, we will go with default file storage settings.

<div className="image">![File storage settings](../../static/images/how-to-build-gpt-assistant-v2/files.png "")</div>

## GPT Assistant Use Case

For this example, I will be using our Bright Inventions webpage data as knowledge for our chatbot. I created the `Bright assistant`, a helpful bot for employees to gather more information about the company without needing to scan the entire webpage. The use cases are unlimited - for instance, you could create a chatbot for potential customers to streamline the process of verifying the company’s experience and portfolio, or a customer support chatbot to feed in company FAQ knowledge.

The site is hosted on [GitHub](https://github.com/bright/new-www), and the relevant knowledge is located within markdown [files](https://github.com/bright/new-www/tree/gatsby/content/our-areas).

By manipulating files, I created `our-areas.txt`, a collection of all markdown posts from the [our-areas folder](https://github.com/bright/new-www/tree/gatsby/content/our-areas), and `our_projects.txt`, a text file containing all merged markdown files from the [projects folder](https://github.com/bright/new-www/tree/gatsby/content/projects). I uploaded them to my assistant and added them as knowledge.

<div className="image">![Knowledge store](../../static/images/how-to-build-gpt-assistant-v2/knowledge.png "")</div>

I added instructions for how the bot should behave, what knowledge was fed to it, and how the files are structured inside. I selected the `gpt-3.5-turbo-0125` model for a good balance between accuracy and costs and set the temperature to the minimum to ensure the bot is not too creative.

<div className="image">![Own assistant](../../static/images/how-to-build-gpt-assistant-v2/bright_assistant.png "")</div>

When I created my assistant, I started to test it via the playground by asking for knowledge available from the data:

<div className="image">![Own assistant response](../../static/images/how-to-build-gpt-assistant-v2/chatbot.png "")</div>

Hope you enjoy the tutorial! If you created a bot with the v1 version, make sure to upgrade to v2 and check out its improved performance. You will likely save some money on queries and make the reasoning more efficient.
