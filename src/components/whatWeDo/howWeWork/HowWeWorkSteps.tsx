import React from 'react'
import styled from 'styled-components'
import WhatWeDoArrows from '../../../assets/whatWeDoArrows.svg'
import ProjectDevelopment from '../../../assets/projectDevelopment.svg'
import SoftwareDevelopment from '../../../assets/softwareDevelopment.svg'
import RequirementsElicitation from '../../../assets/requirmentsElicitation.svg'
import ProductDesign from '../../../assets/productDesignWithArrow.svg'
import QualityAssurance from '../../../assets/qualityAssurance.svg'
import Ideation from '../../../assets/ideation.svg'
import Maintenance from '../../../assets/maintenance.svg'
import variables from '../../../styles/variables'
import { CustomSectionInner, CustomTextTitle, TextRegular, TextTitle } from '../../shared'

const Container = styled.div({
  marginTop: '116px',
  marginBottom: '186px',

  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  [`@media screen and (max-width: 1540px)`]: {
    marginTop: '127px',
    marginBottom: '116px',
  },
  [`@media screen and (max-width: 1240px)`]: {
    marginTop: '83px',
  },
  [`@media screen and (max-width: 581px)`]: {
    marginTop: '83px',
    marginBottom: '83px',
  },
})

const ContentWrapper = styled.div({
  maxWidth: '1240px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  padding: '0px 20px',

  // TODO
  // backgroundImage: "url(/images/whatWeDoArrows.svg)",
})

const SectionTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',

  width: '100%',
  marginBottom: '36px',
  [`@media screen and (max-width: 992px)`]: {
    justifyContent: 'center',
    marginBottom: '24px',
  },
})

const Title = styled(CustomTextTitle)({
  maxWidth: '955px',
  margin: '0',

  color: variables.color.text,
  textTransform: 'lowercase',
})

const Description = styled(TextRegular)`
  margin-top: 0;
  line-height: ${variables.pxToRem(40)};

  color: ${variables.color.text};
  text-align: left;
  & p:not(:last-of-type) {
    margin-bottom: ${variables.pxToRem(20)};
  }
  @media ${variables.device.mobile} {
    line-height: ${variables.pxToRem(28)};
  }
`

const StepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;

  & :not(:first-of-type) {
    margin-top: ${variables.pxToRem(76)};
  }

  & svg {
    width: 150px;
    margin-top: ${variables.pxToRem(87)};
  }
  @media ${variables.device.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 35px;
    & :not(:first-of-type) {
      margin-top: ${variables.pxToRem(83)};
    }
    & svg {
      margin-top: 0;
    }
  }
  @media ${variables.device.mobile} {
    gap: 25px;
    & :not(:first-of-type) {
      margin-top: ${variables.pxToRem(64)};
    }
    & svg {
      width: auto;
      height: 74px;
    }
  }
`
const StepNumber = styled.span`
  font-size: ${variables.pxToRem(42)};
  font-weight: 700;
  line-height: ${variables.pxToRem(41)};
  color: ${variables.color.text};
  @media ${variables.device.laptop} {
    font-size: ${variables.pxToRem(38)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(26)};
    line-height: ${variables.pxToRem(30)};
  }
`
const DescriptionWrapper = styled.div``

const HowWeWorkSteps = () => {
  return (
    <Container>
      <ContentWrapper>
        <StepWrapper>
          <Ideation />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>01</StepNumber>
                <Title>Ideation</Title>
              </SectionTitle>
              <Description>
                <p>
                  {' '}
                  We’ll help you evaluate if your idea stands a chance in the market. You can count not only on an
                  in-depth analysis of the industry you want to enter, but also on our candidness. Namely, if we find
                  that your app idea has a low probability of succeeding, we’ll tell you straight away.
                </p>{' '}
                <p>
                  Don’t be discouraged, though! If so, we’ll help you work out an alternative that responds to a genuine
                  market need.
                </p>
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <RequirementsElicitation />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>02</StepNumber>
                <Title>Requirements elicitation</Title>
              </SectionTitle>
              <Description>
                We organize workshops to dig deep into your project’s needs and requirements. Depending on the project,
                this can, for instance, take on the form of brainstorming or so-called “scoping sessions”. All so we can
                fully understand what needs to be done to bring the best possible version of your product to the market.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <ProjectDevelopment />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>03</StepNumber>
                <Title>Project development</Title>
              </SectionTitle>
              <Description>
                We’ll be more than delighted to organize Agile workshops for you and your team. This way, we’ll help you
                quickly get a grasp of what this leading project management methodology brings to the table! It will
                also help you understand how we plan and prioritize our work in order to bring your product to the
                market.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <ProductDesign />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>04</StepNumber>
                <Title>Product design</Title>
              </SectionTitle>
              <Description>
                We’ll be more than delighted to organize Agile workshops for you and your team. This way, we’ll help you
                quickly get a grasp of what this leading project management methodology brings to the table! It will
                also help you understand how we plan and prioritize our work in order to bring your product to the
                market.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <SoftwareDevelopment />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>05</StepNumber>
                <Title>Software development</Title>
              </SectionTitle>
              <Description>
                We represent the highest possible software development standards. Our development and design teams put a
                strong emphasis on innovation and optimization. This means that we don’t have a hard time bidding
                farewell to obsolete technology and constantly try out new solutions.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <QualityAssurance />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>06</StepNumber>
                <Title>Quality assurance</Title>
              </SectionTitle>
              <Description>
                Our QA team will make sure that your software is always up-and-running and offers the best possible
                performance. Rest assured that your project will be in safe hands and nothing will disrupt its sound
                functioning.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>

        <StepWrapper>
          <Maintenance />
          <DescriptionWrapper>
            <CustomSectionInner>
              <SectionTitle>
                <StepNumber>07</StepNumber>
                <Title>Maintenance</Title>
              </SectionTitle>
              <Description>
                Our QA team will make sure that your software is always up-and-running and offers the best possible
                performance. Rest assured that your project will be in safe hands and nothing will disrupt its sound
                functioning.
              </Description>
            </CustomSectionInner>
          </DescriptionWrapper>
        </StepWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default HowWeWorkSteps
