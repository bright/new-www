import type { GatsbyNode } from 'gatsby'
import { allMdxData, GQLData } from './src/models/gql'
import { loadTagGroups, TagGroup } from './src/tag-groups'
import { blogListForTagGroupsBasePath, blogPostUrlPath } from './src/blog-post-paths'
import { IgnorePlugin } from 'webpack'

const path = require('path')

const _ = require('lodash')
const { queryPostsSlug } = require('./src/query-posts')

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await queryPostsSlug({ graphql })

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMdx.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/BlogListTemplate.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })

  const ymlDocTags = await loadTagGroups()
  // const tags = result.data.tagsGroup.group;
  await Promise.all(
    ymlDocTags.groups.map(async (group: TagGroup) => {
      const searchTags = JSON.stringify(group.tags)
      const result = await queryPostsSlug({ graphql, tags: searchTags })
      const posts = result.data.allMdx.edges
      const postsPerPage = 10
      const numPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((item, i) => {
        createPage({
          path: `${blogListForTagGroupsBasePath(group)}/${i + 1}`,
          component: path.resolve('./src/templates/BlogListTemplateTags.tsx'),
          context: {
            groupTags: group.tags,
            tag: group.name,
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1
          }
        })
      })

      if (group.groups) {
        await Promise.all(
          group.groups.map(async subTag => {
            const searchTags = JSON.stringify(subTag.tags)
            const result = await queryPostsSlug({ graphql, tags: searchTags })
            const posts = result.data.allMdx.edges
            const postsPerPage = 10
            const numPages = Math.ceil(posts.length / postsPerPage)
            Array.from({ length: numPages }).forEach((item, i) => {
              createPage({
                path: `${blogListForTagGroupsBasePath(group, subTag)}/${i + 1}`,
                component: path.resolve('./src/templates/BlogListTemplateTags.tsx'),
                context: {
                  groupTags: subTag.tags,
                  tag: group.name,
                  subTag: subTag.name,
                  limit: postsPerPage,
                  skip: i * postsPerPage,
                  numPages,
                  currentPage: i + 1
                }
              })
            })
          })
        )
      }
    })
  )

  const memberResult = await graphql<GQLData>(`
    {
      allMdx(filter: { frontmatter: { layout: { eq: "member" } } }) {
        edges {
          node {
            internal {  contentFilePath  }
            frontmatter {
              slug
              author_id
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const members = memberResult.data!.allMdx?.edges

  await Promise.all(
    members.map(async ({ node }) => {
      const { frontmatter } = node
      const { slug: member, author_id: authorId } = frontmatter
      const result = await graphql<{
        author: allMdxData
        secondAuthor?: allMdxData
        thirdAuthor?: allMdxData
      }>(`
  {
    author: allMdx(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, author: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          internal {  contentFilePath  }
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            title
            tags
            date
            author_id
          }
          fields {
            slug
          }
        }
      }
    }
    secondAuthor: allMdx(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, secondAuthor: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          internal {  contentFilePath  }
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            title
            tags
            date
          }
          fields {
            slug
          }
        }
      }
    }
    thirdAuthor: allMdx(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, thirdAuthor: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          internal {  contentFilePath  }
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            title
            tags
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `)

      const { author, secondAuthor, thirdAuthor } = result.data!
      const allAuthors = [...author?.edges, ...(secondAuthor?.edges ?? []), ...(thirdAuthor?.edges ?? [])]

      const uniqueAuthors = allAuthors
        .filter((v, i, a) => a.findIndex(t => t.node.fields.slug === v.node.fields.slug) === i)
        .sort(function(a, b) {
          return new Date(b.node.frontmatter.date).getTime() - new Date(a.node.frontmatter.date).getTime()
        })

      const posts = uniqueAuthors
      const postsPerPage = 10
      const numPages = Math.ceil(uniqueAuthors.length / postsPerPage)

      if (posts.length === 0) {
        createPage({
          path: `/about-us/${_.kebabCase(member)}`,
          component: `${path.resolve('./src/templates/AboutUsTemplate.tsx')}?__contentFilePath=${node.internal.contentFilePath}`,
          context: {
            id: node.id
          }
        })
      } else {
        Array.from({ length: numPages }).forEach((item, i) => {
          createPage({
            path: i == 0 ? `/about-us/${_.kebabCase(member)}` : `/about-us/${_.kebabCase(member)}/${i + 1}`,
            component: `${path.resolve('./src/templates/AboutUsTemplate.tsx')}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
              id: node.id,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              posts: i == 0 ? posts.slice(i, postsPerPage) : posts.slice(i * postsPerPage, (i + 1) * postsPerPage),
              currentPage: i + 1
            }
          })
        })
      }
    })
  )

  const serviceResult = await graphql<GQLData>(`
    {
      allMdx(filter: { frontmatter: { layout: { eq: "our-service" } } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
              faqs {
                frontmatter {
                  answer
                  question
                }
              }
            }
            internal {  contentFilePath  }
          }
        }
      }
    }
  `)
  const services = serviceResult.data!.allMdx.edges

  services.forEach(service => {
    createPage({
      path: 'our-areas/' + service.node.frontmatter.slug,
      component: `${path.resolve('./src/templates/OurServiceTemplate.tsx')}?__contentFilePath=${service.node.internal.contentFilePath}`,
      context: {
        id: service.node.id,
        slug: service.node.frontmatter.slug
      }
    })

    const faqs = service.node.frontmatter.faqs
    faqs.forEach((faq: { frontmatter: { answer: string; question: string } }) => {
      createPage({
        path: 'our-areas/' + service.node.frontmatter.slug + '/' + _.kebabCase(faq.frontmatter.question.toLowerCase()),
        component: `${path.resolve('./src/templates/OurServiceTemplate.tsx')}?__contentFilePath=${service.node.internal.contentFilePath}`,
        context: {
          id: service.node.id,
          faqTitle: faq.frontmatter.question,
          slug: service.node.frontmatter.slug,
        }
      })
    })
  })

  const postResult = await graphql<GQLData>(
    `
      {
        allMdx(
          filter: { frontmatter: { layout: { eq: "post" } } }
          sort: { fields: [frontmatter___dateModified, frontmatter___date], order: [ASC, DESC] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                slug
              }
              internal {  contentFilePath  }
            }
          }
        }
      }
    `
  )
  if (postResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  debugger;
  const postsResult = postResult.data!.allMdx.edges

  postsResult.forEach(post => {
    const postNode = post.node
    const nodeFileAbsolutePath: string = postNode.internal.contentFilePath
    const currentPostTags: string[] = postNode.frontmatter.tags

    const flatteredYmlTags = ymlDocTags.groups.reduce((previousValue: string[], currentValue: TagGroup) => {
      if (currentValue.groups) {
        const flatteredGroup = currentValue.groups.reduce((previousValue, currentValue) => {
          if (currentPostTags.includes(currentValue.name)) {
            return [...previousValue, ...currentValue.tags]
          } else {
            return [...previousValue]
          }
        }, [] as string[])

        if (currentPostTags.includes(currentValue.name)) {
          return [...previousValue, ...flatteredGroup, ...currentValue.tags]
        } else {
          return [...previousValue, ...flatteredGroup]
        }
      } else {
        if (currentPostTags.includes(currentValue.name)) {
          return [...previousValue, ...currentValue.tags]
        } else {
          return [...previousValue]
        }
      }
      // else {
      //   return [...previousValue]
      // }
    }, [])

    const relatedTags = [...flatteredYmlTags, ...currentPostTags]

    createPage({
      path: blogPostUrlPath(postNode),
      component: `${path.resolve('./src/templates/PostTemplate.tsx')}?__contentFilePath=${nodeFileAbsolutePath}`,
      context: {
        id: postNode.id,
        slug: postNode.fields.slug,
        relatedTags: relatedTags
      }
    })
  })

  const preparePage = async (layout: string, path: string, template: string) => {
    const result = await graphql<GQLData>(`
      {
        allMdx(
          filter: {
            frontmatter: { layout: { eq: "${layout}" } }
          }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
              internal {
                contentFilePath
              }
            }
          }
        }
      }
    `)

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    // console.log(result.data.allMdx.edges)
    result.data!.allMdx.edges.forEach(({ node }) => {
      if(!node.internal.contentFilePath){
        console.log('no contentFilePath in', node)
      }
      const name = node.internal.contentFilePath
        .split('/')
        .pop()
        .replace('.md', '')
        .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, '')
      // console.log({
      //   path: path + "/" + (node.frontmatter.slug || name),
      //   component: template,
      //   context: {
      //     // additional data can be passed via context
      //     fileAbsolutePath: node.fileAbsolutePath,
      //   },
      // })

      createPage({
        path: path + '/' + (node.frontmatter.slug || name),
        component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          // additional data can be passed via context
          slug: node.frontmatter.slug
        }
      })
    })
  }

  const projectTemplate = `${__dirname}/src/templates/ProjectTemplate.tsx`
  await preparePage('project', 'projects', projectTemplate)

  const jobTemplate = `${__dirname}/src/templates/JobTemplate.tsx`
  await preparePage('job', 'jobs', jobTemplate)

  createRedirect({ fromPath: '/jobs/senior-NET-developer', toPath: '/career' })
  createRedirect({ fromPath: '/about-us/values', toPath: '/about-us' })
  createRedirect({ fromPath: '/about-us/story', toPath: '/about-us' })
  createRedirect({ fromPath: '/jobs/rust-developer-1', toPath: '/jobs/rust-developer' })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const nodeFilePath = node.internal.contentFilePath!
    if(!node.internal.contentFilePath){
      console.log('no contentFilePath in', node)
    }
    const nodeSlug = '/' + nodeFilePath.split('/').splice(-2).join('/').replace('.md', '')
    console.log('nodeSlug', nodeSlug, 'for path', nodeFilePath)
    createNodeField({
      node,
      name: `slug`,
      // TODO: figure out correct type instead of as any
      value: nodeSlug
    })
  }
}
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      //https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-netlify-cms#disable-widget-on-site
      new IgnorePlugin({
        resourceRegExp: /^netlify-identity-widget$/
      })
    ]
  })
}
