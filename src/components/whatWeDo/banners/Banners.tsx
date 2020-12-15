import React from "react"
import MeetupBanner from "./MeetupBanner"
import WorkshopsBanner from "./WorkshopsBanner"

const Banners = () => {
  return (
    <React.Fragment>
      {/* desktop banner */}
      <WorkshopsBanner />
      {/* mobile banner */}
      <MeetupBanner />
    </React.Fragment>
  )
}

export default Banners
