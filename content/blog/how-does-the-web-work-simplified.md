---
author: wojciech
tags:
  - web
  - frontend
  - backend
date: 2022-08-30T13:02:44.038Z
title: How does the web work - simplified
layout: post
hidden: true
comments: false
published: true
---
Very often, when recruiting for a frontend/backend/fullstack developer, especially for junior positions, the question is asked - how is it actually that in the browser somebody enters a specific address and a website related to it appears? This question is good because it allows the recruiter to test knowledge from many fields at once by asking deeper into the topic, while the candidate answers. So let's try to provide a model answer to this type of question and attempt to predict a few additional questions from the recruiter during the answer to the original question.

<img src="/images/internet.webp" alt="web address" class="image" />

Before we start answering, let's make some assumptions, which are essential to get the answer started:

1. The computer is equipped with a browser, which is a program designed to view and download resources made available by web servers.
2. The computer is connected via a router/modem to an Internet service provider (ISP).

Our answer can be written as a sequence of steps that are performed in order:

1. You enter the URL in the web browser,
2. The entered URL address is translated into an IP address,
3. The web browser sends an HTTP request to the provided IP address
4. The server sends an HTTP response to the browser
5. The browser starts rendering the resulting HTML based on the received HTTP response.

Now let's move on to the details of the individual steps:

1. This step is self-explanatory. We just type the URL into the address bar of the browser - nothing easier!
2. The address we entered in the previous step is easy for a human to remember, but machines do not use such names. They use IP addresses (short for Internet Protocol Address), and an identification number is given to computers or other devices that connect to the network, which allows them to communicate properly. In the decimal system, it is written with 4 numbers from the range 0-255 separated by periods (eg 77.55.142.42). Changing a human-readable address to a numeric form occurs through the DNS (Domain Name System). DNS works like a phone book that assigns IP addresses to specific domain names. It is a huge database of records that are used by users all over the world. It is worth mentioning that first the browser's DNS cache is checked, then our operating system's DNS cache, and finally the DNS provided by the ISP.
3. To be able to send an HTTP request from the browser to the server, it is necessary to establish a connection between them. This is done using the TCP protocol. The connection is initiated by the browser, followed by a three-way handshake, after which the browser and the client are ready to transmit and receive the transmitted data. This is where the question may arise - what is the difference between the TCP protocol and other UDP protocol, which was once popular. From the perspective of a web application developer, a simple comparison is enough. UDP is faster, simpler, and more efficient than TCP, but it does not guarantee the delivery of all data packets. TCP will resend it if any data packet is not delivered. The data is transferred using the HTTP protocols - this means that they have a specific structure. The HTTP protocol consists of exactly the following lines:

   \- the first one specifies the HTTP method we use, the resource on the server side, and the protocol version,

   \- the second line contains the headers we use,

   \- the third is empty :)

   \- the fourth is the body of the message (if any).

   <img src="/images/http-req-res.png" alt="http-schema" class="image" />

   \
   \
   There are 9 HTTP methods we can use. I will not describe them all here because they are well described on the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) website. Often, a trick question may be how the PATCH method differs from the PUT method. A correctly implemented PUT method is one that can be performed N times and its result will always be the same - such methods are called [idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent). The PATCH method does not guarantee this. 
4.
5.