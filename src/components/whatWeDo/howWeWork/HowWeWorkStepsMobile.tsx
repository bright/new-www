import React from "react"
import styled from "styled-components"

const Container = styled.div({
  marginTop: "99px",
  width: "100%",
  height: "318px",
  background: "#F7931E 0% 0% no-repeat padding-box",

  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  alignItems: "center",

  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

const ProcessImage = styled.img({
  marginTop: "29px",
  paddingLeft: "18px",
  paddingRight: "18px",
})

const Header = styled.div({
  textAlign: "center",

  fontSize: "22px",
  lineHeight: "26px",
  fontFamily: "Montserrat",
  fontWeight: "bold",

  color: "#000000",
})

const HowWeWorkStepsMobile = () => {
  return (
    <Container>
      <Header>the process</Header>
      <ProcessImage src="/images/WhatWeDoArrowsMobile.png" />
    </Container>
  )
}

export default HowWeWorkStepsMobile
