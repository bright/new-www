---
author: radek-l
tags:
  - nestjs
  - backend
date: 2023-11-02T07:38:50.060Z
meaningfullyUpdatedAt: 2023-11-02T07:38:50.725Z
title: NestJS Parametrizable Dynamic Modules
layout: post
image: /images/blog_modularization.png
hidden: false
comments: true
published: true
language: en
---
NestJS allows to easily encapsulate code not only with Static modules, but also Dynamic Modules. Dynamic modules allow us to modify the module's configuration, dependencies or behaviour at bootstrap time. This gives a massive advantage in terms of code deduplication and reusability. Let's give it a go and implement Notifications by means of Dynamic Modules

<div className="image">![Modularization](../../static/images/blog_modularization.png "Modularization")</div>

## Objective

* The library for sending UserNotifications to different countries with fast horizontal expansion to next countries

### Goals:

* Library exposes an interface to easily send a Notification to a User
* Library allows to differentiate how to deliver notification: email or sms
* Library allows to define custom ways of of delivery
* Each Notifcation send attempt is logged and saved in persistence

### Initial analysis:

* The common parts to any kind of delivery is to: Send a notification, log all attempts and persist them. The specific part is how we technically deliver the notification: SMS or Email.
* We can create a common piece of code to do the common stuff and put SMS and Email sending itself in a dedicated modules.

### Minimalistic, incorrect and faulty implementation:

```typescript
import {DynamicModule, Inject, Injectable, Module} from '@nestjs/common';
import {Type} from "@nestjs/common/interfaces/type.interface";

@Module({
    providers: [ NaiveuserNotificationService ],
    exports: [ NaiveuserNotificationService ]
})
export class NaiveUserNotificationModule {}

export class NaiveUserNotificationService {
    async notify(user: string, message: string, delivery: "SMS" | "EMAIL"): Promise<void> {
        switch (delivery) {
            case "SMS":
                this.sendSms(user, message)
                break;
            case "EMAIL":
                this.sendEmail(user, message)
                break;
            default: 
                throw new Error("Unknown delivery type")
        }
    }

    private sendSms(user: string, message: string) {
        console.log(`User ${user} notified with message: ${message} by SMS`)
    }

    private sendEmail(user: string, message: string) {
        console.log(`User ${user} notified with message: ${message} by EMAIL`)
    }
}

@Module({
    imports: [
        NaiveUserNotificationModule
    ]
})
export class ConsumerModule {}
```

#### **What’s wrong with this example:**

The goal `Library allows to define custom ways of of delivery` is not fulfilled in multiple aspects

* The switch-case breaks OCP 

  * Adding a new delivery method requires modifying `NaiveUserNotificationService`
* The switch-case breaks SRP

  * By Robert C. Martin words: “A class should have only one reason to change”. This class has multiple reasons to change, because it carries implementation related to totally separate concepts: Email and SMS sending. If at some point, we want to modify the Email Sending logic, so we can put the \`message\` test within some prerendered template then the class will bloat even more

#### How to make it better?

Let’s abstract the act of sending the notification from the act of delivering it by exposing a `NotificationExecutor` interface. Also, we’ll put Email and Sms sending logic into dedicated `NotificationExecutors` and place them into respective, independent NestJS Modules. We’ll also transform a static module: `NaiveUserNotificationModule` to a Dynamic one, to allow to inject `NotificationExecutor` at bootstrap time.

*SmsNotificationModule*

```typescript
@Injectable()
export class SmsNotificationExecutor implements NotificationExecutor {
    async notify(user: string, message: string): Promise<void> {
        console.log(`User ${user} notified with message: ${message} by SMS`)
    }
}

@Module({
    providers: [{provide: "NotificationExecutor", useClass: SmsNotificationExecutor}],
    exports: ["NotificationExecutor"]
})
export class SmsNotificationModule {}
```

*EmailNotificationModule*

```typescript
@Injectable()
export class EmailNotificationExecutor implements NotificationExecutor {
    async notify(user: string, message: string): Promise<void> {
        console.log(`User ${user} notified with message: ${message} by EMAIL`)
    }
}

@Module({
    providers: [{provide: "NotificationExecutor", useClass: EmailNotificationExecutor}],
    exports: ["NotificationExecutor"]
})
export class EmailNotificationModule {}
```

*NaiveUserNotificationModule*

```typescript
import {DynamicModule, Inject, Injectable, Module} from '@nestjs/common';
import {Type} from "@nestjs/common/interfaces/type.interface";

export interface NotificationExecutor {
    notify(user: string, message: string): Promise<void>
}

export class NaiveUserNotificationService {
    constructor(@Inject("NotificationExecutor") private readonly notificationExecutor: NotificationExecutor) {
    }

    async notify(user: string, message: string): Promise<void> {
        this.logAttempt(user, message)
        this.persistAttempt(user, message)

        await this.notificationExecutor.notify(user, message)
    }

    private logAttempt(user: string, message: string) {
        console.log(`User ${user} notified with message: ${message}`)
    }

    private persistAttempt(user: string, message: string) {
        console.log(`User ${user} notification ${message} persisted`)
    }
}

@Module({
    providers: [ NaiveUserNotificationService ],
    exports: [ NaiveUserNotificationService ]
})
export class NaiveUserNotificationModule {
    static register(notificationExecutor: Type<any>): DynamicModule {
        return {
            module: NaiveUserNotificationModule,
            imports: [notificationExecutor],
            providers: [NaiveUserNotificationService],
            exports: [NaiveUserNotificationService]
        }
    }
}
```

*Consumer modules*

```typescript
@Module({
    imports: [
        NaiveUserNotificationModule.register(
            EmailNotificationModule
        )
    ]
})
export class ConsumerModuleWhichDecidesToUseEmailNotificationModule {}

@Module({
    imports: [
        NaiveUserNotificationModule.register(
            SmsNotificationModule
        )
    ]
})
export class ConsumerModuleWhichDecidesToUseSMSNotificationModule {}
```

#### What have we done?

* Created a common interface: `NotificationExecutor`
* Create two implementations: `EmailNotificationExecutor`, `SmsNotificationExecutor` which have been delegated to their respective modules as Provides. Also, the Executors are exported by an aliased value: `“NotificationExecutor”.` This token is expected in `NaiveUserNotificationService`.

Next steps would be:

* Put all classes into dedicated modules
* Create a `UserNotificationContractModule` which keeps:

  * `NotificationExecutor` interface
  * `“NotificationExecutor”` token constant
  * Executors would import `UserNotificationContractModule` to implement the interface and properly export their dependencies
  * `NaiveUserNotificationModule` would import `UserNotificationContractModule` to make use of the interface and the token constant
  * `NaiveUserNotificationModule` would also import concrete Executors’ modules
* Create an `EmailToUserNotificationBridgeModule` and `SMSToUserNotificationBridgeModule` to decouple the pure Email and SMS senders from the specifics of `NaiveUserNotificationModule`. The ‘specific’ part is the fact that `SmsNotificationExecutor` module has to export the service by a token which is specific to another module. Reusable components should have no knowledge about their consumers. The Bridge between can allow to mitigate that, keeping Email and SMS Modules unaware of consumers. The Brigde would now carry that awareness but that’s it’s fundamental purpose.

## Summary

By the approach I just showed you we achieved a clean dependency structure, no circular dependencies, no SOLID rules broken, full extensibility and configurability. Dynamic Modules are a great tool but there is much more in NestJS arsenal related to Dependency Inversion Principle: obtaining modules by ModuleRef class, lazy loaded modules are there to be used so check them out!
