---
layout: project
project_id: bright-treasury
title: BrightTreasury
image: /images/treasuryapp_www.png
description: "A web application that will support members of Substrate
  Blockchain networks: Polkadot and Kusama in uploading proposals for Treasury
  grants. This is Bright Inventions’s original solution which is funded by Web3
  Foundation (W3F) grant."
tags:
  - web app
  - product design
  - MVP
  - blockchain
  - fintech
order: 3
slug: bright-treasury
show on homepage: true
published: true
---
![Bright Treasury](/images/treasuryappwww.png)

## Main features:

* An intuitive, two-step flow for submitting proposals (Idea -> Proposal)
* In-app module for more detailed proposal descriptions (like adding milestones) connected with the proposal related discussion and reporting progress on approved proposals
* Clear overview of the submitted proposals matched with derived motions and their results
* Historical overview of the past spending periods’ proposals that were submitted using the app 
* The first app with dedicated bounties implementation
* In-app login

## Skills

**Frontend:** React, TypeScript

**Backend:** Node.js, NestJS, TypeScript, PostgreSQL, AWS Services

## About

The [Treasury](https://wiki.polkadot.network/docs/learn-treasury) is a cryptocurrency pot of funds collected mostly through transaction fees, slashing and staking inefficiency. The fund is managed by Polkadot and Kusama Substrate networks. The Treasury funds can be spent on any proposal related to developing or promoting the Substrate Blockchain technology. Bright Inventions has been developing a web application that will make the grunt application more user-friendly. The project was backed by Substrate community by receiving a grant from the [Web3 Foundation](https://web3.foundation/).

![Bright Treasury Substrate](/images/treasuryapp_www.png)

## Goal

Our focus is to attract more professionals who could contribute to the community with their ideas and skills but at the same time may not be as fluent in blockchain customs and terminology. [BrightTreasury](https://treasury.bright.dev?utm_source=referral&utm_medium=bright_website&utm_campaign=case_study_bright) application will help them apply their proposals even if they aren’t blockchain experts. The funds are available for software agencies as well as companies that want to share knowledge about Substrate such as marketing agencies or video production studios. We believe that BrightTreasury app offers a chance to increase the number of fund proposals. Eventually, it will make the Substrate Blockchain a more accessible technology.

## Process 

Based on the discussions with the Substrate networks’ users and council members as well as the analysis of the comments under Polkadot and Kusama proposal submissions, we identified the areas that caused most issues in the Treasury funding process from the user’s perspective. The main needs that were brought up were:

* a more intuitive proposal submission flow, with the clearer indication of a proposal idea being subject to the community discussion, before submitting to blockchain and committing with bond funds 
* one place for following the submitted proposals, their status and the results of motions
* a unified discussion forum to leave comments about the submitted proposals as well as their draft versions (ideas)
* the implementation of the new bounties funding mechanism

Following these needs, we have proposed a solution that will benefit the Substrate chains communities.

The development process was broken into 3 milestones. The first one was completed in July 2021. The rest of them were completed by 2021. 

![Bright Treasury blockchain](/images/treasury_www_3.png)

### Milestone 1 — Idea creating & Proposal submission & in-app logins

The main goal of this milestone is to implement the core flow of the app, which is the Proposal lifecycle. As a result, the user will be able to create an Idea, add all the necessary details, create Milestones for an Idea, make it public and decide to submit the Idea to the blockchain, turning it into a formal Proposal. The status of the Proposal will be then updated based on the data returning from the API. To perform these actions a user will need to be logged in, however, browsing through ideas and proposals will be available to everyone. 

### Milestone 2 — discussions panel & treasury overview & multiple networks

The goal of this milestone is to add more features to the ideas and proposals handling. The ideas as well as proposals will have the discussion functionality added and it will be possible to add them to multiple networks as well, as the representation of multiple blockchain networks feature will also be implemented at this stage. What is more, an overview of the treasury statistics will be presented for each network respectively. 

### Milestone 3 — Bounties & in-app history

The main goal of this milestone is the implementation of the bounties mechanism. Users will be able to add and browse through bounties, vote for their curators and check the current status. The curators will be able to accept (or reject) their nominations and manage the bounty’s status. Additionally, in this milestone we plan to add a basic integration with Polkassembly. It will be possible to see the description of a proposal/bounty published on Polkassembly. We will also include the history feature based on the data from Polkassembly, which would allow users to browse through the closed proposals and bounties in addition to in-app ideas.

## Result

After completing [](/blog/bright-treasury-a-treasury-module-application-funded-by-a-w3f-foundation-grant/)all milestones, we released the app in December 2021. [BrightTreasury](https://treasury.bright.dev?utm_source=referral&utm_medium=bright_website&utm_campaign=case_study_bright2) is now live!