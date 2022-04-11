---
author: lukasz
tags:
  - uniswap
  - solidity
  - blockchain
date: 2022-04-11T09:40:36.796Z
title: Single swap on Uniswap v3 with 3 common mistakes
layout: post
image: /images/single_uniswap_swap.jpg
hidden: true
comments: true
published: true
---
Since you've probably come across this post looking for a working example of a simple swap
on a Uniswap and you are not interested in anything besides the code, I'll provide it right away.
However, if you would like to know more about how I've overcome some common mistakes or you are struggling
with some issues on your own, I encourage you to read this post till the end.

You can also find and test deployed contract on Kovan network at [this](https://kovan.etherscan.io/address/0x3dD26Ec1e69529672D6e149BdA53B0f32Da69857) address 

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.5;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@uniswap/swap-router-contracts/contracts/interfaces/IV3SwapRouter.sol";

contract Swap {

    address private constant SWAP_ROUTER =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;
    address private constant SWAP_ROUTER_02 =
        0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

    address private constant WETH = 0xd0A1E359811322d97991E03f863a0C30C2cF029C; //kovan
    // address private constant WETH = 0xc778417E063141139Fce010982780140Aa0cD5Ab; // rinkeby
    address public constant DAI = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa; //kovan
    //address public constant DAI = 0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735; // rinkeby

    ISwapRouter public immutable swapRouter = ISwapRouter(SWAP_ROUTER);
    IV3SwapRouter public immutable swapRouter02 = IV3SwapRouter(SWAP_ROUTER_02);

    function safeTransferWithApprove(uint256 amountIn, address routerAddress)
        internal
    {
        TransferHelper.safeTransferFrom(
            DAI,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(DAI, routerAddress, amountIn);
    }

    function swapExactInputSingle(uint256 amountIn)
        external
        returns (uint256 amountOut)
    {
        safeTransferWithApprove(amountIn, address(swapRouter));

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: DAI,
                tokenOut: WETH,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function swapExactInputSingle02(uint256 amountIn)
        external
        returns (uint256 amountOut)
    {
        safeTransferWithApprove(amountIn, address(swapRouter02));

        IV3SwapRouter.ExactInputSingleParams memory params = IV3SwapRouter
            .ExactInputSingleParams({
                tokenIn: DAI,
                tokenOut: WETH,
                fee: 3000,
                recipient: msg.sender,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter02.exactInputSingle(params);
    }
}
```

## How it all started

Today is the day. You've thought about that for a long time.
You have been reading about Blockchain, Ethereum and Solidity for the past few days. It's time
to start coding! Let's start with something that has a lot of documentation, and is already widely
used – swapping tokens. Uniswap seems to be the largest exchange so let's read through their [docs](https://docs.uniswap.org/sdk/introduction).
Oh! They even have an [example of a simple swap](https://docs.uniswap.org/protocol/guides/swaps/single-swaps)! 
Let's copy it and check if it works.

A few minutes later, the contract is deployed. You go to the Etherscan and try to write a transaction
using your swap function and... it does not work. Even Metamask warns you before you sign the transaction
that it will probably fail. Wait, what? Why? How? I've copied it from official docs. Why is it failing?

You start searching for help, but surprisingly there are not many answers. Some people ask
similar questions to yours, but they don't have any response.

## 3 common mistakes

Don't worry! I was in the exact same situation not so long time ago. If you check my code
you will see that it is almost identical to the one from Uniswap docs. They prepared them
very well. They just omitted a few small things or did not stress enough a few additional steps that 
are required. You can also notice that I have two almost identical functions.
If you are interested why keep on reading.

### Wrong tokens addresses

I think the most common mistake is using wrong address for the tokens. Keep in mind
that every token you want to swap is also a deployed contract. On different networks,
contracts can be deployed at different addresses. Uniswap in their example has some
hardcoded ones for DAI and WETH, but they do not mention on which network this example should work.

If you try to search for the address of WETH on different networks you will easily find it. For other 
tokens it might not be so simple, since there are many different DAI tokens on each network. 

How did I overcome it? I've figured out, that since I want to test Uniswap swap functionality, I'll just
swap the tokens I'm interested in using their interface and then check the transaction details. 

![Tokens](/images/successful_uniswap_swap_transaction.png)

You can check such a transaction [here](https://kovan.etherscan.io/tx/0x83ccabe0ed0e06975f83630890257b67522ef4ee7c18650f15a1be69c4e82a2e).
Inside, we can see WETH and DAI tokens, that Uniswap used. After clicking them, you will find
a contract which is a token that we want to swap. So just use the address in your code and et voilà!

To help you a bit, I've provided DAI and WETH token addresses for Kovan and Rinkeby networks in the code.
Funny thing is that this method made me make a 3rd mistake mentioned in this post. 

### Approving contract to withdraw the tokens

Have you actually read the documentation on Uniswap or did you just copy the code and hope for the best?
Did you? Look me in the eyes and tell me you really did read it. Don't worry. I did not too. 
When I was checking it, I remembered some part about approving the usage of the tokens, but then
in the code there is a `TransferHelper.safeApprove()` so I thought it was that!
Well... unfortunately it is not. If we went back to the documentation and read it carefully
they clearly state, that there was one more approval needed.

> The caller must approve the contract to withdraw the tokens from the calling address's account to execute a swap. Remember that because our contract is a contract itself and not an extension of the caller (us); we must also approve the Uniswap protocol router contract to use the tokens that our contract will be in possession of after they have been withdrawn from the calling address (us).

So the approval that we have in the code, is the second part. We approve Uniswap router to use the tokens
from our contract. But before that, we must also approve OUR contract to withdraw tokens from our wallet.
If you don't do that and you will try to sign a transaction Metamask will warn you that it will probably fail:

![Metamask](/images/metamask_fail_transaction_warning.png)

And after trying anyway, transaction will be reverted with an error: `TransferHelper::transferFrom: transferFrom failed`.

To approve withdrawing token, find contract of the token that you are going to be swapping on Etherscan (in our case DAI)
and use their `approve` function providing your contracts address and amount of coins that you are willing to approve.

![Transaction fail](/images/approving_usage_of_our_tokens.png)

After the transaction gets approved, you should be able to use your contracts swap function successfully.
You can't? Well... then maybe you also made a 3rd mistake!

### Using the wrong SwapRouter

Uniswap in their documentation doesn't show the initialization of the `swapRouter`. We can do that by
using swap routers contract address. But similar to the first mistake... where should we take this
address from? Again in the [docs](https://docs.uniswap.org/protocol/reference/deployments), Uniswap provides addresses of all of their contracts.
What is more, they clearly state, that those addresses are the same for all networks. That's great but... we can
see two SwapRouters contracts in the table. Which one should we use?

My thinking was: let's see which router Uniswap interface uses, and use the same. In the transaction
for swapping tokens on Uniswap from the first mistake we can see routers address which this transaction used. 
It turned out to be `SwapRouter02`. On the Etherscan I've verified
that this router also has `exactInputSingle` a function which accepts `ExactInputSingleParams`.

Unfortunately, it was not correct. After deploying the contract which used this router I've had again
similar issue with Metamask warning, and transaction failing. This time, an error didn't say anything helpful.

At the end it turned out that indeed both routers have needed function, and they both use similar struct
for Params but it's not the same.

* `SwapRouter` inherits from `ISwapRouter`
* `SwapRouter02` inherits from `V3SwapRouter`

If we also check closely the `ExactInputSingleParams` struct that both contracts use, we can see that version in `V3SwapRouter`
does not have `delay` parameter. So despite looking very similar, those
are two completely different things.

In my code, I've left working functions for both routers, so you can test it on your own.