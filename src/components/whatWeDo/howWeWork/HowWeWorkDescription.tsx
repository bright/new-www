import React from 'react'
import styled from 'styled-components'
import variables from '../../../styles/variables'
import { SectionTitle, TextRegular } from '../../shared'

const Container = styled.div({
  color: variables.color.text,

  marginTop: '131px',

  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

export const ContentWrapper = styled.div({
  maxWidth: '1240px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  padding: '0px 20px',
})

export const ParagraphTextWrapper = styled(TextRegular)({
  marginTop: '55px',

  textAlign: 'left',

  color: variables.color.text,
})

export const ParagraphHeader = styled(SectionTitle)({
  marginTop: '105px',
})

const HowWeWorkDescription = () => {
  return (
    <Container>
      <ContentWrapper>
        <ParagraphTextWrapper>
          We help shape our clients’ success stories at all software development stages – from ideation and
          requirements’ elicitation, through product design and bespoke software development, to quality assurance and
          maintenance.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          Regardless of the project development stage you’re in, we’re here to help bring your ideas to life.
        </ParagraphTextWrapper>

        <ParagraphHeader>how we work</ParagraphHeader>

        <ParagraphTextWrapper>
          Nothing feels equally rewarding as seeing the projects we work with our clients on grow into highly successful
          ventures. We firmly believe that we can contribute to the business success of a project by offering our
          expertise during all its development phases.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          At Bright Inventions, we put communication and transparency at the core and aim at being much more than just
          external consultants entrusted with a job. We also leverage our strategic location in the heart of Europe to
          combine remote, daily work with on-site collaboration with partners whenever need be.
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>
          As our projects come to an end, we happily give our clients a helping hand in growing their internal software
          development teams to take over product development long-term. We’re there for you at all project development
          stages – after all, that’s what business partners are for!
        </ParagraphTextWrapper>
        <ParagraphTextWrapper>Here’s a step-by-step breakdown of our process:</ParagraphTextWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkDescription
