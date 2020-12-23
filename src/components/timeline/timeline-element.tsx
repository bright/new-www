import React, { RefObject, useEffect, useRef } from "react"
import { StyledElement, Fadeout } from "./timeline.styled"

const Element: React.FC<{
  className: string
  getRef?(ref: RefObject<any>): void
}> = ({ className, children, getRef }) => {
  const ref = useRef()
  useEffect(() => {
    getRef?.(ref)
  }, [ref.current])
  return (
    <StyledElement ref={ref as RefObject<any>} className={className}>
      {children}
    </StyledElement>
  )
}

export const TimelineElement: React.FC<{
  last?: boolean
  position: "left" | "right"
  getRef?(ref: RefObject<any>): void
}> = function TimelineElement({ children, getRef, last, position }) {
  return (
    <section className="my-container">
      {position === "left" ? (
        <Element getRef={getRef} className={`active left`}>
          {children}
        </Element>
      ) : (
        <Element className="left" />
      )}
      <Separator />
      {position === "right" ? (
        <Element getRef={getRef} className={`active right`}>
          {children}
        </Element>
      ) : (
        <Element className="right" />
      )}
      {last && <Fadeout />}
    </section>
  )
}

function Separator() {
  return (
    <div className="separator">
      <div className="dot"></div>
      <div className="connector"></div>
    </div>
  )
}
