import React from 'react'
import { Link } from 'gatsby'

interface BackButtonProps {
  url: string
  label: string
  arrowColor: string
  className: string
}

const BackButton: React.FC<BackButtonProps> = props => {
  return (
    <Link to={props.url} className={`button is-white ${props.className}`}>
      <span className='icon is-small'>
        {props.arrowColor == 'orange' ? (
          <img src='/images/arrow-back-orange.svg' />
        ) : (
          <img src='/images/arrow-back.svg' />
        )}
      </span>{' '}
      <span>{props.label}</span>
    </Link>
  )
}

export default BackButton
