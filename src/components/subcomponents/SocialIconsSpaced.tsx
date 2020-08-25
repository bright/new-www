import React from "react"
import styled from "styled-components"
import { SocialIcons } from "./SocialIcons"

const IconsContainerPadding = styled.div`
  padding: 0 2em;
  color: black;
  fill: black;
`

export const SocialIconsSpaced = () => {
  return (
    <IconsContainerPadding className="is-hidden-tablet">
      <SocialIcons blackIcons={true} />
    </IconsContainerPadding>
  )
}
