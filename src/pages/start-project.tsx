// ---
// layout: default
// title: Estimate a project
// description:
// redirect_from: ["/estimate", "/estimate/"]
// ---

import React from 'react'

import { Page } from '../layout/Page'
import { HelmetMetaData } from '../meta/HelmetMetaData'
import { CustomSection, CustomSectionTitle, FlexWrapper, TextRegular } from '../components/shared'
import styled from 'styled-components'
import variables from '../styles/variables'
import { CustomPageTitle } from './../components/shared/index'
import StartProjectContact from '../components/start-project/StartProjectContact'

const QuoteTextRegular = styled(TextRegular)`
  font-weight: 400;
  font-size: ${variables.pxToRem(24)};
  line-height: ${variables.pxToRem(45)};
  font-style: italic;
  & span {
    color: ${variables.color.primary};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
  }
`
const SignatureQuote = styled(TextRegular)`
  font-weight: 700;
  font-size: ${variables.pxToRem(24)};
  line-height: ${variables.pxToRem(29)};

  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(18)};
    line-height: ${variables.pxToRem(22)};
  }
`

const StartProjectPage: React.FC = () => {
  return (
    <Page>
      <HelmetMetaData
        title='Estimate a project'
        description='Estimate your project based on a description and technologies'
      />
      <CustomSection
        paddingProps='0 240px 124px'
        paddingLaptop='0 80px 127px'
        paddingTabletXL='0 137px 64px'
        paddingTablet='0 36px 48px'
        paddingMobileProps='0 18px 24px '
      >
        <CustomSection
          paddingProps='74px 0 138px'
          paddingLaptop='74px 0 138px'
          paddingTabletXL='74px 0 138px'
          paddingTablet='58px 0 106px'
          paddingMobileProps='34px 0 58px'
        >
          <CustomPageTitle
            mobileFontSize='32px'
            tabletFontSize='38px'
            tabletXLFontSize='38px'
            laptopFontSize='44px'
            fontSize='48px'
          >
            let’s talk about your product idea
          </CustomPageTitle>
        </CustomSection>

        <FlexWrapper desktopGap='64px' mobileDirection='column' desktopDirection='row' tabletDirection='column'>
          <FlexWrapper desktopDirection='column' desktopBasis='48%' desktopGap='48px'>
            <CustomSectionTitle
              margin='0'
              laptopMargin='0'
              tabletXLMargin='0'
              tabletMargin='0'
              mobileMargin='0 '
              style={{ textAlign: 'left', textTransform: 'lowercase' }}
            >
              What our clients say
            </CustomSectionTitle>
            <QuoteTextRegular>
              We have found Bright Inventions to be <span>professional group of people, that we feel we can trust</span>
              , as an integral part of our company, not only to deliver in the right quality, but be proactive,
              contribute from their to help us shape the company’s R&D and product.
            </QuoteTextRegular>
            <SignatureQuote>Eyal Capri - VP R&D at Circles</SignatureQuote>
          </FlexWrapper>
          <StartProjectContact
            formButton='Business Contact Form Button'
            actionFormButton='Click Submit Business Form'
          />
        </FlexWrapper>
      </CustomSection>
    </Page>
  )
}

export default StartProjectPage
