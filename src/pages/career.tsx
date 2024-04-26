import React from 'react'
import { Page } from '../layout/Page'
import { PageTitle, Section } from '../components/shared'
import WhatWePractice from '../career/_WhatWePractice'
import Description from '../career/_Description'
import Offers from '../career/_Offers'
import OurWork from '../career/_OurWork'
import Benefits from '../career/_Benefits'
import Traits from '../career/_Traits'
import Form from '../career/_Form'
import styled from 'styled-components'
import variables from '../styles/variables'
import CareerFaqs from '../career/CareerFaqs'
import { graphql, useStaticQuery } from 'gatsby'
import { FaqStructuredData } from '../FaqStructuredData'
import { SEO } from '../meta/SEO'

const HeaderImages = React.lazy(() => import('../career/_HeaderImages'))

export const SectionCareerTitle = styled(Section)`
  padding: 3rem 2rem 3rem 2rem;
  @media ${variables.device.laptop} {
    padding: 3rem 2rem 4rem 2rem;
  }
  @media ${variables.device.mobile} {
    padding: 3rem 1.125rem 0rem 1.125rem;
  }
`
const PageTitleCareer = styled(PageTitle)`
  @media ${variables.device.laptop} {
    font-size: 2.75rem;
  }
  @media ${variables.device.tabletXL} {
    font-size: 2.375rem;
  }

  @media ${variables.device.mobile} {
    font-size: 2rem;
    line-height: 2.75rem;
    font-weight: 900;
  }
`

export const Head = () => <SEO
  title='Career'
  description='We like people with bright minds! Join software development company from Gdańsk.'
/>

interface CareerPageProps {
  pageContext: {
    language: string
    slug: string
  }
}
const CareerPage: React.FC<CareerPageProps> = ({ pageContext }) => {
  const data = useStaticQuery(faqsQuery)
  const faqs = data.allMdx.edges.map((edge: any) => edge.node)
  return (
    <Page className='page-career'>
      <div className='container'>
        <SectionCareerTitle className='career-title'>
          <PageTitleCareer>
            we like people with <span>bright</span> minds
          </PageTitleCareer>
        </SectionCareerTitle>
      </div>

      <HeaderImages />

      <Description />
      <Offers />

      <WhatWePractice />
      <OurWork />

      <Traits />
      <Benefits faqSlug={pageContext.slug} />
      <CareerFaqs faqSlug={pageContext.slug} faqs={faqs} />
      <Form />
      <FaqStructuredData faqs={faqs} />
    </Page>
  )
}
const faqsQuery = graphql`
  query {
    allMdx(
      filter: {frontmatter: {show_on_career: {in: true}, layout: {eq: "faqs"}, published: {ne: false}}}
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          frontmatter {
            question
            slug
            answer {
              html
            }
          }
        }
      }
    }
  }
`
export default CareerPage
