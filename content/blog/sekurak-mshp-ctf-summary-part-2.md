---
author: rafal h
date: 2022-12-05T13:27:42.735Z
meaningfullyUpdatedAt: 2022-12-05T13:27:42.758Z
title: Sekurak MSHP CTF Summary - Part 2
layout: post
hidden: false
comments: true
published: true
---
Some time ago(15.10-16.10) I took part in the Sekurak Mega Hacking Party CTF contest. I have already created first post about challanges that I had managed to solve, in this post will desribe those which were pretty close ;)

## **postgres**

The task was as follows: 
You have access to Postgres console. You have to read the flag. 
`nc 192.46.238.37 1337`

Upon accessing the console view was as follows, disappearing within a few seconds:

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.03.52.png" alt="Postgres console" title="Postgres console"/> </div>

Due to disappearing decided to use script interaction with console which will allow for entering more commands:

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.05.49.png" alt="Postgres console 2" title="Postgres console 2"  /> </div>

So upon being able to execute the comments, I simply did `Select * from flag` but ofcourse it did not work :)

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.06.04.png" alt="Postgres console 3" title="Postgres console 3"  /> </div>

So decided that flag must be somewhere near meatadata of the table:

