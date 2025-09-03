import React, { ReactNode } from 'react'

export function TimelineImage(props: { image: ReactNode }) {
  return <div className={'timeline-image'}>{props.image}</div>
}

export function TimelineLogo(props: { image: ReactNode }) {
  return <div className='timeline-logo'>{props.image}</div>
}

export function TimelineAvatar(props: { image: ReactNode }) {
  return <div className='timeline-avatar'>{props.image}</div>
}
