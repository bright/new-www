---
author: karol
tags:
  - AI
  - Koog
date: 2025-07-17T08:50:18.274Z
meaningfullyUpdatedAt: 2025-06-17T14:02:33.275Z
title: Your First Koog Agent Automating Developer Workflows
layout: post
image: 
hidden: false
comments: true
published: true
language: en
---

# Your First Koog Agent: Automating Developer Workflows

Most of the teams working in IT relay on tools like Jira and Slack to manage work and communicate. 
But what if you could automate routine tasks—like checking a Jira ticket status and posting an update to Slack,
using a single natural language command? With Koog Agents, you can.

In this post, I'll guide you how to build your first Koog Agent that connects Jira and Slack, using annotation-based tools and the power of single-run agents.

---

## Why Automate Developer Workflows?

Developers often switch between tools to check ticket statuses and update teammates and stakeholders.
Automating these steps saves time and reduces context switching, letting you focus on what matters: building great software.

---

## Introducing Koog Agents

Koog Agents are lightweight, annotation-driven components that let you expose business logic as tools, accessible via natural language. 
With single-run agents, you can execute a sequence of actions in response to a single command.

---

## Defining Tools with Annotations

Let's look at a `TicketUpdateToolSet` that exposes two tools: one for Jira, one for Slack.

```kotlin
@LLMDescription("A set of tools for updating Jira tickets and sending messages to Slack.")
class TicketUpdateToolSet(
    private val jiraApi: JiraApi,
    private val slackApi: SlackApi,
): ToolSet {

    @Tool
    @LLMDescription("Retrieves the status of a Jira ticket by its key.")
    suspend fun jiraTool(
        @LLMDescription("The key of the Jira ticket, e.g. BA-1")
        ticketKey: String,
    ): String {
        return jiraApi.getTicketStatus(ticketKey).let {
            "The status of the Jira ticket $ticketKey is: $it"
        }
    }

    @Tool
    @LLMDescription("Sends a message to a Slack channel.")
    suspend fun slackTool(
        @LLMDescription("The name of the Slack channel where the message should be sent")
        channel: String,
        @LLMDescription("The text of the message to be sent")
        text: String,
    ): String {
        val isMessageSent = slackApi.sendMessage(channel, text)
        return if (isMessageSent) "Message was sent." else "Message could not be sent."
    }
}
```

With just a few annotations, you expose your business logic as tools that Koog Agents can use.

---

## How It Works

1. **Natural Language Command:**  
   The developer says:  
   _"Check the status of ticket BA-1 and post an update to #dev-team on Slack."_

2. **Agent Orchestration:**  
   The Koog Agent parses the command, calls `jiraTool` to get the ticket status, then calls `slackTool` to post the update.

3. **Single-Run Simplicity:**  
   The entire workflow runs in a single agent execution — no manual steps required.

---

## Benefits

- **Rapid Automation:** Expose new tools with simple annotations.
- **Natural Language:** Trigger complex workflows with a single command.
- **Integration:** Connect your existing APIs and services.

---

## Get Started

1. Define your tools using the `@Tool` and `@LLMDescription` annotations.
2. Register your toolset with a Koog Agent.
3. Start automating your developer workflows!

---

Koog Agents make it easy to bridge the gap between your tools and your team. 
With annotation-based tools and single-run agents, you can automate repetitive tasks and keep your team in sync—using just your words.