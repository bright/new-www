import React from "react"
import styled from "styled-components"
import { StaticImage } from 'gatsby-plugin-image'

const Container = styled.div`
  width: 100vw;
  left: 0;
  overflow: hidden;
`

const ImagesContainer = styled.div`
  width: 130%;
  left: -15%;
  position: relative;
  display: flex;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  width: 25%;
  height: 300px;
  overflow: hidden;
  margin: 10px;

  @media (max-width: 768px) {
    height: 100px;
  }
`
const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const images = [
 <StaticImage src="../../../static/images/imagespacer/1.png" alt={'image spacer 1'} />,
 <StaticImage src="../../../static/images/imagespacer/2.png" alt={'image spacer 2'} />,
 <StaticImage src="../../../static/images/imagespacer/3.png" alt={'image spacer 3'} />,
 <StaticImage src="../../../static/images/imagespacer/4.png" alt={'image spacer 4'} />,
]

export const ImageSpacer: React.FC = () => {
  return (
    <Container>
      <ImagesContainer>
        {images.map((image, index) => (
          <ImageContainer key={index}>
            {image}
          </ImageContainer>
        ))}
      </ImagesContainer>
    </Container>
  )
}
