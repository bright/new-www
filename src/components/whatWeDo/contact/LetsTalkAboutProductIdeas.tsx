import React from "react"
import styled from "styled-components"
import { Button as ButtonBase } from "../banners/styles"

const Container = styled.div({
  width: "100%",
  height: "512px",
  marginTop: "99px",
  padding: "0 18px",

  backgroundColor: "#F7931E",

  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  alignItems: "center",

  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

const Header = styled.div({
  textAlign: "center",

  fontSize: "22px",
  lineHeight: "26px",
  fontFamily: "Montserrat",
  fontWeight: "bold",

  color: "#000000",
})

const Text = styled.div({
  color: "#131214",

  fontSize: "16px",
  lineHeight: "28px",
  fontFamily: "Lato",

  textAlign: "left",

  marginTop: "33px",
})

const Button = styled(ButtonBase)({
  height: "48px",
  borderColor: "#000000",
  color: "#000000",

  fontWeight: "normal",
})

const LetsTalkAboutProductIdeas = () => {
  return (
    <Container>
      <Header>let’s talk about your product idea</Header>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Button>request a consultation</Button>
    </Container>
  )
}

export default LetsTalkAboutProductIdeas
