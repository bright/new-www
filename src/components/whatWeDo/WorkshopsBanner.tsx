import React from "react"
import styled from "styled-components"
import variables from "../../styles/variables"

const Button = styled.button`
  border: 1px solid #ffffff;
  background: transparent;
  font: normal normal bold 18px/22px Montserrat;
  color: #ffffff;

  letter-spacing: 0px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${variables.brightOrange};
    border-color: ${variables.brightOrange};
  }

  &.hover-white:hover {
    color: #fff;
    border-color: #fff;
  }
`

const Container = styled.div({
  width: "100%",
  background: "#131214 0% 0% no-repeat padding-box;",

  height: "415px",
  marginTop: "185px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  color: "#FFFFFF",
})

const Text = styled.div({
  font: "normal normal 800 40px/48px Montserrat;",
})

const WorkshopsBanner = () => {
  return (
    <Container>
      <Text>we combine technical knowledge with deep agile experience</Text>
      <Button>workshops</Button>
    </Container>
  )
}

export default WorkshopsBanner
