import React from "react"
import styled from "styled-components"
import variables from "../../../../styles/variables"

const Container = styled.li({
  color: variables.black,
  fontSize: "28px",
  display: "inline-block",

  marginLeft: "7px",
  marginRight: "7px",

  cursor: "pointer",
})

const Symbol = styled.div<{ selected: boolean }>(({ selected }) => ({
  backgroundColor: variables.blackBannerBackground,
  opacity: selected ? 1 : 0.42,
  width: "8px",
  height: "8px",
  border: `1px solid ${variables.blackBannerBackground}`,
  borderRadius: "50%",
}))

const Indicator = (onClickHandler: any, isSelected: boolean) => (
  <Container onClick={!isSelected ? onClickHandler : undefined}>
    <Symbol selected={isSelected} />
  </Container>
)

export default Indicator
