---
author: patryk-s
tags:
  - TypeScript
  - cursor
  - work-optimization
  - testing
  - unit-testing
date: 2025-04-29T13:19:34.847Z
meaningfullyUpdatedAt: 2025-04-29T13:19:34.861Z
title: Supercharged Test Running with Custom Modes in Cursor IDE
layout: post
image: /images/cover-cursor-unit-tests.png
hidden: false
comments: false
published: true
language: en
---
## The Problem with Running Tests in Cursor

If you're using Cursor as your primary IDE, you've probably already experienced how powerful it can be—especially when combined with AI-assisted workflows. But when it comes to running tests, things get a bit tricky. Cursor doesn’t support running tests out of the box, so you're forced to rely on plugins. Unfortunately, these plugins often fall short when working on real-world projects. 

Setting the correct working directory becomes cumbersome, you can’t easily enforce a specific Node.js version with `nvm`, and passing environment variables is either awkward or unsupported. And even if you manage to run the tests, the output is rarely formatted in a clean or readable way.

- - -

## Solving the Problem with Custom Modes

To overcome these limitations, we can leverage Cursor's **Custom Modes**—a feature that allows you to define tailored workflows with specific tools and instructions. By creating a custom mode dedicated to running tests, you can automate the process of locating test files, executing them, formatting the results in a readable manner, and even suggesting code changes based on the outcomes.

Fortunately, enabling Custom Modes is straightforward. This feature is available starting from Cursor version **0.48.x**, released on **March 23, 2025**. To activate it:

1. Open Cursor's settings by pressing `Cmd+Shift+J` (macOS) or `Ctrl+Shift+J` (Windows/Linux).
2. Navigate to `Settings → Features → Chat → Custom Modes`.
3. Toggle the option to enable Custom Modes.

For more detailed guidance, refer to the official documentation: [Custom Modes](https://docs.cursor.com/chat/custom-modes).

- - -

## Creating a Test Runner Mode

Once Custom Modes are enabled, you can create your own tailored assistant for running tests. In the Chat sidebar, click the “+” next to your current chat mode and select **"Create new custom mode"**. This allows you to define not only how the assistant behaves, but also what it focuses on.

I created a mode called **"Test Runner"** and disabled its permission to edit files—this way, it won’t make any accidental changes to your codebase. However, if you'd like it to suggest or apply fixes automatically, feel free to keep file editing enabled.

Here’s the prompt I used for the assistant’s behavior:

```
When I ask you to run a test, find the matching .spec. file in the backend directory. Run it with:
nvm use && cd backend && DEPLOY_ENV=test-local yarn test --runInBand "pathToFile" --testNamePattern="testName" --json
You may use either pathToFile, testNamePattern, or both — choose what’s best for the context.
Return only the test result in a clean, colorful, human-readable format
```

Paste this into the “Custom instructions” field during setup. For more details, refer to the official Cursor documentation: [Custom Modes](https://docs.cursor.com/chat/custom-modes).

👉 **Of course, make sure to adjust the prompt to reflect your specific way of running tests**, including any required environment variables, test runners, or command-line options.

- - -

## Using Your Test Runner in Practice

Once your **Test Runner** mode is ready, using it is as simple as talking to your AI. You can type natural commands like:

* `"Run tests for my uncommitted files"` – the assistant will detect which files you've changed and locate the relevant `.spec.` files to test.
* `"Run test for my LocationController"` – it will look for a file like `location.controller.spec.ts` and run it.
* `"Run all tests"` – and it will go through the full test suite in your `backend` directory.

The AI will choose the appropriate flags (`--testNamePattern` or file path), run the tests with the right Node version and environment, and return a clean, easy-to-read summary. Here's an example of what the output might look like:

<div className="image">![test-result-example](/images/screenshot-2025-04-29-at-15.36.42.png "test results")</div>

\- all formatted to be easily readable at a glance.\
And the best part? If any test fails, the assistant can automatically suggest (or even apply) fixes based on the error output.

- - -

## Give It a Try 🚀

With just a few minutes of setup, you can turn Cursor into a smart test runner that adapts to your project structure and gives you clean, actionable feedback right inside your IDE.

**Try building your own *Test Runner* today and make your testing workflow faster, smoother, and a whole lot smarter.**

- - -

## One Last Thing ☕

Remote work is great — flexible hours, deep focus, and fewer distractions.\
But let’s be honest: the best ideas often come not during Zoom calls, but over coffee in the office kitchen.  

Big thanks to [Rafał](https://brightinventions.pl/about-us/rafal-h/) for the hallway inspiration that sparked this approach. 💡