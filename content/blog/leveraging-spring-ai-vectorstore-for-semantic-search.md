---
author: piotr
tags:
  - spring
  - ai
  - vector
  - vectorstore
date: 2025-04-22T10:00:00.000Z
meaningfullyUpdatedAt: 2025-04-22T10:00:00.000Z
slug: leveraging-spring-ai-vectorstore-for-semantic-search
title: Leveraging Spring AI's VectorStore for Enhanced Semantic Search
layout: post
image: /images/spring_ai_vectorstore_blog.png
hidden: false
comments: false
published: true
language: en
---

**In this follow-up article, we explore how Spring AI's VectorStore abstraction simplifies vector storage and retrieval,
eliminating the need for custom repository methods and direct vector manipulation. Learn how this powerful abstraction
enhances our Support Assistant application with improved document management and attachment handling.**

## Introduction to VectorStore

In our [previous article](/blog/gentle-intro-to-spring-ai-embedding-model-abstraction), we explored Spring AI's
Embedding Model abstraction for semantic search using pgvector. While that approach works well, it requires custom
repository methods and direct manipulation of vector embeddings in our application code.

Spring AI provides a higher-level abstraction called `VectorStore` that simplifies vector storage and retrieval,
offering several advantages over direct vector manipulation:

1. **Abstraction from database details** - No need to write custom SQL queries or understand vector database internals
2. **Unified API across different vector databases** - The same code works with PostgreSQL, Redis, Pinecone, and other
   vector databases
3. **Document-based approach** - Work with rich document objects instead of raw vectors
4. **Built-in metadata filtering** - Filter search results based on document metadata
5. **Simplified management** - Add, update, and delete vectors with simple API calls

Let's see how we've enhanced our Support Assistant application using VectorStore.

## From Direct Vectors to VectorStore

### Before: Direct Vector Manipulation

Previously, our application stored embeddings directly in the database entities. This approach required:

1. Adding a vector column to our database tables
2. Creating custom repository methods with native SQL queries to perform vector similarity searches
3. Manually generating and storing embeddings for each entity
4. Writing complex SQL queries with vector operators

This direct approach worked but had several drawbacks:

1. It tightly coupled our application to a specific vector database implementation
2. It required writing and maintaining custom SQL queries
3. It mixed vector operations with our business logic
4. It made it difficult to add new features or change the vector database

### After: Using VectorStore

With VectorStore, we no longer need to store embeddings in our entity or write custom repository methods.
Instead, we can use the default autoconfigured VectorStore backed by pgvector. We can also tune the configuration, if
needed,
by providing a VectorStore bean:

```kotlin
@Configuration
class VectorStoreConfig {
    @Bean
    fun pgVectorStore(jdbcTemplate: JdbcTemplate, embeddingModel: EmbeddingModel): PgVectorStore {
        return PgVectorStore.builder(jdbcTemplate, embeddingModel)
            .vectorTableName("support_vector_store")
            .distanceType(PgVectorStore.PgDistanceType.COSINE_DISTANCE)
            .indexType(PgVectorStore.PgIndexType.HNSW)
            .initializeSchema(true)
            .build()
    }
}
```

You can also let Spring Boot initialise the database schema on startup by setting the following property in your `application.yml` file:

```yaml
spring:
  ai:
    vectorstore:
      pgvector:
        initialize-schema: true
```

And our service now uses the VectorStore for similarity search:

```kotlin
fun suggestResponse(customerMessage: String, limit: Int = 5): String {
    // Search for similar documents in the vector store
    val searchRequest = SearchRequest.builder()
        .query(customerMessage)
        .topK(limit)
        .similarityThreshold(0.5)
        .build()

    val similarDocuments = vectorStore.similaritySearch(searchRequest)

    // ...
}
```

Let's take a closer look at the `similarityThreshold` method used in the `SearchRequest.Builder`:

The `similarityThreshold` method filters search results based on their similarity score:

- It accepts a value between 0.0 and 1.0
- Only documents with a similarity score equal to or greater than this threshold will be returned
- A threshold of 0.0 (the default) means any similarity is accepted (no filtering)
- A threshold of 1.0 means only exact matches are returned
- Higher values (like 0.7 or 0.8) return only highly relevant results
- Lower values (like 0.3 or 0.4) return more results, including less relevant ones

This is particularly useful when you want to ensure that only truly relevant documents are included in your search results, avoiding false positives.

## The Document Abstraction

At the heart of VectorStore is the `Document` class, which represents a piece of content with associated metadata. This
abstraction allows us to work with rich, structured data rather than just raw text and vectors.

When creating a ticket, we now convert it to a Document:

```kotlin
val ticketDocument = Document.builder()
    .id(UUID.randomUUID().toString())
    .text("${savedTicket.title} ${savedTicket.customerMessage} ${savedTicket.agentResponse}")
    .metadata(
        mapOf(
            "type" to "ticket",
            "ticketId" to savedTicket.id!!,
            "title" to savedTicket.title,
            "customerMessage" to savedTicket.customerMessage,
            "agentResponse" to savedTicket.agentResponse,
            "category" to savedTicket.category,
            "status" to savedTicket.status.name
        )
    )
    .build()

// Add the ticket document to the vector store
vectorStore.add(listOf(ticketDocument))
```

Note that only the text of a document is part of embedding.

## Enhanced Functionality: Ticket Attachments

One of the major benefits of using VectorStore is how easily we can extend our application with new features. We've
added support for ticket attachments, which are now included in semantic search.

### Converting Attachments to Documents

When a ticket has attachments, we convert each attachment to a Document:

```kotlin
fun attachmentToDocument(attachment: TicketAttachment): Document {
    val documentBuilder = Document.builder()
        .id(UUID.randomUUID().toString())
        .metadata(
            mapOf(
                "type" to "attachment",
                "ticketId" to (attachment.ticket.id!!),
                "fileName" to attachment.fileName,
                "contentType" to attachment.contentType
            )
        )
    return when {
        attachment.content != null -> {
            // Text attachment
            documentBuilder
                .text(attachment.content)
                .build()
        }

        attachment.contentType == "application/pdf" && attachment.binaryContent != null -> {
            // PDF attachment - in a real application, you would use a PDF parser here
            // For simplicity, we're just creating a document with text content
            documentBuilder
                .text("PDF attachment: ${attachment.fileName}")
                .build()
        }

        else -> {
            // Other binary attachment - in a real application, you might use different parsers
            // For simplicity, we're just creating a document with metadata
            documentBuilder
                .text("Binary attachment: ${attachment.fileName}")
                .build()
        }
    }
}
```

### Including Attachments in Search Results

When generating responses, we now include content from both tickets and their attachments:

```kotlin
val context = similarDocuments.joinToString("\n\n") { document ->
    val metadata = document.metadata
    if (metadata["type"] == "ticket") {
        """
        Customer: ${metadata["customerMessage"]}
        Agent: ${metadata["agentResponse"]}
        """
    } else {
        """
        Attachment: ${metadata["fileName"]}
        Content: ${document.text ?: "No content available"}
        """
    }
}
```

## Benefits of Using VectorStore

Let's summarize the key benefits we've gained by switching to VectorStore:

### 1. Simplified Code

Our code is now more focused on business logic rather than vector operations. We no longer need custom SQL queries or
direct vector manipulation.

### 2. Enhanced Maintainability

The VectorStore abstraction isolates our application from the details of the vector database. If we decide to switch
from PostgreSQL to another vector database like Pinecone or Redis, we only need to change the VectorStore configuration,
not our application code.

### 3. Improved Extensibility

Adding new features like ticket attachments is straightforward. We simply convert the new content to Documents and add
them to the VectorStore.

### 4. Better Metadata Management

The Document abstraction allows us to associate rich metadata with our content, which we can use for filtering and
organizing search results.

### 5. Optimized Performance

VectorStore implementations are optimized for vector operations, providing better performance than custom solutions.

## Conclusion

Spring AI's VectorStore abstraction provides a powerful, flexible way to implement semantic search in your applications.
By abstracting away the details of vector storage and retrieval, it allows you to focus on your application's business
logic while still leveraging the power of vector embeddings.

In our Support Assistant application, switching to VectorStore has simplified our code, improved maintainability, and
enabled new features like ticket attachments. If you're building applications with semantic search capabilities,
VectorStore is definitely worth considering.

The full source code for this enhanced version is available
on [GitHub](https://github.com/miensol/spring-ai-gentle-intro).
