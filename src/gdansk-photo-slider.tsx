import React from 'react'
import { CarouselQuotesSwiper } from './components/shared/CarouselQuotesSwiper'
import styled from 'styled-components'
import variables, { roundedCorners } from './styles/variables'

export const GdanskPhotoSlider = () => {
  const quotes = [
    {
      avatar_hover: (
        <img src='/images/gdansk/beach.png' alt='Górki Wschodnie beach' className='quote-img' />
      ),
      short_name: 'Górki Wschodnie beach',
      quote:
        'Surrounded by dunes and coastal vegetation, Górki Wschodnie Beach boasts natural beauty and serenity, making it an ideal destination for nature lovers and outdoor enthusiasts.',
    },
    {
      avatar_hover: (
        <img
          src='/images/gdansk/fortifications.png'
          alt='the fortifications of Gdańsk'
          className='quote-img'
        />
      ),
      short_name: 'the fortifications of Gdańsk',
      quote:
        "These historic structures stand as beloved landmarks, providing a picturesque backdrop for exploring Gdansk's historic streets, charming squares, and architectural treasures.",
    },
    {
      avatar_hover: (
        <img src='/images/gdansk/park.png' alt='Jaśkowa Valley Park' className='quote-img' />
      ),
      short_name: 'Jaśkowa Valley Park',
      quote:
        'The urban park only 20 minutes walk from our office offers a peaceful retreat from the bustling city life.',
    },
    {
      avatar_hover: (
        <img
          src='/images/gdansk/shipyard.png'
          alt='post-shipyard industrial cultural center'
          className='quote-img'
        />
      ),
      short_name: 'post-shipyard industrial cultural center',
      quote:
        'Once a hub for industrial activity, the streets such as Elektryków and Narzędziowa have transformed blossoming into a vibrant cultural hotspot.',
    },
  ]

  return (
    <Wrapper>
      <CarouselQuotesSwiper quotes={quotes} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  margin: 2.25px 36px;
  margin-left: calc((100vw - 100%) / -2);
  padding: 0 32px;

  @media ${variables.deviceWidthMin.tabletXL} {
    padding: 2.25rem;
  }

  @media ${variables.deviceWidthMin.laptop} {
    padding: 2.5rem 15rem;
  }
    
  & .quote-img {
    border-radius: 16px;
  }

  & div div h3.header {
    margin: 0 0 18px;
    
    @media ${variables.deviceWidthMin.mobile} {
      margin: 0;
    }

    @media ${variables.deviceWidthMin.desktop} {
      margin: 0 0 36px;
    }
  }

  h3 div p.title {
    font-family: Montserrat, "DejaVu Sans", Verdana, sans‑serif, serif;
    font-size: 1.25rem;
    font-weight: 900;
    margin: 0;

    @media ${variables.deviceWidthMin.tabletXL} {
      font-size: clamp(1.375rem, 0.974138rem + 0.646552vw, 1.75rem);
    }
  }

  div div .description {
    font-size: 1rem;
    line-height: 1.875rem;
    margin: 0 18px;

    @media ${variables.deviceWidthMin.mobile} {
      font-size: clamp(1.375rem, 0.974138rem + 0.646552vw, 1.75rem);
      line-height: clamp(3rem, 1.93103rem + 1.72414vw, 4rem);
      margin: 0;
    }
      
  }
`
