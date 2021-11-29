import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
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
        const { title, description, our_services_icon } = e.node.frontmatter
        const { slug } = e.node.fields
        const ourServicesItems = { title, description, slug, our_services_icon }
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
                <GatsbyImage image={getImage(service.our_services_icon)!} alt={service.title} />
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
            our_services_icon {
              childImageSharp {
                gatsbyImageData
              }
            }
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
