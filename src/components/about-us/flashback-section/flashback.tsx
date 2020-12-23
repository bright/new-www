import {
  Button,
  FlashbackContainer,
} from "../about-us.styled"
import React from "react"
import { images_landscape, images_portrait } from "./flashback-data"

export function FlashbackComponent() {
  return (
    <FlashbackContainer
      className="tab-content content"
      length={images_portrait.length}
    >
      <h2>history flashbacks</h2>
      <div className="images images--portrait">
        {images_portrait.map(image => (
          <img src={image.src} key={image.src} alt={image.alt} />
        ))}
      </div>
      <div className="images images--landscape">
        {images_landscape.map(image => (
          <img src={image.src} key={image.src} alt={image.alt} />
        ))}
      </div>
      <div>
        <a
          href="https://www.instagram.com/bright_inventions/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <Button role="link">visit instagram</Button>
        </a>
      </div>
    </FlashbackContainer>
  )
}
