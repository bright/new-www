import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid #d3d3d3;
  width: 100%;
  /* height: 350px; */
  padding: 2em;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  color: black;
`

const Image = styled.figure`
  margin-top: 1em;
  height: 300px;

  @media (max-width: 768px) {
    height: 150px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export interface SuccessStoryBoxProps {
  image: string
  title: string
}

const SuccessStoryBox: FC<SuccessStoryBoxProps> = props => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Image className="image">
        <img src={props.image} />
      </Image>
    </Container>
  )
}

export default SuccessStoryBox
