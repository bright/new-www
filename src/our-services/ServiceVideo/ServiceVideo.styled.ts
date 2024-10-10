import styled from 'styled-components'
import variables from '../../styles/variables'

export const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  video {
    width: 100%;
    max-width: 960px;
  }

  @media ${variables.deviceWidthMin.tablet} {
    margin-left: ${variables.pxToRem(24)};

    video {
      border-radius: 16px;
    }
  }
`
