import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import BackArrow from "../../assets/backArrowBlack.svg"
import NextArrow from "../../assets/nextArrowBlack.svg"
import ProjectCard, { ProjectGraphql } from "./ProjectCard"

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledCarousel = styled(Carousel)`
  /* height: 500px; */
  width: 400px;
`

const IndicatorActive = styled.li`
  color: black;
  font-size: 4em;
  display: inline-block;
  margin-top: 2em;
  position: relative;
  left: -0.125em;
  &.white {
    color: white;
  }
`

const IndicatorInactive = styled(IndicatorActive)`
  cursor: pointer;
  opacity: 0.42;
`

const Arrow = styled.div`
  position: absolute;
  z-index: 2;
  top: calc(50% - 3.5em);
  cursor: pointer;
  display: inline-block;
  margin: 0 -1em;
`

const HomeTitle = styled.h1`
  margin-top: 1.1em;
  margin-bottom: 1em;
  font-size: 100px;
  line-height: 100px;
`

const HomeTitleMobile = styled(HomeTitle)`
  margin-top: 0;
  font-size: 55px;
  line-height: 55px;
`

const HomeHeader = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
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
            }
          }
        }
      }
    }
  `)

  return (
    <section className="hero we-deliver">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-hidden-mobile">
              <HomeTitle className="title mt-6">
                let's create software that <span>matters</span>
              </HomeTitle>
            </div>
            <div className="column is-hidden-tablet">
              <HomeTitleMobile className="title mt-6">
                let's create software that <span>matters</span>
              </HomeTitleMobile>
            </div>
            <div className="column is-hidden-tablet">
              Through mobile apps and complex backend systems to emerging
              technology solutions we are creating success stories for startups,
              consultancy agencies as well as mid-size organisations
            </div>
            <div className="column is-hidden-tablet">
              <div className="buttons">
                <a className="button estimate is-primary" href="/start-project">
                  <strong>let's talk</strong>
                </a>
              </div>
            </div>

            <CarouselContainer className="column is-two-fifths is-hidden-mobile has-text-centered">
              <StyledCarousel
                showStatus={false}
                showThumbs={false}
                infiniteLoop
                renderIndicator={(onClickHandler, isSelected) => {
                  if (isSelected) {
                    return <IndicatorActive>&#x2022;</IndicatorActive>
                  }
                  return (
                    <IndicatorInactive onClick={onClickHandler}>
                      &#x2022;
                    </IndicatorInactive>
                  )
                }}
                renderArrowPrev={onClickHandler => (
                  <Arrow style={{ left: 15 }}>
                    <BackArrow onClick={onClickHandler} />
                  </Arrow>
                )}
                renderArrowNext={onClickHandler => (
                  <Arrow style={{ right: 15 }}>
                    <NextArrow onClick={onClickHandler} />
                  </Arrow>
                )}
              >
                {edges.map((v, index) => (
                  <div
                    // className="column is-one-third"
                    key={index + "project"}
                  >
                    <ProjectCard
                      project={v.node.frontmatter as ProjectGraphql}
                    />
                  </div>
                ))}
              </StyledCarousel>
            </CarouselContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeader
