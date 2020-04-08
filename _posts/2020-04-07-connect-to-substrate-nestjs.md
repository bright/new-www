---
layout: post
title: Connecting to substrate blockchain from NestJS
date: 2020-04-07T10:41:51.004Z
author: ivan
tags:
  - blockchain
  - nestjs
  - javascript
  - substrate
hidden: true
comments: true
---


## Create sample NestJS project

First of all, we should create a NestJS project.
Please use the [nest-cli](https://github.com/nestjs/nest-cli) to generate the project template:

```
nest new substrate-nests
cd substrate-nests
```

This commands generate for us sample project with one module and generate code for one GET API endpoint:

```sh
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

After you successfully create the sample project you could run the dev server:

```
yarn start:dev
```

This command runs dev server and now you can see text *Hello World!* if you open [http://localhost:3000/](http://localhost:3000/).

## Connecting to substrate

### Preparation

To connect to substrate node we will be using library [polkadot-js](https://github.com/polkadot-js).
Please, add this library to dependency:

```sh
yarn add @polkadot/api
```

To work with this library please set flag `esModuleInterop` to `true` in `tsconfig.json` file and restart the dev server.

Now you can add necessary imports to `app.service.ts` file:

```
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
```

The next thing we should set the URL where our node exists.
Please add these lines after import section in `app.service.ts` file:

```
const SUBSTRATE_URL = 'wss://dev-node.substrate.dev:9944';
// const SUBSTRATE_URL = 'ws://127.0.0.1:9944'; // if you have substrate install locally you can use this address
```

We are going to connect to substrate node in `onModuleInit` lifecycle function. It allows us to connect to the node after module initialized.

```
@Injectable()
export class AppService implements OnModuleInit { // class should implement OnModuleInit interface
  private api: ApiPromise;

  // please, add this function to your class
  async onModuleInit() {
    Logger.log('Connecting to substrate chain...');
    const wsProvider = new WsProvider(SUBSTRATE_URL);
    this.api = await ApiPromise.create({ provider: wsProvider });
  }
```

After restart you could see our message in logs:

```
[Nest] 6701   - 04/07/2020, 1:21:02 PM   [NestFactory] Starting Nest application...
[Nest] 6701   - 04/07/2020, 1:21:02 PM   [InstanceLoader] AppModule dependencies initialized +13ms
[Nest] 6701   - 04/07/2020, 1:21:02 PM   [RoutesResolver] AppController {/}: +5ms
[Nest] 6701   - 04/07/2020, 1:21:02 PM   [RouterExplorer] Mapped {/, GET} route +2ms
[Nest] 6701   - 04/07/2020, 1:21:02 PM   Connecting to substrate chain... +1ms
```

### Getting data

For test purposes, we will get the chain name, node name, version, number of the latest block and the current timestamp.
For this let's create the new function in `AppService` class:

```
async getSimpleData() {
  await this.api.isReady;
}
```

The first line in function `getSimpleData` waits until our connection to substrate node will be ready.

Now we can add code to get data:

```
async getSimpleData() {
  await this.api.isReady;

  const chain = await this.api.rpc.system.chain();
  const nodeName = this.api.rpc.system.name();
  const nodeVersion = this.api.rpc.system.version();
  const header = this.api.rpc.chain.getHeader();
  const now = await this.api.query.timestamp.now();

  return {
    chain,
    nodeName,
    nodeVersion,
    headerNumber: header.number,
    now
  };
}
```

After we create this function we could change our endpoint's code to respond with this data.
Please update the function `getHello` in `AppController` with this code:

```
@Get()
async getHello(): Promise<string> {
  const data = await this.appService.getSimpleData();

  return `
    Chain: ${data.chain}<br/>
    Node name: ${data.nodeName}<br/>
    Node version: ${data.nodeVersion}<br/>
    Number of latest block: ${data.headerNumber}<br/>
    Now: ${new Date(Number(data.now.toString())).toISOString()}<br />
  `;
}
```

Here we just create a simple response with collected data.
After the server successfully restarted you can open [http://localhost:3000/](http://localhost:3000/) and see the result:

![Result](/images/connect-to-substrate-nestjs/result.png)


The next thing that we can do is getting the balance of some account.

Please add to function `getSimpleData` this lines:

```
  const ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
  const now = await this.api.query.timestamp.now();

  // to get balance will be used the different method depends of substrate version
  const balance = await this.api.query.balances.freeBalance(ADDR);
  // or this
  // const { data } = await this.api.query.system.account(ADDR);
  // const balance = data.free;
  
  return {
    chain,
    nodeName,
    nodeVersion,
    headerNumber: header.number,
    now,
    balance,
  };
}
```

Address `5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY` it is a predefined address for testing purpose.
If you are creating substrate chain from [tutorial](https://substrate.dev/docs/en/tutorials/creating-your-first-substrate-chain/) then you will have this account.

Depende of that version of substate node you are trying to connect the function `account()` can be not defined.
In this case please use function `freeBalance()`. 
Function `freeBalance` is depreciated, for now, please read more about it in [polkadot FAQ](https://polkadot.js.org/api/start/FAQ.html#my-chain-does-not-support-system-account-queries).

Also, we need to update `AppController`. Please add the line `Balance: ${data.balance}` to returned template literal:

```
@Get()
async getHello(): Promise<string> {
  const data = await this.appService.getSimpleData();

  return `
    Chain: ${data.chain}<br/>
    Node name: ${data.nodeName}<br/>
    Node version: ${data.nodeVersion}<br/>
    Number of latest block: ${data.headerNumber}<br/>
    Now: ${new Date(Number(data.now.toString())).toISOString()}<br />
    Balance: ${data.balance}
  `;
}
```


Now you could check the changes on [http://localhost:3000/](http://localhost:3000/):

![Result with balance](/images/connect-to-substrate-nestjs/result2.png)

All code you can find in this repository: https://github.com/janczer/substrate-nestjs

That next?

You could take a look of polkadot API: [polkadot-js/api](https://polkadot.js.org/api/start/)

If you haven't run the node locally you can try this tutorial: [Creating Your First Substrate Chain](https://substrate.dev/docs/en/tutorials/creating-your-first-substrate-chain/)

After that, you can try to write your first contract: [ink! Smart Contracts Tutorial](https://substrate.dev/substrate-contracts-workshop/#/)
