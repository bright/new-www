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

const Indicator = styled.li<{ selected?: boolean }>({
  color: variables.black,
  fontSize: "28px",
  display: "inline-block",
  marginTop: "20px",
  position: "relative",
})

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

const ShowcaseCarousel = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(GQL)
  const carouselItems: ProjectModel[] = edges
    ? edges.map((e: any) => e.node.frontmatter)
    : []

  const indicator = (onClickHandler: any, isSelected: boolean) => {
    return (
      <Indicator selected={isSelected} onClick={!isSelected && onClickHandler}>
        &#x2022;
      </Indicator>
    )
  }

  const arrowPrev = (onClickHandler: any) => (
    <div>
      <BackArrow onClick={onClickHandler} />
    </div>
  )

  const arrowNext = (onClickHandler: any) => (
    <div>
      <NextArrow onClick={onClickHandler} />
    </div>
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
