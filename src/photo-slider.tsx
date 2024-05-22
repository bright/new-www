import React from 'react'
import { CarouselQuotesSwiper } from './components/shared/CarouselQuotesSwiper'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import variables from './styles/variables'
import { SlideData } from './cms/sliderConfig'

interface PhotoSliderProps {
  slides: Array<SlideData>
}

export const PhotoSlider = ({ slides }: PhotoSliderProps) => {
  const quotes = slides.map(slide => {
    return {
      avatar_hover: (
        <StaticImage src={slide.image} alt={slide.title} className='quote-img' />
      ),
      short_name: slide.title,
      quote: slide.description,
    }
  })

  return <Wrapper>
    <CarouselQuotesSwiper quotes={quotes} />
  </Wrapper>
}

const Wrapper = styled.div`
    width: 100vw;
    margin-left: calc((100vw - 100%) / -2 );
    padding: 0 2.25rem;

    @media ${variables.deviceWidthMin.tabletXL} {
        padding: 0 6rem;
    }

    @media ${variables.deviceWidthMin.desktop} {
        padding: 0 15rem;
    }
`;