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
    @media ${variables.device.laptop} {
      --gap: 2.5rem;
    }
    @media ${variables.device.tabletXL} {
      --gap: 1.9375rem;
    }
    @media ${variables.device.tablet} {
      --gap: 2.4375rem;
    }
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
  @media ${variables.device.laptop} {
    height: calc(41.625rem + var(--gap));
  }
  @media ${variables.device.tabletXL} {
    height: calc(33.125rem + var(--gap));
  }
  @media ${variables.device.tablet} {
    height: calc(39.4375rem + var(--gap));
  }

  & > * {
    flex-basis: 20%;
    &.big-image {
      border: 1px solid #d3d3d3;
      @media ${variables.device.laptop} {
        & .image {
          object-position: 50% 20%;
        }
      }
    }
  }
  @media ${variables.device.tablet} {
    & > * {
      flex-basis: 33%;
    }
  }
  @media ${variables.device.mobile} {
    flex-wrap: wrap;
    height: auto;
    justify-content: center;

    & > * {
      flex-basis: calc(50% - var(--gap));
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
      @media ${variables.device.laptop} {
        & .image {
          object-position: 50% 20%;
        }
      }
    }
    &.image-veritical:not(:last-of-type) {
      margin-bottom: var(--gap);
    }
  }
  @media ${variables.device.tablet} {
    flex-basis: 33%;
    &:first-of-type {
      display: none;
    }
    &:last-of-type {
      display: none;
    }
  }

  @media ${variables.device.mobile} {
    flex-basis: calc(50% - var(--gap));
    &:first-of-type {
      display: flex;
    }
    &:nth-of-type(3) {
      order: 1;
    }
    &:nth-of-type(4) {
      order: 2;
    }
  }
`
export const SectionCareerTitle = styled(Section)`
  padding: 2rem 15rem 4.5rem 15rem;
  @media ${variables.device.laptop} {
    padding: 0rem 6rem 4.5rem 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 0rem 9rem 4.5rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 0rem 2.25rem 4.5rem 2.25rem;
  }

  @media ${variables.device.mobile} {
    padding: 3.5rem 1.125rem 2.5625rem 1.125rem;
  }
`
const HeaderImages: React.FC = () => {
  return (
    <SectionCareerTitle className='career-images'>
      <ImagesHorizontal>
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/Daniel_career_kolaz.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
            imgClassName='image'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/ula_career_collage.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
            imgClassName='image'
          />
        </ImagesVertical>
        <StaticImage
          objectFit={'cover'}
          src='../../../static/images/career/header/Radek_Career_kolaz.png'
          alt={'Software developer career Poland'}
          quality={100}
          height={820}
          className='big-image'
          imgClassName='image'
        />
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/bartek_k_career_collage.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
            imgClassName='image'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/Piotr_Career_kolaz.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
            imgClassName='image'
          />
        </ImagesVertical>
        <StaticImage
          objectFit={'cover'}
          src='../../../static/images/career/header/Kasia_career_kolaz.png'
          alt={'Career at Bright Inventions'}
          className='big-image'
          imgClassName='image'
        />
        <ImagesVertical>
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/Robert_Career_kolaz.png'
            alt={'Career at Bright Inventions'}
            className='image-veritical'
            imgClassName='image'
          />
          <StaticImage
            objectFit={'cover'}
            src='../../../static/images/career/header/Agata_Career_kolaz.png'
            alt={'Software developer career Poland'}
            className='image-veritical'
            imgClassName='image'
          />
        </ImagesVertical>
      </ImagesHorizontal>
    </SectionCareerTitle>
  )
}

export default HeaderImages
