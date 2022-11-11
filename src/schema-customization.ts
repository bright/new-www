import type { CreateSchemaCustomizationArgs } from 'gatsby'
import type { GatsbyResolver } from 'gatsby/dist/schema/type-definitions'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { compileMDXToReactComponent } from './compile-mdx-to-react-component'

export const createSimpleMdx = ({ actions, schema }: CreateSchemaCustomizationArgs) => {
  const resolve: GatsbyResolver<string> = async source => {
    if (source) {
      const { Component } = await compileMDXToReactComponent({ MDXSource: source })
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
 description_mdx: SimpleMdx
 answer: SimpleMdx
}
`,
  ])
}
