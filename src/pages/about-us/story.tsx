import React from "react"

import AboutUsPage from "../about-us"
import { FlashbackComponent } from "../../components/about-us/flashback-section/flashback"
import { WorkshopComponent } from "../../components/about-us/workshop-section/workshop"
import { FormComponent } from "../../components/about-us/form-section/form"
import { StoryComponent } from "../../components/about-us/story-section/story"

export default function StoryPage() {
  return (
    <AboutUsPage>
      <StoryComponent />
      <FlashbackComponent />
      <WorkshopComponent />
      <FormComponent />
    </AboutUsPage>
  )
}
