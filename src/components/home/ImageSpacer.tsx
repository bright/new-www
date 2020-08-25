import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  left: 0%;
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
  "images/imagespacer/1.png",
  "images/imagespacer/2.png",
  "images/imagespacer/3.png",
  "images/imagespacer/4.png",
  // "images/ula_with_andrzej.jpg"3
]

const ImageSpacer: React.FC = () => {
  return (
    <Container>
      <ImagesContainer>
        {images.map(image => (
          <ImageContainer key={image}>
            <Image src={image} />
          </ImageContainer>
        ))}
      </ImagesContainer>
    </Container>
  )
}

export default ImageSpacer
