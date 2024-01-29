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

```shell
pip install langchain-community==0.0.11 pypdf==3.17.4 langchain==0.1.0 python-dotenv==1.0.0 langchain-openai==0.0.2.post1 faiss-cpu==1.7.4 tiktoken==0.5.2 langchainhub==0.1.14
```

Let's create a ‘data’ directory and place the PDF file in it.  We must also create a main.py file in the project directory, where we will store the whole code of our application.

In the main.py file, we will create main() function which will store the logic. The file will look like this:

```python
def main():
  print("Hello World!")

if __name__ == "__main__": 
  main()
```

Great! Let's move on to the implementation of logic now. 

### 2. Load the PDF file into the application

We will use a document loader provided by LangChain called PyPDFLoader. 

```python
from langchain_community.document_loaders import PyPDFLoader

pdf_path = "./data/2210.03629.pdf"

def main():
  loader = PyPDFLoader(file_path=pdf_path)
  documents = loader.load()
  print(documents) 

if __name__ == "__main__": 
  main()
```

First, we should **create an instance of the PyPDFLoader object** where we pass the path to our file. The next step is to simply **call the load function on this object** and save the loaded file in the documents variable. It will be an array consisting of Document objects, where each of these objects is a representation of one page of our file.

The print() function should output an array similar to this:

```
[Document(page_content='[...]', metadata={'source': pdf_path, page: 1}), Document(page_content='[...]', metadata={'source': pdf_path, page: 2}), ...]
```

### 3. Splitting document into smaller chunks

We don’t want to send a whole document as a context with our query to the LLM. Why? It was more detailedly described in the [article about the RAG](https://brightinventions.pl/blog/retrieval-augmented-generation-in-machine-learning/). **To split the document, we will use a class provided by LangChain called CharacterTextSplitter**, which we can import from the langchain library:

```python
from langchain.text_splitter import CharacterTextSplitter
```

Then we can create an instance of it and **call the split_documents() function**, passing our loaded documents as a parameter.

```python
def main():
  loader = PyPDFLoader(file_path=pdf_path) 
  documents = loader.load() 
  text_splitter = CharacterTextSplitter( chunk_size=1000, chunk_overlap=50, separator="\n" ) 
  docs = text_splitter.split_documents(documents)
```

Let's briefly describe what's going on here.

First, we are creating a CharacterTextSplitter object, which takes several parameters:

* **chunk_size** - defines the maximum size of a single chunk measured in tokens.
* **chunk_overlap** - defines the size of overlap between chunks. This helps to preserve the meaning of the split text by ensuring that chunks are not split in a way that would distort their meaning.
* **separator** - defines the separator that will be used to delineate our chunks.

In the docs variable, we will get an array of Document objects - the same as from the load() function of the PyPDFLoader class. But this time, this array will contain more elements because we have split them.

### 4. Prepare environment variables and API Key to store it there

​​The next step will be **converting these chunks into numeric vectors and storing them in a vector database.** This process is called [embeddings](https://brightinventions.pl/blog/understanding-embeddings-a-short-guide-with-an-example/), and there is also a blog post about it, so we won't go into detail about it now.

For the embeddings process, **we need an external embeddings model.** We will use OpenAI embeddings for this purpose. To do that, we have to generate an OpenAI API key. \
But before that, we have to create a .env file where we will store this key.

Now, we need to create an account on the [platform.openai.com/docs/overview](https://platform.openai.com/docs/overview) page.  Afterward, we should generate an API key on the [platform.openai.com/api-keys](https://platform.openai.com/api-keys) page by creating a new secret key.