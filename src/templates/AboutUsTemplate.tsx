import React from "react"
import { graphql } from "gatsby"

import { Page } from "../layout/Page"
import BackButton from "../components/subcomponents/BackButton"
import { routeLinks } from "../config/routing"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: any) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Page>
      <div className="container">
        <article className="section">
          <div className="level">
            <figure className="level-left image is-256x256">
              <img
                className="is-rounded"
                src={frontmatter.avatar}
                alt={frontmatter.name}
              />
            </figure>
            <div className="section">
              <h1 className="title">{frontmatter.short_name}</h1>
              <p dangerouslySetInnerHTML={{ __html: html }}></p>
            </div>
          </div>
          <BackButton url={`${routeLinks.aboutUs}/team`} label="About us" />
        </article>
      </div>
      {/* 

<script type="application/ld+json">
    {% assign same_as = "" | split: ', ' %}
    {% if page.twitter %}
    {% capture url %}"https://twitter.com/{{ page.twitter }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {% if page.github %}
    {% capture url %}"https://github.com/{{ page.github }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {% if page.stackoverflow %}
    {% capture url %}"https://stackoverflow.com/users/{{ page.stackoverflow }}"{% endcapture %}
    {% assign same_as = same_as | push: url %}
    {% endif %}
    {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": "{{ page.name }}",
        "url": "{{ page.web }}",
        "image": "{{ page.avatar | absolute_url }}",
        "jobTitle": "{{ page.bio }}",
        "sameAs": [
            {{ same_as | join: ',' }}
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Bright Inventions"
        }
    }
</script> */}
    </Page>
  )
}
export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        short_name
        avatar
        slug
        title
        description
      }
    }
  }
`
