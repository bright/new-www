import styled from 'styled-components'
import variables from '../../styles/variables'

export const FlashbackContainer = styled.div<{ length: number }>`
  && {
    margin-top: 100px;
    margin-bottom: 5rem;
    text-align: center;
    display: grid;
    gap: 105px 0;
    justify-content: center;

    .images {
      display: grid;
      gap: 2.1875rem;
      &.images--portrait {
        grid-auto-flow: column;
        grid-template-columns: repeat(auto-fit, minmax(1px, 300px));
      }
      &.images--landscape {
        grid-template-columns: 1fr 1fr;
        display: none;
      }
    }
    & > div {
      text-align: center;
    }
    a {
      all: unset;
      user-select: none;
      & > * {
        user-select: inherit;
      }
    }
  }
  @media (max-width: 601px) {
    && {
      .images {
        &.images--landscape {
          display: grid;
        }
        &.images--portrait {
          display: none;
        }
      }
    }
  }
`

export const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  padding: 1rem 4rem;
  border: 1px solid #000;
  background: #fff;
  font: normal normal bold 18px/22px Montserrat;
  color: #000;
  cursor: pointer;
`
export const InvertedButton = styled(Button)`
  filter: invert(100%);
`
export const BlackButton = styled(InvertedButton)`
  border: none;
  transition: all 0.25s;
  &:hover {
    background: ${variables.color.primary};
    color: #fff;
    filter: invert(0%);
  }
`
export const WorkshopContainer = styled.div`
  background: black;

  padding: 105px 0;

  h2 {
    font-weight: 800;
    font-size: 2.5rem;
    color: white;
    display: grid;
    gap: 55px 0;
    justify-items: start;
  }
`

export const FormContainer = styled.div`
  margin: 11.625rem auto 6.25rem;
  && .section {
    padding: 0;
  }
  h2 {
    font-weight: 900;
    color: ${variables.color.heading};
    a {
      color: inherit;
      text-decoration: underline;
    }
  }
`

export const Tabs = styled.ul`
  margin: 2rem auto;
  display: flex;
  justify-content: start;
  justify-items: start;
  grid-auto-flow: column;
  max-width: 960px;
  gap: 10%;

  a {
    font-family: ${variables.font.title.family};
    user-select: none;
    cursor: pointer;
    font-size: ${variables.font.title.size};
    line-height: 2rem;
    color: ${variables.color.text};
    opacity: 0.75;
    font-weight: normal;

    &.is-active {
      opacity: 1;
      font-weight: bold;
      border-bottom: 3px solid var(--black-100);
    }
  }
`
