import React from 'react'
import styled from 'styled-components'

import { Section } from '../../components/shared'
import { StaticImage } from 'gatsby-plugin-image'
import variables from '../../styles/variables'

const ImagesBase = styled.div`
  & {
    display: flex;
    gap: 2rem;
    flex-grow: 1;
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
  }
`

const Images: React.FC = () => {
  return (
    <Section>
        <ImagesHorizontal>
          <StaticImage src="../../../static/images/career/image1.png" alt={'Career at Bright Inventions'} />
          <ImagesVertical>
            <StaticImage src="../../../static/images/career/image2.png" alt={'Software developer career Poland'} />
            <StaticImage src="../../../static/images/career/image3.png" alt={'Software developer career Poland'} />
          </ImagesVertical>
          <StaticImage src="../../../static/images/career/image4.png" alt={'Career at Bright Inventions'} />
        </ImagesHorizontal>
    </Section>
  )
}

export default Images
