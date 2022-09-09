---
author: patryk sz
tags:
  - mysql
  - percona
  - alter
  - schema
  - database
  - production
date: 2021-09-13T12:32:37.975Z
title: How to alter large MySQL tables on production?
layout: post
image: /images/patrykblogpost_tables2.png
hidden: false
comments: true
published: true
---
## Introduction

In this tutorial, we are going to learn, how to update the structure of the large tables on the production environment, without causing delays, locks, and downtime

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

#### Use Percona Toolkit to update the table

In the case mentioned above, if you have an FTS index created over the table, there is a need to perform the migration some other way. The other way, in this case, is [Percona Toolkit](https://www.percona.com/software/database-tools/percona-toolkit):

> Percona Toolkit is a collection of advanced open source command-line tools, developed and used by the Percona technical staff, that are engineered to perform a variety of MySQL®, MariaDB®, MongoDB®, and PostgreSQL server and system tasks that are too difficult or complex to perform manually

In our scenario, [pt-online-schema-change](https://www.percona.com/doc/percona-toolkit/3.0/pt-online-schema-change.html) allows you to alter a table’s structure without blocking reads or writes. In the following paragraphs, I described how it works.

**Do not use this tool before reading its documentation and checking your backups carefully**

#### Planning the migration

In order to perform the change, we need to ensure that migration will be as lightest as possible.

Determine what kind of application's activities are related to the table you want to edit - examine the logs that are leading to some operations on the table to find the best timeframe to alter the schema.

In our case, it was about the night hours. We checked the traffic for the application in the last two weeks' perspective.

![night hours time frame](/images/screenshot-2021-09-13-at-14.14.27.png "night hours time frame")

#### Executing the migration

It is important to update the table without interruption. You need to remember that the process can take hours.
It’s a good practice to start the migration from some remote shell.
By doing this, even if your network connection fails, you will be able to connect to the shell and attach to the screen again, without stopping the execution.
Moreover, it's worth to consider using Unix' [screen](https://linuxize.com/post/how-to-use-linux-screen/) program:

```
$ screen -S percona-processing
```

Once you created the screen, you are able to reattach to it later (ie. after network connection crash):

```
$ screen -ls
There is a screen on:
	41303.percona-processing	(Attached)
1 Socket in /var/folders/7g/45p5bfln4k3384t7wcvyrhqh0000gn/T/.screen.
$ screen -R 41303
```

Here is an example of the altering command:

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

In our case, the update of the entire table took 12hours of processing, ends successfully without causing any downtime.

<div class='block-button'><h2>Let's create software that matters!</h2><div>Join our team and work on projects such as the Ethereum blockchain platform, accounting software, or web therapy applications. Work with clients from Israel, Germany, or Norway!</div><a href="/career"><button>Check our career opportunities</button></a></div>