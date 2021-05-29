import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Section, SectionTitle } from '../../components/shared'

const Columns = styled.div`
  .column {
    position: relative;
    margin: 1rem 2rem;
    
    &:not(.is-half) {
      &:not(:nth-child(n+4)):after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -3rem;
        width: 1.2rem;
        height: 0.8rem;
        content: '';
        background-image: url('/images/career/arrow.svg');
        background-size: cover;
      }

      figure {
        height: 6rem;
      }
    }

    p {
      margin-top: 1rem;
      font-size: 0.8rem;
      font-weight: 700;
    }
  }
`

const RecruitingProcess: React.FC = () => {
  const blocks = useMemo(() => ([
    {image: '/images/career/recruiting/cv_review.png', title: 'cv review'},
    {image: '/images/career/recruiting/interview.png', title: 'interview'},
    {image: '/images/career/recruiting/skills_evaluation.png', title: 'skills evaluation'},
    {image: '/images/career/recruiting/technical_interview.png', title: 'technical interview'},
  ]), [])

  return (
    <Section>
      <SectionTitle>recruiting process</SectionTitle>

      <Columns className='columns is-multiline has-justify-content-center'>
        {blocks.map((block, index) => (
          <div key={block.title} className='column is-one-forth has-text-centered'>
            <figure className='image is-inline-block'>
              <img src={block.image} alt={block.title} />
            </figure>
            <p>{index+1}. {block.title}</p>
          </div>
        ))}
        <div className='column is-half has-text-centered'>
          <figure className='image is-inline-block'>
            <img src='/images/career/recruiting/congrats.png' alt='congrats' />
          </figure>
          <p>5. congrats! you are a part of a bright team!</p>
        </div>
      </Columns>
    </Section>
  )
}

export default RecruitingProcess
