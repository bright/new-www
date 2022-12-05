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
<div class="image"><img src="undefined" alt="undefined" title="undefined"  /> </div>

<div class="image"><img src="undefined" alt="undefined" title="undefined"  /> </div>

<div class="image"><img src="undefined" alt="undefined" title="undefined"  /> </div>

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

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.10.29.png" alt="Console 4" title="Console 4"  /> </div>

As a user CTF I was not able to get info about information_schema. Suspected that...

So tried with below to somehow deserialize table information:

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.11.40.png" alt="Console 5 " title="Console 5 "  /> </div>

Response:

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.11.44.png" alt="Console 6" title="Console 6"  /> </div>

It is closer :) Got column name. Selecting it allows to select a value from flag table which was `Close`. 

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.11.59.png" alt="Console 7" title="Console 7"  /> </div>

You might remember that second value was `but not there yet` but it was not show in schema above. Tried several more approaches and here I have stopped. Turns out my thinking was correct but using wrong query to do so. After deserializing table to XML: 

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.13.50.png" alt="Console 8" title="Console 8"  /> </div>

Which gave back the CTF flag: 

<div class="image"><img src="/images/screenshot-2022-10-17-at-17.13.48.png" alt="Console 9" title="Console 9"  /> </div>

So close 😭