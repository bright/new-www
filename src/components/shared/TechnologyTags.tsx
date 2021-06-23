import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { SectionBlack } from './index'

const SectionBlackContainer = styled(SectionBlack)`
  padding: 3rem 1.5rem;

  @media ${variables.device.mobile} {
    padding: 2rem 0.5rem;
  }
`

const ContentContainer = styled.div({
  maxWidth: '1545px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  flexWrap: 'wrap',

  padding: '0px 20px',
  margin: 'auto',

  ['@media screen and (max-width: 767px)']: {
    justifyContent: 'flex-start',
    padding: '0px 15px',
  },
})

const Pill = styled.div({
  border: '1px solid rgba(212,212,212,0.75)',
  height: '42px',

  textAlign: 'center',
  fontSize: '18px',
  fontFamily: variables.font.title.family,
  color: variables.color.white,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '0px 18px',
  marginRight: '24px',

  marginTop: '9px',
  marginBottom: '9px',

  ['@media screen and (max-width: 767px)']: {
    fontSize: '12px',
    height: '32px',
    padding: '0px 10px',

    margin: '6px 12px 6px 0px',
  },
})

export const TechnologyTags = () => {
  return (
    <SectionBlackContainer>
      <ContentContainer>
        <Pill>Android</Pill>
        <Pill>iOS</Pill>
        <Pill>Kotlin</Pill>
        <Pill>Blockchain/Pill>
        <Pill>Java</Pill>
        <Pill>Spring</Pill>
        <Pill>Kotlin</Pill>
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
    </SectionBlackContainer>
  )
}
