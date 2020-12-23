import React from "react"
import styled from "styled-components"
import {
  Button,
  Container as ContainerBase,
  ContentWrapper,
  Text,
} from "./styles"

const Container = styled(ContainerBase)({
  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

const MeetupBanner = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text>we are a co-host of the Cocoaheads Tricity</Text>
        {/* <Button>when is next meet-up?</Button> */}
      </ContentWrapper>
    </Container>
  )
}

export default MeetupBanner
