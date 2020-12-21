import React from "react"
import styled from "styled-components"
import {
  Button,
  Container as ContainerBase,
  ContentWrapper,
  Text,
} from "./styles"

const Container = styled(ContainerBase)({
  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

const WorkshopsBanner = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text>we combine technical knowledge with deep agile experience</Text>
        <Button>workshops</Button>
      </ContentWrapper>
    </Container>
  )
}

export default WorkshopsBanner
