# gatsby-plugin-json-pages

Gatsby plugin for creating static `.json` files at build.

[Demo](https://gatsby-plugin-json-pages.vercel.app/products.json)

## Installation

```shell
yarn add gatsby-plugin-json-pages
```

## How to use

Simply provide an array of `pages` that each include the `fileName`, `query`, and `transformer`. The `transformer` function is recommended, but by default the response from `query` will be stringified.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-json-pages",
      options: {
        pages: [
          {
            fileName: "products",
            query: `
              query {
                allGraphCmsProduct {
                  nodes {
                    id
                    prices {
                      amount
                      currency
                    }
                  }
                }
              }
            `,
            transformer: ({
              data: {
                allGraphCmsProduct: { nodes },
              },
            }) => nodes,
          },
        ],
      },
    },
  ],
};
```
