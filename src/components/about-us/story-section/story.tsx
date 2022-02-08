import React from 'react'
import styled from 'styled-components'

import Timeline from '../../timeline'
import { story } from './story-data'
import { TextRegular } from '../../shared'
import variables from '../../../styles/variables'

const Container = styled.p`
  max-width: 960px;
  margin: auto;
`
const StoryTextRegular = styled(TextRegular)`
  font-size: ${variables.pxToRem(18)};
`

export function StoryComponent() {
  return (
    <Container className='tab-content content container'>
      <TextRegular>
        Bright Inventions is a software consulting studio based in Gdansk, Poland. Since 2012 we have built software for
        more than 40 businesses worldwide. Our expertise in mobile, web, blockchain and IoT systems has been highly
        appreciated by our clients from UK, Germany, Netherlands, Norway Israel and more.
      </TextRegular>
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
              <Timeline.Content>
                <StoryTextRegular>{item.content}</StoryTextRegular>
              </Timeline.Content>
            </Timeline.Element>
          )
        })}
      </Timeline>
    </Container>
  )
}
