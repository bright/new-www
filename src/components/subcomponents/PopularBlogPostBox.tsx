import { Link } from "gatsby"
import React, { FC } from "react"
import styled from "styled-components"
import DateFormatter from "./Date"

const PopularBlogPostBoxContainer = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid #d3d3d3;
  padding: 1em;
  margin-bottom: 1em !important;
`

const Tag = styled.div`
  display: inline-block;
  font-size: 12px;
  background: black;
  color: white;
  margin-right: 0.5em;
  padding: 0.125em 0.5em;
`

const AuthorName = styled.div`
  font-style: normal;
  font-family: titling-gothic-fb, sans-serif;
`

const AuthorContainer = styled.div`
  color: black;
  font-size: 14px;
  margin-top: 0.25em;
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
}

const PopularBlogPostBox: FC<PopularBlogPostBoxProps> = props => {
  console.log(props)
  return (
    <PopularBlogPostBoxContainer className="columns is-multiline">
      <div className="column is-half">
        <Link to={"/about-us/" + props.authorId}>
          <article className="media">
            <figure className="media-left">
              <p className="image is-48x48">
                <img
                  src={props.avatar}
                  alt={props.author + " bio photo"}
                  className="is-rounded"
                />
              </p>
            </figure>
            <div className="media-content">
              <AuthorContainer className="content has-text-dark">
                <AuthorName>{props.author}</AuthorName>
                <DateFormatter date={props.date} />
              </AuthorContainer>
            </div>
          </article>
        </Link>
      </div>
      <div className="column is-half has-text-right">{props.readTime} mins</div>
      <div className="column is-full">
        {props.tags.map(tag => (
          <Tag>{tag}</Tag>
        ))}
      </div>
      <Link to={props.url}>
        <div className="column is-full">
          <img src={props.image} />
        </div>
      </Link>
    </PopularBlogPostBoxContainer>
  )
}

export default PopularBlogPostBox
