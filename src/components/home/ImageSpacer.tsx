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
  "images/bright_team.JPG",
  "images/b-88Light.jpg",
  "images/bright_rules.jpg",
  "images/team_small.jpg",
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
