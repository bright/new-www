import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const Svg = styled.svg`
  margin-right: ${variables.pxToRem(8)};
`
export function ArrowBackOrange(props: any) {
  return (
    <Svg {...props} xmlns='http://www.w3.org/2000/svg' width={26.799} height={18.748}>
      <path
        d='M8.617 0 0 7.238h23.186'
        transform='translate(2.113 2.113)'
        style={{
          strokeLinejoin: 'round',
          fill: 'none',
          stroke: '#f7931e',
          strokeLinecap: 'round',
          strokeWidth: 3,
        }}
      />
      <path
        transform='translate(2.113 9.396)'
        style={{
          strokeMiterlimit: 10,
          fill: 'none',
          stroke: '#f7931e',
          strokeLinecap: 'round',
          strokeWidth: 3,
        }}
        d='m0 0 8.617 7.238'
      />
    </Svg>
  )
}
