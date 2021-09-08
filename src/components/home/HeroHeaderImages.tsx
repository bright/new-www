import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { CustomSectionTitle } from '../shared/index.styled'
import { Section } from '../shared'
import variables from '../../styles/variables'
import { IStaticImageProps } from 'gatsby-plugin-image/dist/src/components/static-image.server'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { BlackButton } from '../about-us/about-us.styled'
import { CustomContainer } from '../../components/shared/index'

const HeroSectionWrapper = styled.section`
  padding: 2rem 2rem 11.625rem;
  @media ${variables.device.mobile} {
    padding: 0 1.125rem 5.125rem;
  }
`

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
const HeroSectionTitle = styled(CustomSectionTitle)`
  & > span {
    color: ${variables.color.primary};
  }
`

export const BlackButtonHeader = styled(BlackButton)`
  display: block;
  width: 16rem;
  margin: 0 auto;
  margin-top: 6.5625rem;
  text-align: center;
  @media ${variables.device.mobile} {
    width: 100%;
    margin-top: 4rem;
  }
`

const HeroHeaderImages: React.FC = () => {
  return (
    <HeroSectionWrapper>
      <CustomContainer>
        <HeroSectionTitle>
          meet <span>bright</span> team
        </HeroSectionTitle>
        <Link to={routeLinks.aboutUs({ page: 'team' })}>
          <ImagesHorizontal>
            <ImagesVertical>
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/Agnieszka.png'
                alt={'Agnieszka'}
                className='image-veritical'
              />
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/Mateusz.png'
                alt={'Mateusz'}
                className='image-veritical'
              />
            </ImagesVertical>
            <StaticImage
              objectFit={'cover'}
              src='../../../static/images/hero-header/Łukasz.png'
              alt={'Łukasz'}
              className='big-image'
            />
            <ImagesVertical>
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/paulina_passion.png'
                alt={'Paulina'}
                className='image-veritical'
              />
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/Szymon.png'
                alt={'Szymon'}
                className='image-veritical'
              />
            </ImagesVertical>
            <StaticImage
              objectFit={'cover'}
              src='../../../static/images/hero-header/iza gut.png'
              alt={'Iza'}
              className='big-image'
            />
            <ImagesVertical>
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/Piotr.png'
                alt={'Piotr'}
                className='image-veritical'
              />
              <StaticImage
                objectFit={'cover'}
                src='../../../static/images/hero-header/Wojtek.png'
                alt={'Wojtek'}
                className='image-veritical'
              />
            </ImagesVertical>
          </ImagesHorizontal>
        </Link>
        <Link to={routeLinks.career}>
          <BlackButtonHeader>join our team</BlackButtonHeader>
        </Link>
      </CustomContainer>
    </HeroSectionWrapper>
  )
}

export default HeroHeaderImages
