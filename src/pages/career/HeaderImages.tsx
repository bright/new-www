import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

import { Section } from '../../components/shared'
import variables from '../../styles/variables'
import { IStaticImageProps } from 'gatsby-plugin-image/dist/src/components/static-image.server'

const ImagesBase = styled.div`
  & {
    display: flex;
    --gap: 3.5rem;
    flex-grow: 1;
    margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
    width: calc(100% + var(--gap));

    @media ${variables.device.mobile} {
      --gap: 1rem;
    }
    & > * :not(.image-veritical) {
      margin: var(--gap) 0 0 var(--gap);
    }
  }
`

export const ImagesHorizontal = styled(ImagesBase)`
  flex-direction: row;
  height: 55rem;

  & > * {
    flex-basis: 20%;
    &.big-image {
      border: 1px solid #d3d3d3;
    }
  }

  @media ${variables.device.mobile} {
    flex-wrap: wrap;
    height: auto;
    justify-content: center;

    & > * {
      flex-basis: 45%;
    }
    & > *:nth-child(5) {
      display: none;
    }
  }
`

export const ImagesVertical = styled(ImagesBase)`
  flex-direction: column;
  flex-basis: 20%;

  & > * {
    flex-grow: 1;
    height: 50%;

    &.image-veritical {
      border: 1px solid #d3d3d3;
      &.image-veritical:not(:last-of-type) {
        margin-bottom: var(--gap);
      }
    }
  }

  @media ${variables.device.mobile} {
    max-width: 50%;
    flex-basis: 45%;
  }
`
export const SectionCareerTitle = styled(Section)`
  padding: 2rem 2rem 4.5rem 2rem;

  @media ${variables.device.mobile} {
    padding: 3.5rem 1.125rem 4.5rem 1.125rem;
  }
`
const HeaderImages: React.FC = () => {
  return (
    <SectionCareerTitle className='career-images'>
      <ImagesHorizontal>
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image1.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image5.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
          />
        </ImagesVertical>
        <StaticImage
          objectFit={'cover'}
          src='../../../static/images/career/header/image2.png'
          alt={'Software developer career Poland'}
          className='big-image'
        />
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image6.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image3.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
          />
        </ImagesVertical>
        <StaticImage
          objectFit={'cover'}
          src='../../../static/images/career/header/image4.png'
          alt={'Career at Bright Inventions'}
          className='big-image'
        />
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image7.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/image8.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
          />
        </ImagesVertical>
      </ImagesHorizontal>
    </SectionCareerTitle>
  )
}

export default HeaderImages
