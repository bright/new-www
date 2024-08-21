import { GatsbyNode } from 'gatsby'
import { GatsbyResolver } from 'gatsby/dist/schema/type-definitions'
import { compileMDXToReactComponent } from '../../src/compile-mdx-to-react-component'
import { renderToString } from 'react-dom/server'
import React from 'react'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ schema, actions }) => {
  const resolve: GatsbyResolver<string> = async source => {
    if (source) {
      const { Component } = await compileMDXToReactComponent({ MDXSource: source })
      return renderToString(React.createElement(Component, {}))
    }
    return null
  }

  let types = [
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

type Testimonials {
  testimonials_quote: SimpleMdx
}

type MdxFrontmatter {
 links_more_about_us: SimpleMdx
 description_mdx: SimpleMdx
 answer: SimpleMdx
 testimonials: [Testimonials]
}
`,
  ]
  // console.log('simple-mdx', {types})
  actions.createTypes(types)
}
