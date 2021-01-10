import styled from "styled-components"
import { TextRegular, TextTitle } from "../../shared"
import variables from "../../../styles/variables"

export const DevelopmentAreasWrapper = styled.div({
  display: "flex",
  justifyContent: "center",

  width: "100%",
})

export const DevelopmentAreasContainer = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
  flexWrap: "wrap",
  maxWidth: "1344px",
})

export const SectionTitleContainer = styled.div<{
  iconMobileWidth: string
  iconMobileHeight: string
}>(({ iconMobileWidth, iconMobileHeight }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  [`@media screen and (${variables.device.mobile})`]: {
    svg: {
      width: iconMobileWidth,
      height: iconMobileHeight,
    },
  },
}))

export const Title = styled(TextTitle)({
  marginTop: "36px",

  [`@media screen and (${variables.device.mobile})`]: {
    marginTop: "30px",
  },
})

export const SectionText = styled(TextRegular)({
  color: variables.color.text,

  marginTop: "60px",
  textAlign: "left",

  [`@media screen and (${variables.device.mobile})`]: {
    marginTop: "30px",
    textAlign: "center",
  },
})

export const DevelopmentAreaContainer = styled.div({
  flexGrow: 0,
  flexShrink: 1,

  marginTop: "65px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "10px 20px",

  [`@media screen and (${variables.device.desktop})`]: {
    flexBasis: "50%",
  },
})

export const GoToContainer = styled.div({
  marginTop: "18px",
})

export const ImageContainer = styled.div({
  svg: {
    transform: "scale(0.7)",
  },
})
