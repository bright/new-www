import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Carousel as RCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'
import { ProjectModel } from '../../models/gql'
import variables from '../../styles/variables'
import CarouselCard from './carousel/CarouselCard'
import Indicator from './carousel/Indicator'
import { Section } from './index'

const CarouselWrapper = styled(Section)`
  @media ${variables.device.tablet} {
    padding: 1rem 0rem;
  }

  .carousel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  &.carousel__career {
    .carousel {
      justify-content: space-between;
      @media ${variables.device.mobile} {
        align-items: flex-start;
      }
    }

    .slider-wrapper {
      width: 100%;
    }
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
  margin-right: 7.625rem;

  @media ${variables.device.tablet} {
    margin-right: 1em;
    margin-top: -50%;
  }
  @media ${variables.device.mobile} {
    margin-right: 1em;
    margin-top: calc(40% - 16px);
  }
`
const NextSliderButton = styled(SliderButton)`
  margin-left: 7.625rem;
  @media ${variables.device.tablet} {
    margin-left: 1em;
    margin-top: -50%;
  }
  @media ${variables.device.mobile} {
    margin-left: 1em;
    margin-top: calc(40% - 16px);
  }
`

const PreviousArrow = (onClickHandler: () => void) => (
  <PreviousSliderButton>
    <BackArrowImage onClick={onClickHandler} />
  </PreviousSliderButton>
)

const NextArrow = (onClickHandler: () => void) => (
  <NextSliderButton>
    <NextArrowImage onClick={onClickHandler} />
  </NextSliderButton>
)

type CarouselProps = {
  wrapperClassName?: string
}

export const Carousel: React.FC<CarouselProps> = ({ wrapperClassName }) => {
  const {
    allMdx: { edges },
  } = useStaticQuery(GQL)
  const carouselItems: ProjectModel[] = edges ? edges.map((e: any) => e.node.frontmatter) : []

  return (
    <CarouselWrapper className={wrapperClassName}>
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
    allMdx(
      filter: { frontmatter: { layout: { eq: "project" }, published: { ne: false } } }
      limit: 6
      sort: { order: ASC, fields: frontmatter___order }
    ) {
      edges {
        node {
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData(height: 763)
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
