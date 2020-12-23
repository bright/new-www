import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import BackArrowImage from "../../../../assets/backArrowBlack.svg"
import NextArrowImage from "../../../../assets/nextArrowBlack.svg"
import { ProjectModel } from "../../../../models/gql"
import CarouselCard from "./CarouselCard"
import Indicator from "./Indicator"

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
    width: "100%",
  },
})

const SliderButton = styled.div({
  cursor: "pointer",
})

const PreviousArrow = (onClickHandler: () => void) => (
  <SliderButton>
    <BackArrowImage onClick={onClickHandler} />
  </SliderButton>
)

const NextArrow = (onClickHandler: () => void) => (
  <SliderButton>
    <NextArrowImage onClick={onClickHandler} />
  </SliderButton>
)

const ShowcaseCarousel = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const carouselItems: ProjectModel[] = edges
    ? edges.map((e: any) => e.node.frontmatter)
    : []

  return (
    <CarouselWrapper>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        renderIndicator={Indicator}
        renderArrowPrev={PreviousArrow}
        renderArrowNext={NextArrow}
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
