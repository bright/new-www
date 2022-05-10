import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg<{ isRotate?: boolean }>`
  ${({ isRotate }) => isRotate && 'transform: rotate(180deg)'};
`
export function ArrowNavigationStoryIcon({ isRotate = false }) {
  return (
    <Svg
      isRotate={isRotate}
      xmlns='http://www.w3.org/2000/svg'
      width='18.856'
      height='13.12'
      viewBox='0 0 18.856 13.12'
    >
      <g id='Group_2463' data-name='Group 2463' transform='translate(17.447 11.711) rotate(180)'>
        <g id='Group_633' data-name='Group 633'>
          <path
            id='Path_35450'
            data-name='Path 35450'
            d='M6.113,0,0,5.135H16.447'
            fill='none'
            stroke='#131214'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
          />
          <line
            id='Line_41'
            data-name='Line 41'
            x2='6.113'
            y2='5.135'
            transform='translate(0 5.167)'
            fill='none'
            stroke='#131214'
            stroke-linecap='round'
            stroke-width='2'
          />
        </g>
      </g>
    </Svg>
  )
}
