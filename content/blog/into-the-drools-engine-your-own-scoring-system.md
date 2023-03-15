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
java
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