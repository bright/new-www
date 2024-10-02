import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useMemo, useState } from 'react'
import { YouTubeEmbed } from 'react-social-media-embed'
import { PlaceholderImage, VideoWrapper } from './ServiceVideo.styled'

type ServiceVideoProps = {
  videoUrl: string
  videoPlaceholderImage?: IGatsbyImageData | undefined
  videoFile?: string
}

export const ServiceVideo: React.FC<ServiceVideoProps> = ({ videoUrl, videoPlaceholderImage, videoFile }) => {
  const [shouldDisplayVideoPlaceholder, setShouldDisplayVideoPlaceholder] = useState(true)
  const handleVideoStart = (): void => {
    setShouldDisplayVideoPlaceholder(false)
  }

  const videoId: string | undefined = useMemo(() => {
    // example url: 'https://www.youtube.com/watch?v=abcdefghijk';
    // id: "abcdefghijk"
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([^&?\/\s]{11})/
    const match = videoUrl.match(regex)
    return match ? match[1] : undefined
  }, [videoUrl])

  return videoFile ? (
    <video autoPlay loop muted controls>
      <source src={'/images/prompt_pos_integration_story_new.mp4'} type='video/mp4' />
    </video>
  ) : (
    <VideoWrapper>
      {shouldDisplayVideoPlaceholder && <PlaceholderImage image={videoPlaceholderImage} alt='' />}

      <YouTubeEmbed
        placeholderDisabled
        url={videoUrl}
        youTubeProps={{
          onPlay: handleVideoStart,
          opts: {
            playerVars: {
              rel: 0, // Disable related videos after playback
              autoplay: 1, // Autoplay the video
              controls: 0, // Hide player controls
              disablekb: 1, // Disable keyboard controls
              fs: 0, // Disable full-screen button
              iv_load_policy: 3, // Disable video annotations
              // @ts-ignore
              mute: 1, // Start video muted
              loop: 1, // Loop video
              playsinline: 1, // Play inline on mobile
              playlist: videoId, // To allows loop
            },
          },
          iframeClassName: 'iframe',
        }}
      />
    </VideoWrapper>
  )
}
