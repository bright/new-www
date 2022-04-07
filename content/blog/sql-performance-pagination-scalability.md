---
author: rafal h
tags:
  - sql
  - performance
  - pagination
  - development
  - tips&tricks
date: 2021-08-26T07:39:58.352Z
title: SQL Performance - pagination scalability
layout: post
image: /images/sql_performance_pagination_scalability.png
hidden: false
comments: true
published: true
---
Recently I have been reading [SQL Performance Explained by Markus Winand](https://www.goodreads.com/book/show/17225810-sql-performance-explained) and I wanted to share with you what I have learned regarding SQL pagination scalability. 

Probably if you would be given the task to implement pagination, you would do it with `LIMIT` and `OFFSET` in a query. This would be completely fine, but it is good to know the limitations of it. 

The more you browse back in history (increase `LIMIT` and `OFFSET`) the more **response time increases.** This is due to the fact that DB has to count all rows until it reaches the requested page. 

An answer for that would be to include a `WHERE` statement in a query with `FETCH FIRST X ROWS ONLY`, which does not select previous results. Each "page" is limited with a different `WHERE` statement.  It also has its own limitations (harder to implement pagination, harder to browser backward, fetch arbitrary pages) but at a cost of simplicity, you get a performance increase. 

![Markus Winand SQL Performance Explained pagination scalability](/images/screenshot-2021-08-26-at-10.04.46.png "Pagination Scalability from SQL Performance Explained by Markus Winand")

Which option we should choose? As always in computer science - it depends :)

Let me know how do you use pagination and if you ever had any performance issues related to that.

P.S Remember that pagination needs deterministic order and do include `ORDER BY` in your queries when needed ;)