import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import variables from '../styles/variables'

const Container = styled.div`
  max-width: 960px;

  && .content {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .title,
    .subtitle {
      color: ${variables.color.heading};
    }
  }
  && .title {
    color: ${variables.color.heading};
  }
`

const Title = styled.h1`
  font-size: 3rem;
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Page>
      <HelmetTitleDescription title={frontmatter.title} description={frontmatter.description} />

      <Container className='container'>
        <article className='section'>
          <Title className='title'>{frontmatter.title}</Title>
          <div className='content'>{frontmatter.description}</div>
          <div className='content' dangerouslySetInnerHTML={{ __html: html }} />
          <BackButton url='/projects' label='Projects' arrowColor={''} className={''} />
        </article>
      </Container>
    </Page>
  )
}
export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        slug
        title
        description
      }
    }
  }
`
