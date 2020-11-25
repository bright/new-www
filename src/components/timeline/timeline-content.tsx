import { Content, Header,Subheader } from "./timeline.styled"
import React from "react"

export const TimelineHeading: React.FC = function TimelineHeading({
  children,
}) {
  return (
    <Header>
      {React.Children.map(children, child => {
        if (typeof child === "string") {
          return <h3>{child}</h3>
        }
        return child
      })}
    </Header>
  )
}
export const TimelineSubheading: React.FC = function TimelineSubheading({
  children,
}) {
  return <Subheader>{children}</Subheader>
}

export const TimelineContent: React.FC = function TimelineContent({
  children,
}) {
  return <Content>{children}</Content>
}
