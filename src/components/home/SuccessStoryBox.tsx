import React, { FC } from "react"
import styled from "styled-components"

const Container = styled.div`
  border: 1px solid #d3d3d3;
  width: 100%;
  max-width: 550px;
  margin: 1rem;
  /* height: 350px; */
  padding: 2em;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
`

const Title = styled.h3`
  text-align: center;
  font-family: "SuisseIntl Black", sans-serif;
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
  slug: string
  className?: string
}

const SuccessStoryBox: FC<SuccessStoryBoxProps> = props => {
  return (
    <Container onClick={() => (window.location.href = props.slug)} className={props.className}>
      <Title>{props.title}</Title>
      <Image className="image">
        <img src={props.image} />
      </Image>
    </Container>
  )
}

export default SuccessStoryBox
