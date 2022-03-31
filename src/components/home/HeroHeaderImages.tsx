import React, { useRef } from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { CustomSectionTitle } from '../shared/index.styled'
import { Section } from '../shared'
import variables from '../../styles/variables'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { BlackButton } from '../about-us/about-us.styled'
import { CustomContainer } from '../../components/shared/index'
import useOnScreen from '../utils/use-onscreen'

const HeroSectionWrapper = styled.section`
  padding: 2rem 15rem 11.625rem;
  @media ${variables.device.desktop} {
    padding: 0 15rem 7.25rem;
  }
  @media ${variables.device.laptop} {
    padding: 0 6rem 7.25rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 0 9rem 5.125rem;
  }
  @media ${variables.device.tablet} {
    padding: 0 2.25rem 5.125rem;
  }
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
    @media ${variables.device.tabletXL} {
      --gap: 2rem;
    }
    & > * :not(.image-veritical) {
      margin: var(--gap) 0 0 var(--gap);
    }
  }
  @media ${variables.device.tablet} {
    --gap: 2.4375rem;

    & > * :not(.image-veritical) {
      margin: var(--gap) 0 0 var(--gap);
    }
  }

  @media ${variables.device.mobile} {
    --gap: 1rem;

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
  @media ${variables.device.laptop} {
    height: calc(666px + var(--gap));
    justify-content: center;
  }
  @media ${variables.device.tabletXL} {
    height: calc(530px + var(--gap));
    justify-content: center;
  }
  @media ${variables.device.tablet} {
    flex-wrap: nowrap;
    height: calc(632px + var(--gap));
    justify-content: center;

    & > * {
      flex-basis: 33%;
    }
    & > *:nth-child(n + 4) {
      display: none;
    }
  }

  @media ${variables.device.mobile} {
    flex-wrap: wrap;
    height: auto;

    & > * {
      flex-basis: calc(50% - var(--gap));
    }
    & > *:nth-child(n + 4) {
      display: block;
    }
    & > :nth-child(3) {
      order: 2;
    }
    & > :nth-child(4) {
      order: 1;
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

      & > img {
        object-position: 50% 20%;
      }
      &.image-veritical:not(:last-of-type) {
        margin-bottom: var(--gap);
      }
    }
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
  const ref: any = useRef<HTMLDivElement>()
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '400px')

  return (
    <HeroSectionWrapper ref={ref}>
      <CustomContainer>
        <HeroSectionTitle>
          meet <span>bright</span> team
        </HeroSectionTitle>
        {onScreen && (
          <Link to={routeLinks.aboutUs({ page: 'team' })}>
            <ImagesHorizontal>
              <ImagesVertical>
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/Agnieszka_Homepage_kolaz.png'
                  alt={'Agnieszka'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/Mateusz_Homepage_kolaz.png'
                  alt={'Mateusz'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
              </ImagesVertical>
              <StaticImage
                objectFit={'cover'}
                objectPosition={'50% 20%'}
                src='../../../static/images/hero-header/Lukasz_Homepage_kolaz.png'
                alt={'Łukasz'}
                className='big-image'
                placeholder='tracedSVG'
              />
              <ImagesVertical>
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/Alisa_homepage.png'
                  alt={'Paulina'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/Szymek_Homepage_kolaz.png'
                  alt={'Szymon'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
              </ImagesVertical>
              <StaticImage
                objectFit={'cover'}
                objectPosition={'50% 20%'}
                src='../../../static/images/hero-header/Iza_Homepage_kolaz.png'
                alt={'Iza'}
                className='big-image'
                placeholder='tracedSVG'
              />
              <ImagesVertical>
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/PiotrR_Homepage_kolaz.png'
                  alt={'Piotr'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
                <StaticImage
                  objectFit={'cover'}
                  objectPosition={'50% 20%'}
                  src='../../../static/images/hero-header/Wojtek_Homepage_kolaz.png'
                  alt={'Wojtek'}
                  className='image-veritical'
                  placeholder='tracedSVG'
                />
              </ImagesVertical>
            </ImagesHorizontal>
          </Link>
        )}
        <Link to={routeLinks.career}>
          <BlackButtonHeader>join our team</BlackButtonHeader>
        </Link>
      </CustomContainer>
    </HeroSectionWrapper>
  )
}

export default HeroHeaderImages
