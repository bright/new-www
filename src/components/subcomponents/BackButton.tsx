import React from "react"
import { Link } from "gatsby"

interface BackButtonProps {
  url: string
  label: string
}

const BackButton: React.FC<BackButtonProps> = props => {
  return (
    <Link to={props.url} className="button is-white">
      <span className="icon is-small">
        <img src="/images/arrow-back.svg" />
      </span>{" "}
      <span>{props.label}</span>
    </Link>
  )
}

export default BackButton
