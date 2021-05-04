import React from "react"
import { Carousel } from "react-responsive-carousel"
import styled from "styled-components"

import {SectionBlack, SectionTitle} from './index'
import BackArrowWhite from "../../assets/backArrowWhite.svg"
import NextArrowWhite from "../../assets/nextArrowWhite.svg"

const CarouselContainer = styled.div`
  margin-bottom: -4rem;

  .carousel-item {
    padding: 0 1em;
  }
  .control-dots {
    bottom: -3em;
  }
`

const SectionTitleSlim = styled(SectionTitle)`
  margin: 0;
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

const CarouselText = styled.p`
  padding: 0 2em;
`

const Ratings = () => {
  return (
    <SectionBlack>
      <CarouselContainer className="container">
        <SectionTitleSlim>rating 4,9 on Clutch</SectionTitleSlim>
        <Carousel
          className="carousel"
          showStatus={false}
          showThumbs={false}
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
            <CarouselText className="content is-size-4 is-size-7-touch px-6">
              "(...) they delivered results very fast and were always very
              flexible. This is good for a startup, since we have feature
              requests that sometimes come on very short notice."
            </CarouselText>
            <div className="content author has-text-weight-bold">
              CTO, Survey Firm, Berlin
            </div>
          </div>
          <div className="carousel-item has-text-centered">
            <CarouselText className="content is-size-4 is-size-7-touch mb-6">
              "Besides being extremely proficient in their field, they care
              about our business and want us to succeed."
            </CarouselText>
            <div className="content author has-text-weight-bold">
              Founder, Retail Management System, London
            </div>
          </div>
          <div className="carousel-item has-text-centered">
            <CarouselText className="content is-size-4 is-size-7-touch mb-6">
              "They actually care a lot about the design. You had to be almost
              perfect, and that was fine with us."
            </CarouselText>
            <div className="content author has-text-weight-bold ">
              Co-founder, Everytap, Poland
            </div>
          </div>
        </Carousel>
      </CarouselContainer>
    </SectionBlack>
  )
}

export default Ratings
