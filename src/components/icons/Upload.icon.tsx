import React from "react"
import styled from "styled-components"

const Svg = styled.svg`
  fill: black;
  height: 13.91px;
  width: 12.743px;
  g {
    transform: translate3d(0.5 0.5, 0);
  }
`
export function UploadIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.743 13.91">
      <g>
        <path
          d="M67.519,4.548a.5.5,0,0,0,.708.025L71.4,1.658V9.245a.5.5,0,0,0,1,0V1.632L75.573,4.58a.5.5,0,1,0,.682-.733l-4-3.706a.512.512,0,0,0-.183-.108A.649.649,0,0,0,71.9,0a.505.505,0,0,0-.416.225L67.544,3.839a.5.5,0,0,0-.025.709Z"
          transform="translate(-65.986)"
        />
        <path
          d="M20.333,252.167a.5.5,0,0,0-.5.5v4.5a.5.5,0,0,0,.5.5H31.076a.5.5,0,0,0,.5-.5v-4.5a.5.5,0,0,0-1,0v4H20.836v-4a.5.5,0,0,0-.5-.5Z"
          transform="translate(-19.833 -244.755)"
        />
      </g>
    </Svg>
  )
}
