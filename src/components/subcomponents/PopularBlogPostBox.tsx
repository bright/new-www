import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import DateFormatter from './Date'
import { deleteTimestampFromUrl } from '../../helpers/pathHelpers'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import variables from '../../styles/variables'
import formatDate from 'date-fns/format'

const DetailsContainer = styled.div`
  padding: 1.375rem 2.75rem 2rem;
  && .columns {
    margin: 0;
  }

  @media ${variables.device.laptop} {
    padding: 1.125rem 2rem 2rem 2.375rem;
  }
  @media ${variables.device.tablet} {
    padding: 1rem 2.3125rem 1.75rem;
  }
  @media ${variables.device.mobile} {
    padding: 0.75rem 1.5rem 1rem;
  }
`

const Image = styled.figure`
  max-height: 16.9375rem;
  border-bottom: 1px solid #d3d3d3;
  overflow: hidden;

  @media ${variables.device.laptop} {
    max-height: 14.6875rem;
  }
  @media ${variables.device.tabletXL} {
    max-height: 11.25rem;
  }
  @media ${variables.device.tablet} {
    max-height: 17.1875rem;
  }

  @media ${variables.device.mobile} {
    max-height: 9.25rem;
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
  overflow: hidden;

  @media (max-width: 991px) {
    height: auto;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
`

const DateContainer = styled.div`
  font-size: ${variables.font.customtext.sizeBlogTags};
  font-family: ${variables.font.customtext.lato};
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0.8rem;
  color: ${variables.color.text};
  &:after {
    padding-left: 0.8rem;
    content: '|';
  }
  @media ${variables.device.laptop} {
    font-size: 1rem;
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeBlogTagsMobile};
  }
`

const TagsContainer = styled.div`
  /* margin-bottom: 1em; */
  font-size: ${variables.font.customtext.sizeBlogTags};
  font-family: ${variables.font.customtext.lato};
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  color: ${variables.color.text};
  @media ${variables.device.laptop} {
    font-size: 1rem;
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.font.customtext.sizeBlogTagsMobile};
  }
`

const Title = styled.h2`
  margin-top: 1.3125rem;
  margin-right: 0;
  margin-left: 0;
  font-style: normal;
  font-weight: 800;
  font-size: ${variables.font.customtitle.sizeBlogTitle};
  color: ${variables.color.heading};
  /* letter-spacing: 1px; */
  @media ${variables.device.laptop} {
    margin-top: ${variables.pxToRem(17)};
    font-size: ${variables.pxToRem(25)};
  }
  @media ${variables.device.tablet} {
    margin-top: ${variables.pxToRem(17)};
    font-size: ${variables.pxToRem(25)};
  }
  @media ${variables.device.mobile} {
    margin-top: 0.625rem;
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
          <DateContainer>{formatDate(new Date(props.date), 'MMM, d yyyy')}</DateContainer>
          <TagsContainer>{props.tags.join(', ')}</TagsContainer>
        </div>
        <Title>{props.title}</Title>
      </DetailsContainer>
    </PopularBlogPostBoxContainer>
  )
}
