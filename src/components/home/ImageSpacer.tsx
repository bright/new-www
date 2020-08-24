import React from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 120%;
  left: -15%;
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
`
const ImageContainer = styled.div`
  width: 25%;
  height: 300px;
  overflow: hidden;
  margin: 10px;
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
      {images.map(image => (
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
      ))}
    </Container>
  )
}

export default ImageSpacer
