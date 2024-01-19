---
author: pawel-p
tags:
  - AI
  - Embeddings
  - machine learning
  - rag
  - Retrieval Augmented Generation
  - langchain
date: 2024-01-17T17:48:16.934Z
meaningfullyUpdatedAt: 2024-01-17T17:48:16.946Z
title: Retrieval Augmented Generation (RAG) in Machine Learning Explained
layout: post
hidden: false
comments: true
published: true
language: en
---
Imagine that your company has access to a powerful AI tool that can process vast amounts of data and extract significant conclusions, identify key information, and effectively summarize it. Such capabilities could significantly enhance the efficiency of your employees' work, allowing them to focus on the most valuable aspects of their job, rather than on time-consuming data processing. In this context, Retrieval Augmented Generation (RAG) opens new perspectives. RAG i allows for the integration of AI models with specific, internal data of your company, enabling not only processing but also intelligent interpretation and utilization of this knowledge. In this article, we will explore how to accomplish this.

**Retrieval Augmented Generation (RAG) definition**

**RAG** is a technique that allows expanding the knowledge of the pre-trained language model with real-time information retrieval from a large database of documents.  

The basic prompt schema for querying a machine learning model looks like this:

<div className="image">![test](../../static/images/rag1.png "")</div>

In this situation, we ask the machine learning model about the capital of Poland. This is general knowledge, and our model has no problems with the answer.

**Going deeper with Retrieval Augmented Generation in machine learning**

Fancy to go deeper with this simple example? Let's say we would like to have a machine learning model that can answer questions about the plot of our original, never-published 300-page book titled 'My Story,' the only source of which is a .pdf file on our private laptop. Therefore, there is no chance that the model came into contact with this book during training, nor is there any chance it could find any information about it elsewhere.

If we asked the learning model about this story, the model could not answer it. This is how it would look:

<div className="image">![test2](../../static/images/rag2.png "")</div>