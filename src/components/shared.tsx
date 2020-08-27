import React from "react"
import styled from "styled-components"
import variables from "../styles/variables"

export const ButtonContainer = styled.div`
  /* margin-bottom: 2em; */
`

export const Button = styled.button`
  border: 1px solid black;
  background: white;
  font-family: "SuisseIntl Black", sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
  padding: 0.5rem 1rem;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: ${variables.brightOrange};
    border-color: ${variables.brightOrange};
  }

  &.hover-white:hover {
    color: #fff;
    border-color: #fff;
  }
`
export const ButtonInverted = styled(Button)`
  border: 1px solid white;
  background: black;
  color: #fff;
`

export const SectionTitle = styled.h3`
  text-align: left;
  font-family: "SuisseIntl Black";
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0px;
  color: #000000;
  text-align: center;
  margin-bottom: 2em;
`

export const Section: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <section className={"hero " + (className || "")}>
      <div className="hero-body">
        <div className="container has-text-black">{children}</div>
      </div>
    </section>
  )
}
