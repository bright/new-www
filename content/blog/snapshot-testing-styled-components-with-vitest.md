---
author: bartosz
tags:
  - React
  - Vitest
  - styled-components
  - unit-testing
date: 2025-02-14T07:12:34.731Z
meaningfullyUpdatedAt: 2025-02-14T07:12:34.757Z
title: Snapshot testing styled-components with Vitest
layout: post
image: /images/snapshot-testing-background.jpg
hidden: false
comments: false
published: true
language: en
---
When testing styled-components in Vitest, you might find the following limitation - the snapshots include only hashed class names, hiding the actual styles.

When the styles change, the diff will show only a different hash value, without an indication of what actually changed. Moreover, these hashed class names are unstable and can change even when the component wasn't modified, simply because something else in the file has changed - for instance the position of the component in the file.

## Example of the issue

For instance, let's use this styled component:

```tsx
const Container = styled.div`
    background-color: red;
`
```

Vitest generates a snapshot that has no information about the style rules:

```
exports[`Container > should match snapshot 1`] = `
<div>
  <div
    class="sc-KXCwU eyGbxi"
  />
</div>
`
```

When the styles change, you'll get the following error:

```
- class="sc-KXCwU cThALf"
+ class="sc-KXCwU eyGbxi"
```

## How Jest solved this problem

The Jest community identified this issue and solved it with the `jest-styled-components` library. This library extends snapshots with the actual CSS rules. For example:

```
exports[`Container > should match snapshot 1`] = `
.c0 {
  background-color: red;
}

<div>
  <div
    class="c0"
  />
</div>
`;
```

When something change, you'll see the details in the output. The tests are stable now and will not fail due to a different hash value.

```
  - Expected  - 1
  + Received  + 1

    .c0 {
  -   background-color: red;
  +   background-color: blue;
    }
```

## Using Jest's serializer in Vitest

While I couldn't find a similar library for Vitest, I came with the idea of using the serializer from `jest-styled-components` in Vitest. This way, we may achieve the same result.

To use it, add `jest-styled-components` to the dev dependencies. Then, configure `expect` to use the serializer:

```ts
import { expect } from "vitest"
import { styleSheetSerializer } from "jest-styled-components/serializer"

expect.addSnapshotSerializer(styleSheetSerializer)
```

## Where to add the configuration

There are two places where you can add this code:

1. In the test file, before the tests are run.
2. In the global setup for the tests. To do this, you need to create a `vitest.config.ts` file in the root of the project and configure it to run the setup file before tests:

```ts
export default defineConfig({
  test: {
    setupFiles: './src/setupTests.ts',
  },
})
```

## Final snapshot output

Now, when you run the tests, the snapshot will contain the actual CSS rules:

```
exports[`Container > should match snapshot 1`] = `
.c0 {
  background-color: red;
}

<div>
  <div
    class="c0"
  />
</div>
`;
```

This way, the tests are stable and will not fail due to a different hash value anymore.