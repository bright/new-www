import React from "react"
import styled from "styled-components"
import ShowcaseBanner from "./ShowcaseBanner"
import ShowcaseCarousel from "./ShowcaseCarousel"

const Container = styled.div({
  ["@media screen and (max-width: 768px)"]: {
    display: "none",
  },
})

const Showcase = () => {
  return (
    <Container>
      <ShowcaseBanner />
      <ShowcaseCarousel />
    </Container>
  )
}

export default Showcase
