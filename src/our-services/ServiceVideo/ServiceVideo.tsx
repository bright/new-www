import React from 'react'
import { VideoWrapper } from './ServiceVideo.styled'

type ServiceVideoProps = {
  videoFile: string
}

export const ServiceVideo: React.FC<ServiceVideoProps> = ({ videoFile }) => {
  return (
    <VideoWrapper>
      <video width='100%' height='100%' autoPlay loop muted controls>
        <source src={videoFile} type='video/mp4' />
      </video>
    </VideoWrapper>
  )
}
