---
author: szymon-ch
tags:
  - frontend
  - layered architecture
  - performance
date: 2023-11-10T12:04:00.124Z
meaningfullyUpdatedAt: 2023-11-10T12:04:00.823Z
title: The Role of Performance Budgets in Modern Frontend Development
layout: post
image: /images/blog_performance_budget.png
hidden: false
comments: true
published: true
language: en
---
**Performance is a vital component of a good user experience, and we have learned it affects business metrics. In other words, an application that doesn't perform well will cost you greatly. How can one ensure that performance will remain at acceptable levels? To achieve a goal, you must first define it. That's when performance budgets come into play.**

<div className="image">![Performance budget](../../static/images/blog_performance_budget.png "Performance budget")</div>

## Budgets to rescue

**A performance budget is a limit that all developers agree not to exceed in any circumstances**. Basically, you can treat it like a monthly financial budget. If you want to make something stand out, then you will probably have to let something else go. It's fluid - depending on the business requirements for this month, you can decide to adjust it. For example, you can reduce the number of images in exchange for additional JavaScript being shipped. **Budgeting is not only about the size of images, scripts, and other resources. This principle may also be applied to metrics like FCP (First Contentful Paint), TTI (Time To Interactive), or scores reported by tools like Lighthouse**.

Having budgets defined for your application may spark a discussion about performance and get everyone on your team on the same page. They make designers limit high-resolution images and fonts until they are absolutely necessary. On the other hand, **software engineers may easily evaluate the performance of different libraries and frameworks and compare them based on their influence on budgets**.

## Choosing metrics

### Quantity-based metrics

Rules based on this type of metrics are the easiest to establish and enforce. They are **based on raw values like the weight of JavaScript files, the number of HTTP requests, fonts, or images**. However, they may not reflect the user experience correctly.

### Milestone timings

In order to keep the user experience at an acceptable level, it may be better to **focus on time-based metrics like Time to Interactive or First Contentful Paint**. You can also define your metrics depending on what is the most important action from the perspective of your users. It's also possible to combine multiple milestones together to even better describe the path of a user in the application.

### Rule-based metrics

**These metrics use performance scores calculated by tools like Lighthouse**, which you can use as guidelines. What's even better, such tools provide hints on how to make your application perform better.

## Defining a budget

There is no way to provide a universal set of rules that will make sense for every application. However, **there are some good defaults to start with**:

* under 5 seconds Time to Interactive,
* under 170 KB of critical-path resources.

**The best thing you can do is to analyze your competition and see how they perform**. Then in the worst-case scenario, you will match them and provide a similar experience to your users. On the other hand, you may enforce lower limits and outperform them - it's up to you and your team.

It's worth mentioning **budgets should be unambiguous**. There is no use in a rule saying: "our home page must load and get interactive in less than 5 seconds on a slow device." What's a slow device? Three-year high-end device or maybe a $100 smartphone released 5 years ago? I recommend doing a short research and using an exact model instead.

There may be **a different set of budgets enforced for different kinds of pages** in your application. It's usually crucial for your home page to load as quickly as possible, but users may wait a little more for other screens.

It's not the easiest task to define a reasonable budget. Check out [performancebudget.io](https://performancebudget.io/), which will serve as a visual aid with presets for different network speeds.

## Making sure your team stays within budgets

There are many tools to choose from when it comes to enforcing budgeting in your application. It all depends on the time you want to spend on research and configuration.

The most basic one is **[bundlesize](https://github.com/siddharthkp/bundlesize), which will check if your bundle stays within reasonable boundaries**. This way, engineers in your team won't be able to merge any pull requests that contain additional imports of expensive libraries.

If you want to make sure that your builds stay green in the Lighthouse audits, then **you should familiarize yourself with [lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci)**. It makes it possible to **run audits in your CI pipeline and define rules that should never be broken**. To name one, you can say that your application is meant to score over 90 points in every audit, and then your CI will fail when any score drops below the threshold. What's even better is that it's possible to limit asset size or make assertions on your custom metrics. It's a versatile tool, a must-have for every web developer.

It's worth mentioning that [Webpack](https://webpack.js.org/) is also capable of enforcing asset size limits. In its default configuration, this bundler will display a warning in the console if some scripts or images are too large. However, you can reconfigure it to throw an error instead. Consult [its documentation](https://webpack.js.org/configuration/performance/) to learn how to enable this feature.

## Discussing budgets with decision-makers

We all have been here. You are working hard to ensure your application loads and can be used quickly, but then there comes this one meeting, and you see you will have to completely redesign the home page and put tons of images and other visual elements on it. You are aware that it will have a huge impact on the load time, and so you try to minimize losses, but they don't want to listen to you.

It's a fact that there is a constant struggle going on between stakeholders and engineers. We often tend to disagree or even don't understand each other. **It's likely common that non-engineering members of your team are not aware of the performance consequences of their decisions. That's not their job. It's up to us to explain and present it to them in the clearest way possible.**

With budgets in place, you can say that bringing this additional carousel of images will make us miss the 5-second deadline for page load. That's something easily understandable for everyone. Moreover, having those limits in place allows you to move the discussion back in time to the design stage. This will save you a lot of time, which you will be able to spend on something else.

<div className="image">![Discussion](../../static/images/discussion_photo_blog.png "Discussion")</div>

## We have to go over the budget!

Congratulations - you have enforced a strict budget in your application, and it has already prevented several changes that would degrade performance by accident. However, as products tend to grow over time, you have been adding more and more features to yours, and now **you cannot do it anymore because your budget is exhausted**. What should you do?

**You have to compromise. You can either:**

* get back to previously added features and optimize them,
* decide to remove some feature to make place for a new one (or postpone interactivity with it),
* completely abandon your idea and don't ship another feature.

As with a financial budget, when you go over the limit, then you have to reduce spending on leisure and move funds to bills instead. The same principle applies here. That's why **it's so important to have both engineers, designers, and stakeholders on the same page**. We all have to cooperate to answer the question and provide the best possible experience.

In conclusion, **performance budgets are an invaluable tool** for ensuring that your application consistently delivers a top-notch user experience. By setting clear limits and guidelines for metrics, such as Time to Interactive and resource sizes, you can keep your team aligned and focused on optimizing performance from the design stage itself. These budgets also facilitate productive discussions with stakeholders, helping them understand the trade-offs between features and performance. However, it's essential to **remain flexible and be ready to compromise** when you inevitably reach the limits of your budget. **Remember that it's a collaborative effort involving engineers, designers, and decision-makers** to provide the best possible user experience and maintain a healthy performance balance in your application.
