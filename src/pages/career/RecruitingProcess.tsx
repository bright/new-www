import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Section, SectionTitle } from '../../components/shared'
import variables from '../../styles/variables'

const RecruitingTitle = styled(SectionTitle)`
  margin-bottom: 4rem;
  @media ${variables.device.mobile} {
    font-size: 1.375rem;
  }
`

const Columns = styled.div`
  .column {
    position: relative;
    padding: 1rem 2rem;

    &:not(.is-half):after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 1.5rem;
      height: 1.1rem;
      content: '';
      background-image: url('/images/career/arrow.svg');
      background-size: cover;
    }
    &:nth-of-type(3) figure img {
      padding-top: 20px;
    }
    &:nth-child(n + 4):after {
      display: none;
    }
    &:first-of-type {
      padding-left: 0;
    }
    &:nth-of-type(4) {
      padding-right: 0;
    }
    &:last-of-type {
      padding: 5.375rem 0 5.625rem 0;
    }
    &:last-of-type p {
      font-size: 1.75rem;
      margin-top: 4.25rem;
    }

    figure img {
      max-height: 14.875rem;
      object-fit: contain;
    }

    &.is-half figure img {
      width: 100%;
      max-height: 58.25rem;
    }

    p {
      margin-top: 2rem;
      font-size: 1.375rem;
      font-weight: 700;
    }
  }

  @media ${variables.device.mobile} {
    && {
      .column {
        margin-bottom: 4.5625rem;
        padding: 0 1.125rem;

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
          margin: 0 auto;
        }
        p {
          font-size: 1.125rem;
        }
      }
    }
  }
`

const RecruitingProcess: React.FC = () => {
  const blocks = useMemo(
    () => [
      { image: '/images/career/recruiting/cv_review.png', title: 'CV screening' },
      { image: '/images/career/recruiting/interview.png', title: 'interview (technical part & non-technical part)' },
      { image: '/images/career/recruiting/skills_evaluation.png', title: 'programming task' },
      { image: '/images/career/recruiting/technical_interview.png', title: 'skills evaluation and feedback' },
    ],
    []
  )

  return (
    <Section>
      <RecruitingTitle>recruiting process</RecruitingTitle>

      <Columns className='columns is-multiline has-justify-content-center'>
        {blocks.map((block, index) => (
          <div key={block.title} className='column is-one-quarter has-text-centered'>
            <figure className='image is-inline-block'>
              <img src={block.image} alt={block.title} />
            </figure>
            <p>
              {index + 1}. {block.title}
            </p>
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
