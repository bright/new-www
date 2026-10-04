Real-Time Insights: A Financial News Monitor

In today's fast-paced financial world, analysts require tools that deliver timely, 
structured insights from news feeds as events unfold. 
Koog's Streaming API offers a powerful solution for processing structured data as it arrives, rather than waiting for the entire response.
Such a solution can help with building real-time monitoring systems that process and summarize, for example, financial news articles on the fly.

### Why Streaming Matters for Financial Analysts

Traditional batch processing of news can lead to delays and missed opportunities. With Koog's Streaming API, you can ingest news feeds in real-time, 
analyze content as it's published, and immediately surface actionable summaries. This enables analysts to react faster to market-moving events.

### How Koog's Streaming API Fits the Scenario

The core workflow involves:

- Receiving news articles as a stream.
- Parsing and structuring each article.
- Summarizing content using an AI agent.
- Forwarding structured summaries for further analysis or alerting.

### Example: Streaming News Summaries with Koog

Below, you can find a fragment of code which demonstrates how to set up schema and examples for structured data in Markdown format.

```kotlin
fun markdownArticleDefinition(): MarkdownStructuredDataDefinition {
    return MarkdownStructuredDataDefinition("articlesList", schema = {
        markdown {
            header(1, "articleTitle")
            bulleted {
                item("summary")
                item("author")
                item("source")
                item("url")
            }
        }
    }, examples = {
        markdown {
            header(1, "CocaCola stock is reaching all time high!")
            bulleted {
                item("CocaCola's stock has reached an all-time high, driven by strong quarterly earnings and increased consumer demand.")
                item("John Doe")
                item("Financial News Daily")
                item("https://financialnewsdaily.com/coca-cola-stock-high")
            }
        }
    })
}
```

The following code shows how to set up a streaming pipeline using Koog's agent and strategy DSL:

```kotlin
val agentStrategy = strategy("articles-assistant") {
    val getMdOutput by node<String, String> { input ->
        val mdDefinition = markdownArticleDefinition()

        llm.writeSession {
            updatePrompt { user(input) }
            val markdownStream = requestLLMStreaming(mdDefinition)

            parseMarkdownStreamToArticles(markdownStream)
                .collect { article ->
                    callTool<ArticleTool>(article)
                }
        }

        ""
    }

    edge(nodeStart forwardTo getMdOutput)
    edge(getMdOutput forwardTo nodeFinish)
}
```

Here, `requestLLMStreaming` leverages Koog's Streaming API to process incoming news articles. 
As each article is parsed, it's immediately handed off to a Koog's custom tool (`ArticleTool`) for further structuring or notification.

To tool `ArticleTool` is straightforward and configured purely to pretty print the article:

```kotlin
class ArticleTool : SimpleTool<Article>() {

    override suspend fun doExecute(args: Article): String {
        return args.toString()
    }

    override val argsSerializer: KSerializer<Article> = Article.serializer()

    override val descriptor: ToolDescriptor = ToolDescriptor(
        name = "articleTool",
        description = "A tool to parse book information from markdown",
        requiredParameters = listOf(),
        optionalParameters = listOf()
    )
}

@Serializable
data class Article(
    val title: String,
    val summary: String,
    val author: String,
    val source: String,
    val url: String,
) : Args {

    override fun toString(): String {
        return "$title by $author, source: $source, URL: $url\nSummary: $summary"
    }
}
```

To actually parse the markdown stream into articles, you can leverage the Koog's `markdownStreamingParser` and process them like:

```kotlin
fun parseMarkdownStreamToArticles(markdownStream: Flow<String>): Flow<Article> {
    return flow {
        markdownStreamingParser {
            var currentArticleTitle = ""
            val bulletPoints = mutableListOf<String>()

            onHeader(1) { headerText ->
                if (currentArticleTitle.isNotEmpty() && bulletPoints.isNotEmpty()) {
                    mapAndEmit(bulletPoints, currentArticleTitle)
                }

                currentArticleTitle = headerText
                bulletPoints.clear()
            }

            onBullet { bulletText ->
                bulletPoints.add(bulletText)
            }

            onFinishStream {
                if (currentArticleTitle.isNotEmpty() && bulletPoints.isNotEmpty()) {
                    mapAndEmit(bulletPoints, currentArticleTitle)
                }
            }
        }.parseStream(markdownStream)
    }
}

private suspend fun FlowCollector<Article>.mapAndEmit(
    bulletPoints: List<String>,
    currentArticleTitle: String
) {
    val summary = bulletPoints.getOrNull(0) ?: ""
    val author = bulletPoints.getOrNull(1) ?: ""
    val source = bulletPoints.getOrNull(2) ?: ""
    val url = bulletPoints.getOrNull(3) ?: ""

    emit(
        Article(
            title = currentArticleTitle,
            summary = summary,
            author = author,
            source = source,
            url = url
        )
    )
}
```

### Benefits

- **Immediate Insights:** Structured summaries are streamed as soon as articles are published.
- **Scalability:** The pipeline can handle high volumes of news without bottlenecks.
- **Custom Processing:** Tools like `ArticleTool` enable tailored analysis and alerting.

For such a tool, you can see the output can be like:
```text
12:27:05.978 [main] DEBUG ai.koog.agents.core.agent.AIAgent -- Received results from tools call (tools: [articleTool], results: [Accelerated Adoption of Electric Vehicles Spurs Investment in Charging Infrastructure by Sarah Thompson, source: Green Tech Finance, URL: https://greentechfinance.com/ev-charging-infrastructure-investment
Summary: The rapid adoption of electric vehicles is driving significant investment in charging infrastructure, as automotive companies and governments aim to support the growing demand for sustainable transportation.])

```

### Conclusion

Koog's Streaming API empowers financial analysts to stay ahead of the curve by delivering real-time, structured news summaries. 
By integrating streaming capabilities into your monitoring tools, you ensure that critical information is always at your fingertips, 
ready to inform your next decision.

### Useful links:
https://docs.koog.ai/streaming-api/