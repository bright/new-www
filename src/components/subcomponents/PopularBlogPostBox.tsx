import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import DateFormatter from "./Date"

const DetailsContainer = styled.div`
  padding: 2em;
`

const Image = styled.figure`
  height: 300px;
  border-bottom: 1px solid #d3d3d3;

  @media (max-width: 480px) {
    height: 200px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const PopularBlogPostBoxContainer = styled.div`
  width: 100%;
  height: 520px;
  border: 1px solid #d3d3d3;
  margin-bottom: 1em !important;
  @media (max-width: 480px) {
    height: auto;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
`

const Tag = styled.div`
  display: inline-block;
  font-size: 12px;
  background: black;
  color: white;
  margin-right: 0.5em;
  padding: 0.125em 0.5em;
`

const TagsContainer = styled.div`
  margin-bottom: 1em;
`

const Title = styled.div`
  margin: 1em 0;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  /* letter-spacing: 1px; */
`

export interface PopularBlogPostBoxProps {
  author: string
  authorId: string
  avatar: string
  readTime: number
  date: string
  tags: string[]
  image: string
  url: string
  title: string
}

const PopularBlogPostBox: React.FC<PopularBlogPostBoxProps> = props => {
  return (
    <PopularBlogPostBoxContainer>
      <Link to={props.url}>
        <Image className="image">
          <img src={props.image} />
        </Image>
      </Link>
      <DetailsContainer>
        <TagsContainer>
          {props.tags.map(tag => (
            <Tag key={tag + Math.random()}>{tag}</Tag>
          ))}
        </TagsContainer>
        <span className="is-size-7">
          <DateFormatter date={props.date} />
        </span>
        <Title>{props.title}</Title>
      </DetailsContainer>
    </PopularBlogPostBoxContainer>
  )
}

export default PopularBlogPostBox
