import React, { PropsWithChildren } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Page } from '../layout/Page'
import BackButton from '../components/subcomponents/BackButton'
import { HelmetTitleDescription } from '../meta/HelmetTitleDescription'
import variables from '../styles/variables'
import { GQLData } from '../models/gql'
import ReactMarkdown from 'react-markdown'
import children = ReactMarkdown.propTypes.children

const Container = styled.div`
  max-width: 960px;

  && .content {
    font-size: ${variables.pxToRem(20)};
    font-weight: 400;
    @media ${variables.device.mobile} {
      font-size: ${variables.pxToRem(16)};
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li,
    .title,
    .subtitle {
      color: ${variables.color.heading};
    }
    h2 {
      font-size: ${variables.pxToRem(40)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(34)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(22)};
      }
    }
    h3 {
      font-size: ${variables.pxToRem(28)};
      @media ${variables.device.laptop} {
        font-size: ${variables.pxToRem(25)};
      }
      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(18)};
      }
    }
    p,
    li {
      font-size: ${variables.pxToRem(20)};
      font-weight: 400;

      @media ${variables.device.mobile} {
        font-size: ${variables.pxToRem(16)};
      }
    }
  }
`

const Title = styled.h1`
  font-size: ${variables.pxToRem(54)};
  color: ${variables.color.heading};
  font-weight: 900;
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(44)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(32)};
    font-weight: 700;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: PropsWithChildren<{data: { mdx: any }}>) {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter } = mdx
  return (
    <Page>
      <HelmetTitleDescription title={frontmatter.title} description={frontmatter.description} />

      <Container className='container'id='project'>
        <article className='section'>
          <Title>{frontmatter.title}</Title>
          <div className='content'>{frontmatter.description}</div>
          <div className='content'>{children}</div>
          <BackButton url='/projects' label='Projects' arrowColor={''} className={''} />
        </article>
      </Container>
    </Page>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        description
      }
    }
  }
`
