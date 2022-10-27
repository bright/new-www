---
author: agnieszka
tags:
  - react
  - redux
  - aws
  - amazon
  - s3
date: 2018-04-19T22:00:00.000Z
title: Host your react-redux website with AWS S3
layout: post
image: /images/host-website-with-aws-s3/www.png
hidden: false
published: true
---
Hosting a static website with AWS S3 is a nice and fast way to show your react-redux app to the world. In this blog post I will guide you through this simple process.

![AWS](/images/host-website-with-aws-s3/www.png)

If you do not have an AWS account yet, you may visit [Amazon Web Services](https://portal.aws.amazon.com/billing/signup#/start). And if you are not familiar with S3 you may take a look here: [S3](https://aws.amazon.com/s3/). 

When you log into the AWS Management Console, choose S3 from Services list. 

## **1. Create a bucket**

First of all, we need to create a bucket which will hold our app’s files. Click the blue button `Create bucket`.

![AWS](/images/host-website-with-aws-s3/create_bucket.png)

We need to provide the bucket name and a region. The website url will be constructed of these two values:

`bucket-name.s3-website.bucket-region.amazonaws.com`

The bucket name must be unique, so it’s a good idea to use e.g. your company domain.

![AWS](/images/host-website-with-aws-s3/bucket_name.png)

## **2. Set the bucket’s permissions**

Once we have the bucket created, we need to make it public, so that anyone can access it. Choose the bucket from the list, then select the `Permissions` tab and click `Bucket Policy`. Paste the JSON below into the edit field. Remember to adjust the `Resource` property value to include the ARN of your bucket (you can find the ARN above the edit field). However, do not change the `Version` value. This is a constant expression, which specifies the version of IAM policy language your policy statement uses - not your policy statement's revision date. Hit `Save` and now anyone can access the data in the bucket.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-hosted-website.brightinvetnions.pl/*"
        }
    ]
}
```

![AWS](/images/host-website-with-aws-s3/permissions.png)

## **3. Enable static website hosting**

Select the `Properties` tab and the `Static website hosting` box.

![AWS](/images/host-website-with-aws-s3/properties.png)

Select `Use this bucket to host a website` checkbox. Provide the name of the file which is a starting point of your app, usually it is `index.html`. The app is ready and you can access it with the link from the top of the box.

![AWS](/images/host-website-with-aws-s3/.png)

There is one more thing, which is specific for apps using browser's history API (for example a react-router app). If you try to access some resource directly, you will get an error like below: 

![AWS](/images/host-website-with-aws-s3/404.png)

This is because the app is not static enough :) Say you want to access `http://s3-hosted-website.brightinventions.pl.s3-website.eu-central-1.amazonaws.com/users`. AWS will not find the resource `users` directly (as a static resource in the bucket does not exist) and therefore will show an error. This is why it’s a good idea to set the `index.html` as the `Error document` as well. Now, instead of presenting the error page, AWS will redirect to the `index.html` and the app can route you successfully to the desired page. This will, however, redirect all errors into the app, so we should make sure to handle them inside the app.

![AWS](/images/host-website-with-aws-s3/error.png)

And this is it! You have just hosted you first website with AWS S3 :)
