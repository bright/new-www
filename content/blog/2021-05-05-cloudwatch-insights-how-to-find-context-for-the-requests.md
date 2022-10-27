---
author: rafal h
tags:
  - tips&tricks
  - aws
  - cloudwatch
  - logs
date: 2021-05-05T15:22:52.864Z
title: CloudWatch Insights - how to find context of multiple requests?
layout: post
image: /images/blog_post_cover_cloudwatch.png
hidden: false
comments: true
published: true
---
Recently I was searching through our application logs. The task was to extract extra context for a group of requests (ex. errors in the external provider system with the original request). For our app, we are using [CloudWatch](https://aws.amazon.com/cloudwatch/) to store the logs. I have used [CloudWatch Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html) as out of the box tool to analyze them. 

Our logs have a format like below, with each console output in a separate line: 

```text
2021-02-06T13:38:31.730Z info [some request id 1; some user id 1] Some external provider error message
2021-02-06T14:21:00.000Z info [some request id 2; some user id 2] Some external provider error message
```

We can use Cloudwatch Insights to extract all the information related to that requests: 

```text
filter @message like "Some context to error message log"
| parse @message "* * [* *] *" as timestamp,type,requestId, user, textMessage
| filter requestId in ["some request id 1;", "some request id 2"]
| sort @ingestionTime desc
```

If the field you are searching for is a JSON array, you can search it like: 

```text
filter @message like "Some context to error message log {
    "someInfo": [
        some1,
        some2
    ]
}"
| parse @message "* * [* *] *" as timestamp,type,requestId, user, textMessage
| parse textMessage '"someInfo":[*]' as someInfo
| filter requestId in ["some request id 1;", "some request id 2"]
| sort @ingestionTime desc
```

You can then export the data that you need or build some stats around it. 

Let me know in the comments if you found CloudWatch Insights useful too and how you are using them. 

<div class='block-button'><h2>Let's create software that matters!</h2><div>Join our team and work on projects such as the Ethereum blockchain platform, accounting software, or web therapy applications. Work with clients from Israel, Germany, or Norway!</div><a href="/career"><button>Check our career opportunities</button></a></div>
