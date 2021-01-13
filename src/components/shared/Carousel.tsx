import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Carousel as RCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'
import { ProjectModel } from '../../models/gql'
import CarouselCard from './carousel/CarouselCard'
import Indicator from './carousel/Indicator'
import { Section } from './index'

const CarouselWrapper = styled(Section)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .carousel {
    display: flex;
    flex-direction: row;
    justify-content: center;

    align-items: center;

    width: 100%;
  }

  .slider-wrapper {
    margin: 0;
    width: 80%;

    @media (max-width: 1400px) {
      width: 70%;
    }

    @media (max-width: 1200px) {
      width: 800px;
    }

    @media (max-width: 950px) {
      width: 600px;
    }
  }
`

const SliderButton = styled.div({
  cursor: 'pointer',
  zIndex: 2,
})

const PreviousArrow = (onClickHandler: () => void) => (
  <SliderButton style={{ marginRight: '4em' }}>
    <BackArrowImage onClick={onClickHandler} />
  </SliderButton>
)

const NextArrow = (onClickHandler: () => void) => (
  <SliderButton>
    <NextArrowImage onClick={onClickHandler} />
  </SliderButton>
)

export const Carousel = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
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
            <CarouselCard project={item} />
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
