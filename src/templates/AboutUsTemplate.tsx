import React, { CSSProperties } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HideDesktop, HideTablet } from '../components/shared'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const gatsbyStyle: CSSProperties = {
  display: 'block !important',
  margin: '0 auto',
  width: '70%',
  maxWidth: '256px'
}

export default function Template({
                                   data // this prop will be injected by the GraphQL query below.
                                 }: any) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const avatarImage = getImage(frontmatter.avatar)!
  return (
    <Page>
      <div className="container">
        <article className="section">
          <div className="level">
            <HideTablet>
              <figure className="level-left image is-256x256">
                <GatsbyImage
                  className="is-rounded"
                  image={avatarImage}
                  alt={frontmatter.name}
                />
              </figure>
            </HideTablet>
            <HideDesktop>
              <figure className="level-left" style={gatsbyStyle}>
                <GatsbyImage
                  imgClassName="is-rounded"
                  image={avatarImage}
                  alt={frontmatter.name}
                />
              </figure>
            </HideDesktop>
            <div className="section">
              <h1 className="title">{frontmatter.short_name}</h1>
              <p dangerouslySetInnerHTML={{ __html: html }}></p>
            </div>
          </div>
          <BackButton url={`${routeLinks.aboutUs}/team`} label="About us"/>
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
        avatar {
            childImageSharp {
                gatsbyImageData
            }
        }
        slug
        title
        description
        name  
      }
    }
  }
`
