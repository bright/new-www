import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { SectionBlack } from './index'
import { CustomContainer } from './index.styled'

const SectionBlackContainer = styled(SectionBlack)`
  padding: 6rem 15rem;
  @media ${variables.device.laptop} {
    padding: 4rem 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 4rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 4rem 2.25rem;
  }

  @media ${variables.device.mobile} {
    padding: 4rem 1.875rem;
  }
`

const ContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  margin: 'auto',
  maxWidth: '1650px',

  ['@media screen and (max-width: 767px)']: {
    justifyContent: 'flex-start',
    padding: '0px 15px',
  },
})

const Pill = styled.div({
  border: '1px solid rgba(211, 211, 211, .47)',

  textAlign: 'center',
  fontSize: '22px',
  lineHeight: '27px',
  fontFamily: variables.font.title.family,
  color: variables.color.white,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '16px 18px',
  marginRight: '10px',

  marginTop: '9px',
  marginBottom: '9px',
  ['&:last-of-type']: {
    marginRight: '0px',
  },

  ['@media screen and (max-width: 767px)']: {
    fontSize: '18px',
    lineHeight: '27px',
    padding: '13px 16px',

    margin: '0px 18px 18px 0px',
    ['&:nth-of-type(8)']: {
      marginRight: '0px',
    },
  },
})

const TechnologyTags = () => {
  return (
    <SectionBlackContainer>
      <CustomContainer>
        <ContentContainer>
          <Pill>iOS</Pill>
          <Pill>Kotlin</Pill>
          <Pill>Blockchain</Pill>
          <Pill>Java</Pill>
          <Pill>Spring</Pill>
          <Pill>TypeScript</Pill>
          <Pill>React</Pill>
          <Pill>Angular</Pill>
          <Pill>Node.js</Pill>
          <Pill>NestJS</Pill>
          <Pill>MySQL</Pill>
          <Pill>PostgreSQL</Pill>
          <Pill>Swift</Pill>
          <Pill>AWS</Pill>
          <Pill>Bluetooth</Pill>
          <Pill>iBeacon</Pill>
          <Pill>IoT</Pill>
        </ContentContainer>
      </CustomContainer>
    </SectionBlackContainer>
  )
}
export default TechnologyTags
