import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Carousel as RCarousel } from 'react-responsive-carousel'
import styled from 'styled-components'

import { ProjectModel } from '../../models/gql'
import CarouselCard from './carousel/CarouselCard'
import Indicator from './carousel/Indicator'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'

const CarouselWrapper = styled.div({
  marginBottom: '105px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  '.carousel': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    maxWidth: '1730px',
    width: '100%'
  }
})

const SliderButton = styled.div({
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 3.5em)',
  display: 'inline-block',
  margin: '0 -1em'
})

const PreviousArrow = (onClickHandler: () => void) => (
  <SliderButton>
    <BackArrowImage onClick={onClickHandler}/>
  </SliderButton>
)

const NextArrow = (onClickHandler: () => void) => (
  <SliderButton>
    <NextArrowImage onClick={onClickHandler}/>
  </SliderButton>
)

export const Carousel = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(GQL)
  const carouselItems: ProjectModel[] = edges
    ? edges.map((e: any) => e.node.frontmatter)
    : []

  return (
    <CarouselWrapper>
      <RCarousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        renderIndicator={Indicator}
        renderArrowPrev={PreviousArrow}
        renderArrowNext={NextArrow}
      >
        {(carouselItems || []).map(item => (
          <div key={item.title}>
            <CarouselCard project={item as ProjectModel}/>
          </div>
        ))}
      </RCarousel>
    </CarouselWrapper>
  )
}

const GQL = graphql`
  {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "project" }, published: { ne: false } }
      }
      limit: 6
      sort: { order: ASC, fields: frontmatter___order }
    ) {
      edges {
        node {
          frontmatter {
            title
            image
            layout
            slug
            published
            description
          }
        }
      }
    }
  }
`
