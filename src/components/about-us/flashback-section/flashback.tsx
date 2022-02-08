import React from 'react'
import { Button, FlashbackContainer } from '../about-us.styled'
import { StaticImage } from 'gatsby-plugin-image'
import { CustomSectionTitle } from './../../shared/index.styled'

export const images_portrait = [
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/portrait/one.png'
    alt='Group of people taking part in a workshop'
  />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/portrait/two.png'
    alt='Software developer at work'
  />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/portrait/three.png'
    alt='Mobile App Developer at work'
  />,
  <StaticImage src='../../../../static/images/why-us/history-flashbacks/portrait/four.png' alt='HR at work' />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/portrait/five.png'
    alt='Software developers collaborating'
  />,
]

export const images_landscape = [
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/landscape/one.png'
    alt='Group of people taking part in a workshop'
  />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/landscape/two.png'
    alt='Software developer at work'
  />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/landscape/three.png'
    alt='Mobile App Developer at work'
  />,
  <StaticImage src='../../../../static/images/why-us/history-flashbacks/landscape/four.png' alt='HR at work' />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/landscape/five.png'
    alt='Software developers collaborating'
  />,
  <StaticImage
    src='../../../../static/images/why-us/history-flashbacks/landscape/six.png'
    alt='Event storming session'
  />,
]

export function FlashbackComponent() {
  return (
    <FlashbackContainer length={images_portrait.length}>
      <CustomSectionTitle>history flashbacks</CustomSectionTitle>
      <div className='images images--portrait'>{images_portrait.map(image => ({ ...image }))}</div>
      <div className='images images--landscape'>{images_landscape.map(image => ({ ...image }))}</div>
      <div>
        <a href='https://www.instagram.com/bright_inventions/' target='_blank' rel='noopener noreferrer nofollow'>
          <Button role='link'>visit instagram</Button>
        </a>
      </div>
    </FlashbackContainer>
  )
}
