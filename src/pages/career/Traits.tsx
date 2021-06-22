import React from 'react'
import styled from 'styled-components'

import { Section, SectionInner, SectionTitle, TextRegular } from '../../components/shared'

const SectionTitleEx = styled(SectionTitle)`
  text-align: center;
`

const TextTitle = styled.h4`
  margin: 3rem 0 2rem;
  font-weight: 700;
  font-size: 1.5rem;
`

const Traits: React.FC = () => {
  return (
    <div className='container'>
      <Section>
        <SectionInner>
          <SectionTitleEx>teamwork, responsibility and positive mindset</SectionTitleEx>
          <TextRegular>
            We believe that bright ideas and bright products come out of bright minds.
            We work together making the most of experience and expertise we have.
          </TextRegular>

          <TextTitle>Teamwork</TextTitle>
          <TextRegular>
            It is only through teamwork that we achieve brightness. We are committed to helping our customers by
            working together with equal parts of humility and ambition. We know each others’ strengths and we also can
            ask for help when we need. We work together to bring our passions and expertise to make Bright Inventions
            the best place it can be.
          </TextRegular>

          <TextTitle>Responsibility</TextTitle>
          <TextRegular>
            We support and share responsibility with the members of our team. We also actively take responsibility
            for our own self-development. Integrity, thoughtfulness and a sense of urgency is a crucial and elemental
            part of our success. Everything is everyone’s responsibility and we own our collective results together.
          </TextRegular>

          <TextTitle>Positive attitude</TextTitle>
          <TextRegular>
            We love what we do and the people around us. In fact, we believe that happy people are more motivated,
            efficient and creative, so we bring a positive attitude to everything we do. It’s good for you, for the
            team, and for our customers.
          </TextRegular>

          <TextTitle>Flexibility</TextTitle>
          <TextRegular>
            We balance ambition with flexibility because what matters is the final result. We are nimble. We evolve
            and adapt. People who work here are not afraid of taking risk and making mistakes as long as we learn
            from them. We encourage the diversity of thought.
          </TextRegular>

          <TextTitle>Client orientation</TextTitle>
          <TextRegular>
            We are only successful if our clients are - and that drives everything we do. Clients trust us to
            build things that work and we take that seriously. Our team will overcome obstacles, find solutions
            and deliver results on time. Every action we take enables our clients to make a bigger impact on
            the world
          </TextRegular>
        </SectionInner>
      </Section>
    </div>
  )
}

export default Traits
