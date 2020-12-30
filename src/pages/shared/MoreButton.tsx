import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface Props {
  href: string
  text?: string
}

const Button = styled.div`
  & button {
    border: 1px solid black;
    background: white;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: bold;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    padding: 0.5rem 2.2rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 3rem;
  }
`


export const MoreButton: React.FC<Props> = ({href, text, children}) => {
  return (
    <Button className={'column is-full has-text-centered'}>
      <Link to={href}>
        <button>{text || children}</button>
      </Link>
    </Button>
  )
}
