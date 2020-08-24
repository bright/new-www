import { graphql } from "gatsby"
import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import styled from "styled-components"
import BackArrow from "../assets/backArrowBlack.svg"
import BackArrowWhite from "../assets/backArrowWhite.svg"
import NextArrow from "../assets/nextArrowBlack.svg"
import NextArrowWhite from "../assets/nextArrowWhite.svg"
import ClutchInfo from "../components/home/ClutchInfo"
import Cocoaheads from "../components/home/Cocoaheads"
import ContactForm from "../components/home/ContactForm"
import ImageSpacer from "../components/home/ImageSpacer"
import OurServices from "../components/home/OurServices"
import PopularBlogPosts from "../components/home/PopularBlogPosts"
import ProductIdea from "../components/home/ProductIdea"
import SuccessStories from "../components/home/SuccessStories"
import Layout from "../components/layout"
import ProjectCard, {
  ProjectGraphql,
} from "../components/subcomponents/ProjectCard"
import { SocialIconsSpaced } from "../components/subcomponents/SocialIconsSpaced"
import "../styles/_page-index.scss"

const CarouselContainer = styled.div`
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 480px) {
    padding: 3em 1em 0;
  }
  .carousel-item {
    padding: 0 1em;
  }
`
const CarouselTitle = styled.h1`
  font-family: titling-gothic-fb, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  @media (max-width: 480px) {
    font-size: 24px;
    padding: 2em 1em 0;
  }
`

const CarouselBlack = styled(Carousel)`
  background: black;
  .control-dots {
    bottom: -3em;
  }
`

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
  /* width: 30px !important;
  height: 30px !important; */
  cursor: pointer;
  display: inline-block;

  /* padding: 0em 1em 0; */
  margin: 0 -1em;
`

const ArrowWhite = styled(Arrow)`
  top: calc(50% - 30px);
`

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <Layout className="page-index">
      <section className="hero we-deliver">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title mt-6">
                  let's create software that <span>matters</span>
                </h1>
              </div>
              <div className="column is-hidden-desktop">
                <div className="buttons">
                  <a
                    className="button estimate is-primary"
                    href="/start-project"
                  >
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
      <SocialIconsSpaced />
      <OurServices />
      <ImageSpacer />
      <SuccessStories />
      <CarouselContainer>
        <CarouselTitle>rating 4,9 on Clutch</CarouselTitle>
        <CarouselBlack
          className="carousel"
          showStatus={false}
          infiniteLoop
          renderIndicator={(onClickHandler, isSelected) => {
            if (isSelected) {
              return (
                <IndicatorActive className="white">&#x2022;</IndicatorActive>
              )
            }
            return (
              <IndicatorInactive className="white" onClick={onClickHandler}>
                &#x2022;
              </IndicatorInactive>
            )
          }}
          renderArrowPrev={onClickHandler => (
            <ArrowWhite style={{ left: 15 }}>
              <BackArrowWhite onClick={onClickHandler} />
            </ArrowWhite>
          )}
          renderArrowNext={onClickHandler => (
            <ArrowWhite style={{ right: 15 }}>
              <NextArrowWhite onClick={onClickHandler} />
            </ArrowWhite>
          )}
        >
          <div className="carousel-item has-text-centered">
            <p className="content is-size-4 is-size-7-touch">
              "(...) they delivered results very fast and were always very
              flexible. This is good for a startup, since we have feature
              requests that sometimes come on very short notice."
            </p>
            <div className="content author has-text-weight-bold">
              CTO, Survey Firm, Berlin
            </div>
          </div>
          <div className="carousel-item has-text-centered">
            <p className="content is-size-4 is-size-7-touch mb-6">
              "Besides being extremely proficient in their field, they care
              about our business and want us to succeed."
            </p>
            <div className="content author has-text-weight-bold">
              Founder, Retail Management System, London
            </div>
          </div>
          <div className="carousel-item has-text-centered">
            <p className="content is-size-4 is-size-7-touch mb-6">
              "They actually care a lot about the design. You had to be almost
              perfect, and that was fine with us."
            </p>
            <div className="content author has-text-weight-bold ">
              Co-founder, Everytap, Poland
            </div>
          </div>
        </CarouselBlack>
      </CarouselContainer>
      <ClutchInfo />
      <ProductIdea />
      <PopularBlogPosts />
      <Cocoaheads />
      <ContactForm />
    </Layout>
  )
}

export const pageQuery = graphql`
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
`

export default IndexPage
