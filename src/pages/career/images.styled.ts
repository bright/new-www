import styled from 'styled-components'

import variables from '../../styles/variables'

const Images = styled.div`
  & {
    display: flex;
    gap: 2rem;
    flex-grow: 1;
  }
`

export const ImagesHorizontal = styled(Images)`
  flex-direction: row;
  height: 39.5rem;
  
  & > * {
    flex-basis: 37.5%;
  }
  
  @media ${variables.device.mobile} {
    flex-wrap: wrap-reverse;
    height: auto;
    justify-content: center;
    
    & > * {
      flex-basis: 90%;
    }
  }
`

export const ImagesVertical = styled(Images)`
  flex-direction: column;
  flex-basis: 25%;
  
  & > * {
    flex-grow: 1;
  }
  
  & > div:last-child img {
    object-position: 80% 0;
  }

  @media ${variables.device.mobile} {
    flex-direction: row;
  }
`
