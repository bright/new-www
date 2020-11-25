import React from "react"

export function TimelineImage(props: any) {
  return (
    <img style={{ borderRadius: "100%" }} width="50" height="50" {...props} />
  )
}

export function TimelineLogo(props: any) {
  return <img width="96" height="96" {...props} />
}
