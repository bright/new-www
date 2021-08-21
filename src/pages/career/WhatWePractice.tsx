import React, { useMemo } from 'react'
import styled from 'styled-components'

import { SectionBlack, SectionTitle } from '../../components/shared'
import variables from '../../styles/variables'

const PracticeTitle = styled(SectionTitle)`
  margin-top: 4.56rem;
  margin-bottom: 6.56rem;
  font-size: 2.5rem;

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
    @media ${variables.device.mobile} {
      font-size: 1.125rem;
    }
  }
  @media ${variables.device.mobile} {
    margin-bottom: 3.375rem;
    &:nth-of-type(n + 4) {
      margin-bottom: 3.375rem;
    }
  }
`

const WhatWePractice: React.FC = () => {
  const blocks = useMemo(
    () => [
      { image: '/images/career/practice/agile_meth.svg', title: 'agile methodology' },
      { image: '/images/career/practice/test-driven_development.svg', title: 'code review (Upsource)' },
      { image: '/images/career/practice/pair_programming.svg', title: 'pair programming' },
      { image: '/images/career/practice/mentoring.svg', title: 'mentoring' },
      { image: '/images/career/practice/continuous_integration.svg', title: 'continuous integration and delivery' },
      { image: '/images/career/practice/test-driven_development.svg', title: 'test driven development' },
    ],
    []
  )

  return (
    <SectionBlack>
      <div className='container'>
        <PracticeTitle>what we practice</PracticeTitle>

        <div className='columns is-multiline'>
          {blocks.map(block => (
            <Column key={block.title} className='column is-one-third has-text-centered'>
              <figure className='image is-inline-block'>
                <img src={block.image} alt={block.title} />
              </figure>
              <p>{block.title}</p>
            </Column>
          ))}
        </div>
      </div>
    </SectionBlack>
  )
}

export default WhatWePractice
