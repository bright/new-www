const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { layout: { eq: "post" } } }
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
    console.log(result.data.allMarkdownRemark.edges)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const name = node.fileAbsolutePath
        .split("/")
        .pop()
        .replace(".md", "")
        .replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})-/, "")
      console.log({
        path: path + "/" + (node.frontmatter.slug || name),
        component: template,
        context: {
          // additional data can be passed via context
          fileAbsolutePath: node.fileAbsolutePath,
        },
      })
      createPage({
        path: path + "/" + (node.frontmatter.slug || name),
        component: template,
        context: {
          // additional data can be passed via context
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
