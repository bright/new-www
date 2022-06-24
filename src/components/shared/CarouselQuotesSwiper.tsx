import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import styled from 'styled-components'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'
import { Link } from 'gatsby'
import variables from '../../styles/variables'
import 'swiper/css'
import 'swiper/css/pagination'
import { StaticImage } from 'gatsby-plugin-image'
import { CustomSection, CustomTextTitle, FlexWrapper } from './index.styled'
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
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  @media ${variables.device.tabletXL} {
    margin-right: ${variables.pxToRem(58)};
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
  margin-left: ${variables.pxToRem(90)};
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  z-index: 5;
  @media ${variables.device.tabletXL} {
    margin-left: ${variables.pxToRem(58)};
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
  flex-basis: 30%;
  & .quote-img {
    & img {
      max-height: ${variables.pxToRem(521)};
      width: auto;
    }
  }
  @media ${variables.device.tabletXL} {
    flex-basis: 30%;
    & .quote-img {
      & img {
        max-height: ${variables.pxToRem(345)};
        width: auto;
      }
    }
  }
  @media ${variables.device.tablet} {
    flex-basis: 100%;
    & .quote-img {
      & img {
        max-height: ${variables.pxToRem(400)};
        width: auto;
      }
    }
  }
  @media ${variables.device.mobile} {
    & .quote-img {
      & img {
        max-height: ${variables.pxToRem(300)};
        width: auto;
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

export const CarouselQuotesSwiper: React.FC = () => {
  const quotes = [
    {
      avatar_hover: <StaticImage src='../../../static/images/filip2_passion.png' alt='Filip' className='quote-img' />,
      short_name: 'Filip',
      bio: 'Senior iOS Developer',
      slug: 'filip',
      quote:
        'I love that we are partners to our clients and bring something more to the table than lines of code. We get to work on the solution, and business expectations, and we can choose technologies and frameworks. Here you really influence your project.',
    },
    {
      avatar_hover: <StaticImage src='../../../static/images/ola_passion_team.png' alt='Ola' className='quote-img' />,
      short_name: 'Aleksandra',
      bio: 'Fullstack Developer',
      slug: 'aleksandra-z',
      quote:
        'Despite being forced by the covid-19 to work remotely, I was still able to code for my dream company with Bright people. When I log in to work in the morning, I feel like I am coming to the office. Even though I live at the other end of Poland.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../../static/images/piotr_rutka_passions.png' alt='Piotr' className='quote-img' />
      ),
      short_name: 'Piotr',
      bio: 'Senior Android Developer',
      slug: 'piotr-r',
      quote:
        'I have learned one simple super-important thing here – my work will be full of joy if it has true meaning to someone. The more your work matters, the more responsible you are. It speeds up your self-improvement a lot.',
    },
    {
      avatar_hover: <StaticImage src='../../../static/images/kasia_l.png' alt='Kasia class' className='quote-img' />,
      short_name: 'Kasia',
      bio: 'Senior Project Manager',
      slug: 'kasia',
      quote:
        'I love working with people at Bright. We create a group of people who not only want to do their tasks well but also bring added value with their great work every day.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../../static/images/krzysiekh_passion.png' alt='Krzysiek' className='quote-img' />
      ),
      short_name: 'Krzysiek',
      bio: 'Web Developer',
      slug: 'krzysiek-h',
      quote:
        'I like Bright Inventions culture of work. Especially, the flat structure of the company, lots of team retreats, after-work activities, and a team that does not act like some griper robots.',
    },
    {
      avatar_hover: (
        <StaticImage src='../../../static/images/agata_passion_small.png' alt='Agata' className='quote-img' />
      ),
      short_name: 'Agata',
      bio: 'Social Media Specialist',
      slug: 'agata',
      quote:
        'For me, diving into an IT branch meant getting out of my comfort zone. Bright Inventions made the dive really pleasant, because they (we!) respect and accept the person just the way he/she is. Like in a big, loving, modern family. ;)',
    },
  ]
  return (
    <SwiperlWrapper>
      <SlideWrapper>
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
          className='quotes-swiper'
          modules={[Navigation, Pagination]}
        >
          {quotes.map(item => {
            const { avatar_hover, short_name, bio, slug, quote } = item
            return (
              <SwiperSlide>
                <div key={item.short_name}>
                  <Link to={`/about-us/${slug}`}>
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
                            <p>{short_name},</p>
                            <p>{bio}</p>
                          </FlexWrapper>
                        </QuoteTextTitle>

                        <QuoteWrapper>{quote}</QuoteWrapper>
                      </QuoteCustomSectionInner>

                      <WrapperImage>{avatar_hover}</WrapperImage>
                    </FlexWrapper>
                  </Link>
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
    </SwiperlWrapper>
  )
}
