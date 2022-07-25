import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'

import { FlexWrapper, SectionBlack } from '../../components/shared'
import { CustomSectionTitle } from '../../components/shared/index.styled'
import variables from '../../styles/variables'

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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 5.8rem;
  figure {
    display: flex;
    justify-content: center;
    img {
      height: 100%;
      max-height: 5.5rem;
    }
  }
  p {
    width: 70%;
    margin: 0 auto;
    padding-top: 2rem;
    font-size: 1.375rem;
    text-align: center;
    flex-grow: 1;
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
`
const PracticeFlexWrapper = styled(FlexWrapper)`
  flex-basis: calc(100% / 3);
  @media ${variables.device.tabletXL} {
    flex-basis: calc(100% / 2);
  }
  @media ${variables.device.mobile} {
    flex-basis: 100%;
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

  return (
    <PracticeSectionBlack>
      <PracticeTitle>what we practice</PracticeTitle>
      <Wrapper>
        {blocks.map(block => (
          <PracticeFlexWrapper desktopDirection='column' desktopContent='center' key={block.title}>
            <figure>
              <img src={block.image} alt={block.title} />
            </figure>
            <p>{block.title}</p>
          </PracticeFlexWrapper>
        ))}
      </Wrapper>
    </PracticeSectionBlack>
  )
}

export default WhatWePractice
