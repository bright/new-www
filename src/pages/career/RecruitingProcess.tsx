import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Section, SectionTitle } from '../../components/shared'
import variables from '../../styles/variables'

const Columns = styled.div`
  .column {
    position: relative;
    padding: 1rem 2rem;
    
    &:not(.is-half):after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 1.2rem;
      height: 0.8rem;
      content: '';
      background-image: url('/images/career/arrow.svg');
      background-size: cover;
    }
    &:nth-child(n+4):after {
      display: none;
    }

    figure img {
      max-height: 8rem;
      object-fit: contain;
    }
    
    &.is-half figure img {
      max-height: 15rem;
    }
    
    p {
      margin-top: 2rem;
      font-size: 0.8rem;
      font-weight: 700;
    }
  }

  @media ${variables.device.mobile} {
    && {
      .column {
        margin-bottom: 3rem;
        
        &:after {
          display: block;
          top: unset;
          bottom: -2rem;
          transform: translateX(-50%) rotate(90deg);
          left: 50%;
          right: unset;
        }
        
        figure {
          height: auto;

          img {
            width: 10rem;
          }
        }
      }
    }
  }
`

const RecruitingProcess: React.FC = () => {
  const blocks = useMemo(() => ([
    {image: '/images/career/recruiting/cv_review.png', title: 'CV screening'},
    {image: '/images/career/recruiting/interview.png', title: 'interview (technical part & non-technical part)'},
    {image: '/images/career/recruiting/skills_evaluation.png', title: 'programming task'},
    {image: '/images/career/recruiting/technical_interview.png', title: 'skills evaluation and feedback'},
  ]), [])

  return (
    <Section>
      <SectionTitle>recruiting process</SectionTitle>

      <Columns className='columns is-multiline has-justify-content-center'>
        {blocks.map((block, index) => (
          <div key={block.title} className='column is-one-quarter has-text-centered'>
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
