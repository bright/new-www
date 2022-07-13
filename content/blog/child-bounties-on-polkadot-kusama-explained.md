---
author: lukasz-k
secondAuthor: robert
tags:
  - BrightTreasury
  - blockchain
  - development
date: 2022-07-13T08:52:38.157Z
title: Child Bounties on Polkadot & Kusama Explained
layout: post
image: /images/child_bounties_blogpost.png
hidden: true
comments: true
published: true
---
**Child bounties are a new funding mechanism treasury module on Polkadot and Kusama blockchain networks. Thanks to it you can divide a bounty into smaller chunks – child bounties. We’ve just released child bounties on BrightTreasury app and would like to share with you child bounty docs for Kusama and Polkadot.**

## Child bounties on Polkadot & Kusama – how they work and use case example

Every bounty is assigned to a curator chosen by a council. When a curator assesses that bounty is too complex to be managed by one person, they can divide a bounty into smaller chunks called child bounties.

**Let us look at an example of child bounty use case**. Let’s say that the community approves the bounty to create a video ad promoting treasury modules on Polkadot. This is now “the parent bounty”. However, the assigned curator might divide the parent bounty into child bounties and assign a different curator to every particual job that needs to be done to deliver the final video ad. Therefore the parent bounty could be divided into smaller tasks such as: writing a script, filming, editing and then creating subtitles or voiceover. All these tasks could require a different expert-curator to oversee them.

## Child Bounty Properties

Here are all property names for child bounties for Kusama and Polkadot:

**index**: index of the child bounty

**parentBountyId**: index of the parent bounty

**blockchainDescription**: description of the child bounty storage in blockchain

**value**: total value of the child bounty paid when the bounty is completed

**curatorDeposit**: The amount of $KSM or $DOT deposited by a child bounty curator

**curatorFee**: A payment for the child bounty curator

**unlockAt**: Number of block, when the child bounty can be claimed it has block number, otherwise is undefined

**status**: Status of the child bounty. There can be the following statuses: 

* added: child bounty is made. Waiting to be assigned by a curator,
* curatorProposed: Parent bounty curator proposed a child bounty curator. Child bounty curator can accept or reject this role,
* active: Child bounty curator accepts role. Waiting for an award,
* pendingPayout: Child bounty is awarded. Waiting when it can be claimed.

**owner**: Owner of the child bounty (Curator of the parent bounty)

**curator**: Curator of the child bounty

**beneficiary**: Beneficiary of the child bounty (The person who will be rewarded for completing the task included in child bounty)

## Actions on child bounties

Here are actions you can take with child bounties:

`Add_child_bounty`: create child bounty from parent bounty (parent bounty curator)

`Propose_curator`: Assign account as a child bounty curator (can be done: parent bounty curator)

`Accept_curator`: accept account as a curator (child bounty curator), setting a curator deposit

`Award_child_bounty`: close and award child bounty curator, when work is done

`Claim_child_bounty`: claim specific child bounty amount from the payout address

`Unassign_curator`: unassign a previously approved curator from child bounty

`Close_child_bounty`: cancel the child bounty, amount for them and close child bounty

## Child Bounty life cycle stages

![Polkadot & Kusama child bounty life cycle](/images/blog_post_childbounties_life_cycle.png)

Let’s dive into all child bounty life cycle stages:

### **1. Adding a child bounty**

The first action in the child bounty life cycle is creating/adding a child bounty.

 Adding a child bounty:

* Can be done by: a parent bounty curator.
* Parent bounty must be in “Active” state.
* To succeed parent bounty must have enough funds to pay the total value of the child bounty, if not, this action fails.
* After succeeding, the status of the child bounty is updated to “Added”.

### **2. Proposing a curator**

When you add a child bounty and your child bounty status is moved to „Added”, you can propose curator to this child bounty. You can propose your account or choose another one.

How to propose a curator for the child bounty:

* Can be done by: a parent bounty curator.
* Parent bounty must be in an “Active” state.
* Child bounty must be in the “Added” state.
* After succeeding, the status of the child bounty changes to “Curator Proposed”.

### 3. Accepting the curator role

How to nominate and accept the curator role for the child bounty:

* Can be done by: the curator of the child bounty.
* A deposit is reserved from the curator. Will be refunded after payout or cancellation.
* The child bounty curator’s fee is deducted from the parent bounty curator’s fee.
* Parent bounty must be in an “Active” state.
* Child bounty must be in Curator Proposed state.
* After succeeding, the acceptance of the child bounty curator role status changes to “Active”.

Now the curator is responsible for completing the work related to this child bounty.

### 4. Unassigning child bounty curator

When the child bounty curator does not meet expectations regarding this role, the community can unassign this curator. It is possible when the status of child bounty is „Curator proposed” or „Active”.

How to unassign a child bounty curator:

* Can be done by: a parent bounty curator, child bounty curator, or any signed web3 user.
* When the parent bounty curator wants to do this action, the state of the parent bounty must be “Active”.
* In other cases, there is no need to check the parent bounty state.
* When this action is called by a Web3 user or parent bounty curator, the child bounty curator deposit is slashed.
* When this action is called by the child bounty curator, the deposit can be slashed but by default deposit of the child bounty curator is unreserved.
* After succeeding, the child bounty status changes to “Added”.

### 5. Awarding for child bounty

When the job is done the parent bounty curator or child bounty curator can transfer the award for the child bounty.

Awarding for child bounty:

* Can be done by: a parent bounty curator, or a child bounty curator.
* Parent bounty must be in an “Active” state.
* Child bounty must be in an “Active” state.
* After succeeding, the status of the child bounty changes to “Pending Payout”.
* After a delay beneficiary will be able to claim the funds.

### 6. Claiming the payout

When child bounty is in the awarded phase and after payout delay, any web3 account can claim payout. Then all funds will be paid to the appropriate people.

Claiming the payout:

* Can be done by: any web3 account.
* No need to check the parent bounty state.
* Child bounty must be in the “Pending Payout” state.
* After payout delay, the payout can be claimed from awarded child bounty.
* Bounty value is paid to a beneficiary.
* Curator’s fee is transferred to a curator.
* The curator deposit is unreserved.
* After succeeding, the child bounty instance is removed from the state.