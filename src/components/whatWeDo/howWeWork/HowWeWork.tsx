import React from "react"
import HowWeWorkDescription from "./HowWeWorkDescription"
import HowWeWorkDescriptionMobile from "./HowWeWorkDescriptionMobile"
import HowWeWorkDescriptionMobile2 from "./HowWeWorkDescriptionMobile2"
import HowWeWorkSteps from "./HowWeWorkSteps"
import HowWeWorkStepsMobile from "./HowWeWorkStepsMobile"

const HowWeWork = () => {
  return (
    <React.Fragment>
      <HowWeWorkDescription />
      <HowWeWorkDescriptionMobile />

      <HowWeWorkSteps />
      <HowWeWorkStepsMobile />

      <HowWeWorkDescriptionMobile2 />
    </React.Fragment>
  )
}

export default HowWeWork
