import React from "react"
import styled from "styled-components"
import variables from "../../styles/variables"
import { HideTablet, SectionBlack } from './index'

const ContentContainer = styled.div({
  maxWidth: "1545px",

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",

  flexWrap: "wrap",

  padding: "0px 20px",
})

const Pill = styled.div({
  border: "1px solid rgba(212,212,212,0.75)",
  height: "42px",

  textAlign: "center",
  fontSize: "18px",
  fontFamily: variables.font.title.family,
  color: variables.color.white,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  padding: "0px 18px",
  marginRight: "24px",

  marginTop: "9px",
  marginBottom: "9px",
})

export const TechnologyTags = () => {
  return (
    <HideTablet>
      <SectionBlack>
        <ContentContainer>
          <Pill>Android</Pill>
          <Pill>iOS</Pill>
          <Pill>Kotlin</Pill>
          <Pill>C#</Pill>
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
        </ContentContainer>
      </SectionBlack>
    </HideTablet>
  )
}
