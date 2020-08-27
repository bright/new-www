import { graphql, useStaticQuery } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"
import React from "react"

const DisqusComments = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          disqusShortname
        }
      }
    }
  `)

  const disqusConfig = {
    identifier: data.site.siteMetadata.disqusShortname,
    url: `${
      data.site.siteMetadata.siteUrl +
      (typeof window !== "undefined" && window.location.pathname)
    }`,
    title: title,
  }

  return <Disqus config={disqusConfig} />
}

export default DisqusComments
