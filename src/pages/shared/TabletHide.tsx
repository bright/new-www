import React from "react"
import styled from "styled-components"

const Container = styled.div({
  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

export const HideTablet: React.FC = ({children}) => (
    <Container>
      {children}
    </Container>
  )
