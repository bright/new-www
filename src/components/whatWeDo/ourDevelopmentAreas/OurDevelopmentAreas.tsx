import { graphql, useStaticQuery } from 'gatsby'
import React, { useRef } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ServiceModel } from '../../../models/gql'
import ReactMarkdown from 'react-markdown'
import { routeLinks } from '../../../config/routing'

import {
  DevelopmentAreasWrapper,
  DevelopmentAreasContainer,
  DevelopmentAreaContainer,
  SectionTitleContainer,
  Title,
  RevertHoverLink,
  OnScreenSection,
} from './styles'
import { CustomSection } from '../../shared'
import useOnScreen from '../../utils/use-onscreen'

const OurDevelopmentAreas = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const ourServicesItems: ServiceModel[] = edges
    ? edges.map((e: any) => {
        const { name, short_description, our_services_icon, slug } = e.node.frontmatter
        const ourServicesItems = { name, short_description, slug, our_services_icon }
        return ourServicesItems
      })
    : []
  const ref: any = useRef<HTMLDivElement>()
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '400px')

  return (
    <DevelopmentAreasWrapper ref={ref}>
      <CustomSection paddingProps='0 15rem'>
        <DevelopmentAreasContainer>
          {onScreen ? (
            ourServicesItems.map(service => (
              <DevelopmentAreaContainer key={service.name}>
                <RevertHoverLink to={routeLinks.ourAreas({ service: service.slug, faqTitle: '' })}>
                  <SectionTitleContainer>
                    <GatsbyImage
                      image={getImage(service.our_services_icon)!}
                      alt={service.name}
                      style={{ maxHeight: 100 }}
                      imgStyle={{ objectFit: 'contain' }}
                      className='about-img'
                      imgClassName='image'
                      backgroundColor='#fff'
                    />
                    <Title>{service.name}</Title>
                  </SectionTitleContainer>
                  <ReactMarkdown children={service.short_description} />
                </RevertHoverLink>
              </DevelopmentAreaContainer>
            ))
          ) : (
            <OnScreenSection></OnScreenSection>
          )}
        </DevelopmentAreasContainer>
      </CustomSection>
    </DevelopmentAreasWrapper>
  )
}

const GQL = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "our-service" } } }
      sort: { order: ASC, fields: frontmatter___order }
    ) {
      edges {
        node {
          frontmatter {
            short_description
            name
            slug
            our_services_icon {
              childImageSharp {
                gatsbyImageData(placeholder: NONE)
              }
            }
          }
        }
      }
    }
  }
`

export default OurDevelopmentAreas
