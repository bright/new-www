import React, { useMemo } from 'react'
import styled from 'styled-components'

import { SectionBlack, SectionTitle } from '../../components/shared'

const Column = styled.div`
  margin-bottom: 1rem;
  
  &:nth-child(n+3) {
    margin-top: 1rem;
  }
  
  figure {
    img {
      max-height: 3rem;
    }
  }
`

const WhatWePractice: React.FC = () => {
  const blocks = useMemo(() => ([
    {image: '/images/career/practice/agile_meth.svg', title: 'agile methodology'},
    {image: '/images/career/practice/test-driven_development.svg', title: 'code review (Upsource)'},
    {image: '/images/career/practice/pair_programming.svg', title: 'pair programming'},
    {image: '/images/career/practice/mentoring.svg', title: 'mentoring'},
    {image: '/images/career/practice/continuous_integration.svg', title: 'continuous integration and delivery'},
    {image: '/images/career/practice/test-driven_development.svg', title: 'test driven development'},
  ]), [])

  return (
      <SectionBlack>
        <div className='container'>
          <SectionTitle>what we practice</SectionTitle>

              <div className="columns is-multiline">
                {blocks.map(block => (
                  <Column className="column is-one-third has-text-centered">
                    <figure className="image is-inline-block">
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
