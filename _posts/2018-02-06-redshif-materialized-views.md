---
layout: post
title: Redshif Materialized Views
tags: redshift
comments: true
hidden: true
author: agnieszka
image: /images/redshif-materialized-views/image1.jpg
---

It is often convenient to create a view upon your normalized schema to join and aggregate the data, especially when it requires a complicated query.

![publish](/images/redshif-materialized-views/image1.jpg)

In PostgreSQL you can create a view basing on a query.
```sql
CREATE VIEW my_view AS SELECT * FROM my_table;
```

Each time you select the data from such a view, the query underneath will be executed. If the query takes a long time to execute, a materialized view might be used.

```sql
CREATE MATERIALIZED VIEW my_view AS SELECT * FROM my_table;
```

This view is populated with data at the time of creation, therefore there is no need to run the time consuming query each time you access the data. However, each time the data changes, the view needs to be refreshed manually with `REFRESH MATERIALIZED VIEW my_view` query. The materialized view is especially useful when your data changes infrequently and predictably. A perfect use case is an ETL process - the refresh query might be run as a part of it.

As Redshift is based on PostgreSQL, one might expect Redshift to have materialized views. Unfortunately Redshift does not implement this feature. Regular views in Redshift has two main disadvantages:
 * The Redshift query planner does not optimize through views. Therefore fetching data from a view instead of running the query directly may actually be slower.
 * The views in Redshift are connected to the table (not just its name), so you will encounter errors when altering the table. Using `WITH NO SCHEMA BINDING` clause tells Redshift not to bound to the underlying database objects.

Instead of using a view, we can create a table basing on a query (and drop and recreate it each time). As it is a regular table, it’s possible to define sortkeys to further improve performance.

The ease of data refresh might be recon as an advantage of a materialized view. To achieve a similar behaviour with table, we can use a regular view to actually store the query. The downside of such a solution is that inserting data into the table through the view will take longer than with the query. Recreating a table with data through a view is as simple as:

```sql
CREATE TABLE my_view_table AS SELECT * FROM my_view;
```

To see the code of the query used to create the view, you can log into the database with `psql` and run `\d+ my_view`.

Redshift does not implement materialized views, but it is quite straightforward to simulate a similar behaviour. The only question to ask is if we need the data refresh to be rather simpler or faster.
