---
author: maciej-n
tags:
  - AWS
  - spring
  - spring-boot
date: 2022-10-18T08:52:15.448Z
update_date: false
dateModified: 2022-10-18T08:52:15.475Z
title: Gradual update of the AWS Java SDK in the SpringBoot project
layout: post
image: https://opengraph.githubassets.com/d31c5ed98944650881588cc6cc7c8812a257f81c9b1f092bd49de6482f6693e8/aws/aws-sdk-java
hidden: true
comments: true
published: false
---
Recently, in our project, we decided to update the AWS Java SDK from [1.x](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/welcome.html) to [2.x](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html), so we are able to use [client-side metrics](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/metrics.html), available only in the newer version of the SDK.

<div class="image"><img src="/images/client-side-metrics-for-the-java-v2-aws-sdk-now-in-general-availability.png" alt="aws client side metrics" title="aws client side metrics"  /> </div>

Our whole system is AWS based, so we didn’t want to perform this update at once. We decided to do it granularly instead.

Fortunately, AWS SDK allows us to [use both versions side by side](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/migration-side-by-side.html).

#### Preparation

In our project, we implemented an abstraction layer over AWS services, like:

* **QueueSender** over SqsClient with AwsQueueSender implementation
* **QueuePublisher** over SnsClient with AwsQueuePublisher implementation
* **ExternalStorage** over S3Client with AwsFileUploader implementation

The approach of implementing an abstraction layer over external services and frameworks comes in really handy, especially in cases like ours — changing implementation of these abstractions.

The first thing we did was to add a new implementation for these services using SDK v2, so we added AwsQueueSenderV2, AwsQueuePublisherV2 and AwsFileUploaderV2.

#### Challenges

Some libraries that we used to implement our services don’t support SDK V2(or don’t support both versions side by side), so we needed to fork these libraries and adjust for our needs. These are public repositories, so if you are planning to migrate your project, you could use:

* [amazon-sns-java-extended-client-lib](https://github.com/bright/amazon-sns-java-extended-client-lib/tree/sdkv2)
* [amazon-sqs-java-extended-client-lib](https://github.com/bright/amazon-sqs-java-extended-client-lib/tree/sdk-v2-support)
* [amazon-sqs-java-messaging-lib](https://github.com/bright/amazon-sqs-java-messaging-lib/tree/sdk-v2-support)

Then we could copy all the tests that were testing the original implementation, so we could test my new implementation.

Running tests over a new implementation allowed me to find a bug in my implementation — I messed up the order of parameters 🙈.

#### Migration

We decided to take advantage of Spring capabilities to gradually replace old AWS services implementations with the new ones, and for that we used the [@Priority annotation](https://github.com/spring-projects/spring-framework/issues/15179).

We annotated 1.x Beans implementations with @Priority(1) and 2.x implementations with @Priority(2). Then we deployed our application to a test environment and monitored if there were no unexpected changes. After verifying it, we deployed the application to the production environment and continued monitoring to confirm that everything is still fine.

In the next step, we chose a couple of non business critical functionalities and replaced old services with the new ones, using the [@Named](https://docs.oracle.com/javaee/7/api/javax/inject/Named.html) annotation. After repeating deployment and monitoring steps, we were sure our new implementations were working as expected, so we could release the application with all AWS Beans updated. We did this by changing the priority of 1.x Beans from @Priority(1) to @Priority(3).

#### Cleanup

Everything went well, so we could remove temporary annotations, 1.x implementations, and V2 suffixes from 2.x implementations.

#### Summary

Although we took a couple of extra steps, we were able to introduce an advanced update to our production-ready application without downtime or risk of introducing breaking changes. This way is much safer and allows us to avoid making mistakes that can affect our customers.

<div class="image"><img src="/images/aws-image.webp" alt="AWS SERVICES" title="AWS SERVICES"  /> </div>