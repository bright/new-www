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
        const { name, short_description, our_services_icon } = e.node.frontmatter
        const { slug } = e.node.fields
        const ourServicesItems = { name, short_description, slug, our_services_icon }
        return ourServicesItems
      })
    : []

  return (
    <DevelopmentAreasWrapper>
      <DevelopmentAreasContainer>
        {ourServicesItems.map(service => (
          <DevelopmentAreaContainer key={service.title}>
            <RevertHoverLink to={service.slug}>
              <SectionTitleContainer>
                <GatsbyImage
                  image={getImage(service.our_services_icon)!}
                  alt={service.title}
                  className='about-img'
                  imgClassName='image'
                  backgroundColor='#fff'
                />
                <Title>{service.name}</Title>
              </SectionTitleContainer>
              <ReactMarkdown children={service.short_description} />
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
            short_description
            name
            our_services_icon {
              childImageSharp {
                gatsbyImageData(height: 100, placeholder: TRACED_SVG)
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
