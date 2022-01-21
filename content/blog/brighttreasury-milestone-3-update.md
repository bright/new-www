---
author: kasia
tags:
  - blockchain
  - Substrate
  - Polkadot
  - Kusama
  - BrightTreasury
date: 2022-01-17T08:34:44.612Z
title: BrightTreasury Milestone 3 update
layout: post
image: /images/bright_tereasury_app_milestones.png
hidden: false
comments: true
published: true
---
We are proud and excited to announce that the [Web3 Foundation](https://web3.foundation/grants/) grant we received to build [BrightTreasury](https://treasury.bright.dev) has been successfully completed and the whole set of the planned features is now available live on production. 

## What is BrightTreasury?

If you haven’t followed our journey with [BrightTreasury](https://treasury.bright.dev/), just a quick summary for you:

[BrightTreasury](https://treasury.bright.dev/) is a standalone web application (along with a PWA representation) that allows performing basic actions on the Treasury and Bounties modules of [Polkadot](https://polkadot.network/) and [Kusama](https://kusama.network/) Substrate networks. We hope it will encourage more people to get involved in these blockchain communities.

I also recommend you reading our previous blog posts [here](https://brightinventions.pl/blog/bright-treasury-a-treasury-module-application-funded-by-a-w3f-foundation-grant/) and [here](https://brightinventions.pl/blog/bright-treasury-is-now-live/) where we documented the progress and reaching subsequent milestones. 

## What’s new with Milestone 3?

The most important feature that becomes available with this Milestone 3 delivery is the implementation of the Bounties module. 

Users are now able to add and browse through bounties, check their current status and voting results as well as their curators. The curators will be able to accept (or reject) their nominations and manage the bounty’s status.

![BrightTreasury app](https://lh6.googleusercontent.com/E3FNwAGwGHLr2JSTl_vvd6YCVQ_xl0absM5bjnH8ZfTfd4tYhbv4AGSSipO0YmN92HV1wHOJvvpqfv11j8Hu1s9IATzMGPFIpIJYxIzXWzVfA3rowOxP1UoDR3mOn1o2Vh6wID6L)

Bounties funding is another Treasury based mechanism, however it works a bit differently to Proposals. In addition to the proposer (the one who came up with the idea and created the bounty) and the beneficiary (the one who will be responsible for the actual development and will benefit from the funding) Bounties present a new role of a curator. The main job of the curator is to oversee the execution of a bounty and to check its progress. 

This means that bounties are especially useful if you have an idea that might contribute to the community, however you are not a specialist in the field and you’re not sure who might handle such a task. Here’s where the curator comes to help. Because a curator will need to spend some time managing the bounty, they will also be rewarded within the planned funding. 

You can read more about Bounties for example on [Polkadot webpage](https://wiki.polkadot.network/docs/learn-treasury#bounties-spending).

What is more, in this milestone we added a basic integration with [Polkassembly](https://polkadot.polkassembly.io/). In addition to the BrightTreasury context information, users can see the description of a proposal/bounty that was published on Polkassembly as well. 

We also included the history feature based on the data from Polkassembly, which allows users to browse through closed proposals and bounties, in addition to in-app ideas. 

## What’s next?

We plan to apply for Treasury funding to add another set of features for BrightTreasury. The main goals that we have for the upcoming deliveries include:

* further integration with Polkassembly (displaying on Polkassembly the contextual information that were added using BrightTreasury)
* implementation of Tips mechanism
* displaying users blockchain identity context info
* discussion module enhancements (reactions, tagging users etc.)
* markdown interpretation

and many more smaller improvements and changes.

We hope you will like the new propositions. And remember, we are always waiting for your feedback and suggestions in our [github repository issues](https://github.com/bright/bright-tresury/issues).