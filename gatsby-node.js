const path = require('path')

const _ = require('lodash')
const fs = require('fs')
const yaml = require('js-yaml')
const webpack = require(`webpack`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^netlify-identity-widget$/,
      }),
    ],
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges
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
        currentPage: i + 1,
      },
    })
  })

  const ymlDocTags = yaml.load(fs.readFileSync('./tag-groups.yml', 'utf-8'))
  // const tags = result.data.tagsGroup.group;
  ymlDocTags.groups.forEach(async tag => {
    const searchTags = JSON.stringify(tag.tags)
    const result = await graphql(
      `
      {
        allMarkdownRemark(
          filter: {frontmatter: {layout: {eq: "post"}, published: { ne: false }, hidden: { ne: true },
          tags: {in: ${searchTags}}}}
          sort: {fields: [frontmatter___date], order: DESC}
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
      `
    )
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((item, i) => {
      createPage({
        path: `/blog/${_.kebabCase(tag.name.toLowerCase())}/${i + 1}`,
        component: path.resolve('./src/templates/BlogListTemplateTags.tsx'),
        context: {
          groupTags: tag.tags,
          tag: tag.name,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    if (tag.groups) {
      tag.groups.forEach(async subTag => {
        const searchTags = JSON.stringify(subTag.tags)
        const result = await graphql(
          `
          {
            allMarkdownRemark(
              filter: {frontmatter: {layout: {eq: "post"}, published: { ne: false }, hidden: { ne: true },
              tags: {in: ${searchTags}}}}
              sort: {fields: [frontmatter___date], order: DESC}
              limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
        `
        )
        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 10
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((item, i) => {
          createPage({
            path: `/blog/${_.kebabCase(tag.name.toLowerCase())}/${_.kebabCase(subTag.name.toLowerCase())}/${i + 1}`,
            component: path.resolve('./src/templates/BlogListTemplateTags.tsx'),
            context: {
              groupTags: subTag.tags,
              tag: tag.name,
              subTag: subTag.name,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })
      })
    }
  })

  const memberResult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { layout: { eq: "member" } } }) {
        edges {
          node {
            fileAbsolutePath
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
  const members = memberResult.data.allMarkdownRemark?.edges

  await Promise.all(
    members.map(async ({ node }) => {
      const { fileAbsolutePath, frontmatter } = node
      const { slug: member, author_id: authorId } = frontmatter
      const result = await graphql(`
  {
    author: allMarkdownRemark(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, author: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          fileAbsolutePath
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
    secondAuthor: allMarkdownRemark(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, secondAuthor: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          fileAbsolutePath
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
    thirdAuthor: allMarkdownRemark(
      filter: {frontmatter: {layout: {eq: "post"}, published: {ne: false}, hidden: {ne: true}, thirdAuthor: {eq: "${authorId}"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          id
          fileAbsolutePath
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

      const { author, secondAuthor, thirdAuthor } = result.data
      const allAuthors = [...author?.edges, ...secondAuthor?.edges, ...thirdAuthor?.edges]

      const uniqueAuthors = allAuthors
        .filter((v, i, a) => a.findIndex(t => t.node.fields.slug === v.node.fields.slug) === i)
        .sort(function (a, b) {
          return new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)
        })

      const posts = uniqueAuthors
      const postsPerPage = 10
      const numPages = Math.ceil(uniqueAuthors.length / postsPerPage)

      if (posts.length === 0) {
        createPage({
          path: `/about-us/${_.kebabCase(member)}`,
          component: path.resolve('./src/templates/AboutUsTemplate.tsx'),
          context: {
            fileAbsolutePath: fileAbsolutePath,
          },
        })
      } else {
        Array.from({ length: numPages }).forEach((item, i) => {
          createPage({
            path: i == 0 ? `/about-us/${_.kebabCase(member)}` : `/about-us/${_.kebabCase(member)}/${i + 1}`,
            component: path.resolve('./src/templates/AboutUsTemplate.tsx'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              posts: i == 0 ? posts.slice(i, postsPerPage) : posts.slice(i * postsPerPage, (i + 1) * postsPerPage),
              currentPage: i + 1,
              fileAbsolutePath: fileAbsolutePath,
            },
          })
        })
      }
    })
  )

  const serviceResult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { layout: { eq: "our-service" } } }, limit: 1000) {
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
            fileAbsolutePath
          }
        }
      }
    }
  `)
  const services = serviceResult.data.allMarkdownRemark.edges

  services.forEach(service => {
    createPage({
      path: 'our-areas/' + service.node.frontmatter.slug,
      component: path.resolve('./src/templates/OurServiceTemplate.tsx'),
      context: {
        slug: service.node.frontmatter.slug,
        fileAbsolutePath: service.node.fileAbsolutePath,
      },
    })

    const faqs = service.node.frontmatter.faqs
    faqs.forEach(faq => {
      createPage({
        path: 'our-areas/' + service.node.frontmatter.slug + '/' + _.kebabCase(faq.frontmatter.question.toLowerCase()),
        component: path.resolve('./src/templates/OurServiceTemplate.tsx'),
        context: {
          faqTitle: faq.frontmatter.question,
          slug: service.node.frontmatter.slug,
          fileAbsolutePath: service.node.fileAbsolutePath,
        },
      })
    })
  })

  const postResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
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
              fileAbsolutePath
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
  const postsResult = postResult.data.allMarkdownRemark.edges

  postsResult.forEach(post => {
    const name = post.node.fileAbsolutePath
      .split('/')
      .pop()
      .replace('.md', '')
      .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, '')

    const currentPostTags = post.node.frontmatter.tags

    const flatteredYmlTags = ymlDocTags.groups.reduce((previousValue, currentValue) => {
      if (currentValue.groups) {
        const flatteredGroup = currentValue.groups.reduce((previousValue, currentValue) => {
          if (currentPostTags.includes(currentValue.name)) {
            return [...previousValue, ...currentValue.tags]
          } else {
            return [...previousValue]
          }
        }, [])

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
      path: '/blog/' + (post.node.frontmatter.slug || name),
      component: path.resolve('./src/templates/PostTemplate.tsx'),
      context: {
        slug: post.node.fields.slug,
        fileAbsolutePath: post.node.fileAbsolutePath,
        relatedTags: post.node.frontmatter.tags,
      },
    })
  })

  const preparePage = async (layout, path, template, hasParam) => {
    const result = await graphql(`
      {
        allMarkdownRemark(
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
              fileAbsolutePath
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
    // console.log(result.data.allMarkdownRemark.edges)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const name = node.fileAbsolutePath
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
        component: template,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
          fileAbsolutePath: node.fileAbsolutePath,
        },
      })
    })
  }

  const projectTemplate = require.resolve(`${__dirname}/src/templates/ProjectTemplate.tsx`)
  await preparePage('project', 'projects', projectTemplate)

  const jobTemplate = require.resolve(`${__dirname}/src/templates/JobTemplate.tsx`)
  await preparePage('job', 'jobs', jobTemplate)

  createRedirect({ fromPath: '/jobs/senior-NET-developer', toPath: '/career' })
  createRedirect({ fromPath: '/about-us/values', toPath: '/about-us' })
  createRedirect({ fromPath: '/about-us/story', toPath: '/about-us' })
  createRedirect({ fromPath: '/jobs/rust-developer-1', toPath: '/jobs/rust-developer' })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `slug`,
      value: '/' + node.fileAbsolutePath.split('/').splice(-2).join('/').replace('.md', ''),
    })
  }
}
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
  })
}
