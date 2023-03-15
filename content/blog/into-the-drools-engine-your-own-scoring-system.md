---
author: tomasz-k
tags:
  - backend
  - drools
date: 2023-03-15T10:19:09.155Z
meaningfullyUpdatedAt: 2023-03-15T10:19:09.193Z
title: Into the Drools Engine. Your Own Scoring System
layout: post
image: /images/blogpost_drools.png
hidden: false
comments: true
published: true
---
**In this little tutorial, I am going to show you how to turn Drools rule engine into a practical form of a deployable expert system. I will show you how to make your very own scoring service – like in the banks... well, almost. 😉 Of course, it will not be ready for production but it should give you enough fuel for your imagination to let you sketch your own solution.**

<div class="image"><img src="/images/blogpost_drools.png" alt="Drools Engine" title="Drools Engine"  /> </div>

Expert systems have been around for decades. Probably already in the times when 50MB hard drivers were of the size of washing machines. The best way of debugging was by using punch cards while smoking tons of cigarettes, of course in the office where it was possible and still cool. Perhaps. **😉**

**Expert systems (ES) are designed to mimic human expertise in a specific domain**. They use a set of rules mapping concrete knowledge base, often represented in an "if-then" format, to make decisions and provide recommendations in an authoritative way just as they were programmed.

ES were ruling the world of decision-making software and many of us have thought that now it's just a matter of algorithm optimization, scaling on the way to create A.I. capable of beating "Turing's Test". There was however another approach developed in a parallel universe which in a short amount of time took the hearts of the IT world by storm. And here it is Machine Learning everything.

In contrast, ML is a more general approach to AI that uses algorithms to learn from data and make predictions. While expert systems and ML have their own strengths and weaknesses, they can be used together to create powerful AI systems. They can make complex decisions with a high degree of accuracy. **Drools, with its ability to handle large sets of rules and manage complex decision-making processes, is a valuable tool for developers looking to build expert systems that integrate with ML** or decision-making engine on its own.

In this blog post, **I will set up a standalone Drools-based microservice and present a very basic scoring system for the transaction**. Why not own a little KYC service. 🙂

## Why all that fuss

You might be asking yourself why we need all that since we have If-Then in most programming languages and there is nothing to be proud of.

Imagine a simple program checking loan eligibility written in Java:

```
public class LoanEligibilityChecker {

    public boolean checkEligibility(Applicant applicant) {
        boolean isEligible = false;

        if (applicant.getIncome() > 50000 && applicant.getCreditScore() > 600) {
            isEligible = true;
        }

        if (applicant.getIncome() > 75000 && applicant.getCreditScore() > 550) {
            isEligible = true;
        }

        if (applicant.getIncome() > 100000 && applicant.getCreditScore() > 500) {
            isEligible = true;
        }

        // check if the applicant has a cosigner
        if (applicant.getCosigner() != null) {
            Cosigner cosigner = applicant.getCosigner();
            if (cosigner.getIncome() > 75000 && cosigner.getCreditScore() > 650) {
                isEligible = true;
            }
        }

        return isEligible;
    }

}
```

There is not much going on in the code but it already becomes not so readable. Now imagine how this class will look if we decide to add, say, 50 more conditions. Also, some of them will change the preconditions and will require recursively firing all rules over and over.

In contrast `Dools` rules are never dependent on each other. They are truly atomic and declarative. They will be automagically reevaluated and they are isolated from infrastructure enough to be self-explanatory to the business. As a matter of fact, many production systems delegate fact modeling and writing the rules to non-programmers letting the knowledge base releases be asynchronous to infrastructure code.

```
rule "Eligibility for loan"
    when
        $a : Applicant(income > 50000, creditScore > 600)
    then
        $a.setEligible(true);
end

rule "Eligibility for loan - high income"
    when
        $a : Applicant(income > 75000, creditScore > 550)
    then
        $a.setEligible(true);
end

rule "Eligibility for loan - very high income"
    when
        $a : Applicant(income > 100000, creditScore > 500)
    then
        $a.setEligible(true);
end

rule "Eligibility for loan - with cosigner"
    when
        $a : Applicant(cosigner != null, $c : cosigner, income > 0, creditScore > 0)
        $c : Cosigner(income > 75000, creditScore > 650)
    then
        $a.setEligible(true);
end
```

So, without further ado...

## Facts modeling

Drools gives you absolute freedom how your facts are injected in the system. In my past experience, I found 2 ways of modeling cases particularly popular:

* Master model as a large tree structure representing a physical object. Where interaction is performed by facts modifying the state of Master. It's good for large Billing Of Material tree-like structures and user selections (smaller facts acting as actions) making quantity changes on the Master BOM tree leaves. This might be familiar for those working with large enterprises building and sending customizable complex machinery.
* Small loose facts models are thrown into working memory much like into the bucket. Fact objects might have a moderate amount of properties. Fact objects might represent goods or parcels but also contextual objects like policies.

Facts in Drools are technically POJOs and may work perfectly with DDD making it as close in naming and relation to business objects as you can get.

## The Rules

Rules in Drools are conditions written in a declarative language called DRL (Drools Rule Language) and they resemble the classic flow control statement you may find in most programming languages IF... THEN.

For the sake of coolness it's WHEN... THEN. Where expression behind the WHEN is called Left Hand Side (LHS) and defines the conditions that must be met for the rule to be activated. These conditions are based on the objects (Facts) being in the working memory at the time of reasoning.

In contrast, expressions behind the THEN are known as Right Hand Side (RHS) and defines actions to be performed when conditions in LHS are met. What kind of actions? Modification of existing facts (changing its properties). Logically adding and retracting facts from working memory. Each of these actions may cause the rule engine to reestablish the execution agenda - which means recalculating everything. All conditions must be met at all times. You may ask if it's possible to get into an infinite loop - of course. Luckily there are couple of ways of preventing this.

## Modeling

Modeling decision is the process of creating a representation of the business process using domain objects and constraints.

* Data modeling: This involves creating an abstract representation of business objects and its relationships within a system.
* Rule modeling: This involves creating models that represent the business rules and decision logic that govern a business system.

## Sounds gloomy?

Simply facts will be our Java POJOs representing the subject of our reasoning. Rules will be the conditions.

## The setup

Our "typical" modern expert system will consist of the following elements.

* Fact Model
* Rules
* Optional External system
* REST interface

## Let's get started

First things first. Let's create a project, grab some dependencies and have a coffee. Not really, it's gotta be quick.

```
plugins {
    `java-library`
    `application`
}

application {
    mainClassName = "com.example.ruleserver.Ruleserver"
}

repositories {
    mavenLocal()
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    api("org.drools:drools-ruleunits-engine:8.32.0.Final")
    api("org.drools:drools-model-compiler:8.32.0.Final")
    api("org.drools:drools-wiring-dynamic:8.32.0.Final")
    api("com.sparkjava:spark-core:2.9.4")
    api("com.jsoniter:jsoniter:0.9.20")

}

group = "com.example"
version = "1.0-SNAPSHOT"
description = "ruleserver"
java.sourceCompatibility = JavaVersion.VERSION_1_8
```

You've already noticed that apart from Drools-related dependencies there are a couple of other jars coming along. These are not required and depend on your personal taste in how you would like to build a solution for the rule server. You are free to use any application server or RPC of your choice. Same with a marshaling library.

I will be using Spark http server library and Jsoniter - JSON parser.

```
package com.example.ruleserver;

import static spark.Spark.*;
import spark.Request;
import spark.Response;

public class Ruleserver {

    public static void main(String[] args) {
        port(8888);
        get("/", (req, res) -> "Stateless Drools Server");
    }
}
```

Not much here. But feel free to fire `gradle run` and check using HTTP Client of your choice. You will find out what we will be doing here. Yes, it's `stateless`. Its main benefit is releasing memory right after reasoning is done.

Drools provides an option to work as a stateful engine. It's useful when a fact model is very complex and can not be established easily within a limited amount of interactions or the construction of base models takes a lot of time.

### Fact Model

```
package com.example.model;
import java.util.Map;

public class Account {

    String name;
    double age;
    double income;
    Education education;

    int score;

    public Account(Map<String, Object> attributes) {
        super();
        this.age = (double) attributes.get("age");
        this.name = (String) attributes.get("name");
        this.education = attributes.get("education") != null
                ? Education.valueOf((String) attributes.get("education"))
                : Education.MIDDLE;
        this.income = (double) attributes.getOrDefault("income", 0.0);
        this.score = 0;
    }

// getters & setters here

    public void addScore(int add) {
        this.score += add;
    }
}
```

This is our main fact for this example. We will be throwing Accounts into the system and we will be getting back scoring. As I mention Facts are POJOs. Here with constructor allows easy instantiation from JSON objects an additional method to aggregate the score. You may guess that Education is an enum here. Nothing fancy here.

In recent versions of Drools new way of aggregating facts and rules have been introduced: Rule Units.

I really like its simplicity, abstraction of Data Stores - collections of facts of the same type. Let's use it.

```
package com.example.model;

import org.drools.ruleunits.api.DataSource;
import org.drools.ruleunits.api.DataStore;
import org.drools.ruleunits.api.RuleUnitData;

public class AppUnit implements RuleUnitData {

    private final DataStore<Account> accounts;

    private DataStore<Sanction> sanctions;

    public AppUnit() {
        this(DataSource.createStore());
    }

    public AppUnit(DataStore<Account> accounts) {
        this.accounts = accounts;
    }

    public DataStore<Account> getAccounts() {
        return accounts;
    }

    public DataStore<Sanction> getSanctions() {
        return sanctions;
    }

    public void setSanctions(DataStore<Sanction> sanctions) {
        this.sanctions = sanctions;
    }
}
```

In this construct, I am instantiating an empty datastore of accounts while leaving an empty socket for sanctions. This is my metaphor for external service being used here. In my previous projects, I often injected facts with a reference to an external system (db). In this case, I envision writing a plugin for my system by implementing the DataStore interface.

```
package com.example.model;

import org.drools.ruleunits.api.DataHandle;
import org.drools.ruleunits.api.DataProcessor;
import org.drools.ruleunits.api.DataSource;
import org.drools.ruleunits.api.DataStore;

public class SanctionProvider implements DataStore<Sanction> {

    DataStore<Sanction> sanctions;

    private static SanctionProvider instance = new SanctionProvider();

    private SanctionProvider() {
        sanctions = DataSource.createStore();
        this.init();
    }

    private void init() {
        this.sanctions.add(new Sanction(SanctionType.CRIME, "John Snow"));
        this.sanctions.add(new Sanction(SanctionType.CRIME, "Loki"));
        this.sanctions.add(new Sanction(SanctionType.DIPLOMATIC, "Mysterio"));
    }

    public static SanctionProvider getInstance() {
        return instance;
    }

    @Override
    public void subscribe(DataProcessor<Sanction> subscriber) {
        this.sanctions.subscribe(subscriber);
    }

    @Override
    public DataHandle add(Sanction object) {
        return this.sanctions.add(object);
    }

    @Override
    public void update(DataHandle handle, Sanction object) {
        this.sanctions.update(handle, object);
    }

    @Override
    public void remove(DataHandle handle) {
        this.sanctions.remove(handle);
    }

    @Override
    public void remove(Sanction object) {
        this.sanctions.remove(object);
    }

}
```