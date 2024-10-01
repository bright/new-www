import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  height: 360px;
  overflow: hidden;
  border-radius: 16px;

  .iframe {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`

export const PlaceholderImage = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  right: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
`
