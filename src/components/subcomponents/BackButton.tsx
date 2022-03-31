import React from 'react'
import { Link } from 'gatsby'
import { ArrowBack } from '../icons/ArrowBack.icon'

interface BackButtonProps {
  url: string
  label: string
  arrowColor?: string
  className?: string
  onClick?: () => void
}

const BackButton: React.FC<BackButtonProps> = props => {
  return (
    <Link to={props.url} className={`button is-white ${props.className}`} onClick={props.onClick}>
      <span className='icon is-small'>
        {props.arrowColor == 'orange' ? <img src='/images/arrow-back-orange.svg' /> : <ArrowBack />}
      </span>{' '}
      <span>{props.label}</span>
    </Link>
  )
}

export default BackButton
