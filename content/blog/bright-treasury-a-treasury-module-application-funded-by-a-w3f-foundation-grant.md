---
author: kasia
tags:
  - blockchain
  - Substrate
  - Polkadot
  - Kusama
  - W3F
  - grant
date: 2021-06-29T09:12:47.495Z
title: Bright Treasury - a Treasury module application funded by a W3F
  Foundation grant
layout: post
image: /images/brighttreasury_web3_foundation.png
hidden: false
comments: true
published: true
---
We are thrilled to be able to finally share with you the news that our proposal for a Treasury based web app was accepted as a part of the [Web3 Foundation (W3F) grants program](https://web3.foundation/grants/). We are happy and grateful to be able to get the support for our work from such a dynamic and knowledgeable community. Our first milestone has been completed and approved so in this blogpost, we’d like to share details about what you might expect from the finished product as well as some technical solutions that we’re especially excited about. 

Please welcome **Bright Treasury** - a standalone web application (along with a PWA representation) that **will allow performing basic actions on the Treasury and Bounties modules of [Polkadot](https://polkadot.network/) and [Kusama](https://kusama.network/) [Substrate](https://substrate.dev/) networks**, and hopefully encourage more people to get involved in these blockchain communities.

## **Why Bright Treasury?**

At Bright Inventions, we’ve been following blockchain development since its early days. The last few years brought us opportunities to work successfully on projects with blockchain solutions, and Substrate with its community got us especially excited. At the same time, we know how intimidating the whole “blockchain thing” can be if you are a novice in the domain. We wanted to attract more professionals who could contribute to the community with their ideas and skills but at the same time may not be as fluent in blockchain customs and terminology. Based on the discussions with the communities around Substrate, Polkadot and Kusama, council members as well as the analysis of the comments under Polkadot and Kusama proposal submissions, we identified areas of the Treasury funding process that we wanted to address – from the user’s perspective.

![BrightTreasury](/images/artboard-–-5.png)

The W3F grants program seemed like the perfect opportunity to bring together our passion for getting to know blockchain better and delivering something of value to the community at the same time. Web3 Foundation funds research and development teams building the technology stack of the decentralized web. It was established in Zug, Switzerland by Ethereum co-founder and former CTO Gavin Wood. Polkadot is the Foundation's flagship project.

The main goals that we wanted to achieve with this project are:

* an intuitive proposal submission flow, with a clear indication of a proposal idea being subject to community discussion, before submitting the actual proposal to blockchain and committing with bond funds 
* one place for following the submitted proposals, their status and the results of motions
* a unified discussion forum to leave comments about submitted proposals as well as their draft versions (ideas)
* implementation of the bounties funding mechanism

## **What’s in the Milestone 1 release**

The main goal of our first milestone was to implement the core flow of the app, starting with the Proposal lifecycle for the Polkadot mainnet. As a result the user should be able to create an Idea, add all the necessary details, create Milestones for the Idea, make it public and decide to submit the Idea to the blockchain, turning it into a formal Proposal. The status of the Proposal is then updated based on the data returned from the API. To perform these actions a user will need to be logged in (with an app account or the Web3 account with a use of a browser extension), however browsing through Ideas and Proposals will be available to everyone.

![BrightTreasury](/images/screenshot-2021-05-24-at-10.21.30.png)

Although our main fields are web and mobile solutions, we are keen on blockchain technologies. As a natural consequence we specialize in integrating web and mobile apps with blockchain solutions. As we believe in the Polkadot goals we decided to contribute to the ecosystem. A project focusing on making blockchain accessible to more users felt like it was designed for us. We value the ease of development provided by the Polkadot JS API – constantly evolving and providing a useful bridge between blockchain and JS. We are also excited by the idea of personally owned identity, so we support Web3 login using the browser extension. At the same time we believe in evolution – not revolution, so the users can still use the in-app login.

## **What’s coming next**

With the next release we plan to expand the main flow. The Ideas and the Proposals features will have the discussion functionality added and it will also be possible to add them to multiple networks at once as the "representation of multiple blockchain networks" feature will also be implemented at this stage. What is more, an overview of the treasury statistics will be presented for each network respectively, with the UI adapting to the network’s colour scheme. 

Next in line will be the introduction of the bounties mechanism. Users will be able to add and browse through bounties, vote for the curators and check the current status. The nominated curators will be able to accept (or reject) the invitation to curate a bounty and manage the bounty’s details. Additionally, in this milestone we plan to add a basic integration with [Polkassembly](https://polkadot.polkassembly.io/). It will be possible to see the description of a proposal/bounty published on Polkassembly. We will also include the history feature based on the data from Polkassembly, which would allow users to browse through closed proposals and bounties, in addition to in-app ideas.

We can’t wait to share the finished product with you and to get your feedback. Fingers crossed you will like it as much as we do. We hope that this is just the beginning of our adventure with Bright Treasury and we already have a lot of ideas for the next features, so stay tuned!

Learn more about Web3 Foundation by visiting their [website](https://web3.foundation/), and stay up to date with the latest developments by following them on [Medium](https://medium.com/web3foundation) or [Twitter](https://twitter.com/web3foundation).