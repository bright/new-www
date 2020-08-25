import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import BackArrow from "../../assets/backArrowBlack.svg"
import NextArrow from "../../assets/nextArrowBlack.svg"
import ProjectCard, { ProjectGraphql } from "./ProjectCard"
import { useStaticQuery, graphql } from "gatsby"

const IndicatorActive = styled.li`
  color: black;
  font-size: 4em;
  display: inline-block;
  margin-top: 2em;

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
  top: calc(50% - 15px);
  cursor: pointer;
  display: inline-block;
  margin: 0 -1em;
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
            <div className="column">
              <h1 className="title mt-6 is-size-1">
                let's create software that <span>matters</span>
              </h1>
            </div>
            <div className="column is-hidden-tablet">
              <div className="buttons">
                <a className="button estimate is-primary" href="/start-project">
                  <strong>estimate project</strong>
                </a>
              </div>
            </div>

            <div className="column is-two-fifths is-hidden-mobile">
              <Carousel
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
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeader
