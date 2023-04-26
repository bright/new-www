---
author: maciej-n
tags:
  - grafana
  - opentelemetry
  - observability
  - tracing
date: 2023-04-26T10:29:16.236Z
meaningfullyUpdatedAt: 2023-04-26T10:29:16.265Z
title: How to Improve Your App Observability (Easily) with Grafana and OpenTelemetry
layout: post
hidden: false
comments: true
published: true
---
Have you heard about the Pareto Principle (aka the 80/20 rule)? Briefly, it states that 80% of all outcomes are derived from 20% of causes. In other words, a small amount of work can cause a great effect. I want to show you how to greatly improve observability with just a small amount of effort with Grafana and OpenTelemetry.

# What is observability and why is it important?

Application observability is the practice of monitoring and understanding the behavior and performance of applications in production environments. 

Why is observability important?

* It helps developers gain better visibility into their application's behavior.
* It enables us to identify issues before they impact users.
* It assists in quickly diagnosing and resolving problems when they occur.
* It improves application reliability.
* It enables faster problem resolution.
* It allows us to provide a better customer experience.

# How can we achieve better observability \[tutorial]?

You may think that introducing additional tools to your application would be challenging. Due to the fact that your application is too big, or because it already works in production and you don’t want to introduce too many changes. Another reason to hesitate might be that it would simply be too difficult. But that is not the case!

# What app observability tools are we going to use?

In this tutorial, I will show you how to set up basic monitoring for your application using the [OpenTelemetry](https://opentelemetry.io/) and [Grafana's LGTM](https://grafana.com/go/observabilitycon/2022/lgtm-scale-observability-with-mimir-loki-and-tempo/) set of tools. "OpenTelemetry is a collection of tools, APIs, and SDKs that you can use to instrument, generate, collect, and export telemetry data (metrics, logs, and traces) to help you analyze your software’s performance and behavior."

OpenTelemetry provides a standard and vendor-neutral way to instrument, collect, and export telemetry data (metrics, logs, and traces) from applications and infrastructure. It allows developers to easily add observability to their applications without being locked into any specific vendor or technology stack. It is available for most popular languages and frameworks, so it will most likely be available for you too.

# Initial Application

Let's take an [example application:](https://gitlab.com/maciej.nawrocki.bright/observability-example/-/tree/initial-app)

```typescript
import express from "express";

const app = express();

app.get('/hello', (req, res) => {

   res.send('Hello World!');

   console.log("Hello World log!")

});

app.listen(8080, () => {
   console.log('Example app listening on port 8080! Access it: http://localhost:8080/hello');
});
```

…which logs “Hello World log!” after accessing its endpoint.

# Add Logging

First, we need to use a logger that supports multiple transports to apply additional logging configuration. I’m going to use winston, but feel free to use any other logger library.

```shell
npm install --save winston
```

We need to add logger configuration:
```typescript
import * as winston from "winston";



export const logger = winston.createLogger({

   transports: [

       new winston.transports.Console()

   ],

})
```


include it in app.ts (in your production application you will probably use dependency injection to use logger in modules) and replace console.log() with logger.info():
```typescript
import express from "express";
import {logger} from "./logger";

const app = express();

app.get('/hello', (req, res) => {
   res.send('Hello World!');
   logger.info("Hello World log!")
});

app.listen(8080, () => {
   logger.info('Example app listening on port 8080! Access it: http://localhost:8080/hello');
});
```
And now after accessing our endpoint we receive log in json format:
```
{"level":"info","message":"Hello World log!"}
```


That’s better! It’s usually [better to use json format for logging](https://www.loggly.com/use-cases/json-logging-best-practices/) since it’s easier for someone unfamiliar with web server logs to understand what the message contains, as each field is labeled.