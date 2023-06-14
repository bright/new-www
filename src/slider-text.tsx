import React from 'react';
import { FlexWrapper, TextRegular } from './components/shared';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import styled from 'styled-components';
import variables from './styles/variables';
import BackArrowImage from './assets/backArrowBlack.svg'
import NextArrowImage from './assets/nextArrowBlack.svg'
import { clampBuilder } from './helpers/clampBuilder';

const SliderSection = styled.section`
    position: relative;
    & .swiper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: ${variables.pxToRem(116)};
    @media ${variables.device.tablet} {
      padding-bottom: ${variables.pxToRem(64)};
    }
    & .swiper-pagination {
      display: flex;
      gap: 14px;
      justify-content: center;
      bottom: 0;
      height: 30px;
      & .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: ${variables.color.text};
        opacity: 0.42;
      }
      & .swiper-pagination-bullet-active {
        background: ${variables.color.text};
        opacity: 1;
      }
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
  margin-right: ${variables.pxToRem(90)};
  position: absolute;
  top: 65px;
  left:-319px;
  width: 50px;
  height: 50px;
  @media ${variables.device.laptop} {
    left:-220px;
  }
  @media ${variables.device.tabletXL} {
    margin-right: ${variables.pxToRem(58)};
    left:-67.5px;
    & svg {
      width: 7.75px;
      height: 15.5px;
    }
  }

  @media ${variables.device.tablet} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    
  }
  @media ${variables.device.mobile} {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`
const NextSliderButton = styled(SliderButton)`
  margin-left: ${variables.pxToRem(90)};
  position: absolute;
  top: 65px;
  right: -319px;
  width: 50px;
  height: 50px;
  z-index: 5;
  @media ${variables.device.laptop} {
    right:-220px;
  }
  @media ${variables.device.tabletXL} {
    margin-left: ${variables.pxToRem(58)};
    right:-67.5px;
    & svg {
      width: 7.75px;
      height: 15.5px;
    }
  }
  @media ${variables.device.tablet} {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
  }
  @media ${variables.device.mobile} {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`
const TitleProject = styled.div`
    font-size: ${variables.pxToRem(25)};
    line-height:${variables.pxToRem(40)};
    font-weight: 800;
    font-family:${variables.font.montserrat};
    text-align: center;
    margin: 0 0 ${variables.pxToRem(65)};
    color:${variables.color.text2};
    @media ${variables.device.tablet} {
      margin: 0 0 ${variables.pxToRem(56)};
    }
    @media ${variables.device.mobile} {
      margin: 0 0 ${variables.pxToRem(30)};
      font-size: ${variables.pxToRem(18)};
      line-height:${variables.pxToRem(22)};
    }
    
`
const SlideWrapper = styled.div`
  @media ${variables.device.tablet} {
      max-width:${variables.pxToRem(600)};
      margin: 0 auto;
    }
     @media ${variables.device.mobile} {
      max-width:${clampBuilder(360, 581, 250, 300)};
      
    }

`
interface Slider {
  title: string;
  description: string;
}
export interface SliderTextProps {
  sliderElements: Slider[];
}

export const SliderText = ({ sliderElements }: SliderTextProps) => {
  let parsedsliderElements: Slider[];

  if (typeof sliderElements === 'string') {
    parsedsliderElements = JSON.parse(sliderElements);
  } else if (Array.isArray(sliderElements)) {
    parsedsliderElements = sliderElements;
  } else {
    console.error('Images is neither an array nor a string:', sliderElements);
    return null; // or render some error state
  }

  return (
    <SliderSection >
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        pagination={{
          clickable: true,
        }}
        className='project-swiper'
        modules={[Navigation, Pagination]}
      >
        {parsedsliderElements.map((sliderElement, index) => {
          const title = sliderElement.title
          const newTitle = title.charAt(0).toUpperCase() + title.slice(1)

          return (
            < SwiperSlide key={index} >
              <SlideWrapper>

                <TitleProject>{index + 1}. <span>{newTitle}</span></TitleProject>
                <TextRegular>{sliderElement.description}</TextRegular>
              </SlideWrapper>
            </SwiperSlide>
          )
        })}
      </Swiper >
      <SliderButton>
        <FlexWrapper desktopContent='space-between'>
          <PreviousSliderButton className='prev'>
            <FlexWrapper desktopContent=''>
              <span>
                <BackArrowImage />
              </span>
            </FlexWrapper>
          </PreviousSliderButton>
          <NextSliderButton className='next'>
            <FlexWrapper desktopContent='flex-end'>
              <span>
                <NextArrowImage />
              </span>
            </FlexWrapper>
          </NextSliderButton>
        </FlexWrapper>
      </SliderButton>
    </SliderSection>
  )
}


