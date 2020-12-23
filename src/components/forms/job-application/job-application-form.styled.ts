import styled from "styled-components"

export const Form = styled.form`
  display: grid;
  grid-gap: 4rem;
  button {
    justify-self: start;
  }
  & > div:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
  }
  strong a {
    text-decoration: underline;
    color: #000;
  }
  @media (max-width: 601px) {
    & > div:first-child {
      grid-template-columns: 1fr;
    }
  }
`
