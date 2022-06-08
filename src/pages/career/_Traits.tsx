import React from 'react'
import styled from 'styled-components'

import {
  CustomSection,
  Section,
  SectionInner,
  SectionTitle,
  TextRegular,
  CustomSectionTitle,
  CustomSectionInner,
  FlexWrapper,
  CustomTextTitle,
} from '../../components/shared'
import variables from '../../styles/variables'
import ResponsibilityIcon from '../../assets/responsibility.svg'
import FlexibilityIcon from '../../assets/flexibility.svg'
import TeamworkIcon from '../../assets/teamwork.svg'
import PositiveAttitudeIcon from '../../assets/positive_Attitude.svg'
import ClientOrientationIcon from '../../assets/client-orientation.svg'
// import { TextRegular } from './../../components/shared/index'

const SectionTitleEx = styled(CustomSectionTitle)`
  margin-bottom: 4rem;
  font-size: 2.5rem;
  line-height: 2.625rem;
  font-weight: 900;
  @media ${variables.device.laptop} {
    font-size: 2.125rem;
  }

  @media ${variables.device.mobile} {
    font-size: 1.125rem;
    margin-bottom: 2.75rem;
    text-align: left;
  }
`

const TextTitle = styled(CustomTextTitle)`
  margin: 0 0 36px;
  text-align: left;
  text-transform: lowercase;
  @media ${variables.device.laptop} {
    font-size: 1.5625rem;
  }

  @media ${variables.device.tablet} {
    text-align: center;
  }

  @media ${variables.device.mobile} {
    font-size: 1.125rem;
  }
`
const TextRegularTraits = styled(TextRegular)`
  color: ${variables.color.text};

  @media ${variables.device.laptop} {
    font-size: 1.25rem;
  }

  @media ${variables.device.mobile} {
    font-size: 1rem;
    margin-bottom: 2.75rem;
    text-align: left;
    &:last-of-type {
      margin-bottom: 2.125rem;
    }
  }
`
const TraitsFigure = styled.figure`
  & svg {
    width: 142px;
    margin-top: ${variables.pxToRem(48)};
  }
  @media ${variables.device.tablet} {
    margin: 0 auto;
    & svg {
      width: 48px;
      margin-top: ${variables.pxToRem(0)};
    }
  }
`
const Wrapper = styled.div`
  margin-top: ${variables.pxToRem(64)};
  @media ${variables.device.tablet} {
    margin-top: ${variables.pxToRem(83)};
  }
`

const Traits: React.FC = () => {
  return (
    <div className='container'>
      <CustomSection>
        <CustomSectionInner>
          <SectionTitleEx>teamwork, responsibility and positive mindset</SectionTitleEx>
          <TextRegularTraits>
            We believe that bright ideas and bright products come out of bright minds. We work together making the most
            of experience and expertise we have.
          </TextRegularTraits>
          <Wrapper>
            <FlexWrapper
              desktopGap='34px'
              laptopGap='70px'
              tabletDirection='column'
              tabletGap='27px'
              tabletContent='center'
            >
              <TraitsFigure>
                <ResponsibilityIcon />
              </TraitsFigure>
              <div>
                <TextTitle>Responsibility</TextTitle>
                <TextRegularTraits>
                  We support and share responsibility with the members of our team. We also actively take responsibility
                  for our own self-development. Everything is everyone’s responsibility and we own our collective
                  results together.
                </TextRegularTraits>
              </div>
            </FlexWrapper>
          </Wrapper>
          <Wrapper>
            <FlexWrapper desktopGap='34px' laptopGap='70px' tabletDirection='column' tabletGap='27px'>
              <TraitsFigure>
                <FlexibilityIcon />
              </TraitsFigure>
              <div>
                <TextTitle>Flexibility</TextTitle>
                <TextRegularTraits>
                  We balance ambition with flexibility because what matters is the final result. We are nimble. We
                  evolve and adapt. People who work here are not afraid of taking risk and making mistakes as long as we
                  learn from them. We encourage the diversity of thought.
                </TextRegularTraits>
              </div>
            </FlexWrapper>
          </Wrapper>
          <Wrapper>
            <FlexWrapper desktopGap='34px' laptopGap='70px' tabletDirection='column' tabletGap='27px'>
              <TraitsFigure>
                <TeamworkIcon />
              </TraitsFigure>
              <div>
                <TextTitle>Teamwork</TextTitle>
                <TextRegularTraits>
                  It is only through teamwork that we achieve brightness. We know each others’ strengths and we also can
                  ask for help when we need. We work together to bring our passions and expertise to make Bright
                  Inventions the best place it can be.
                </TextRegularTraits>
              </div>
            </FlexWrapper>
          </Wrapper>
          <Wrapper>
            <FlexWrapper desktopGap='34px' laptopGap='70px' tabletDirection='column' tabletGap='27px'>
              <TraitsFigure>
                <PositiveAttitudeIcon />
              </TraitsFigure>
              <div>
                <TextTitle>Positive attitude</TextTitle>
                <TextRegularTraits>
                  We love what we do and the people around us. In fact, we believe that happy people are more motivated,
                  efficient and creative, so we bring a positive attitude to everything we do.
                </TextRegularTraits>
              </div>
            </FlexWrapper>
          </Wrapper>
          <Wrapper>
            <FlexWrapper desktopGap='34px' laptopGap='70px' tabletDirection='column' tabletGap='27px'>
              <TraitsFigure>
                <ClientOrientationIcon />
              </TraitsFigure>
              <div>
                <TextTitle>Client orientation</TextTitle>
                <TextRegularTraits>
                  We are only successful if our clients are - and that drives everything we do. Our team will overcome
                  obstacles, find solutions and deliver results on time. Every action we take enables our clients to
                  make a bigger impact on the world.
                </TextRegularTraits>
              </div>
            </FlexWrapper>
          </Wrapper>
        </CustomSectionInner>
      </CustomSection>
    </div>
  )
}

export default Traits
