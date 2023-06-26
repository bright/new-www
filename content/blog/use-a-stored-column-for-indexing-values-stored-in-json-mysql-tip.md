---
author: maciej-n
secondAuthor: patryk sz
tags:
  - web development
  - json
  - mysql
date: 2023-06-07T07:22:41.754Z
meaningfullyUpdatedAt: 2023-06-07T07:22:41.799Z
title: Use a Stored Column for Indexing Values Stored in JSON [MySQL Tip]
layout: post
image: /images/blogpost_tip_mysql.png
hidden: false
comments: true
published: true
language: en
---
**Managing and querying JSON data in MySQL databases has become common in modern web applications. To improve performance when querying JSON values, you can create a stored column that extracts specific values and indexes them.**

<InstagramEmbed url='https://www.instagram.com/p/CaCVmAWg7Uc/' />

## Table Definition

Consider a scenario where you have a table named "orders" that stores various details about customer orders, including a JSON column called "data" that holds additional information related to each order. To improve performance when querying by a specific order number, you can create a stored column that extracts the order number from the JSON data and indexes it.

**Let's take a look at the table definition:**

```sql
CREATE TABLE `orders`
(
    `id`           INT UNSIGNED                                            NOT NULL,
    `data`         JSON                                                    NOT NULL,
    `order_number` VARCHAR(20) GENERATED ALWAYS AS (`data` ->> '$.number') NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `orders_order_number_idx` (`order_number`)
);
```

In this example, the table `orders` has columns for `id`, `data`, and `order_number`. The `order_number` column is defined as a stored column using the `GENERATED ALWAYS AS` syntax, with the expression `(data ->> '$.number')` to extract the value of the `number` key from the `JSON data`.

By creating an index on the `order_number` column using `INDEX`, MySQL optimizes the query performance when searching and filtering based on order numbers.

With the table and index set up, you can execute queries like:

```sql
SELECT * FROM `orders` WHERE `order_number` = '123456';
```

## Conclusion

Using a stored column for indexing JSON values can significantly improve query performance, especially with large datasets. Remember to carefully design and maintain indexes based on your application's needs to balance performance and write operations.

In conclusion, leveraging a stored column for indexing JSON values in MySQL can enhance query performance and provide the flexibility of working with JSON data within your database schema.

Hope you have enjoyed this short bright dev tip! [Check our repository](https://github.com/bright/dev-tips/commit/d3b69042b0671b3e2e025f159967d5b5bb195c0e).
