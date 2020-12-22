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
        Have an idea for a groundbreaking software project, but don't know where
        to start? Or maybe you're looking for software development experts to
        help take your product to the next level? We'll be more than happy to
        discuss how we can help your business succeed!
      </Text>
      <Button>request a consultation</Button>
    </Container>
  )
}

export default LetsTalkAboutProductIdeas
