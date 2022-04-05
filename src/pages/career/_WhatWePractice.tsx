import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'

import { SectionBlack } from '../../components/shared'
import { CustomSectionTitle } from '../../components/shared/index.styled'
import variables from '../../styles/variables'
import useOnScreen from '../../components/utils/use-onscreen'
import { clampBuilder } from '../../helpers/clampBuilder'

const PracticeSectionBlack = styled(SectionBlack)`
  padding: 2rem 15rem 6rem 15rem;
  @media ${variables.device.laptop} {
    padding: 2rem 6rem 6rem 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 2rem 9rem 6rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 2rem 2.25rem 6rem 2.25rem;
  }
  @media ${variables.device.mobile} {
    padding: 2rem 1.25rem 6rem 1.25rem;
  }
`

const PracticeTitle = styled(CustomSectionTitle)`
  margin-top: 4.56rem;
  margin-bottom: 6.56rem;
  font-size: 2.5rem;
  color: #fff;
  @media ${variables.device.laptop} {
    margin-top: 3.435rem;
    margin-bottom: 5.1875rem;
    font-size: 2.125rem;
  }

  @media ${variables.device.mobile} {
    margin-top: 3.435rem;
    margin-bottom: 4rem;
    font-size: 1.375rem;
  }
`
const Column = styled.div`
  margin-bottom: 5.8rem;
  &:nth-of-type(n + 4) {
    margin-bottom: 0;
  }

  figure {
    img {
      height: 100%;
      max-height: 5.5rem;
    }
  }
  p {
    display: block;
    width: 70%;
    margin: 0 auto;
    padding-top: 2rem;
    font-size: 1.375rem;
    @media ${variables.device.laptop} {
      font-size: 1.25rem;
      width: 100%;
    }
    @media ${variables.device.tablet} {
      width: 70%;
    }
    @media ${variables.device.mobile} {
      font-size: 1.125rem;
      width: 100%;
    }
  }
  @media ${variables.device.tablet} {
    margin-bottom: 3.375rem;
    width: 50% !important;
    flex: none;
    &:nth-of-type(n + 4) {
      margin-bottom: 3.375rem;
    }
  }
  @media ${variables.device.mobile} {
    width: 100% !important;
    margin: auto;
    margin-bottom: 3.375rem;

    &:nth-of-type(n + 4) {
      margin-bottom: 3.375rem;
    }
  }
`
const Columns = styled.div`
  @media ${variables.device.tablet} {
    && .columns {
      display: flex;
    }
  }
`
const OnScreenSection = styled.div`
  height: ${clampBuilder(993, 1920, 828, 850)};
  @media ${variables.device.tablet} {
    height: ${clampBuilder(360, 992, 1668, 1100)};
  }
`

const WhatWePractice: React.FC = () => {
  const blocks = useMemo(
    () => [
      { image: '/images/career/practice/agile_meth.svg', title: 'agile methodology' },
      { image: '/images/career/practice/code_review.svg', title: 'code review (Upsource)' },
      { image: '/images/career/practice/pair_programming.svg', title: 'pair programming' },
      { image: '/images/career/practice/mentoring.svg', title: 'mentoring' },
      { image: '/images/career/practice/continuous_integration.svg', title: 'continuous integration and delivery' },
      { image: '/images/career/practice/test-driven_development.svg', title: 'test driven development' },
    ],
    []
  )
  const ref: any = useRef<HTMLDivElement>()
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, '0px')

  return (
    <PracticeSectionBlack ref={ref}>
      <PracticeTitle>what we practice</PracticeTitle>

      <Columns className='columns is-multiline'>
        {onScreen ? (
          blocks.map(block => (
            <Column key={block.title} className='column is-one-third has-text-centered'>
              <figure className='image is-inline-block'>
                <img src={block.image} alt={block.title} />
              </figure>
              <p>{block.title}</p>
            </Column>
          ))
        ) : (
          <OnScreenSection></OnScreenSection>
        )}
      </Columns>
    </PracticeSectionBlack>
  )
}

export default WhatWePractice
