---
author: pawel-p
tags:
  - AI
  - langchain
date: 2024-01-29T17:02:53.378Z
meaningfullyUpdatedAt: 2024-01-29T17:02:53.398Z
title: Build LLM application with RAG (LangChain v0.1.0)
layout: post
hidden: false
comments: true
published: true
language: en
---
**Let’s build a simple LLM application in Python using the LangChain library as well as RAG and embedding techniques. Follow our step-by-step tutorial published after the new release of LangChain 0.1.0 in January 2024.**

In previous blog posts, we have described [how the embeddings](https://brightinventions.pl/blog/understanding-embeddings-a-short-guide-with-an-example/) work and [what the RAG technique is](https://brightinventions.pl/blog/retrieval-augmented-generation-in-machine-learning/). If you need to catch up with some basics, read the articles. Are you ready? Now it’s time to turn theory into practice!

## **How to build an LLM application from scratch**

**We will build a simple LLM application in Python using the LangChain library. LangChain is a popular library that makes building such applications very easy.**

**Our RAG application will expand an LLM's knowledge using private data.** In this case, it will be a **PDF file containing some text.** 

It's also possible to achieve a similar goal by using OpenAI agents and expanding their knowledge base with specific files by uploading them to OpenAI's servers for a designated agent. However, this method entails storing our confidential data with OpenAI's servers, which may not always align with our privacy preferences. My colleague – Rafał Hofman – wrote [a great article about data privacy in OpenAI services.](https://brightinventions.pl/blog/openai-chatgpt-free-plus-privacy-policies-explained/)

As the file for expanding knowledge, we will use an article about 'ReAct', titled '[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)'. This article discusses a research project that integrates decision-making and reasoning skills in large language models.

### 1. Prerequisites

At the very beginning, we must install all required modules, that our application will use. Let’s write this command in the terminal in the project directory

```
pip install langchain-community==0.0.11 pypdf==3.17.4 langchain==0.1.0 python-dotenv==1.0.0 langchain-openai==0.0.2.post1 faiss-cpu==1.7.4 tiktoken==0.5.2 langchainhub==0.1.14
```

Let's create a ‘data’ directory and place the PDF file in it.  We must also create a main.py file in the project directory, where we will store the whole code of our application.

In the main.py file, we will create main() function which will store the logic. The file will look like this:

```
def main():
  print("Hello World!")

if __name__ == "__main__": 
  main()

```