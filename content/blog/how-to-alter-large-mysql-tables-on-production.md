---
author: patryk sz
date: 2021-09-13T11:26:52.568Z
title: How to alter large MySQL tables on production?
layout: post
image: /images/patrykblogpost_tables2.png
hidden: true
comments: true
published: true
---
## Introduction

In this tutorial, we are going to learn, how to update structure of the large tables on production environment, without causing delays, locks, and downtime

## Large table

What is the large table? Is my table large enough to follow the steps from the tutorial?

#### Evaluate the term

*Large* is subjective: sometimes, a wide table with 1m rows will be the biggest in the system. Sometimes 30mlns will be "average"

One way to determine is to answer, what is the impact of updating a specific table during working hours?

* can you afford to put the sign "maintenance work in progress"?
* can you run the `ALTER` query which will end after 10 minutes and not care about causing the locks?
* will nobody notice that the application is down for 5 minutes?

If you answered "yes" for the questions, you may have the large tables but there is no need to worry about the way you are going to modify them 

### Migration

#### Check if a regular migration will work

Modern databases (including MySQL) support online DDLs e.g. adding columns (nullable) without locking tables.
This is by far the easiest and best approach if it works.

"if it works" - because in some cases - i.e. you have *FTS index* created - you will be not able to do so

#### Use Percona Tools to update the table

[pt-online-schema-change](https://www.percona.com/doc/percona-toolkit/3.0/pt-online-schema-change.html) allows you to alter a table’s structure without blocking reads or writes.

**Do not use this tool before reading its documentation and checking your backups carefully**

#### Planning the migration

In order to perform the change, we need to ensure that migration will be as lightest as possible.

Determine what kind of application's activities are related to the table you want to edit - examine the logs that are leading to some operations on the table in order to find the best timeframe to alter the schema. In our case, it was about the night hours:

![night hours time frame](/images/screenshot-2021-09-13-at-14.14.27.png "night hours time frame")

#### Executing the migration

It is important to update the table without interruption. You need to remember that the process can take hours.
It’s a good practice to start the migration from some remote shell.
By doing this, even if your network connection fail, you will be able to connect to the shell and attach to the screen again, without stopping the execution.
Moreover, it's worth to consider using Unix' [screen](https://linuxize.com/post/how-to-use-linux-screen/) program

Here is an example of the command:

```
$ pt-online-schema-change \
    --alter "ADD COLUMN created_at datetime DEFAULT null" \
    --alter-foreign-keys-method drop_swap \
    --set-vars lock_wait_timeout=5 D={database_name},t={destination_table_name},P={port},h={host_name},u={user_name},p={password} \
    --no-check-foreign-keys \
    --no-check-replication-filters \
    --max-load="Threads_running=100" \
    --critical-load="Threads_running=100" \
    --dry-run
```

`--dry-run` will prevent from executing the actual migration on the database

How does it work? Percona tool is creating a NEW, temporary table (with the modification applied) and copy the data from the original table to the new one.
The triggers created on the old table are copying the incoming data during the process.
After the whole data is copied, the tool is swapping the tables and removing the old one

## Summary

In this post, you learned how to alter your table during the productional application's lifecycle.