// ---
// layout: default
// title: Estimate a project
// description:
// redirect_from: ["/estimate", "/estimate/"]
// ---

import React from 'react'

import { Page } from '../layout/Page'
import { CustomSection, CustomSectionTitle, FlexWrapper, TextRegular } from '../components/shared'
import styled from 'styled-components'
import variables from '../styles/variables'
import { CustomPageTitle } from './../components/shared/index'
import StartProjectContact from '../components/start-project/StartProjectContact'
import { clampBuilder } from '../helpers/clampBuilder'
import image from '../../static/images/inverted-commas.svg'
import { SEO } from '../meta/SEO'

const QuoteTextRegular = styled(TextRegular)`
  font-weight: 400;
  font-size: ${variables.pxToRem(24)};
  line-height: ${variables.pxToRem(45)};
  font-style: italic;
  position: relative;
  &::after {
    content: '';
    background: url(${image});
    background-repeat: no-repeat;
    position: absolute;
    top: ${variables.pxToRem(-23)};
    left: 0;
    width: ${variables.pxToRem(135.73)};
    height: ${variables.pxToRem(99.96)};
    z-index: -1;
  }
  & span {
    color: ${variables.color.text};
    font-style: normal;
    font-weight: 700;
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(16)};
    &::after {
      background-size: ${variables.pxToRem(100)} ${variables.pxToRem(74)};
      top: 0;
    }
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

export const Head = () => <SEO
  title='Estimate a project'
  description='Estimate your project based on a description and technologies'
/>

const StartProjectPage: React.FC = () => {
  return (
    <Page>
      <CustomSection
        paddingProps='0 240px 124px'
        paddingLaptop='0 80px 127px'
        paddingTabletXL='0 137px 64px'
        paddingTablet='0 36px 48px'
        paddingMobileProps='0 18px 24px '
      >
        <CustomSection
          paddingProps='58px 0 106px'
          paddingLaptop='58px 0 106px'
          paddingTabletXL='58px 0 106px'
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
              We have found Bright Inventions to be <span>a professional group of people, that we feel we can trust</span>
              , as an integral part of our company, not only to deliver in the right quality, but be proactive,
              contribute from their to help us shape the company’s R&D and product.
            </QuoteTextRegular>
            <SignatureQuote>Kobi Avriel - VP R&D at Circles</SignatureQuote>
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
