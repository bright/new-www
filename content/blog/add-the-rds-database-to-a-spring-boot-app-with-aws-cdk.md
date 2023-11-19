---
author: adam-w
tags:
  - AWS
  - RDS
  - spring boot
  - AWS-CDK
  - devops
date: 2022-12-20T14:44:31.354Z
meaningfullyUpdatedAt: 2022-12-20T14:44:31.377Z
title: Add the RDS Database to a Spring Boot App with AWS CDK
layout: post
image: /images/blogcover_aws_cdk_rds.png
hidden: false
comments: true
published: true
language: en
---
**Are you tired of manually setting up and maintaining your own databases? Fear not, because the AWS CDK is here to save the day!**

<div className="image">![\*\*AWS CDK\*\*](../../static/images/blogcover_aws_cdk_rds.png "undefined")</div>

In this article, **you'll learn how to use the AWS Cloud Development Kit (CDK) to set up an Amazon Relational Database Service (RDS) database using the Postgres Relational Database Management System (RDBMS)**. You'll also **discover how to pass database variables**, such as the username, password, name, URL, and port, to an AWS Fargate container. Finally, you'll learn **how to configure a Spring Boot application** to access the database. By following the steps outlined in this article, you can easily set up and integrate a Postgres RDS database with a Spring Boot application deployed on Fargate using the CDK.

## Goals

* Using AWS CDK declare the RDS database with Postgres RDMS.
* Pass database variables (username, password, name, URL, port) to the Fargate container.
* Configure database access on the application side.

*If you don't have a defined Fargate service, here is a tutorial on how to deploy a Spring Boot app with Fargate using CDK: [Create CI/CD pipeline in GitLab with AWS CDK, Docker, Spring Boot and Gradle](https://brightinventions.pl/blog/create-ci-cd-pipeline-in-gitlab-with-aws-cdk-docker-spring-boot-and%C2%A0gradle).*

## Create database stack

In the lib folder in your's CDK project directory create the `database-stack.ts` file.

![directory-structure](https://cdn-images-1.medium.com/max/1600/1*lTAoKjnSIs6hzEG1CDDUIQ.png)

To create a database we will use DatabaseInstance construct, and for database credentials, we will use a secret from the secrets manager (`Credentials.fromGeneratedSecret`). The secret will be generated and stored in the secrets manager.

```typescript
import {Duration, RemovalPolicy, Stack} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {InstanceClass, InstanceSize, InstanceType, IVpc} from "aws-cdk-lib/aws-ec2";
import {Credentials, DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion} from "aws-cdk-lib/aws-rds";
import {deployEnv, isProductionDeployEnv, KnownDeployEnv, projectEnvSpecificName} from "./env-utils";

export class DatabaseStack extends Stack {
    static readonly databasePort = 5432;
    static readonly databaseName = `backend_postgres_db`;

    readonly databaseInstance: DatabaseInstance;

    constructor(scope: Construct, id: string, vpc: IVpc) {
        super(scope, id);

        const databaseUsername = 'backend_postgres_db_user';
        const dbCredentialsSecretName = `backend_db_postgres_credentials_${deployEnv()}`;

        const databaseCredentials = Credentials.fromGeneratedSecret(databaseUsername, {
            secretName: dbCredentialsSecretName
        });

        this.databaseInstance = new DatabaseInstance(this, projectEnvSpecificName('postgres-db'), {
            databaseName: DatabaseStack.databaseName,
            engine: DatabaseInstanceEngine.postgres({version: PostgresEngineVersion.VER_14_2}),
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
            instanceIdentifier: projectEnvSpecificName('postgres-db'),
            credentials: databaseCredentials,
            port: DatabaseStack.databasePort,
            maxAllocatedStorage: 200,
            vpc,
            deletionProtection: deployEnv() === KnownDeployEnv.prod,
            removalPolicy: removalPolicyAppropriateForEnv(),
            backupRetention: databaseBackupRetentionDaysForEnv(),
            copyTagsToSnapshot: true,
            iamAuthentication: true
        });
    }
}

export function removalPolicyAppropriateForEnv() {
  return isProductionDeployEnv() ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY;
}

export function databaseBackupRetentionDaysForEnv() {
  return isProductionDeployEnv() ? Duration.days(14) : Duration.days(1)
}
```

Helper methods and variables (`deployEnv, isProductionDeployEnv, KnownDeployEnv, projectEnvSpecificName`) are defined in the `env-utils.ts` file:

```typescript
const DEPLOY_ENV: DeployEnv = process.env.DEPLOY_ENV || 'test';

export enum KnownDeployEnv {
    prod = 'prod',
    stage = 'stage',
    test = 'test'
}

export function deployEnv(): DeployEnv {
    return DEPLOY_ENV;
}

export type DeployEnv = KnownDeployEnv | string

export const PROJECT_NAME = "backend";

export function projectEnvSpecificName(name: string = ""): string {
    const prefix = PROJECT_NAME.replace('_', '-') + "-" + DEPLOY_ENV;
    if (name.startsWith(prefix)) {
        return name
    } else {
        return `${prefix}-${name}`
    }
}

export function isProductionDeployEnv() {
    return deployEnv() == KnownDeployEnv.prod
}
```

## Pass database variables to the Fargate container

In the Fargate service definition (*ApplicationLoadBalancedFargateService* construct) we can configure ***secrets*** and ***environment*** properties. Variables defined in those will be passed to the container (in that way app will have access to those variables).

```typescript
import {Duration, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {AwsLogDriver, Cluster, ContainerImage, Secret} from "aws-cdk-lib/aws-ecs";
import {ApplicationLoadBalancedFargateService} from "aws-cdk-lib/aws-ecs-patterns";
import {LogGroup} from "aws-cdk-lib/aws-logs";
import {IVpc} from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import {projectEnvSpecificName} from "./env-utils";
import {DatabaseInstance} from "aws-cdk-lib/aws-rds";
import {DatabaseStack} from "./database-stack";

export class InfrastructureStack extends Stack {

    private readonly TAG_COMMIT: string = process.env.TAG_COMMIT || 'latest'
    private readonly ECR_REPOSITORY_NAME: string = "ci-cd-demo-app"

    constructor(scope: Construct, id: string, vpc: IVpc, dbInstance: DatabaseInstance, props?: StackProps) {
        super(scope, id, props);

        const cluster = new Cluster(this, projectEnvSpecificName('Cluster'), {
            vpc: vpc
        });

        const service: ApplicationLoadBalancedFargateService = new ApplicationLoadBalancedFargateService(this, projectEnvSpecificName("application-lb-fargate-service"), {
            serviceName: projectEnvSpecificName("fargate-service"),
            cluster: cluster,
            cpu: 512,
            desiredCount: 2,
            listenerPort: 8080,
            memoryLimitMiB: 1024,
            publicLoadBalancer: true,
            taskImageOptions: {
                containerName: projectEnvSpecificName("ecs-container"),
                image: ContainerImage.fromEcrRepository(ecrRepositoryForService(this, this.ECR_REPOSITORY_NAME), this.TAG_COMMIT),
                containerPort: 8080,
                secrets: {
                    DB_POSTGRES_PASSWORD: Secret.fromSecretsManager(dbInstance.secret!, "password"),
                    DB_POSTGRES_USERNAME: Secret.fromSecretsManager(dbInstance.secret!, "username"),
                },
                environment: {
                    DB_POSTGRES_HOST: dbInstance.dbInstanceEndpointAddress,
                    DB_POSTGRES_PORT: dbInstance.dbInstanceEndpointPort,
                    DB_POSTGRES_NAME: DatabaseStack.databaseName,
                },
                logDriver: new AwsLogDriver({
                    logGroup: new LogGroup(this, projectEnvSpecificName("log-group"), {
                        logGroupName: projectEnvSpecificName("app-service"),
                        removalPolicy: RemovalPolicy.DESTROY
                    }),
                    streamPrefix: projectEnvSpecificName(),
                })
            }
        })

        service.service.connections.allowTo(dbInstance.connections, Port.tcp(DatabaseStack.databasePort), "Postgres db connection")

        service.targetGroup.configureHealthCheck({
            path: "/actuator/health",
            port: "8080",
            healthyHttpCodes: "200"
        })

        const scalableTaskCount = service.service.autoScaleTaskCount({
            minCapacity: 2,
            maxCapacity: 4
        });

        scalableTaskCount.scaleOnCpuUtilization(projectEnvSpecificName("service-auto-scaling"), {
            targetUtilizationPercent: 50,
            scaleInCooldown: Duration.seconds(60),
            scaleOutCooldown: Duration.seconds(60),
        })
    }
}

export function ecrRepositoryForService(scope: Construct, serviceName: string) {
    return ecr.Repository.fromRepositoryName(scope, `${serviceName} repository`, serviceName)
}
```

Besides ***secrets*** and ***environment*** properties definition, the connection between the service and database was opened:

```type
service.service.connections.allowTo(dbInstance.connections, Port.tcp(DatabaseStack.databasePort), "Postgres db connection")
```

Without this line, the service would not have access to the database.

Now after the creation of DatabseStack we can pass *databaceInstance* into *InfrastractureStack* definition.

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {InfrastructureStack} from '../lib/infrastructure-stack';
import {projectEnvSpecificName} from "../lib/env-utils";
import {NetworkStack} from "../lib/network-stack";
import {DatabaseStack} from "../lib/database-stack";

async function main() {
    const app = new cdk.App();
    const network = new NetworkStack(app, projectEnvSpecificName("network"));
    const database = new DatabaseStack(app, projectEnvSpecificName("database"), network.vpc)
    new InfrastructureStack(app, projectEnvSpecificName("app-service"), network.vpc, database.databaseInstance)
}

main().catch(er => {
    console.log(er)
    process.exit(1)
})
```

## Configure database access on the application side

Add dependencies for database access and database driver:

```
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
implementation("org.postgresql:postgresql")
```

In src/resources/application.yml configure datasource:

```
spring:
  datasource:
    url: jdbc:postgresql://${DB_POSTGRES_HOST}:${DB_POSTGRES_PORT}/${DB_POSTGRES_NAME}
    username: ${DB_POSTGRES_USERNAME}
    password: ${DB_POSTGRES_PASSWORD}
```

Variables names have the same value as the keys in ***secrets*** and ***environment*** in task image options in the Fargate service definition. Because we add those variables into a container the application has access to them and can connect to the database.

With just a little configuration, your application will have access to and be able to use the database without any issues.

## Summary

By following the instructions in this article, **you'll be able to easily set up and integrate an RDS database with a Spring Boot app on AWS**.

***All of the code (with working CI/CD for 2 environments) you can find here:***
https://gitlab.com/adam.waniak11/ci-cd-demo-app

<div className="block-button"><h2>We are looking for backend developers (TS, Node.js)</h2><div>Work on projects such as the blockchain platform for a top global humanitarian agency, accounting software, or web therapy application.</div><a href="/jobs/senior-backend-developer-typescript"><button>Apply and join our team</button></a></div>
