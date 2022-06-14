import React from 'react'
import { Carousel as RCarousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'
import BackArrowImage from '../../assets/backArrowBlack.svg'
import NextArrowImage from '../../assets/nextArrowBlack.svg'
import { Link } from 'gatsby'
import variables from '../../styles/variables'

import Indicator from './carousel/Indicator'
import { StaticImage } from 'gatsby-plugin-image'
import { CustomTextTitle, FlexWrapper } from './index.styled'
import { clampBuilder } from '../../helpers/clampBuilder'

const CarouselWrapper = styled.section`
  & .carousel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: ${variables.pxToRem(100)};
    @media ${variables.device.tablet} {
      padding-bottom: ${variables.pxToRem(64)};
    }
    & .control-dots {
      bottom: 0;
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
  margin-right: ${variables.pxToRem(47)};

  @media ${variables.device.tablet} {
    display: flex;
    justify-content: center;
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
  margin-left: 7.625rem;
  @media ${variables.device.tablet} {
    display: flex;
    justify-content: center;
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
  font-size: ${clampBuilder(992, 1920, 22, 34)};
  line-height: ${clampBuilder(992, 1920, 48, 64)};
  text-align: left;
  color: ${variables.color.black};
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(24)};
    line-height: ${variables.pxToRem(48)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
    line-height: ${variables.pxToRem(30)};
  }
`
const WrapperImage = styled.div`
  flex-basis: 50%;
  & .quote-img {
    & img {
      max-height: ${variables.pxToRem(521)};
      width: auto;
    }
  }
  @media ${variables.device.mobile} {
    flex-basis: 100%;
    & .quote-img {
      & img {
        max-height: ${variables.pxToRem(330)};
        width: auto;
      }
    }
  }
`
const QuoteCustomSectionInner = styled.div`
  max-width: ${clampBuilder(992, 1920, 340, 840)};
  @media ${variables.device.tablet} {
    max-width: 100%;
  }
`

const PreviousArrow = (onClickHandler: () => void) => (
  <PreviousSliderButton>
    <BackArrowImage onClick={onClickHandler} />
  </PreviousSliderButton>
)

const NextArrow = (onClickHandler: () => void) => (
  <NextSliderButton>
    <NextArrowImage onClick={onClickHandler} />
  </NextSliderButton>
)

type CarouselProps = {
  wrapperClassName?: string
}

export const CarouselQuotes: React.FC<CarouselProps> = ({ wrapperClassName }) => {
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
    <CarouselWrapper className={wrapperClassName}>
      <RCarousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        renderIndicator={Indicator}
        renderArrowPrev={PreviousArrow}
        renderArrowNext={NextArrow}
        transitionTime={100}
      >
        {quotes.map(item => {
          const { avatar_hover, short_name, bio, slug, quote } = item
          return (
            <div key={item.short_name}>
              <Link to={`/about-us/${slug}`}>
                <FlexWrapper desktopItems='center' desktopGap='67px' tabletDirection='column-reverse' tabletGap='44px'>
                  <QuoteCustomSectionInner>
                    <CustomTextTitle tabletXLMargin='0 0 51px' mobileMargin='0 0 18px' margin='0 0 56px'>
                      <FlexWrapper desktopGap='5px' tabletContent='center' mobileDirection='column'>
                        <p>{short_name},</p>
                        <p>{bio}</p>
                      </FlexWrapper>
                    </CustomTextTitle>

                    <QuoteWrapper>{quote}</QuoteWrapper>
                  </QuoteCustomSectionInner>

                  <WrapperImage>{avatar_hover}</WrapperImage>
                </FlexWrapper>
              </Link>
            </div>
          )
        })}
      </RCarousel>
    </CarouselWrapper>
  )
}
