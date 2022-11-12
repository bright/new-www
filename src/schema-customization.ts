import type { CreateSchemaCustomizationArgs, NodeInput } from 'gatsby'
import { CreateNodeArgs, CreateResolversArgs } from 'gatsby'
import type { GatsbyResolver } from 'gatsby/dist/schema/type-definitions'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { compileMDXToReactComponent } from './compile-mdx-to-react-component'
import { camelCase } from 'lodash'
import {
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
} from 'graphql-compose/lib/ObjectTypeComposer'
import readingTime from 'reading-time'
import { toDate } from './to-date'
import { ContentCollection, contentConfig, ContentField } from './content-config'
import { Directive, Extensions } from 'graphql-compose/lib/utils/definitions'

function gqlFieldDirectives(field: ContentField): Directive[] | undefined {
  if (field.widget == 'relation' && field.valueField) {
    return [
      {
        name: 'link',
        args: {
          by: `frontmatter.${field.valueField}`,
        },
      },
    ]
  }
  return undefined
}

function gqlFieldExtensions(field: ContentField): Extensions | undefined {
  if (field.widget == 'relation' && field.valueField) {
    return {
      link: {
        by: `frontmatter.${field.valueField}`,
      },
    }
  }
  return undefined
}

function gqlFieldType(field: ContentField): string {
  let graphqlType: string
  switch (field.widget) {
    case 'string':
      graphqlType = 'String'
      break
    case 'number':
      graphqlType = 'Float'
      break
    case 'datetime':
      graphqlType = 'Date'
      break
    case 'boolean':
      graphqlType = 'Boolean'
      break
    case 'tags':
      graphqlType = '[String]'
      break
    case 'relation':
      graphqlType = collectionNameTypeName(field.collection)
      if (field.multiple) {
        graphqlType = `[${graphqlType}]`
      }
      break
    default:
      graphqlType = 'String'
      break
  }

  if (field?.required ?? true) {
    graphqlType = graphqlType + '!'
  }

  return graphqlType
}

function contentFieldNameToGraphqlSchemaName(name: string) {
  return name.replace(/[\s-]/g, '_')
}

function fieldToObjectComposerFieldMap(
  contentFields: ContentField[]
): ObjectTypeComposerFieldConfigMapDefinition<{}, {}> {
  return contentFields.reduce((acc, field) => {
    const fieldConfig: ObjectTypeComposerFieldConfigDefinition<{}, {}> = {
      type: gqlFieldType(field),
      extensions: gqlFieldExtensions(field),
    }
    return {
      ...acc,
      [contentFieldNameToGraphqlSchemaName(field.name)]: fieldConfig,
    }
  }, {})
}

function startWithUpper(str: string) {
  return str.replace(/^(.)/, firstLetter => firstLetter.toUpperCase())
}

function collectionNameTypeName(collectionName: string) {
  return startWithUpper(camelCase(collectionName))
}

function collectionTypeName(collection: ContentCollection) {
  const collectionName = collection.name
  return collectionNameTypeName(collectionName)
}

function collectionFrontmatterTypeName(collection: ContentCollection) {
  return startWithUpper(camelCase(`${collection.name}Frontmatter`))
}

export const createSimpleMdx = async ({ actions, schema }: CreateSchemaCustomizationArgs) => {
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

type MdxFrontmatter {
 links_more_about_us: SimpleMdx
 description_mdx: SimpleMdx
 answer: SimpleMdx
}
`,
  ]

  const config = await contentConfig()
  const contentConfigTypes = config.collections.flatMap(collection => {
    const collectionType = collectionTypeName(collection)
    const collectionFrontmatterType = collectionFrontmatterTypeName(collection)
    const frontmatterFields = collection.fields.filter(field => field.name != 'body')

    const frontMatterFieldConfigs = fieldToObjectComposerFieldMap(frontmatterFields)

    return [
      schema.buildObjectType({
        name: collectionFrontmatterType,
        fields: frontMatterFieldConfigs,
      }),
      schema.buildObjectType({
        name: collectionType,
        interfaces: ['Node'],
        fields: {
          body: 'String!',
          frontmatter: `${collectionFrontmatterType}!`,
          ...frontMatterFieldConfigs
        },
      }),
    ]
  })

  actions.createTypes([...contentConfigTypes, ...types])
}

export function createContentResolvers({ createResolvers, intermediateSchema }: CreateResolversArgs) {
  // createResolvers({
  //   Query: {
  //     allBlog: {
  //       resolve: ((source, args, context, info) => {
  //         console.log({ source, args, context, info })
  //         context.nodeModel
  //         return context.nodeModel.findAll()
  //       }) as GatsbyResolver<IGatsbyNode>,
  //     },
  //   },
  // })
}

function collectionItemContentFilePathCacheKey(mdxNode: NodeInput) {
  return `fileTo${mdxNode.internal.type}-${mdxNode.internal.contentFilePath}`
}

async function createContentCollectionNodeFor({
  actions: { createNode, createParentChildLink, createNodeField },
  node,
  createNodeId,
  cache,
}: Pick<CreateNodeArgs, 'actions' | 'node' | 'createNodeId' | 'cache'>) {
  const config = await contentConfig()
  const contentCollection = config.collections.find(collection => collection.isCollectionItem(node))
  if (contentCollection) {
    const contentNodeType = collectionTypeName(contentCollection)

    const collectionItemNode: NodeInput = {
      id: createNodeId(`${node.id} >>> ${contentNodeType}`),
      children: [],
      parent: node.id,
      internal: {
        type: contentNodeType,
        contentFilePath: node.internal.contentFilePath,
        content: node.internal.content,
        contentDigest: node.internal.contentDigest,
        mediaType: node.internal.mediaType,
        description: node.internal.description ?? contentCollection.label,
      },
      body: node.body,
      frontmatter: node.frontmatter,
    }
    const nodeFields: Record<string, any> = node.fields ?? {}
    for (const key in nodeFields) {
      if (collectionItemNode[key] !== undefined) {
        console.warn(
          'Content node',
          collectionItemNode,
          'already has field with key',
          key,
          'Will not copy value from nodeFields',
          nodeFields[key]
        )
      } else {
        collectionItemNode[key] = nodeFields[key]
      }
    }

    const nodeFrontmatter: Record<string, any> = node.frontmatter ?? {}
    for (const key in nodeFrontmatter) {
      if (collectionItemNode[key] !== undefined) {
        console.warn(
          'Content node',
          collectionItemNode,
          'already has field with key',
          key,
          'Will not copy value from frontmatter',
          nodeFrontmatter[key]
        )
      } else {
        collectionItemNode[key] = nodeFrontmatter[key]
      }
    }

    createNode(collectionItemNode)
    createParentChildLink({
      parent: node,
      child: collectionItemNode,
    })

    // TODO: is this needed?
    await cache.set(collectionItemContentFilePathCacheKey(collectionItemNode), collectionItemNode.id)
  }
}

export const onCreateContentNode = async ({ actions, node, createNodeId, cache }: CreateNodeArgs) => {
  const { createNodeField } = actions
  const nodeFilePath = node.internal.contentFilePath!
  if (!node.internal.contentFilePath) {
    console.log('no contentFilePath in', node)
  }

  const nodeSlug = '/' + nodeFilePath.split('/').splice(-2).join('/').replace('.md', '')
  console.log('nodeSlug', nodeSlug, 'for path', nodeFilePath)

  createNodeField({
    node,
    name: `slug`,
    // TODO: figure out correct type instead of as any
    value: nodeSlug,
  })

  createNodeField({
    node,
    name: 'timeToRead',
    value: readingTime(node.body as string),
  })

  const date = toDate((node.frontmatter as any)?.date)

  if (date) {
    const meaningfullyUpdatedAt = toDate((node.frontmatter as any)?.meaningfullyUpdatedAt)
    const modifiedAt = meaningfullyUpdatedAt ?? date
    createNodeField({
      node,
      name: 'modifiedAt', // used for sorting of blog posts
      value: modifiedAt,
    })
  } else {
    if (nodeSlug.includes('blog')) {
      console.warn('No date found for blog', { node, nodeSlug })
    }
  }

  await createContentCollectionNodeFor({ node, actions, createNodeId, cache })
}
