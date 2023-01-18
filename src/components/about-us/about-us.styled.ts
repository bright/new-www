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
