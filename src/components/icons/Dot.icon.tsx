import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  max-width: 4px;
  height: auto;
`

export default function Dot() {
  return (
    <Svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='50' cy='50' r='50' />
    </Svg>
  )
}
