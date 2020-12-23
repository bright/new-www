import React from "react"
import styled from "styled-components"
import variables from "../../../styles/variables"

const Container = styled.div({
  height: "345px",
  width: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: variables.blackBannerBackground,
})

const ContentContainer = styled.div({
  maxWidth: "1545px",

  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",

  flexWrap: "wrap",

  padding: "0px 20px",
})

const Pill = styled.div({
  border: "1px solid #d4d4d4",
  height: "58px",

  textAlign: "center",
  fontSize: "22px",
  lineHeight: "27px",
  fontFamily: variables.headerFont,
  color: variables.white,

  padding: "16px 18px",
  marginRight: "24px",
  marginTop: "19px",
})

const ShowcaseBanner = () => {
  return (
    <Container>
      <ContentContainer>
        <Pill>Android</Pill>
        <Pill>iOS</Pill>
        <Pill>ReactJS</Pill>
        <Pill>AngularJS</Pill>
        <Pill>Java</Pill>
        <Pill>Kotlin</Pill>
        <Pill>Swift</Pill>
        <Pill>C#</Pill>
      </ContentContainer>
    </Container>
  )
}

export default ShowcaseBanner
