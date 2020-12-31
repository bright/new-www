import styled from "styled-components"
import variables from '../../styles/variables'

export const HideTablet = styled.div({
  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

export const HideDesktop = styled.div({
  ["@media screen and (min-width: 768px)"]: {
    display: "none",
  },
})

export const Section = styled.section`
  padding: 6rem 2rem;
  
  @media (${variables.device.mobile}) {
    padding: 2rem 0.5rem 1rem;
  }
`

export const SectionBlack = styled(Section)`
  background-color: ${variables.color.text};
  color: ${variables.color.white}
`

export const SectionTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 0;
  color: #000000;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 2em;
`

export const PageDescription = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "30px",
  paddingBottom: "10px",
  margin: "0 auto 2rem",

  fontSize: "16px",
  lineHeight: "28px",
  fontFamily: variables.textFont,
  textAlign: "left",
  maxWidth: "955px",
  color: variables.blackTextColor,
  padding: "10px",
})

export const Button = styled.div`
  & button {
    border: 1px solid black;
    background: white;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    padding: 0.5rem 2.2rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 3rem;
  }
`
