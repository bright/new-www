import { Disqus } from "gatsby-plugin-disqus"
import React from "react"

interface DisqusCommentsProps {
  id: string
  title: string
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ id, title }) => {
  if (typeof window === "undefined") {
    return null
  }

  const disqusConfig = {
    identifier: id,
    url: window.location.origin + window.location.pathname,
    title: title,
  }

  return <Disqus config={disqusConfig} />
}

export default DisqusComments
