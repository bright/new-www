import styled from 'styled-components'

export const Form = styled.form`
  display: grid;
  grid-gap: 4rem;
  button {
    justify-self: center;
  }
  & > div:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
  }
  input :focus-visible {
    outline: 1px solid #000;
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
  & .isBlack {
    color: #0a0a0a;
    opacity: 1;
  }
`
