import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { SectionBlack } from './index'
import { CustomContainer, CustomSectionTitle, SectionTitle } from './index.styled'

const SectionBlackContainer = styled(SectionBlack)`
  padding: ${variables.pxToRem(64)} 15rem;
  @media ${variables.device.laptop} {
    padding: ${variables.pxToRem(40)} 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: ${variables.pxToRem(40)} 9rem;
  }
  @media ${variables.device.tablet} {
    padding: ${variables.pxToRem(32)} 2.25rem;
  }

  @media ${variables.device.mobile} {
    padding: ${variables.pxToRem(32)} 1.875rem;
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

interface TechnologyTagsProps {
  tags?: string[]
}

const TechnologyTags = ({ tags }: TechnologyTagsProps) => {
  return (
    <SectionBlackContainer>
      <CustomSectionTitle
        margin='0 0 40px'
        laptopMargin='0 0 32px'
        tabletXLMargin='0 0 32px'
        tabletMargin='0 0 32px'
        mobileMargin='0 0 32px'
        style={{ color: `${variables.color.white}` }}
      >
        we work with
      </CustomSectionTitle>

      <CustomContainer>
        <ContentContainer>
          {tags ? (
            tags.map((tag: string) => <Pill key={tag}>{tag}</Pill>)
          ) : (
            <>
              <Pill>Kotlin</Pill>
              <Pill>Java</Pill>
              <Pill>Swift</Pill>
              <Pill>Spring</Pill>
              <Pill>TypeScript</Pill>
              <Pill>React</Pill>
              <Pill>Node.js</Pill>
              <Pill>NestJS</Pill>
              <Pill>MySQL</Pill>
              <Pill>PostgreSQL</Pill>
              <Pill>Substrate</Pill>
              <Pill>Rust</Pill>
              <Pill>Ethereum</Pill>
              <Pill>AWS</Pill>
              <Pill>iBeacon</Pill>
            </>
          )}
        </ContentContainer>
      </CustomContainer>
    </SectionBlackContainer>
  )
}
export default TechnologyTags
