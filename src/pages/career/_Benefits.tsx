import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { CustomSection, CustomSectionTitle, CustomContainer } from '../../components/shared'
import variables from '../../styles/variables'

import { clampBuilder } from '../../helpers/clampBuilder'
import FacebookIconBlack from '../../assets/facebook_black.svg'
import InstagramIconBlack from '../../assets/instagram_black.svg'
import LinkedInIconBlack from '../../assets/linkedIn_black.svg'

const SectionBenefitsTitle = styled(CustomSectionTitle)`
  margin-top: 11.625rem;
  margin-bottom: 5.5625rem;
  font-size: 2.5rem;
  font-weight: 800;

  @media ${variables.device.laptop} {
    font-size: 2.125rem;
  }

  @media ${variables.device.mobile} {
    margin-top: 0;
    margin-bottom: 3rem;
    font-size: 1.375rem;
  }
`
const Block = styled.div`
  position: relative;
  display: inline-block;
  width: calc(50% - 2rem);
  min-height: 10rem;
  margin: 1rem 1rem;
  font-size: 0;
  @media ${variables.device.laptop} {
    width: calc(50% - 3.375rem);
    margin: 1.6875rem 1.6875rem;
  }
  @media ${variables.device.tabletXL} {
    width: calc(50% - 2.75rem);
    margin: 1.375rem 1.375rem;
  }
  @media ${variables.device.tablet} {
    width: 100%;
    margin: 2.0625rem 0;
    & figure {
      width: 100%;
      & img {
        max-height: 35.3125rem;
        width: 100%;
      }
    }
  }

  p {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 2rem;
    font-weight: 800;
    color: ${variables.color.white};
    height: 10rem;
    background: transparent linear-gradient(180deg, rgba(19, 18, 20, 0) 0%, rgba(19, 18, 20, 1) 100%) 0 0 no-repeat
      padding-box;
    transition: background-position ease-in 0.2s;
    display: flex;
    align-items: flex-end;
    padding: 2.625rem;

    &:hover {
      background-position: 0 1rem;
    }
  }
  @media ${variables.device.laptop} {
    p {
      font-size: 1.5625rem;
      padding: 2rem;
    }
  }
  @media ${variables.device.tabletXL} {
    p {
      font-size: 1.1875rem;
      padding: 1.625rem;
    }
  }
  @media ${variables.device.tablet} {
    p {
      font-size: 1.75rem;
      padding: 2.25rem;
    }
  }
  @media ${variables.device.mobile} {
    width: 100%;
    margin: 1.125rem 0 0 0;
    &:first-of-type {
      margin: 1.5rem 0 0 0;
    }
    &:last-of-type {
      margin-top: 1.5rem;
    }
    p {
      font-size: 1rem;
      padding: 1.2rem;
    }
  }
`

const BlockSmall = styled(Block)`
  border: 1px solid ${variables.color.border};
  height: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1rem;

  span {
    flex-grow: 1;
    margin-right: 2rem;
  }

  & a {
    margin-right: 2rem;
    &:last-of-type {
      margin-right: 0;
    }
    img {
      width: 2rem;
    }
  }

  .more {
    display: flex;
    flex-grow: 1;
    margin: -2rem;
    height: calc(100% + 4rem);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  @media ${variables.device.mobile} {
    width: 100%;
    min-height: auto;
    height: auto;
    padding: 1.5rem;
    font-size: 0.75rem;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }
`

const Benefits: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10 && !isScrolledDown) {
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [])
  const blocks = useMemo(
    () => [
      {
        image: '/images/career/benefits/image1.png',
        title: 'Running & cycling workouts with pro triathlete',
        alt: 'Running and cycling workouts',
      },
      {
        image: '/images/career/benefits/image2.png',
        title: 'Swimming workouts with pro triathlete',
        alt: 'Swimming workouts',
      },
      { image: '/images/career/benefits/image3.png', title: 'Friday yoga', alt: 'Friday yoga' },
      { image: '/images/career/benefits/image4.png', title: 'Bright lunches & donuts', alt: 'Lunches and donuts' },
      { image: '/images/career/benefits/image5.png', title: 'English classes', alt: 'English classes' },
      { image: '/images/career/benefits/image6.png', title: 'Great library', alt: 'Library' },
      ...(expanded
        ? [
            { image: '/images/career/benefits/image11.png', title: 'Team retreats', alt: 'Team retreats' },
            { image: '/images/career/benefits/image8.png', title: 'Internal workshops', alt: 'Internal workshops' },
            { image: '/images/career/benefits/image9.png', title: 'Mentoring', alt: 'Mentoring' },
            { image: '/images/career/benefits/image12.png', title: 'Board game fridays', alt: 'Board game fridays' },
          ]
        : []),
    ],
    [expanded]
  )

  return (
    <CustomContainer>
      <CustomSection className='is-clearfix'>
        <SectionBenefitsTitle>
          our life is also <span className='has-text-primary'>bright</span>
        </SectionBenefitsTitle>

        <BlockSmall className='is-pulled-right'>
          <span>Follow us on:</span>
          <a target='_blank' href='https://www.linkedin.com/company/bright-inventions/'>
            <LinkedInIconBlack />
          </a>
          <a target='_blank' href='https://www.facebook.com/bright.inventions/'>
            <FacebookIconBlack />
          </a>
          <a target='_blank' href='https://www.instagram.com/bright_inventions/'>
            <InstagramIconBlack />
          </a>
        </BlockSmall>
        {isScrolledDown &&
          blocks.map((block, index) => (
            <Block key={block.title} className={`is-pulled-${index % 2 ? 'right' : 'left'}`}>
              <figure className='image is-inline-block'>
                <img src={block.image} alt={block.alt} />
              </figure>
              <p>{block.title}</p>
            </Block>
          ))}

        <BlockSmall className='is-pulled-left'>
          <span onClick={() => setExpanded(!expanded)} className='more'>
            see {expanded ? 'less' : 'more'}
          </span>
        </BlockSmall>
      </CustomSection>
    </CustomContainer>
  )
}

export default Benefits
