import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import DateFormatter from "./Date"
import { deleteTimestampFromUrl } from "../../helpers/pathHelpers"

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
  height: 460px;
  border: 1px solid #d3d3d3;
  margin-bottom: 1em !important;
  @media (max-width: 480px) {
    height: auto;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
`

const DateContainer = styled.div`
  font-size: 14px;
  border-right: 1px solid black;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`

const TagsContainer = styled.div`
  /* margin-bottom: 1em; */
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`

const Title = styled.div`
  margin: 1em 0;
  font-family: "SuisseIntl Black", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
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
      <Link to={deleteTimestampFromUrl(props.url)}>
        <Image className="image">
          <img src={props.image} />
        </Image>
      </Link>
      <DetailsContainer>
        <div className="columns is-mobile is-4 is-variable">
          <DateContainer className="column is-narrow">
            <DateFormatter date={props.date} />
          </DateContainer>
          <TagsContainer className="column">
            {props.tags.join(", ")}
            {/* {props.tags.map(tag => (
              <Tag key={tag + Math.random()}>{tag}</Tag>
            ))} */}
          </TagsContainer>
        </div>
        <Title>{props.title}</Title>
      </DetailsContainer>
    </PopularBlogPostBoxContainer>
  )
}

export default PopularBlogPostBox
