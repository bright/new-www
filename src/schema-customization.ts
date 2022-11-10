import { evaluate } from '@mdx-js/mdx'
import * as provider from '@mdx-js/react'

import * as runtime from 'react/jsx-runtime'
import { gatsbyMdxOptions } from './gatsby-mdx-options'
import type { CreateSchemaCustomizationArgs } from 'gatsby'
import type { GatsbyResolver } from 'gatsby/dist/schema/type-definitions'
import { renderToString } from 'react-dom/server'
import React from 'react'

export const createSimpleMdx = ({ actions, schema }: CreateSchemaCustomizationArgs) => {
  const resolve: GatsbyResolver<string> = async (source) => {
    if (source) {
      const { default: Component } = await evaluate(source, {
        ...(runtime as any),
        ...provider,
        ...gatsbyMdxOptions.mdxOptions,
      } as any)
      return renderToString(React.createElement(Component, {}))
    }
    return null
  }
  actions.createTypes([
    schema.buildObjectType({
      name: 'SimpleMdx',
      fields: {
        html: {
          type: 'String',
          resolve,
        },
      },
    }),
    `
type Mdx implements Node {
 frontmatter: MdxFrontmatter
}

type MdxFrontmatter {
 links_more_about_us: SimpleMdx
}
`,
  ])
}
