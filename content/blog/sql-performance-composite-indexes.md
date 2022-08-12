---
author: rafal h
tags:
  - tips&tricks
  - sql
  - performance
  - index
  - backend
date: 2021-07-23T12:17:18.035Z
title: SQL Performance - composite indexes
layout: post
image: /images/composite-indexes_sql.png
hidden: false
comments: true
published: true
---
Recently I have been reading [SQL Performance Explained by Markus Winand](https://www.goodreads.com/book/show/17225810-sql-performance-explained) and I wanted to share with you what I have learned about the composite index. 

You are probably familiar with the concept of the index in the Database. In very simple terms, you can imagine that it is similar to telephone directory (B-tree structure in DB) - instead of traversing through the whole book (DB), you are using directory (DB index) to find it faster. For more about indexes, you can read [here](https://use-the-index-luke.com/sql/anatomy).

Imagine you have table employees with columns *id, department, name.*

As you have some SELECT queries accessing those fields, you have created index for *department* and index for *name:* 

`CREATE INDEX department_index ON employees(department);`

`CREATE INDEX name_index ON employees(name);`

It works well for queries like: 

`SELECT * FROM "employees" WHERE "department" = 'IT';`

or 

`SELECT * FROM "employees" WHERE "name" = 'Rafal';`

Now, imagine you have a query that selects **both** department and surname: 

`SELECT * FROM "employees" WHERE "department" = 'IT' AND "name" = 'Rafal';`

You already have an index on those fields, right? So what is the problem? 

DB engine will use only one of the indexes you have created. Going back to the example with telephone directory - you have created two separate directories - those are two separate structures and you either look in one or another. When two fields are selected,  one of the fields will be selected to choose index structure and then found in this index to select the results.  The second field will be traversed based on the selected results. You can imagine with *department* index example: *department* (IT) index will be selected and then the *name* (Rafal) entry will be searched for in the leaf nodes of index. So if the name column will consit of "Agata, Tomek, Rafal, Zenek, (...)" it will traverse through several entries to find a correct entry (Rafal). 

A Solution for that would be to use a composite index. You can create it like: 
`CREATE INDEX composite_index_name on employees(department, name)`

It will then create an index on two columns. With telephone directory example - you will have a directory that consists of both of those informations and directs to the right place. So query: 

`SELECT * FROM "employees" WHERE "department" = 'IT' AND "name" = 'Rafal';`

will hit exactly one entry in the index with one leaf node.

Might be useful if you are using heavy queries used at hot spots in the system and performance there is crucial. 

DISCLAIMER: Be aware indexes also do use storage and every INSERT/UPDATE needs to update the index structure as well :)