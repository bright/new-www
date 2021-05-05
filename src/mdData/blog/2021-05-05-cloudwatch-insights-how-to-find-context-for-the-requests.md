---
layout: post
title: CloudWatch Insights - how to find context of the requests?
date: 2021-05-05T12:29:03.781Z
image: /static/images/request_typing.png
author: rafal h
tags:
  - tips&tricks
  - aws
  - cloudwatch
  - logs
hidden: true
comments: true
published: true
---
So recently I was searching through our application logs to extract only given lines of the logs for some of the requests (ex. errors in external provider with bigger context - original request type or other info). For our app, we are using [CloudWatch](https://aws.amazon.com/cloudwatch/) to store the logs. I have used [CloudWatch Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html) as out of the box tool to analyze them. 

Our logs have format like: 

`
2021-02-06T13:38:31.730Z info [some request id 1; some user id 1] Some external provider error message
2021-02-06T14:21:00.000Z info [some request id 2; some user id 2] Some external provider error message
`

We can use Cloudwatch Insights to extract all the information related to that requests: 

```
filter @message like "Some context to error message log"
| parse @message "* * [* *] *" as timestamp,type,requestId, user, textMessage
| filter requestId in ["some request id 1;", "some request id 2"]
| sort @ingestionTime desc
```

Bonus! If the field you are searching for is a JSON array, you can search it like: 

```
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

You can then export the data or build some stats around it, but about that, we will talk at another time ;). 

Let me know in the comments if you found CloudWatch Insights useful too!

