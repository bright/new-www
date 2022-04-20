---
author: agnieszka
tags:
  - substrate
  - parity
  - blockchain
date: 2020-07-05T22:00:00.000Z
title: Why would you use Substrate?
layout: post
image: /images/why-would-you-use-substrate/top.png
hidden: false
comments: true
published: true
---
Substrate is a framework to build blockchains. People behind Substrate had built many blockchains before and noticed that they had to do the same hard work over and over again. Thus they tried to create a framework which would make deploying a blockchain as easy as can be. At the same time they wanted it to be as generic as possible, so that a developer can customize it to their needs.

![substrate blockchain](/images/why-would-you-use-substrate/1.png)

Before we dive into Substrate, let’s take a look at what the blockchain itself is.

## Data

Blockchain is a datastore and this is its reason to be there: **to store data**. So first of all let’s look at blockchain from the data’s point of view. Let’s think of a bank account. In blockchain you would not store the balance itself. You would rather store transactions describing money transfer instead of the balance changing over time to reflect spending or getting the money. Here is an example. When you buy your new Louboutin, in blockchain you submit a transaction saying that you have just spent 600€, instead of updating the balance from 3000€ to 2400€. And when you realize that Makita drill is far more necessary in your household and decide to return the shoes, you submit the refund transaction saying that you get your 600€ back.

It is commonly said that from CRUD (Create Read Update Delete) operations offered by regular databases, you only have the Create and Read operations available in blockchain. This is true in terms of records in the store - you can only create the transactions or read them. **You never ever change them**. But in terms of the data itself, you can update it by submitting a **transaction describing the change**. You can also submit a transaction, which describes deleting some object, i.e. making it not valid anymore.

## Store

Now let’s take a look at blockchain in more technical details to see **how** it stores the data. This may also give us a hint on why we cannot change the transactions by design. **Blockchain is a chain of blocks**. Blocks are connected together to form a directed chain. For each block there is its preceding block which we can call a direct parent and a following block which we can call a direct child. 

A block consists of three main elements: 

* the data (a set of transactions we have just talked about), 
* the parent block’s identifier,
* the block’s identifier which is a sort of a hash of the two previous. 

If you make a little change in the block’s data, its identifier will change. Then also its child’s identifier will change, and the next child’s and so on until the last block. This is why it is fairly easy to say if two blockchains are exactly the same just by checking the last block.

## Structure

Blockchain is **decentralized**. There are many nodes connected on a peer-to-peer network. There is **no central authority**. Each node is running a “blockchain program” and keeps its copy of the chain. When a set of transactions is collected, a node can try to produce a new block and connect it to its chain. Then all the nodes have to accept the new block, therefore creating the canonical chain. There are multiple ways to prove that a produced block is not malicious. This is what is called a consensus function. The most common one is a Proof of Work. In short, a node has to solve a complicated mathematical problem which takes much computational power. These problems are not real, no one is actually using the solutions. The only goal of solving it is to spend resources (computational power, energy and so). It is designed so that any profit from a malicious block would not balance what you have to spend on proofing it.
There are also other algorithms to find the consensus like Proof of Stake or Proof of Authority. As we have said, in PoW your guarantee is the work you have done, in PoS you guarantee is the money itself and in PoA it is your reputation. The last one is often used in private chains.

## Substrate

Now that you know why you could use blockchain among other datastores, we can take a look on why you may choose Substrate over other blockchain implementations.

![substrate blockchain core and runtime](/images/why-would-you-use-substrate/2.png)

We can say that Substrate is built of two parts: the core and the runtime.

## Core

The core of the Substrate is composed of four layers:

* database
* networking
* transaction queue
* consensus.

In most cases you would probably just use the default implementation that comes with the Substrate node template and would not touch much of the core functionality. But if you decided to change any of this - you can. Actually it is possible to even deploy a new consensus algorithm on a running blockchain.

## Runtime

Runtime is the part the Substrate developers would mostly be interested in. The runtime is a **set of rules which describe how the ledger can change**, also known as the state transition function. Substrate runtime is modular. There are already some basic modules available now like Balances for currency management or Contracts for smart contracts. You can just plug them in. You can also write your own modules to gain the specific functionality you need.

Let’s keep an eye on the mentioned Contracts module. It lets you use smart contracts in Substrate. We can think of the smart contract as a kind of a digital agreement written in a programming language instead of the lawyer one. Blokchain nodes act as the witnesses. The agreements are executed autmatiacally after meeting certain circumstances and their effects are saved in blockchain storage. Smart contracts add additional logic on top of the core blockchain functions and can be written and deployed by any user, also a malicious or inexperienced one, therefore there are some safety mechanisms included. Using smart contracts places you in a kind of a sandbox. You cannot modify the core blockchain's storage or directly change the storage of other contracts. Smart contracts are revertable by design, to ensure that any changes are saved only after the whole transaction was executed without errors. If you write your own runtime module you need to be very careful and strictly follow the rule “check first, write last”. At first you need to make sure that any prerequisites are met and making a change will not cause any errors. Only then can you do the changes. You are also charged for the smart contracts. There is a gas fee for the computational resources and a storage rent for the blockchain’s storage used, which act as economic incentives against any abuse.

## UI

Another thing that comes with Substrate is the UI template. It is a pre-built React app using Polkadot JS API. It lets you connect to your Substrate node and visualise the data in your blockchain, easily make transactions and see their effects. 

## Upgradeable

Using Substrate you are able to upgrade a running node. It doesn’t sound that thrilling when you think of development. But once you go production, it turns out to be an interesting feature. In a typical blockchain, if you want to change your business rules or fix any bug, you need to inform every node and prompt them to update and restart. In Substrate you can compile the runtime to WebAssembly binary format and put it as a part of the blockchain’s storage. All the nodes check if the blockchains Wasm binary is any different then the native one they run and if so run the Wasm binary instead. All that happens automatically and live. 

## Summary

When I ran my first Substrate node with the default configuration, I was quite surprised how easy it was. On the other hand, I could only see some output in the terminal window. The thing that really can make a newbie excited is the front-end template. You can clone and run it and actually **see and play with your blockchain**. There are some accounts predefined, founded with some amount of units. You can easily make a money transfer between the accounts with a few clicks and see the outcome right away. The Substrate node template together with the front end template makes the ease of Substrate development so impressive at first glance.

On the other hand, in the real world use case you would need to get your hands dirty and write your own smart contract or a runtime module. In addition to the front end app you would also need some backend with a regular database to store and manage all the details which blockchain is not interested in. Polkadot JS API can also be really helpful with it.

To sum up, Substrate on one hand gives you all the functionality you need to run a blockchain out of the box and on the other hand it lets you configure, change or completely rewrite any single element of the architecture.