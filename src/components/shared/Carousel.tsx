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

  @media (max-width: 767px) {
    padding: 1rem 0rem;
  }

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

    @media (max-width: 767px) {
      width: 250px;
    }
  }
`

const SliderButton = styled.div`
  cursor: pointer;
  z-index: 2;

  @media (max-width: 767px) {
    svg {
      width: 10px;
    }
  }
`

const PreviousSliderButton = styled(SliderButton)`
  margin-right: 4em;

  @media (max-width: 767px) {
    margin-right: 1em;
  }
`

const PreviousArrow = (onClickHandler: () => void) => (
  <PreviousSliderButton>
    <BackArrowImage onClick={onClickHandler} />
  </PreviousSliderButton>
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
            image {
                childImageSharp {
                    gatsbyImageData
                }
            }
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
