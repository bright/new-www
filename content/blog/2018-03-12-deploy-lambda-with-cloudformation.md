---
crosspost: https://miensol.pl/2018/03/11/deploy-lambda-with-cloudformation.html
author: piotr
tags:
  - aws
  - cloudformation
  - lambda
  - cloudform
date: 2018-03-11T23:00:00.000Z
meaningfullyUpdatedAt: 2018-03-11T23:00:00.000Z
title: How to deploy Lambda function with CloudFormation?
layout: post
image: /images/lambda_blog_post.png
hidden: false
comments: true
published: true
canonicalUrl: https://miensol.pl/deploy-lambda-with-cloudformation/
language: en
---
Serverless deployments are popular these days. With a minimal cost you can have your own code wait and respond to various events. AWS Lambda, Azure Functions are just 2 examples of serverless offering from the biggest cloud providers. For a long time I had thought about them only in the context of ad-hoc setups not suitable for a long term development. This was until I found out that you can, with a little effort, version and deploy the serverless API just as a traditional back-end. In this post I am going to show how to deploy AWS Lambda functions with the help of the tool [Adam](https://adambar.pl/) created at [Bright Inventions](/) called [cloudform](https://github.com/bright/cloudform).

![Lambda function](../../static/images/lambda/lambda.png "")

## Step 1: Define a template

Let's install the [cloudform](https://github.com/bright/cloudform) `npm i --save-dev cloudform` and define a minimal template:

```typescript
import cloudform, { Lambda, IAM, Fn } from 'cloudform';

const LambdaExecutionRole = 'LambdaExecutionRole';

cloudform({
    Resources: {
        HelloWorld: new Lambda.Function({
            Code: {
                ZipFile: "exports.wrtiteToConsole = function (event, context, callback){ console.log('Hello'); callback(null); }"
            },
            Handler: "index.wrtiteToConsole",
            Role: Fn.GetAtt(LambdaExecutionRole, "Arn"),
            Runtime: "nodejs6.10"
        }),
        [LambdaExecutionRole]: new IAM.Role({
            AssumeRolePolicyDocument: {
                Statement: [{
                    Effect: "Allow",
                    Principal: { Service: ["lambda.amazonaws.com"] },
                    Action: ["sts:AssumeRole"]
                }]
            },
            Path: "/",
            ManagedPolicyArns: ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
        })
    }
});
```

There are only 2 resources defined in the template.  `HelloWorld` is the AWS Lambda function definition. We have set the `Runtime` property to use `nodejs6.10` hence the `Code.ZipFile` contains a JavaScript code. Despite the name [`ZipFile`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function-code.html#cfn-lambda-function-code-zipfile) should contain application source code in plain text. Obviously the [`ZipFile`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function-code.html) may only be used for the most simple functions. The `S3Bucket` and `S3Key` properties can be used to deploy a more involved function implementation. The `Handler` defines which function from `Code` the Lambda runtime should invoke. In case of `ZipFile` the first part is always `index`. 

The `Role` is a required setting for every AWS Lambda function. It defines what entitlements the code invoked by the Lambda runtime has. In the above template we define a policy which can be assumed by `lambda.amazonaws.com` and references a pre-defined AWS managed policy [`AWSLambdaBasicExecutionRole`](https://docs.aws.amazon.com/lambda/latest/dg/intro-permission-model.html). The `AWSLambdaBasicExecutionRole` makes it possible for the Lambda function logs to be pushed to Cloud Watch.

## Step 2: Create the AWS Lambda function

Deploying our Lambda function using CloudFormation requires a single command:

```bash
aws cloudformation create-stack \
    --capabilities CAPABILITY_IAM \
    --stack-name lambda-example \
    --template-body file://<(node_modules/.bin/cloudform aws-template.ts)
```

The `--capabilities CAPABILITY_IAM` is required whenever the CloudFormation has to define Roles, Policies or related resources. The `--template-body file://<(node_modules/.bin/cloudform aws-template.ts)` instructs CloudFormation to use a template defined in a file. The `<(...)` is [bash and zsh way to pass an output of a command](https://superuser.com/questions/1059781/what-exactly-is-in-bash-and-in-zsh) to other program as if the output was a file. After waiting a bit for the invocation to complete we will see the following in the AWS Console:

![AWS Lambda Screen](../../static/images/lambda/aws-console.png "")

It is possible to use the AWS Console editor to test and change the function. However, if we are to treat the [serverless approach](/blog/why-you-should-go-serverless-with-your-apps/) seriously we should not forget about the standard practices like versioning of our source code.

## Step 3: Update and version AWS Lambda function

Since we have defined the AWS Lambda function using a cloudform template we can version it as any other code. The whole serverless infrastructure we use and configure is treated as a source code allowing for an easy replication of deployment environments, audit trail and change management. Let's see how we can use cloudform to add another function that will be called by the first one.

```typescript
import cloudform, { Lambda, IAM, Fn } from 'cloudform';
import { FunctionProperties } from 'cloudform/types/lambda/function';
import { readFileSync } from 'fs';

const
    LambdaExecutionRole = 'LambdaExecutionRole',
    Alice = 'Alice',
    Bob = 'Bob';

function lambdaFunction(
    functionCode: string,
    options?: Partial<FunctionProperties>) {
    return new Lambda.Function({
        Code: { ZipFile: functionCode },
        Handler: "index.main",
        Role: Fn.GetAtt(LambdaExecutionRole, "Arn"),
        Runtime: "nodejs6.10",
        ...options
    });
}

export default cloudform({
    Resources: {
        [Alice]: lambdaFunction(readFileSync('Alice.js', 'utf-8'), {
            Environment: {
                Variables: {
                    BobFunction: Fn.GetAtt(Bob, "Arn")
                }
            }
        }),
        [Bob]: lambdaFunction(readFileSync('Bob.js', 'utf-8')),
        ... // LambdaExecutionRole see below
    }
})
```

As you can see above, we've extracted a function `lambdaFunction` to simplify Lambda function declaration. Both `Alice` and `Bob` function's bodies are defined in separate files. Interestingly  `Alice` function, during the invocation, will have access to `BobFunction` environment variable pointing to `Bob` function [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).

Our `LambdaExecutionRole` lacks a permission to invoke another Lambda function. Let's fix that:

```typescript
    [LambdaExecutionRole]: new IAM.Role({
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: "Allow",
                Principal: { Service: ["lambda.amazonaws.com"] },
                Action: ["sts:AssumeRole"]
            }]
        },
        Path: "/",
        ManagedPolicyArns: ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"],
        Policies: [{
            PolicyName: "AllowCallingOtherLambda",
            PolicyDocument: {
                Version: "2012-10-17",
                Statement: [{
                    Sid: "InvokeLambdaPermission",
                    Effect: "Allow",
                    Action: ["lambda:InvokeFunction"],
                    Resource: "*"
                }]
            }
        }]
    })
```

The `Alice` and `Bob` sources export `main` functions invoked by AWS Lambda runtime:

```typescript
// Alice.ts
import aws from 'aws-sdk';

export function main(event: any, context: any, callback: Function) {
    new aws.Lambda().invoke({
        FunctionName: process.env.BobFunction!,
        Payload: JSON.stringify({message: "Hi!. I'm Alice."})
    }, (error: Error, data: any) => {
        const response = JSON.parse(data.Payload);
        console.log('FromBob', error || response)
        callback(error);
    });
}

// Bob.ts
export function main(event: any, context: any, callback: any) {
    console.log('FromAlice', event)
    callback(null, {message: "Hi! I'm Bob. Nice to meet you!"});
}
```

Since we now use TypeScript for `Alice` and `Bob` source we need to install the compiler `npm i --save-dev typescript @types/node aws-sdk`. Unfortunately currently in [cloudform](https://github.com/bright/cloudform) it is not possible to use custom `tsconfig.json` for the compilation. Fortunately we can invoke the compiler manually and use its outputs as any other Node.js source code. With a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "strict": true, 
    "strictPropertyInitialization": false,
    "esModuleInterop": true
  },
  "exclude": ["node_modules"],
  "compileOnSave": true
}
```

we can use the following commands to compile and deploy Lambda functions:

```bash
./node_modules/.bin/tsc

aws cloudformation update-stack \
    --capabilities CAPABILITY_IAM \
    --stack-name lambda-example \
    --template-body file://<(node -e "console.log((require('./aws-template').default))")
```

After the stack update completes we now should have 2 Lambda functions available. When we invoke the `Alice` function, we'll see that the 2 AWS Lambda functions communicate:

```text
START RequestId: 6a87c764-251e-11e8-b921-f9ca7649c7d7 Version: $LATEST
2018-03-11T11:22:00.615Z	6a87c764-251e-11e8-b921-f9ca7649c7d7	Alice says: Hi!. I'm Alice.
2018-03-11T11:22:01.676Z	6a87c764-251e-11e8-b921-f9ca7649c7d7	Bob says: Hi! I'm Bob. Nice to meet you!
END RequestId: 6a87c764-251e-11e8-b921-f9ca7649c7d7
REPORT RequestId: 6a87c764-251e-11e8-b921-f9ca7649c7d7	Duration: 1110.68 ms	Billed Duration: 1200 ms 	Memory Size: 128 MB	Max Memory Used: 34 MB	
```

[Serverless infrastructure](/our-areas/cloud-services/) offers endless possibilities. With [cloudform](https://github.com/bright/cloudform) we can take AWS Lambda development, change management and deployment to the next level.
