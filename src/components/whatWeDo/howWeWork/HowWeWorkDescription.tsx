import React from 'react'
import styled from 'styled-components'
import variables from '../../../styles/variables'
import { CustomSectionTitle, SectionTitle, TextRegular, CustomSectionInner } from '../../shared'

const Container = styled.div({
  color: variables.color.text,

  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})

export const ContentWrapper = styled.div({
  maxWidth: '1240px',

  display: 'flex',
  flexDirection: 'column',

  padding: '0px 20px',
  [`@media screen and (max-width: 540px)`]: {
    padding: '0px 18px',
  },
})

export const ParagraphTextWrapper = styled(TextRegular)`
  margin-top: 55px;

  text-align: left;

  color: ${variables.color.text};
  & :first-child {
    margin-top: 0;
  }
`

export const ParagraphHeader = styled(SectionTitle)({
  marginTop: '105px',
})

const HowWeWorkDescription = () => {
  return (
    <Container>
      <ContentWrapper>
        <CustomSectionTitle
          margin='11.625rem 0 4rem'
          laptopMargin='7.25rem 0 4rem'
          mobileMargin='5.1875rem 1.125rem 3rem'
        >
          how we work
        </CustomSectionTitle>
        <CustomSectionInner>
          <ParagraphTextWrapper>
            At Bright Inventions, we contribute to the business success of a project by offering our expertise during
            all its development phases.
          </ParagraphTextWrapper>
          <ParagraphTextWrapper>
            We leverage our strategic location in Poland – the heart of Europe – to combine remote, daily work with
            on-site collaboration with partners whenever need be.
          </ParagraphTextWrapper>
          <ParagraphTextWrapper>
            As our projects come to an end, we happily give our clients a helping hand in growing their internal
            software development teams to take over product development long-term.
          </ParagraphTextWrapper>
          <ParagraphTextWrapper>We’re there for you at all project development stages:</ParagraphTextWrapper>
        </CustomSectionInner>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkDescription
