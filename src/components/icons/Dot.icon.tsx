import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const Svg = styled.svg`
  max-width: 4px;
  height: auto;
`

export default function Dot() {
  return (
    <Svg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='2' cy='2' r='2' />
    </Svg>
  )
}
