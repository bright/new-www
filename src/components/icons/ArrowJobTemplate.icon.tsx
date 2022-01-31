import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const Svg = styled.svg`
  @media ${variables.device.tablet} {
    height: 41px;
    width: 41px;
  }
  @media ${variables.device.mobile} {
    height: 25px;
    width: 25px;
  }
`
export function ArrowJobTemplateIcon() {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25'>
      <g transform='translate(-371 -791) '>
        <circle
          id='Ellipse_220'
          data-name='Ellipse 220'
          cx='12.5'
          cy='12.5'
          r='12.5'
          transform='translate(371 791)'
          fill='#fff'
          opacity={0.58}
        />
        <path
          id='Path_35971'
          data-name='Path 35971'
          d='M-10909.246,4230.316l5.225,5.224-5.225,5.225'
          transform='translate(11291.366 -3431.809)'
          fill='none'
          stroke='#fff'
          stroke-linecap='round'
          stroke-width='3'
        />
      </g>
    </Svg>
  )
}
