import React, { ReactElement, ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import styled from 'styled-components'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'
import { Link } from 'gatsby'
import variables from '../../styles/variables'
import 'swiper/css'
import 'swiper/css/pagination'
import { CustomTextTitle, FlexWrapper } from './index.styled'
import { clampBuilder } from '../../helpers/clampBuilder'

const SwiperlWrapper = styled.section`
  position: relative;
  & .swiper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: ${variables.pxToRem(100)};
    @media ${variables.device.tablet} {
      padding-bottom: ${variables.pxToRem(64)};
    }
    & .swiper-pagination {
      display: flex;
      @media ${variables.deviceWidthMin.tablet} {
        gap: 14px;
      }
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
  margin-right: ${variables.pxToRem(0)};
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  @media ${variables.device.tabletXL} {
    margin-right: ${variables.pxToRem(0)};
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
    top: 25%;
    left: 0;
    transform: translateY(-25%);
  }
`
const NextSliderButton = styled(SliderButton)`
  margin-left: ${variables.pxToRem(0)};
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  z-index: 5;
  @media ${variables.device.tabletXL} {
    margin-left: ${variables.pxToRem(0)};
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
    top: 25%;
    right: 0;
    transform: translateY(-25%);
  }
`
const QuoteWrapper = styled.p`
  font-family: lato;
  font-style: italic;
  font-size: ${clampBuilder(992, 1920, 22, 28)};
  line-height: ${clampBuilder(992, 1920, 48, 64)};
  text-align: left;
  color: ${variables.color.black};

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    line-height: ${variables.pxToRem(30)};
  }
`
const WrapperImage = styled.div`
  text-align: center;
  flex-basis: 42%;
  & .quote-img {
    max-height: ${variables.pxToRem(521)};
    & img {
      max-height: ${variables.pxToRem(521)};
    }
  }
  @media ${variables.device.tabletXL} {
    flex-basis: 42%;
    & .quote-img {
      max-height: ${variables.pxToRem(345)};
      & img {
        max-height: ${variables.pxToRem(345)};
      }
    }
  }
  @media ${variables.device.tablet} {
    flex-basis: 100%;
    & .quote-img {
      max-height: ${variables.pxToRem(400)};
      & img {
        max-height: ${variables.pxToRem(400)};
      }
    }
  }
  @media ${variables.device.mobile} {
    & .quote-img {
      max-height: ${variables.pxToRem(300)};
      & img {
        max-height: ${variables.pxToRem(300)};
      }
    }
  }
`
const QuoteCustomSectionInner = styled.div`
  flex-basis: 85%;

  @media ${variables.device.tablet} {
    flex-basis: 100%;
    max-width: 100%;
  }
`
const QuoteTextTitle = styled(CustomTextTitle)`
  font-size: ${clampBuilder(992, 1920, 22, 28)};
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
  }
`
const SlideWrapper = styled.div`
  padding: 0 ${variables.pxToRem(98)};
  @media ${variables.device.tabletXL} {
    padding: 0 ${clampBuilder(992, 1280, 46, 78)};
  }
  @media ${variables.device.tablet} {
    padding: 0;
  }
`

const SingleSlideWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
`

const ArrowWrapper = styled.span`
  background: rgba(255, 255, 255, 0.31);
  border-radius: 2px;
  padding: 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

interface CarouselQuotesSwiperProps {
  quotes: {
    avatar_hover: ReactElement
    short_name: string
    bio?: string
    slug?: string
    quote: string
  }[]
}
export const CarouselQuotesSwiper: React.FC<CarouselQuotesSwiperProps> = ({quotes}) => {
  const ConditionalLink = ({ to, children }: { to?: string, children: ReactNode }) => {
    if (to) {
      return <Link to={to}>{children}</Link>
    }
    return <>{children}</>
  }

  return (
    <SwiperlWrapper>
      <SlideWrapper>
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          pagination={{
            clickable: true,
          }}
          className='quotes-swiper'
          modules={[Navigation, Pagination]}
        >
          {quotes.map(item => {
            const { avatar_hover, short_name, bio, slug, quote } = item
            return (
              <SwiperSlide key={item.short_name}>
                <div>
                  <ConditionalLink to={slug && `/about-us/${slug}`}>
                    <FlexWrapper
                      desktopItems='center'
                      desktopGap='67px'
                      tabletXLGap='0'
                      tabletDirection='column-reverse'
                      tabletGap='44px'
                      desktopContent='space-between'
                    >
                      <QuoteCustomSectionInner>
                        <QuoteTextTitle tabletXLMargin='0 0 51px' mobileMargin='0 0 18px' margin='0 0 56px'>
                          <FlexWrapper
                            desktopGap='5px'
                            tabletContent='center'
                            mobileDirection='column'
                            tabletXLWrap='wrap'
                          >
                            <p>{short_name}{bio ? ',' : ''}</p>
                            <p>{bio}</p>
                          </FlexWrapper>
                        </QuoteTextTitle>

                        <QuoteWrapper>{quote}</QuoteWrapper>
                      </QuoteCustomSectionInner>

                      <WrapperImage>{avatar_hover}</WrapperImage>
                    </FlexWrapper>
                  </ConditionalLink>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </SlideWrapper>
      <SliderButton>
        <FlexWrapper desktopContent='space-between'>
          <PreviousSliderButton className='prev'>
            <FlexWrapper desktopContent=''>
              <ArrowWrapper>
                <BackArrowImage />
              </ArrowWrapper>
            </FlexWrapper>
          </PreviousSliderButton>
          <NextSliderButton className='next'>
            <FlexWrapper desktopContent='flex-end'>
              <ArrowWrapper>
                <NextArrowImage />
              </ArrowWrapper>
            </FlexWrapper>
          </NextSliderButton>
        </FlexWrapper>
      </SliderButton>
    </SwiperlWrapper>
  )
}
