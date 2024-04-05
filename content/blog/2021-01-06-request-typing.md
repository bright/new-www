---
layout: post
title: Object typing
date: 2021-01-06T12:12:12.000Z
meaningfullyUpdatedAt: 2021-01-06T12:12:12.000Z
image: /images/request_typing.png
author: wojciech
tags:
  - typescript
  - types
  - API
  - frontend
hidden: false
comments: true
published: true
language: en
---
## Introduction

As developers we often perform POST and PATCH requests to API from our frontend apps. When we use TypeScript, this code should be typed safely. There are multiple ways to do so. Let's analyze one of them!

## Prerequisite

Let's imagine a player entity from a game:

```typescript
// Create a type for our object
type PlayerType = {
  hp: number
  name: string
  position: [number, number]
}

// We can also use interface:
interface PlayerInterface {
  hp: number
  name: string
  position: [number, number]
}
```

Let's create two functions (without safe type control as for now) to create and update our player:

```typescript
const postPlayer = (data: any) => {
  // API call with POST method, here as data whole Player object should be sent. 
}

const patchPlayer = (data: any) => {
  // API call with PATCH method, here as data Player object can be sent as a whole or partialy. 
}
```

## Safe typing

Leaving type `any` can lead application to behave erroneous moreover we do not benefit from TypeScript static type
checking. **Avoid** leaving `any` in code - there is probably a better solution!

Statically typed functions arguments could look like this:

```typescript
// Here we use PlayerType (or PlayerInterface) type as API require whole object 
const postPlayer = (data: PlayerType | PlayerInterface) => { }

// Example of "keyof" operator
type PlayerTypeKeys = keyof PlayerType // "hp" | "name" | "position"

// Copy of PlayerType type with "?" beeing added - this will change object properties to be optional
type PlayerTypeOptional = {
  [K in keyof PlayerType]?: PlayerType[K]
}

// Here we use PlayerOptional (or partial of PlayerInterface) type as API does not require whole object
const patchPlayer = (data: PlayerTypeOptional | Partial<PlayerInterface>) => { }
```

Let's test our type for safety:

```typescript
// Here we create objects which later will be send to API thre proper functions
const player1: PlayerType = { hp: 10, name: "Albert", position: [10, 1] }
const player2: PlayerInterface = { hp: 20, name: "Antony", position: [2, 20] }
const player3: PlayerTypeOptional = { name: "Alex" }
const player4: Partial<PlayerInterface> = { hp: 2 }

// Results
postPlayer(player1)     // OK
postPlayer(player2)     // OK
postPlayer(player3)     // Error
postPlayer(player4)     // Error
patchPlayer(player1)    // OK 
patchPlayer(player2)    // OK 
patchPlayer(player3)    // OK 
patchPlayer(player4)    // OK
```

## Additional info

Similarly to adding optional ("?") modificator on `PlayerType` we can add by "+" (this sign can be omitted) or 
remove by "-" (this sign is required) readonly modificator:

```typescript
type PlayerTypeReadonlyOne = {
  readonly [K in keyof PlayerType]: PlayerType[K]
}

type PlayerTypeReadonlyTwo = {
  +readonly [K in keyof PlayerTypeOptional]-?: PlayerTypeOptional[K]
}

type PlayerTypeOptionalTwo = {
  -readonly [K in keyof PlayerTypeReadonlyOne]+?: PlayerTypeReadonlyOne[K]
}

// types PlayerTypeReadonlyOne and PlayerTypeReadonlyTwo are equivalent
const player5: PlayerTypeReadonlyOne = { hp: 1, name: "One", position: [1, 1] }
const player6: PlayerTypeReadonlyTwo = { hp: 2, name: "Two", position: [2, 2] }

// types PlayerTypeOptional and PlayerTypeOptionalTwo are equivalent
const player7: PlayerTypeOptionalTwo = { position: [2, 2] }
```

As an alternative while using interface `SomeInterface` instead of type we can use a combination of 
`Readonly<SomeInterface>`, `Required<SomeInterface>`.

## Conclusion

Proper API typing increase benefits from TypeScript static type checking and makes our development safer. Knowledge on 
how to work with types or interfaces can help us find a way to do so in a DRY way!
