import styled from "styled-components"

export const HideTablet = styled.div({
  ["@media screen and (max-width: 767px)"]: {
    display: "none",
  },
})

export const Section = styled.section`
  padding: 0 1.5rem;
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
