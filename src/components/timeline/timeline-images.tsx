import React from 'react'

export function TimelineImage(props: any) {
  return (
    <div>
      <img {...props} />
    </div>
  )
}

export function TimelineLogo(props: any) {
  return (
    <div className='logo'>
      <img width='96' height='96' {...props} />
    </div>
  )
}
