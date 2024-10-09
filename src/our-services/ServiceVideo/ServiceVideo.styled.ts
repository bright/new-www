import styled from 'styled-components'

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 360px;
  overflow: hidden;
  border-radius: 16px;

  .iframe {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`
