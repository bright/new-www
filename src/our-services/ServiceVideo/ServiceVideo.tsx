import React from 'react'
import { VideoWrapper } from './ServiceVideo.styled'

type ServiceVideoProps = {
  videoFile: string
}

export const ServiceVideo: React.FC<ServiceVideoProps> = ({ videoFile }) => {
  return (
    <VideoWrapper>
      <video autoPlay loop muted controls>
        <source src={videoFile} type='video/mp4' />
      </video>
    </VideoWrapper>
  )
}
