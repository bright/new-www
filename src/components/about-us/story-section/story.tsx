import styled from "styled-components"
import Timeline from "../../timeline"
import { story } from "./story-data"
import React from "react"

const Caption = styled.p`
  max-width: 960px;
  margin: auto;
  font-family: Lato;
  font-size: 1.375rem;
  line-height: 40px;
`
export function StoryComponent() {
  return (
    <div className="tab-content content container">
      <Caption>
        Bright Inventions is a software consulting studio based in Gdansk,
        Poland. Since 2012 we have built software for more than 40 businesses
        worldwide. Our expertise in mobile, web, blockchain and IoT systems has
        been highly appreciated by our clients from UK, Germany, Netherlands,
        Norway Israel and more.
      </Caption>
      <Timeline>
        {story.map(item => {
          return (
            <Timeline.Element position={item.position.toLowerCase()}>
              <Timeline.Heading>
                {item.heading}
                {item.images?.map(image => (
                  <Timeline.Image key={image.src} {...image} />
                ))}
                {item.logos?.map(image => (
                  <Timeline.Logo key={image.src} {...image} />
                ))}
              </Timeline.Heading>
              <Timeline.Subheading>{item.subheading}</Timeline.Subheading>
              <Timeline.Content>{item.content}</Timeline.Content>
            </Timeline.Element>
          )
        })}
      </Timeline>
    </div>
  )
}
