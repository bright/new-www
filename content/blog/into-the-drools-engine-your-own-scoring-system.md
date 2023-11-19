---
author: tomasz-k
tags:
  - backend
  - drools
date: 2023-03-15T10:53:37.685Z
meaningfullyUpdatedAt: 2023-03-15T10:53:38.254Z
title: Into the Drools Engine. Your Own Scoring System
layout: post
image: /images/blogpost_drools.png
hidden: false
comments: true
published: true
language: en
---
**In this little tutorial, I am going to show you how to turn Drools rule engine into a practical form of a deployable expert system. I will show you how to make your very own scoring service – like in the banks... well, almost. 😉 Of course, it will not be ready for production but it should give you enough fuel for your imagination to let you sketch your own solution.**

<div className="image">![Drools Engine](../../static/images/blogpost_drools.png "Drools Engine")</div>

Expert systems have been around for decades. Probably already in the times when 50MB hard drivers were of the size of washing machines. The best way of debugging was by using punch cards while smoking tons of cigarettes, of course in the office where it was possible and still cool. Perhaps. **😉**

**Expert systems (ES) are designed to mimic human expertise in a specific domain**. They use a set of rules mapping concrete knowledge base, often represented in an "if-then" format, to make decisions and provide recommendations in an authoritative way just as they were programmed.

ES were ruling the world of decision-making software and many of us have thought that now it's just a matter of algorithm optimization, scaling on the way to create A.I. capable of beating "Turing's Test". There was however another approach developed in a parallel universe which in a short amount of time took the hearts of the IT world by storm. And here it is Machine Learning everything.

In contrast, ML is a more general approach to AI that uses algorithms to learn from data and make predictions. While expert systems and ML have their own strengths and weaknesses, they can be used together to create powerful AI systems. They can make complex decisions with a high degree of accuracy. **Drools, with its ability to handle large sets of rules and manage complex decision-making processes, is a valuable tool for developers looking to build expert systems that integrate with ML** or decision-making engine on its own.

In this blog post, **I will set up a standalone Drools-based microservice and present a very basic scoring system for the transaction**. Why not own a little KYC service. 🙂

## Why all that fuss

You might be asking yourself why we need all that since we have If-Then in most programming languages and there is nothing to be proud of.

Imagine a simple program checking loan eligibility written in Java:

```java
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

```java
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

```java
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

```java
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

```java
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

```java
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

```java
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

### My Rules

Here is an example rule which will match the Account object using the name by sanction. More or less it says: “get me all the sanctions of type PEP and find me the name of the account matching those on the list”. If found, decrease the score by 500. Simple and beautiful.

There is also information that we will be using a unit as we declared previously.

```java
package com.example.model;

unit AppUnit;
import com.example.model.Education;


rule "Sub -500 when on Sanction list as PEP"
when
	$s: /sanctions[ sanctionType ==  SanctionType.PEP  ]
	$a: /accounts[ name == $s.name ]
then
	$a.addScore(-500);
end

rule "Higher education will give +100 to score"
when
	$a: /accounts[ education == Education.HIGH ]
then
	$a.addScore(100);
end


rule "Income +1000 will add +100"
when
	$a: /accounts[ income > 1000 ]
then
	$a.addScore(100);
end


rule "Sub -1000 when on Sanction list as CRIME, MILITARY, DIPLOMATIC"
when
	$s: /sanctions[ sanctionType in  ( SanctionType.CRIME, SanctionType.MILITARY, SanctionType.DIPLOMATIC ) ]
	$a: /accounts[ name == $s.name ]
then
	$a.addScore(-1000);
end
```

You can have as many rules as you can possibly imagine. I was working with systems where it was hundreds or sometimes thousands. The RETE algorithm is constructed in a way where compiled rules are constructing a network of references ahead of execution. The actual decision process is rather quick.

As the number of rules and the size of the data being processed increases, the scalability of Drools can be more like O(logn).

## Wrapping up

Now back to the rule server. What I tried to achieve here is to:

* Receive change object. In this case, it's a list of Accounts to be evaluated.
* Instantiate facts and insert them into the unit. Some facts are already on the server side. The Sanctions Provider is used to represent this as an entry from an external system. Accounts are instantiated using Change DTO.
* Execute the named query and send back the results.

```java
public class Ruleserver {

    final static SanctionProvider sp = SanctionProvider.getInstance();

    public static void main(String[] args) {
        port(8888);
        get("/", (req, res) -> "Stateless Drools Server");
        post("/execute", (req, res) -> execute(req, res), new JsonTransformer());
    }

    public static Object execute(Request req, Response res) {
        try {
            Change change = parseBody(req.body());
            AppUnit unit = getAppUnit();
            unit.setSanctions(Ruleserver.sp);

            RuleUnitInstance<AppUnit> instance = getInstance(unit);

            for (int i = 0; i < change.facts.size(); i++) {
                loadFacts(unit, change.facts.get(i));
            }

            Map<String, Object> queryResults = new HashMap<String, Object>();
            if (change.queries != null) {
                for (int i = 0; i < change.queries.size(); i++) {
                    Query q = change.queries.get(i);
                    queryResults.put(q.name, instance.executeQuery(q.name).toList(q.variable));
                }
                return queryResults;
            } else {
                return "OK";
            }

        } catch (Exception e) {
            System.out.println(e);
            System.out.println(e.getMessage());

            e.printStackTrace(System.out);
            res.status(403);
            return e;
        }

    }

    static Change parseBody(String body) {
        return deserialize(body, Change.class);
    }

    static AppUnit getAppUnit() {
        return new AppUnit();
    }

    static RuleUnitInstance<AppUnit> getInstance(AppUnit unit) {
        return RuleUnitProvider.get().createRuleUnitInstance(unit);
    }

    static void loadFacts(AppUnit unit, Fact factObj) {

        switch (factObj.typeName) {
            case "Account":
                unit.getAccounts().add(new Account(factObj.attributes));
                break;
        }
    }
}
```

## Running it

To run it you can normally kick it from gradle:

```java
gradle run
```

Once started use your favorite HTTP client to do some tests `POST localhost:8888/execute` with body:

```java
{
	"version": 1,
	{
		"typeName": "Account",
		"attributes": {
			"name": "John Snow",
			"age": 44,
			"income":1001,
			"education":"HIGH"
		}
	},
	{
		"typeName": "Account",
		"attributes": {
			"name": "Mysterio",
			"age": 79,
			"income":1001,
			"education":"HIGH"
		}
	}

	],
	"queries":[
	  { "name": "FindAccount", "variable":"$m"}
	 ]

}
```

If you wanna deploy it quickly as a service, here is simple `Dockerfile`.

```java
FROM gradle:7.2.0-jdk17
WORKDIR "/app"
COPY . .
CMD ["gradle", "run"]
EXPOSE 8888
```

To run it:

```java
docker build -t ruleserver .
docker run -p 8888:8888 ruleserver
```

## Final word

When I get 1000+ “likes” I will write second part :D with more complex modeling exercises and hints about debugging. Wait, since we don’t have “likes” here I will kindly accept a few comments instead. 😝

## References

As you might already notice this blog is fairly lightweight and might be just scratching the surface gently. There are tons of articles around rule engines, expert systems and bom models. Best is to start searching in usual places.

[https://docs.drools.org/8.35.0.Final/](https://docs.drools.org/8.35.0.Final/drools-docs/docs-website/drools/introduction/index.html)

[https://en.wikipedia.org/wiki/Bill_of_materials/](https://en.wikipedia.org/wiki/Bill_of_materials)

[https://en.wikipedia.org/wiki/Rete_algorithm/](https://en.wikipedia.org/wiki/Rete_algorithm)

You can find source code of the example here:

[https://github.com/bright/drools-ruleserver-example/](https://github.com/bright/drools-ruleserver-example)
