---
author: pawel-p
tags:
  - AI
  - RAG
  - langchain
date: 2024-01-30T09:03:52.457Z
meaningfullyUpdatedAt: 2024-01-30T09:03:53.266Z
title: Build LLM application with RAG (LangChain v0.1.0)
layout: post
image: /images/python_langchain.png
hidden: false
comments: true
published: true
language: en
---
**Let’s build a simple LLM application in Python using the LangChain library as well as RAG and embedding techniques. Follow our step-by-step tutorial published after the new release of LangChain 0.1.0 in January 2024.**

<div className="image">![Cover photo](../../static/images/python_langchain.png "")</div>

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

Copy the secret key and paste it into the .env file like this:

```
OPENAI_API_KEY=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
```

This key will be deleted before the publication of this post, so you will be not able to use it.

Okay, let’s load environment variables into our project by importing the load_dotenv function:

```python
from dotenv import load_dotenv
```

And call it at the very beginning of the main function:

```python
def main(): 
	load_dotenv()
	loader = PyPDFLoader(file_path=pdf_path) 
	documents = loader.load() 
	text_splitter = CharacterTextSplitter( chunk_size=1000, chunk_overlap=50, separator="\n" ) 
	docs = text_splitter.split_documents(documents)
```

### 5. Implementing the embedding process

At first, we have to import OpenAIEmbeddings class:

```python
from langchain_openai import OpenAIEmbeddings
```

Then we should create an instance of this class. Let’s assign it to the 'embeddings' variable like this:

```python
embeddings = OpenAIEmbeddings()
```

### 6. Setting up local vector database - FAISS

Awesome! We have loaded and prepared our file, and we have also created an object instance for the embeddings model. **We are now ready to transform our chunks into numeric vectors and save them in a vector database.** We will keep all our data locally using the FAISS vector database. Facebook AI Similarity Search (Faiss) is a tool designed by Facebook AI for effective similarity search and clustering of dense vectors. 

First, we need to import the FAISS instance:

```python
from langchain_community.vectorstores.faiss import FAISS
```

And implement the process of converting and saving embeddings:

```python
def main(): 
	load_dotenv() 
	loader = PyPDFLoader(file_path=pdf_path) 
	documents = loader.load() 
	text_splitter = CharacterTextSplitter( chunk_size=1000, chunk_overlap=50, separator="\n" ) 
	docs = text_splitter.split_documents(documents) 
	embeddings = OpenAIEmbeddings() 
	vectorstore = FAISS.from_documents(docs, embeddings)    
	vectorstore.save_local("vector_db")
```

We have added two lines to our code. The first line takes our split chunks (docs) and the embeddings model to convert the chunks from text to numeric vectors. After that, we are saving the converted data locally in the 'vector_db' directory.

### 7. Creating a prompt

For preparing a prompt we will use a 'langchain' hub. We will pull a prompt called 'langchain-ai/retrieval-qa-chat' from there. This prompt is specially designed for our case, allowing us to ask the model about things from the provided context. Under the hood, the prompt looks like this:

```
Answer any use questions based solely on the context below:
<context> 
{context}
</context>
```

You can check it here - https://smith.langchain.com/ in the hub section, but you will have to create an account for that.

Let’s import a hub from the 'langchain' library:

```python
from langchain import hub
```

Then, simply use the 'pull()' function to retrieve this prompt from the hub and store it in a variable:

```python
retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")
```

### 8. Setting up a large language model

Great. The next thing **we'll need is a large language model** - in our case, it will be one of the OpenAI models. Again, we need an OpenAI key but we have already set up it along with the embeddings, so we don't need to do it again.

Let's go ahead and import the model:

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
```

And assign it to a variable in our main function:

```python
llm = ChatOpenAI()
```

### 9. Retrieve context data from the database

Okay, we have finished preparing the vector database, embeddings, and LLM (large language model). Now, **we need to connect everything using chains.** We will need two types of chains provided by 'langchain' for that.  

The first one is the 'create_stuff_documents_chain,' which we need to import from the 'langchain' library:

```python
from langchain.chains.combine_documents import create_stuff_documents_chain
```

Next, pass our large language model (LLM) and prompt to it.

```python
combine_docs_chain = create_stuff_documents_chain(llm, retrieval_qa_chat_prompt)
```

This function returns an LCEL Runnable object, which requires a context parameter. Running it will look like this:

```python
combine_docs_chain.invoke({"context": docs, "input": "What is REACT in machine learning meaning?"})
```

### 10. Retrieve only the relevant data as a context

Generally, it will work, but in this situation, we will pass all chunks - the entire document - as the context. In our case, where the file has 33 pages, **this context is too large,** and we will probably encounter an error like this:

```python
openai.BadRequestError: Error code: 400 - {'error': {'message': "This model's maximum context length is 4097 tokens. However, your messages resulted in 33846 tokens. Please reduce the length of the messages.", 'type': 'invalid_request_error', 'param': 'messages', 'code': 'context_length_exceeded'}}
```

**To fix that, we need to pass only the information related to our query as the context.** We will achieve this by combining this chain with another one, which will retrieve only the chunks important to us from the database and automatically add them as context to the prompt.  

Let's import that chain from the 'langchain' library:

```python
from langchain.chains import create_retrieval_chain 
```

First, we need to prepare our database as a retriever, which will enable semantic search for the chunks that are relevant to our query.

```python
retriever = FAISS.load_local("vector_db", embeddings).as_retriever()
```

So, we load our directory where we store the chunks converted to vectors and pass it to an embeddings function. In the end, we return it as a retriever.  

Now, we can combine our chains:

```python
retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)
```

Under the hood, it will retrieve relevant chunks from the database and add them to our prompt as context. All we have to do now is **invoke this chain with our query as an input parameter:**

```python
response = retrieval_chain.invoke({"input": "What is REACT in machine learning meaning?"})
```

As a response, we will receive an object with three variables:

* **input** - our query;
* **context** - an array of documents (chunks) that we have passed as context to the prompt;
* **answer** - the answer to our query generated by the large language model (LLM).

Let’s print out the "answer" property:

```python
print(response["answer"])
```

Our printed answer looks as follows:

> In the context provided, ReAct refers to an approach or methodology used in machine learning. It stands for "Reasoning + Acting" and aims to integrate decision-making and reasoning capabilities into a large language model. ReAct allows the model to interact with external sources, such as knowledge bases or environments, to gather additional information and improve its task-solving abilities. It has been applied to various language and decision-making tasks, demonstrating effectiveness over state-of-the-art baselines and improved interpretability and trustworthiness.

Looks pretty nice :) 

### 10. You’ve made it! Our LLM app is ready

We have extended the knowledge base of the LLM model with data from a .pdf file. The model is now able to answer our questions based on the context that we have provided in the prompt.

Final code:

```python
from dotenv import load_dotenv
from langchain import hub
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores.faiss import FAISS

pdf_path = "./data/2210.03629.pdf"


def main():
    load_dotenv()

    loader = PyPDFLoader(file_path=pdf_path)
    documents = loader.load()

    text_splitter = CharacterTextSplitter(
        chunk_size=1000, chunk_overlap=50, separator="\n"
    )
    docs = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local("vector_db")

    retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")

    llm = ChatOpenAI()

    combine_docs_chain = create_stuff_documents_chain(llm, retrieval_qa_chat_prompt)

    retriever = FAISS.load_local("vector_db", embeddings).as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

    response = retrieval_chain.invoke(
        {"input": "What is REACT in machine learning meaning?"}
    )

    print(response["answer"])


if __name__ == "__main__":
    main()
```