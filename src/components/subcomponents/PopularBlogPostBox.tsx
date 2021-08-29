import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import DateFormatter from './Date'
import { deleteTimestampFromUrl } from '../../helpers/pathHelpers'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import variables from '../../styles/variables'

const DetailsContainer = styled.div`
  padding: 2em;
  @media ${variables.device.mobile} {
    padding: 3.375rem 2.75rem 1.875rem 1.125rem;
  }
`

const Image = styled.figure`
  height: 300px;
  border-bottom: 1px solid #d3d3d3;

  @media (max-width: 480px) {
    height: 200px;
  }
  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const PopularBlogPostBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #d3d3d3;

  @media (max-width: 480px) {
    height: auto;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
`

const DateContainer = styled.div`
  font-size: ${variables.font.customtext.sizeBlogTags};
  font-family: ${variables.font.customtext.lato};
  border-right: 1px solid black;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeBlogTagsMobile};
  }
`

const TagsContainer = styled.div`
  /* margin-bottom: 1em; */
  font-size: ${variables.font.customtext.sizeBlogTags};
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeBlogTagsMobile};
  }
`

const Title = styled.h2`
  margin-top: 1.875rem;
  margin-right: 0;
  margin-left: 0;
  font-style: normal;
  font-weight: 700;
  font-size: ${variables.font.customtitle.sizeBlogTitle};
  color: var(--black);
  /* letter-spacing: 1px; */
  @media ${variables.device.mobile} {
    margin-top: 0;
    font-size: ${variables.font.customtitle.sizeBlogTitleMobile};
  }
`

export interface PopularBlogPostBoxProps {
  date: string
  tags: string[]
  image: IGatsbyImageData
  url: string
  title: string
}

export const PopularBlogPostBox: React.FC<PopularBlogPostBoxProps> = props => {
  return (
    <PopularBlogPostBoxContainer>
      <Link to={deleteTimestampFromUrl(props.url)}>
        <Image className='image'>
          <GatsbyImage
            imgStyle={{ objectFit: 'cover', width: '100%', height: '100%' }}
            image={getImage(props.image)!}
            alt={props.title}
          />
        </Image>
      </Link>
      <DetailsContainer>
        <div className='columns is-mobile is-4 is-variable'>
          <DateContainer className='column is-narrow'>
            <DateFormatter date={props.date} />
          </DateContainer>
          <TagsContainer className='column'>{props.tags.join(', ')}</TagsContainer>
        </div>
        <Title>{props.title}</Title>
      </DetailsContainer>
    </PopularBlogPostBoxContainer>
  )
}
