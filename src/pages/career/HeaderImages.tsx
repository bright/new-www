import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

import { Section } from '../../components/shared'
import variables from '../../styles/variables'
import { IStaticImageProps } from 'gatsby-plugin-image/dist/src/components/static-image.server'

const ImagesBase = styled.div`
  & {
    display: flex;
    gap: 2rem;
    flex-grow: 1;

    @media ${variables.device.mobile} {
      gap: 1rem;
    }
  }
`

export const ImagesHorizontal = styled(ImagesBase)`
  flex-direction: row;
  height: 39.5rem;

  & > * {
    flex-basis: 37.5%;
  }

  @media ${variables.device.mobile} {
    flex-wrap: wrap-reverse;
    height: auto;
    justify-content: center;

    & > * {
      flex-basis: 90%;
    }
  }
`

export const ImagesVertical = styled(ImagesBase)`
  flex-direction: column;
  flex-basis: 25%;

  & > * {
    flex-grow: 1;
  }

  & > div:last-child img {
    object-position: 80% 0;
  }

  @media ${variables.device.mobile} {
    flex-direction: row;
    max-width: 90%;
  }
`

const HeaderImages: React.FC = () => {
  return (
    <Section>
      <ImagesHorizontal>
        <StaticImage objectFit={'contain'}  src='../../../static/images/career/header/image1.png' alt={'Career at Bright Inventions'} />
        <ImagesVertical>
          <StaticImage objectFit={'contain'}  src='../../../static/images/career/header/image2.png' alt={'Software developer career Poland'} />
          <StaticImage objectFit={'contain'}  src='../../../static/images/career/header/image3.png' alt={'Software developer career Poland'} />
        </ImagesVertical>
        <StaticImage objectFit={'contain'}  src='../../../static/images/career/header/image4.png' alt={'Career at Bright Inventions'} />
      </ImagesHorizontal>
    </Section>
  )
}

export default HeaderImages
