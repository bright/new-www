import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import BackArrow from "../../../assets/backArrowBlack.svg"
import NextArrow from "../../../assets/nextArrowBlack.svg"
import { ProjectModel } from "../../../models/gql"
import variables from "../../../styles/variables"
import CarouselCard from "./CarouselCard"

const Indicator = styled.li({
  color: variables.black,
  fontSize: "28px",
  display: "inline-block",

  marginLeft: "7px",
  marginRight: "7px",
})

const IndicatorSymbol = styled.div<{ selected: boolean }>(({ selected }) => ({
  backgroundColor: variables.blackBannerBackground,
  opacity: selected ? 1 : 0.42,
  width: "8px",
  height: "8px",
  border: `1px solid ${variables.blackBannerBackground}`,
  borderRadius: "50%",
}))

const CarouselWrapper = styled.div({
  marginBottom: "105px",

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",

  ".carousel": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    maxWidth: "1730px",
  },
})

const SliderButton = styled.div({
  cursor: "pointer",
})

const ShowcaseCarousel = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const carouselItems: ProjectModel[] = edges
    ? edges.map((e: any) => e.node.frontmatter)
    : []

  const indicator = (onClickHandler: any, isSelected: boolean) => {
    return (
      <Indicator onClick={!isSelected && onClickHandler}>
        <IndicatorSymbol selected={isSelected} />
      </Indicator>
    )
  }

  const arrowPrev = (onClickHandler: any) => (
    <SliderButton>
      <BackArrow onClick={onClickHandler} />
    </SliderButton>
  )

  const arrowNext = (onClickHandler: any) => (
    <SliderButton>
      <NextArrow onClick={onClickHandler} />
    </SliderButton>
  )

  return (
    <CarouselWrapper>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        renderIndicator={indicator}
        renderArrowPrev={arrowPrev}
        renderArrowNext={arrowNext}
      >
        {(carouselItems || []).map(item => (
          <div key={item.title}>
            <CarouselCard project={item as ProjectModel} />
          </div>
        ))}
      </Carousel>
    </CarouselWrapper>
  )
}

export default ShowcaseCarousel

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
