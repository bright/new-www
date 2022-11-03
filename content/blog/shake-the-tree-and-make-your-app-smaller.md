---
author: szymon-ch
tags:
  - development
  - JavaScript
  - web development
  - frontend
date: 2022-11-03T19:21:13.187Z
meaningfullyUpdatedAt: 2022-11-03T19:21:13.201Z
title: Shake the tree and make your app smaller
layout: post
image: /images/treeshaking-featured.jpg
hidden: false
comments: true
published: true
---
In an ideal world, there would be no delays and everything would load blazingly fast no matter where you are. Unfortunately, it’s a totally different story in reality. We’ve made significant progress in recent years in expanding the coverage of 4G/LTE mobile networks and replacing old copper with shiny fiber, but still, there are places in the world, where every kilobyte is at a premium. 

We would love to see our application load blazingly fast even in such severe conditions, but in some cases, it‘s not that easy to provide both an exceptional and cheap experience. That’s why it’s important to know how to limit the amount of code our application includes. One of the tools helping us with this task is tree shaking, but what exactly is it?

## What’s tree shaking and how does it work?

Tree shaking is a fancy name used in the JavaScript world for dead-code elimination. This process removes everything that’s not used by your code. You can imagine it as well… shaking a tree and watching the brown leaves falling. This means all the React components you don’t import from a component library will be marked as useless and removed from the final bundle.

The important fact is, to drop anything, we’ve to be completely sure it’s unused. The tools we use like Webpack or Rollup can determine it using static code analysis. As the name suggests, this works best if your code is predictable and doesn’t require execution to determine the required dependencies.

## Module formatting system matters

There are several options to choose from, but the most popular two are CommonJS and ESModules formats. Why is it relevant, you ask? Well, tree shaking doesn’t work for one of those, but let’s not spoil the surprise.

The first is widely used in the NodeJS ecosystem. It was created to serve this purpose and it does so pretty well. Keep in mind that usually there is no need to limit the size of a backend service. Now, if you work on the client-side application, it’s a different story. We’ve to remove anything unnecessary to maintain loading times at the lowest level possible. The problem with CommonJS is, most of the bundling tools won’t even try to process it and perform tree shaking. It’s because of its dynamic nature as, for example, it’s completely legit to compute a key and then use it to export something. Webpack cannot obtain this key without running the code, so it simply includes the whole module in the bundle. 

```typescript
const fancyCapitalize = (str: string): string => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

// CommonJS
module.exports[
  [102, 97, 110, 99, 121].map(String.fromCharCode).join('')
] = fancyCapitalize;

// ESModules
export { fancyCapitalize as fancy };
```

On the other hand, modules created using ESModules are easily tree-shakeable, because all the imports and exports must not use any dynamic keys by design. Abstract syntax tree analysis is enough to build a module dependency graph, mark what’s needed and what’s not and simply skip bundling of useless code.

## What if I have to use some CommonJS library?

Let’s imagine there is a use-case, a single library on the market only handles that and unfortunately, it’s shared as a CommonJS module. Does it mean there is no help? Depending on the module, there may be. If this library exposes multiple independent entry points, you can directly import one of them and therefore skip the others. Tree shaking won’t still work, but you will minimize the amount of unneeded code by hand. 

```typescript
// Imports everything
import { sortBy, capitalize } from 'lodash';

// Imports sortBy only
import sortBy from 'lodash/sortBy';
```

This is the case when you try to use Lodash and notice, that all the utilities are included in your bundle by default. However, when you switch to direct imports, you will notice your bundle shrinking.

## Nasty side-effects

There is another reason why tree shaking may not take place for a module. You are free to add properties to global objects or invoke imported functions, which may result in a mutation of data in the origin module.

```typescript
// Side-effect!
if (!Math.trunc) {
  Math.trunc = function(number) {
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}

// Another side-effect!
window.somethin = { version: '1.0' };

// Yet another side-effect!
import { registerPlugin } from 'some-expensive-library';

const myPlugin = ...;
registerPlugin('myPlugin', myPlugin);
```

This is basically what a side-effect is. It’s an action causing an effect observable from outside the module. Unfortunately, side-effects are hard to determine automatically and thus Webpack assumes all the modules contain them by default. It’s our responsibility to prove it wrong. We can do it by adding the “sideEffects” property to our “package.json” file. Usually, there are no side-effects at all and setting it to “false” will be just fine. If you are aware of the files causing effects, you should put an array here with paths to all of them or use a glob pattern.

## Bundle autopsy

It’s hard to determine what exactly is included in the bundle. Certainly, it’s doable by code analysis, but there must be another way and there is. Ladies and gentlemen, I give you Webpack Bundle Analyzer.

<center>

<div class="image"><img src="/images/webpack-bundle-analyzer.gif" alt="Animated image preseting the features of Webpack Bundle Analyzer." title="undefined"  /> </div>

</center>

This tool can read and parse the statistics generated while bundling by Webpack and present gathered data as an interactive graph, where every module is presented as a coloured rectangle. This way you can navigate through your app and look for libraries occupying way too much space. What’s even more interesting is not only external libraries are included, but also your code. This way you can tell if some modules should be lazy-loaded.

## Determining the cost of an import

Sometimes we have to choose one from the set of libraries providing the same functionality. Instead of installing them one by one and running the analyzer mentioned before, we can determine the cost of an import.

<center>

<div class="image"><img src="/images/bundlephobia.png" alt="Bundlephobia's logo - figure holding head with hands." title="undefined"  /> </div>

</center>

There is a tool called Bundlephobia, which presents various information about the library and can tell if it’s tree-shakeable and side-effect free. It also suggests alternatives, if there are any available. It’s going to save you a lot of time and make the selection process way easier. A must-have in a web developer toolset.

## Is this enough to keep my application fit?

All the information you’ve acquired while reading this article will limit the impact of external libraries on the weight of your application. However, no matter how optimized libraries you choose, the time will come to do something more to ensure it will load quickly. In such a case you should probably apply the lazy-loading pattern. This will split your bundle into several parts and load those only when necessary. I hope all knowledge you’ve acquired will help you make your apps better! Stay tuned for other entries about web app optimization, which will probably come soon.