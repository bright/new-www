---
layout: post
title: "Mocha.js - how to enable multiple test runners on CI/CD? "
date: 2021-04-15T11:48:19.197Z
meaningfullyUpdatedAt: 2021-04-15T11:48:19.197Z
image: /images/request_typing.png
author: rafal h
tags:
  - mocha.js
  - ci/cd
  - tests
  - javascript
  - runner
  - junit
  - mocha
  - ci
  - cd
hidden: false
comments: true
published: true
language: en
---
One of our projects is running automated tests on CI/CD AzurePipelines. 

For the test runner, AzurePipeline [supports several](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-test-results?view=azure-devops&tabs=trx%2Cyaml) test results templates but not the default Mocha spec one. 

This is why tests are running on the mocha Junit reporter producing the JUnit XML result. 

As there was a difference between running tests locally and on CI/CD environment, I wanted to debug the logs of the job. That what not possible as the Mocha JUnit reporter was not collecting console outputs/errors. 

Mocha.js does not support multiple runners right now. The solution for that was to introduce own runner, which combines both Mocha JUnit reporter and default spec Mocha reporter: 

```javascript
'use strict';

const Mocha = require('mocha');
const JUnit = require('mocha-junit-reporter');
const Spec = Mocha.reporters.Spec;
const Base = Mocha.reporters.Base;

// This is combination of spec (mocha normal) + junit reporter so both is displayed on azure
class AzurePipelinesReporter extends Base {
    constructor(runner, options) {
        super(runner, options);
        this._junitReporter = new JUnit(runner, options);
        this._specReporter = new Spec(runner, options);
    }
}
module.exports = AzurePipelinesReporter;
```

Then, the custom reporter can be used by specyfing the file name and flags to both reporters if needed: 

`mocha --reporter azurePipelinesReporter.js --reporter-options mochaFile=some_path_to_results`

Let me know if you had a similar problem, stay tuned for the next tips & tricks!
