import styled from "styled-components"
import variables from "../../../styles/variables"

const {color} = variables

export const Button = styled.button`
  width: 230px;
  height: 54px;
  margin-top: 55px;

  border: 1px solid #ffffff;
  background: transparent;

  font-size: 18px;
  line-height: 22px;
  font-family: ${variables.headerFont};
  font-weight: bold;

  color: #ffffff;

  letter-spacing: 0px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${color.primary};
    border-color: ${color.primary};
  }

  &.hover-white:hover {
    color: #fff;
    border-color: #fff;
  }

  @media (max-width: 767px) {
    width: 100%;
  },
`

export const Container = styled.div({
  display: "flex",
  justifyContent: "center",

  backgroundColor: `${variables.blackBannerBackground}`,

  height: "415px",
  width: "100%",
  alignItems: "center",

  marginTop: "185px",
  ["@media screen and (max-width: 767px)"]: {
    marginTop: "99px",
    height: "292px",
    textAlign: "center",
  },
  padding: "0px 20px",
})

export const ContentWrapper = styled.div({
  maxWidth: "955px",
  backgroundColor: `${variables.blackBannerBackground}`,

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  color: "#FFFFFF",
})

export const Text = styled.div({
  fontSize: "40px",
  lineHeight: "48px",
  fontWeight: 800,
  fontFamily: variables.headerFont,

  ["@media screen and (max-width: 767px)"]: {
    fontSize: "22px",
    lineHeight: "26px",
  },
})
