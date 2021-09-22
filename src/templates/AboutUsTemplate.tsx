import React, { CSSProperties, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { routeLinks } from '../config/routing'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import { HideDesktop, HideTablet, MoreButton } from '../components/shared'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BlogFeed } from './blog/Feed'
import { createBlogPosts } from '../models/creator'
import {
  CustomContainer,
  CustomSection,
  CustomSectionTitle,
  PageTitle,
  SectionInner,
} from '../components/shared/index.styled'
import variables from '../styles/variables'
import BlogListTemplate from './BlogListTemplate'

const gatsbyStyle: CSSProperties = {
  display: 'block !important',
  margin: '0 auto',
  width: '70%',
  maxWidth: '428px',
}
const AuthorSection = styled(CustomSection)`
  padding-top: 1rem;
`
const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .content {
    padding-bottom: 2rem;
    color: #131214;
    opacity: 0.75;
    font-size: ${variables.font.customtext.size};
    line-height: 2.5rem;
  }
`

const ImageWrapper = styled.figure`
  width: 100%;
  max-width: 428px;
`
const AuthorPageTitle = styled(PageTitle)`
  margin-bottom: 0.75rem;
  margin-top: 3.375rem;
  color: #000;
`
const Subtitle = styled.div`
  margin-bottom: 5rem;
  text-align: center;
  font-family: ${variables.font.customtext.lato};
  font-size: ${variables.font.customtext.sizeAuthor};
  font-weight: 700;
  color: #000;
`
const AuthorBackButton = styled(BackButton)`
  display: block;
  margin: 0 auto;
  margin-top: 9.5625rem;
  margin-bottom: 7.625rem;
  display: flex;
  align-items: center;
  font-weight: 900;
  color: #000;
  & > span {
    margin-left: 1.125rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
  }
`
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: any) {
  console.log(data)
  const { markdownRemark, allMarkdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { edges } = allMarkdownRemark
  const avatarImage = getImage(frontmatter.avatar)!

  const [showAll, setShowAll] = useState(false)
  const [numToSliced, setNumToSliced] = useState(6)

  return (
    <Page>
      <HelmetTitleDescription title={`Meet ${frontmatter.short_name}`} description={frontmatter.bio} />
      <AuthorSection>
        <CustomContainer>
          <AuthorWrapper>
            <HideTablet>
              <ImageWrapper>
                <GatsbyImage className='is-rounded' image={avatarImage} alt={frontmatter.name} />
              </ImageWrapper>
            </HideTablet>
            <HideDesktop>
              <figure className='level-left' style={gatsbyStyle}>
                <GatsbyImage imgClassName='is-rounded' image={avatarImage} alt={frontmatter.name} />
              </figure>
            </HideDesktop>
            <SectionInner>
              <AuthorPageTitle>{frontmatter.short_name}</AuthorPageTitle>
              <Subtitle>{frontmatter.bio}</Subtitle>
              <div className='content' dangerouslySetInnerHTML={{ __html: html }} />
            </SectionInner>
          </AuthorWrapper>
          {edges.length > 0 && <CustomSectionTitle>blog posts by {frontmatter.short_name} </CustomSectionTitle>}
          <BlogFeed posts={createBlogPosts(data)} numToSliced={numToSliced} />
          {(() => {
            if (edges.length > 6 && numToSliced > 6) {
              return <MoreButton onClick={() => setNumToSliced(6)}>show less posts</MoreButton>
            } else if (edges.length > 6) {
              return <MoreButton onClick={() => setNumToSliced(12)}>more blog posts</MoreButton>
            }
          })()}
          <AuthorBackButton url={routeLinks.aboutUs({ page: 'team' })} label='back to team' arrowColor={'orange'} />
        </CustomContainer>
      </AuthorSection>
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
  query($fileAbsolutePath: String!, $slug: String) {
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
        bio
        name
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "post" }, published: { ne: false }, hidden: { ne: true }, author: { eq: $slug } }
      }
      limit: 12
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          excerpt(pruneLength: 500)
          frontmatter {
            excerpt
            comments
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            author
            author_id
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
`
