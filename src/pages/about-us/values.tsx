import React from 'react'
import styled from 'styled-components'

import {
  TextRegular,
  CustomSectionTitle,
  CustomSectionInner,
  CustomTextTitle,
  CustomSection,
} from '../../components/shared'

import ResponsibilityIcon from '../../assets/responsibility.svg'
import FlexibilityIcon from '../../assets/flexibility.svg'
import TeamworkIcon from '../../assets/teamwork.svg'
import PositiveAttitudeIcon from '../../assets/positive_Attitude.svg'
import ClientOrientationIcon from '../../assets/client-orientation.svg'
import variables from '../../styles/variables'

const Container = styled.div`
  max-width: 960px;
  margin: auto auto;
  font-size: 1.375rem;
  line-height: 2.5rem;
  && h3 {
    text-transform: lowercase;
  }
`

const Value = styled.div`
  display: flex;
  gap: ${variables.pxToRem(34)};
  justify-items: center;
  margin-top: ${variables.pxToRem(64)};
  && figure {
    & svg {
      width: 142px;
      margin-top: ${variables.pxToRem(63)};
    }
  }
  @media ${variables.device.laptop} {
    gap: ${variables.pxToRem(70)};
  }
  @media ${variables.device.tablet} {
    gap: ${variables.pxToRem(27)};
    flex-direction: column;
    align-items: center;
    margin-top: ${variables.pxToRem(83)};
    && figure {
      & svg {
        width: 142px;
        margin-top: 0;
      }
    }
  }
  @media ${variables.device.mobile} {
    gap: ${variables.pxToRem(18)};

    && figure {
      & svg {
        width: ${variables.pxToRem(100)};
        height: auto;
        margin-top: 0;
      }
    }
  }
`
const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media ${variables.device.tablet} {
    align-items: center;
  }
`

export default function Values() {
  return (
    <CustomSection paddingMobileProps='0 1.125rem' paddingTablet='0 2.25rem' paddingProps='0 2.25rem'>
      <Container>
        <CustomSectionTitle margin='186px 0 64px' mobileMargin='83px 0 44px'>
          teamwork, responsibility and positive mindset
        </CustomSectionTitle>
        <CustomSectionInner>
          <TextRegular>
            We believe that bright ideas and bright products come out of bright minds. The success of projects we do is
            completely sustained by our team and values we are committed to. We work together making the most of
            experience and expertise we have.
          </TextRegular>
        </CustomSectionInner>

        <Value>
          <figure>
            <ResponsibilityIcon />
          </figure>
          <CustomSectionInner>
            <DescriptionWrapper>
              <CustomTextTitle margin='0 0 36px'>Responsibility</CustomTextTitle>
              <TextRegular>
                We support and share responsibility with the members of our team. We also actively take responsibility
                for our own self-development. Integrity, thoughtfulness and a sense of urgency is a crucial and
                elemental part of our success. Everything is everyone’s responsibility and we own our collective results
                together.
              </TextRegular>
            </DescriptionWrapper>
          </CustomSectionInner>
        </Value>
        <Value>
          <figure>
            <FlexibilityIcon />
          </figure>
          <CustomSectionInner>
            <DescriptionWrapper>
              <CustomTextTitle margin='0 0 36px'>Flexibility</CustomTextTitle>
              <TextRegular>
                We balance ambition with flexibility because what matters is the final result. We are nimble. We evolve
                and adapt. People who work here are not afraid of taking risk and making mistakes as long as we learn
                from them. We encourage the diversity of thought.
              </TextRegular>
            </DescriptionWrapper>
          </CustomSectionInner>
        </Value>

        <Value>
          <figure>
            <TeamworkIcon />
          </figure>
          <CustomSectionInner>
            <DescriptionWrapper>
              <CustomTextTitle margin='0 0 36px'>Teamwork</CustomTextTitle>
              <TextRegular>
                It is only through teamwork that we achieve brightness. We are committed to helping our customers by
                working together with equal parts of humility and ambition. We know each others' strengths and we also
                can ask for help when we need. We work together to bring our passions and expertise to make Bright
                Inventions the best place it can be.
              </TextRegular>
            </DescriptionWrapper>
          </CustomSectionInner>
        </Value>

        <Value>
          <figure>
            <PositiveAttitudeIcon />
          </figure>
          <CustomSectionInner>
            <DescriptionWrapper>
              <CustomTextTitle margin='0 0 36px'>Positive attitude</CustomTextTitle>
              <TextRegular>
                We love what we do and the people around us. In fact, we believe that happy people are more motivated,
                efficient and creative, so we bring a positive attitude to everything we do. It's good for you, for the
                team, and for our customers.
              </TextRegular>
            </DescriptionWrapper>
          </CustomSectionInner>
        </Value>

        <Value>
          <figure>
            <ClientOrientationIcon />
          </figure>
          <CustomSectionInner>
            <DescriptionWrapper>
              <CustomTextTitle margin='0 0 36px'>Client orientation</CustomTextTitle>
              <TextRegular>
                We are only successful if our clients are - and that drives everything we do. Clients trust us to build
                things that work and we take that seriously. Our team will overcome obstacles, find solutions and
                deliver results on time. Every action we take enables our clients to make a bigger impact on the world.
              </TextRegular>
            </DescriptionWrapper>
          </CustomSectionInner>
        </Value>
      </Container>
    </CustomSection>
  )
}
