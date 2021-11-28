const path = require("path")
const _ = require('lodash');
const fs = require("fs")
const yaml = require("js-yaml")


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
      component: path.resolve("./src/templates/BlogListTemplate.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  const ymlDocTags = yaml.load(fs.readFileSync("./tag-groups.yml", "utf-8"))
  // const tags = result.data.tagsGroup.group;
  ymlDocTags.groups.forEach(async (tag) => {
    const searchTags = JSON.stringify(tag.tags);
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
        component: path.resolve("./src/templates/BlogListTemplateTags.tsx"),
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

    if(tag.groups) {
      tag.groups.forEach(async (subTag) => {
        const searchTags = JSON.stringify(subTag.tags);
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
            component: path.resolve("./src/templates/BlogListTemplateTags.tsx"),
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


  const preparePage = async (layout, path, template) => {
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
        .split("/")
        .pop()
        .replace(".md", "")
        .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, "")
      // console.log({
      //   path: path + "/" + (node.frontmatter.slug || name),
      //   component: template,
      //   context: {
      //     // additional data can be passed via context
      //     fileAbsolutePath: node.fileAbsolutePath,
      //   },
      // })
      createPage({
        path: path + "/" + (node.frontmatter.slug || name),
        component: template,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
          fileAbsolutePath: node.fileAbsolutePath,
        },
      })
    })
  }


  const projectTemplate = require.resolve(
    `${__dirname}/src/templates/ProjectTemplate.tsx`
  )
  await preparePage("project", "projects", projectTemplate)

  const jobTemplate = require.resolve(
    `${__dirname}/src/templates/JobTemplate.tsx`
  )
  await preparePage("job", "jobs", jobTemplate)

  const postTemplate = require.resolve(
    `${__dirname}/src/templates/PostTemplate.tsx`
  )
  await preparePage("post", "blog", postTemplate)

  const aboutUsTemplate = require.resolve(
    `${__dirname}/src/templates/AboutUsTemplate.tsx`
  )
  await preparePage("member", "about-us", aboutUsTemplate)

  const ourServiceTemplate = require.resolve(
    `${__dirname}/src/templates/OurServiceTemplate.tsx`
  )
  await preparePage("our-service", "our-areas", ourServiceTemplate)
  
  createRedirect({ fromPath: '/jobs/senior-NET-developer', toPath: '/career' })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `slug`,
      value:
        "/" +
        node.fileAbsolutePath
          .split("/")
          .splice(-2)
          .join("/")
          .replace(".md", ""),
    })
  }
}
