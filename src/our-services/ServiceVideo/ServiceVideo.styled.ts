import styled from 'styled-components'
import variables from '../../styles/variables'

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 360px;
  overflow: hidden;

  @media ${variables.deviceWidthMin.tablet} {
    video {
      border-radius: 16px;
    }
  }
`
