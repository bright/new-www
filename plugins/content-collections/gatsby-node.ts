import { GatsbyNode } from 'gatsby'
import { contentConfig, ContentField } from './content-config'
import {
  collectionFrontmatterTypeName,
  collectionTypeName,
  contentFieldNameToGraphqlSchemaName,
  createContentCollectionNodeFor,
  gqlFieldType,
  LetGatsbyInferFieldType,
} from './content-field-to-gql'
import {
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
} from 'graphql-compose/lib/ObjectTypeComposer'
import { Extensions } from 'graphql-compose/lib/utils/definitions'

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions, createNodeId, cache }) => {
  if (node.internal.type === 'Mdx') {
    await createContentCollectionNodeFor({ node, actions, createNodeId, cache })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions, schema }) => {
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
        extensions: {
          infer: true,
        },
      }),
      schema.buildObjectType({
        name: collectionType,
        interfaces: ['Node'],
        fields: {
          body: 'String!',
          frontmatter: `${collectionFrontmatterType}!`,
          ...frontMatterFieldConfigs,
        },
        extensions: {
          infer: true,
        },
      }),
    ]
  })

  actions.createTypes(contentConfigTypes)
}

function fieldToObjectComposerFieldMap(
  contentFields: ContentField[]
): ObjectTypeComposerFieldConfigMapDefinition<{}, {}> {
  return contentFields.reduce((acc, field) => {
    const fieldType = gqlFieldType(field)
    if (fieldType !== LetGatsbyInferFieldType) {
      const fieldConfig: ObjectTypeComposerFieldConfigDefinition<{}, {}> = {
        type: fieldType, // TODO: add logic to let Gatsby infer correct type
        extensions: gqlFieldExtensions(field),
      }
      return {
        ...acc,
        [contentFieldNameToGraphqlSchemaName(field.name)]: fieldConfig,
      }
    } else {
      return acc
    }
  }, {})
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
