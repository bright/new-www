import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import CustomSoftwareDevelopment from '../../../assets/customSoftwareDevelopment.svg'

import { ServiceModel } from '../../../models/gql'
import ReactMarkdown from 'react-markdown'

import {
  DevelopmentAreasWrapper,
  DevelopmentAreasContainer,
  DevelopmentAreaContainer,
  SectionTitleContainer,
  Title,
  RevertHoverLink,
} from './styles'

const OurDevelopmentAreas = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const ourServicesItems: ServiceModel[] = edges
    ? edges.map((e: any) => {
        const { title, description } = e.node.frontmatter
        const { slug } = e.node.fields
        const ourServicesItems = { title, description, slug }
        return ourServicesItems
      })
    : []

  return (
    <DevelopmentAreasWrapper>
      <DevelopmentAreasContainer>
        {ourServicesItems.map(service => (
          <DevelopmentAreaContainer key={service.title}>
            <RevertHoverLink to={service.slug}>
              <SectionTitleContainer iconMobileWidth={'81px'} iconMobileHeight={'81px'}>
                <CustomSoftwareDevelopment />
                <Title>{service.title}</Title>
              </SectionTitleContainer>
              <ReactMarkdown children={service.description} />
            </RevertHoverLink>
          </DevelopmentAreaContainer>
        ))}
      </DevelopmentAreasContainer>
    </DevelopmentAreasWrapper>
  )
}

const GQL = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { layout: { eq: "our-service" } } }) {
      edges {
        node {
          frontmatter {
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default OurDevelopmentAreas
