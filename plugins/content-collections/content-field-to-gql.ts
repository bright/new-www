import { ContentCollection, contentConfig, ContentField } from './content-config'
import { CreateNodeArgs, NodeInput } from 'gatsby'
import { camelCase } from 'lodash'

export const LetGatsbyInferFieldType = Symbol('Let gatsby infer field type')

export function gqlFieldType(field: ContentField): string | typeof LetGatsbyInferFieldType {
  let graphqlType: string | typeof LetGatsbyInferFieldType
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
    case 'image':
      graphqlType = LetGatsbyInferFieldType
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

  const isFieldRequired = field?.required ?? true
  if (typeof graphqlType === 'string' && isFieldRequired) {
    graphqlType = graphqlType + '!'
  }

  return graphqlType
}

export function contentFieldNameToGraphqlSchemaName(name: string) {
  return name.replace(/[\s-]/g, '_')
}

function startWithUpper(str: string) {
  return str.replace(/^(.)/, firstLetter => firstLetter.toUpperCase())
}

function collectionNameTypeName(collectionName: string) {
  return startWithUpper(camelCase(collectionName))
}

export function collectionTypeName(collection: ContentCollection) {
  const collectionName = collection.name
  return collectionNameTypeName(collectionName)
}

export function collectionFrontmatterTypeName(collection: ContentCollection) {
  return startWithUpper(camelCase(`${collection.name}Frontmatter`))
}

function collectionItemContentFilePathCacheKey(mdxNode: NodeInput) {
  return `fileTo${mdxNode.internal.type}-${mdxNode.internal.contentFilePath}`
}

export async function createContentCollectionNodeFor({
  actions: { createNode, createParentChildLink },
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
