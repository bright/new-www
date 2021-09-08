import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'

import { SectionBlack, SectionTitle } from './index'
import BackArrowWhite from '../../assets/backArrowWhite.svg'
import NextArrowWhite from '../../assets/nextArrowWhite.svg'
import variables from '../../styles/variables'

const CarouselContainer = styled.div`
  /* margin-bottom: -4rem; */
  padding: 0;
  .carousel {
    max-width: 1650px;
    margin: 0 auto;
    .control-dots {
      bottom: 15%;
      margin: 0;
    }
    .carousel-slider {
      display: flex;
      margin: 0 auto;
    }
    .slider-wrapper {
      max-width: 956px;
    }
  }
  .carousel-item {
    padding: 0;
    font-family: 'Lato', sans-serif;
    text-align: left;
    & > p {
      width: 90%;
      max-width: 956px;
      padding: 0;
      margin: 0 auto;
      font-size: 1.75rem;
      opacity: 0.74;
      line-height: 2.125rem;
    }
    & .author {
      margin: 6.5625rem 0 8.5rem;
      font-size: 1.375rem;
      line-height: 1.69rem;
      opacity: 0.74;
      text-align: center;
    }
  }
  @media ${variables.device.mobile} {
    padding: 0 0.625rem;
    .carousel-item {
      padding: 0 2.125rem;
      & > p {
        font-size: 1rem;
        text-align: center;
      }
      & .author {
        margin: 1.875rem 0 8.25rem;
        font-size: ${variables.font.customtext.size};
      }
    }
  }
`

const SectionTitleSlim = styled(SectionTitle)`
  margin-top: 4.56rem;
  margin-bottom: 3.44rem;
  font-size: ${variables.font.customtitle.size};
  line-height: 3rem;
  @media ${variables.device.mobile} {
    margin-bottom: 1.875rem;
    margin-top: 2rem;
    font-size: ${variables.font.customtext.size};
  }
`

const IndicatorActive = styled.li`
  color: black;
  font-size: 32px;
  display: inline-block;
  /* margin-top: 2em; */
  position: relative;
  padding-right: 0.875rem;
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
  cursor: pointer;
  /* margin: auto 0; */
  z-index: 2;
`

const ArrowWhite = styled(Arrow)`
  position: absolute;
  top: calc(14% - 12px);
  left: 0;
  &:last-of-type {
    right: 0;
    left: unset;
  }
  & svg {
    height: 24px;
    width: 12px;
  }
`

const CarouselText = styled.p`
  padding: 0;
  margin: 0;
  margin-top: 0;
`

const Ratings = () => {
  return (
    <SectionBlack>
      <CarouselContainer>
        <SectionTitleSlim>rating 4,9 on Clutch</SectionTitleSlim>
        <Carousel
          className='carousel'
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          renderIndicator={(onClickHandler, isSelected) => {
            if (isSelected) {
              return <IndicatorActive className='white'>&#x2022;</IndicatorActive>
            }
            return (
              <IndicatorInactive className='white' onClick={onClickHandler}>
                &#x2022;
              </IndicatorInactive>
            )
          }}
          renderArrowPrev={onClickHandler => (
            <ArrowWhite>
              <BackArrowWhite onClick={onClickHandler} />
            </ArrowWhite>
          )}
          renderArrowNext={onClickHandler => (
            <ArrowWhite>
              <NextArrowWhite onClick={onClickHandler} />
            </ArrowWhite>
          )}
        >
          <div className='carousel-item '>
            <CarouselText>
              "(...) they delivered results very fast and were always very flexible. This is good for a startup, since
              we have feature requests that sometimes come on very short notice."
            </CarouselText>
            <div className='author'>CTO, Survey Firm, Berlin</div>
          </div>
          <div className='carousel-item'>
            <CarouselText>
              "Besides being extremely proficient in their field, they care about our business and want us to succeed."
            </CarouselText>
            <div className=' author'>Founder, Retail Management System, London</div>
          </div>
          <div className='carousel-item '>
            <CarouselText>
              "They actually care a lot about the design. You had to be almost perfect, and that was fine with us."
            </CarouselText>
            <div className='author'>Co-founder, Everytap, Poland</div>
          </div>
        </Carousel>
      </CarouselContainer>
    </SectionBlack>
  )
}

export default Ratings
