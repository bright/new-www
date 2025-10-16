---
author: tomasz-l
tags:
  - iOS
  - AI
  - Tools
date: 2025-10-16T10:00:00.000Z
meaningfullyUpdatedAt: 2025-10-16T10:00:00.000Z
title: AI Agents Comparison from iOS Developer Perspective
layout: post
image: /images/ai-agents-comparison-from-ios-dev-perspective/banner.webp
hidden: false
comments: true
published: true
language: en
---

GitHub Copilot was one of the earliest LLM powered tools helping developers with their everyday chores. It was also quite early to support Xcode (first by third party and later by first party plugins). Due to that and few other factors (copilot being endorsed in one of my projects as well as having educational license for it) I ended up using it in my AI supercharged coding endeavour.
In iOS development I was mostly using Copilot in autocomplete mode and never really dove deep into agentic coding with it.

## TL;DR

GitHub copilot ended up being the worst across all agents. Claude Code may be easy default choice for Apple developer. You can go directly to [summary](/blog/ai-agents-comparison-from-ios-dev-perspective/#summary) to see what I have chosen for myself.

## Moar AI

<center>
![Moar AI meme](/images/ai-agents-comparison-from-ios-dev-perspective/Moar-AI-meme.webp "Moar AI meme")
</center>

Recently I got to work in few projects requiring technologies new for me and I started experimenting a bit more with Copilot in `agent` mode. Based on approach it was typically hit and miss. I have learned a bit about how to work with agents and notice improvement when using separate steps:

1. Prepare requirements documentation
1. Work on feature based on prepared documentation
1. Reset context when wonky things start occurring

Nevertheless it still didn't felt right. In all cases at some point it was really hard to force Copilot agent to do what I expected it to do. Kind of like it was rebelling against me 😅

### Even moar AI

<center>
![Can I has Moar AI meme](/images/ai-agents-comparison-from-ios-dev-perspective/Can-I-has-more-AI-meme.webp "Can I has Moar AI meme")
</center>

Having seen many success stories of agentic coding both in and out of Bright Inventions I wanted to go deeper and understand what I am doing wrong. I have started looking into different sources to learn and later enrolled into course ([10xDevs.pl](https://www.10xdevs.pl)). It inspired me to do the basic stuff actually: test what different tools give me and how those behave in the field. Idea was simple: test out as many different tools as possible, see if any works better than currently used Copilot and adopt it if that is the case.

## Benchmark

While I was considering testing different tools I have stumbled on quite simple bug in one of the projects I worked on. For very specific response in login flow (401) user ends up with endless spinner and blocked app UI. Quite simple thing, but finding root case required a bit of debugging and especially time (~10-15 minutes). I though this might be really good starting point for comparison and that is what I used for a benchmark.

For evaluation I decided to use IDE and CLI tools:

- GitHub Copilot (Agent mode in VS Code with Claude Sonnet 4.5) [Educational license]
- Xcode 26 Coding Assistant (GPT-5) [Pro subscription]
- Cursor (Agent in auto mode) [Free trial]
- Windsurf (Code mode with GPT-5 low reasoning) [Free trial]
- Gemini CLI (Gemini 2.5 Pro) [Free plan]
- Claude Code (Claude Sonnet 4.5) [Pro subscription]
- Codex (GPT-5 codex) [Pro subscription]

For GitHub Copilot I have chosen Claude Sonnet 4.5 as it felt the best for me in prior usage. Rest of the agents were using stock settings (model/mode mentioned above) as far as I am concerned.

Each of the agent was presented with exact same prompt:

```
This is iOS app using cocoapods for dependency management and xcworkspace. It is quite simple but I have a bug with it. When I try to login button shows loading animation and then nothing happens.
Analyse app and logging flow to help me identifying login issue.
```

Even though I already knew what was broken and how to fix it during conversations (if any was needed) I pretended to have no idea what is going on. Also I will be looking at few key metrics: Speed; Correctness; Regressions.
Expectations:

- Root cause - not calling completion callback in case of 401 - being found
- Handle potential issue in both request flows implemented in affected class
- Fix made in a generic way, not tied to specific issue I have stumbled upon
- No regressions introduced
- Potential side effects explained

### Copilot

In the first pass I was greeted with potential root cause which was obviously incorrect. There were two solutions proposed to fix the issue. Agent was hinting that completion callback was never called, however targeted wrong level of abstraction - not the one were actual issue occurred.
I have asked agent to implement its proposed solution adn as expected it was not correct. After actual testing (just to be sure) I have explained that issue still occurs. This time copilot agent proposed additional fixes and logging which were both incorrect (fixes did not fixed issue and logs did not highlighted root cause). After few additional rounds of back and forth with agent and hints that we might be looking at wrong place we ended up finding actual root cause.
In the end issue itself got fixed but in a way that was well below acceptable quality (fix applied at generic layer using very path of endpoint for which issue occurred). Besides that quite significant regression was introduced: previous 401 handling was completely removed.

- **Speed: 2/5**  
  Felt slower than most of other agents, not unbearably slow though. Total score additionally lowered however due too amount of back and forth needed.
- **Accuracy: 1/5**  
  Low quality solution, lots of hints and back and forth needed. Only one of the request paths was covered with changes.
- **Regression: 3/5**  
  App uses Alamofire and one of the changes was to remove `validate()` call from commonly used request path. Change seemed unrelated and it was not explained to why it was made.

### Xcode Coding Assistant

I have initially tried running test without paid subscription, but I have ended up with exhausted quota warning before prompt was fully processed. I have switched to my Pro subscription afterwards and it moved forward quite well.
Xcode Coding Assistant have identified actual root cause in first pass, proposing solution which seemed sensible to me. After asking it to implement its recommended solution it went off rails pretty quickly. Firstly it started with `wrong level of abstraction` issue where it referenced path of request which caused issue - this seems to be becoming a common thread between agents 😅 I have tried working with agent trying to suggest that there might be better solution which will stick to separation of concerns in different layers. Second iteration introduced lots of unnecessary code which was quite confusing. In the end I have directly asked for solution I expected and it tidied code quite nicely.

- **Speed: 3/5**  
  Coding agent seemed to be responding the slowest from the bunch per prompt.
- **Accuracy: 4/5**  
  Even though it required little bit of back and forth issue was fixed correctly and for both theoretical paths.
- **Regression: 4/5**  
  No meaningful regression introduced, not explained however potential side effects of adding completion callback where it was previously missing.

### Cursor

Cursor was the first agent I have actually tried and it blown me off completely. Not only was it super fast, but it found the root cause first try not issues. At that point I knew I was probably missing out. One thing to notice is that I have asked to `Analyse` the problem, yet cursor went ahead and implemented solution right away 🙉

- **Speed: 5/5**  
  Really can;t get better than that. Prompt was processed very fast and no back and forth required at all.
- **Accuracy: 5/5**  
  It knew exactly what I wanted ;)
- **Regression: 4/5**  
  I would expect little bit of explanation, that adding callback for 401 case in generic network layer may introduce unexpected behaviors which might need to be handled.

### Windsurf

Windsurf was second agent I have tried and again - result was quite shocking to me... Root cause was identified immediately. It has however manifested `low effort` approach found in some other cases trying to reference endpoint path for which issue occurred. When I suggested this might be a code smell I got presented with few alternative propositions one of which was the expected one. Unfortunately there was regression introduced upon actual implementation: previous 401 handling was completely removed. After additional back and forth and going circles we have reached expected solution.

- **Speed: 3.5/5**  
  Root cause found immediately, lost some points due to issues during actual implementation.
- **Accuracy: 4/5**  
  End result was proper solution but it required trained eye along the way 😉
- **Regression: 3/5**  
  Even though it was fixed - complete removal of 401 was quite significant regression.

### Gemini CLI

Similarly to Cursor Gemini CLI was really fast and spot on - with one caveat - it only handled one of the two paths exhibiting same potential issue.

- **Speed: 5/5**  
  Again - as fast as possible.
- **Accuracy: 4/5**  
  Missed to handle second path potentially exhibiting same issue, however actual fix was spot on.
- **Regression: 4/5**  
  Once more - missed explanation of possible side effects of implemented solution.

### Claude Code

Encounter with Claude Code was little bit strange, as I was testing subsequent agents I was leaving their solutions on separate branches - it may have caused glitch I have experienced. Ofc root cause was identified immediately, yet later on Claude mention it is actually fixed. When pushing on it a bit it has explained that in fact issue still occurs but there is fix for it in other branches. Seems it knew how to fix the issue in expected way, however I have asked it to copy the fix over. It has used solution previously done with Xcode Code assistant which in the end was spot on.

- **Speed: 4.5/5**  
  It was on pair with other `fast` agents, however `glitch` made the whole process a little bit longer.
- **Accuracy: 5/5**  
  Chosen best possible solutions from branches available - it may actually surfaced superpower of looking more holistically at repo?
- **Regression: 4/5**  
  As in other cases explanation of potential side effects was missing.

### Codex

Last but not least: Codex from OpenAI. It seemed to be up to the task similarly to other CLIs. Only difference is that it seemed little bit slower. Nevertheless it found and solved issue first try.

- **Speed: 4/5**  
  Some minus points for slower inference as compared to other agents.
- **Accuracy: 5/5**  
  Again - spot on solution!
- **Regression: 3/5**  
  Once more - missing side effects explanation.

### Summary

For me there are few main takeaways from this test:

- There are much better tools available as compared to GitHub Copilot
- Actual model used is not the most important part - see that Claude Sonnet 4.5 was used by both Copilot and Claude Code with drastically different outcomes...
- Most of the tools are offering quite similar quality - at least in this test

In addition to that we must consider which flow is more convenient for us. IDE integration (Copilot, Cursor, Windsurf, Xcode) is very convenient. I do however prefer CLI at this point. This is mainly because I dislike Copilot after this benchmark and don't feel like using VSCode clones. Xcode on the other hand - which seems to be perfect solution - still might be a work in progress feature. It was significantly slower and in some additional (out of scope) testing it have managed to crash itself (complete lack of responsiveness from Xcode)... Experience working in Xcode is already bad (who have not experienced crashes, beach balls etc) so I don't want to make it even worse 🥹

It is also worth mentioning that most of those tools require paid subscription. Both Cursor and Windsurf offers free trials though. You can also use Gemini CLI for free. At least not by paying with money - you will pay with your data however. And Google does not want you to know that - going into /privacy ends up with `Error loading Opt-in settings: User does not have a current tier`...

## Conclusions

Even though some parts of this post (especially ones connected to Copilot) may seem pessimistic I believe all agents brought real value for me as a developer in that particular example. Even with Copilot I would save some time - not by it doing the job, but hinting me in the right direction. This is pretty amazing how far we have come!

Copilot example left me with one additional thought (which can escape in those more successful scenarios):

> Human brain is still the most amazing machine that ever existed - let's not forget that!

Even though we are gifted with all those amazing (AI) tools - we should still remember to train our most important (from devs perspective) muscle - our brain. We are still in control and AI agent is there to help us do the things we might now want to do, not the other way around.

For now I will most probably explore Claude Code a bit more - I have also heard from multiple sources already that Claude Code works quite nicely for iOS development. It also got bonus points for having theme that suits my auto light/dark theme lifestyle. I do miss however option in any of the CLIs to have dynamic theme based on system theme. I also encourage You to test different tools for yourself.
