import React, { ReactNode } from 'react'

export function TimelineImage(props: { image: ReactNode }) {
  return (
    <div>
      {props.image}
    </div>
  )
}

export function TimelineLogo(props: { image: ReactNode }) {
  return (
    <div className='logo'>
      {props.image}
    </div>
  )
}
