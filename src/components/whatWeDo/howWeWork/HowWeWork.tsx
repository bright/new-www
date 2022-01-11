import React from 'react'
import { HideDesktop, HideTablet } from '../../shared'
import HowWeWorkDescription from './HowWeWorkDescription'
import HowWeWorkDescriptionMobile from './HowWeWorkDescriptionMobile'
import HowWeWorkDescriptionMobile2 from './HowWeWorkDescriptionMobile2'
import HowWeWorkSteps from './HowWeWorkSteps'
import HowWeWorkStepsMobile from './HowWeWorkStepsMobile'

const HowWeWork = () => {
  return (
    <React.Fragment>
      <HideTablet>
        <HowWeWorkDescription />
      </HideTablet>

      <HideDesktop>
        <HowWeWorkDescriptionMobile />
      </HideDesktop>

      <HideTablet>
        <HowWeWorkSteps />
      </HideTablet>

      <HideDesktop>
        {/* <HowWeWorkStepsMobile /> */}
        <HowWeWorkDescriptionMobile2 />
      </HideDesktop>
    </React.Fragment>
  )
}

export default HowWeWork
