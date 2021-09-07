import React, { FC } from 'react'
import { MoreButton, CustomSectionTitle, CustomContainer } from '../shared'
import { PopularBlogPostBox } from '../subcomponents/PopularBlogPostBox'
import { routeLinks } from '../../config/routing'
import { useTopBlogPosts } from '../../use-blog-posts/use-blog-posts'
import styled from 'styled-components'
import variables from '../../styles/variables'

const HeroSectionTitle = styled(CustomSectionTitle)`
  margin: 11.625rem 0 4.56rem;

  @media ${variables.device.mobile} {
    margin: 5.125rem 0 4rem;
  }
`
const HeroBlog = styled.section`
  & .hero-blog.columns {
    margin: 0;
    padding: 2rem 2rem 0 2rem;
    & .hero-blog.column {
      padding: 0 2rem 4rem 2rem;
      &:nth-of-type(even) {
        padding-right: 0;
      }
      &:nth-of-type(odd) {
        padding-left: 0;
      }
    }
  }
  & a > .btn {
    margin-top: 1.8125rem;
    margin-bottom: 1.25rem;
    font-size: ${variables.font.customtext.sizeButton};
    line-height: 1.375rem;
    padding: 1rem 4rem;
    transition: ease-out 0.3s;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    @media ${variables.device.mobile} {
      width: 100%;
    }
  }
  @media ${variables.device.mobile} {
    & .hero-blog.columns {
      margin: 0;
      padding-top: 0;
      & .hero-blog.column {
        padding: 0.59rem 1.125rem 0.59rem;
        &:nth-of-type(even) {
          padding-right: 1.125rem;
        }
        &:nth-of-type(odd) {
          padding-left: 1.125rem;
        }
        &:nth-of-type(1) {
          padding-top: 0;
        }
      }
    }
  }
`

export const PopularBlogPosts: FC = () => {
  const blogPosts = useTopBlogPosts()

  return (
    <HeroBlog>
      <CustomContainer>
        <HeroSectionTitle>recent blog posts</HeroSectionTitle>
        <div className='hero-blog columns is-multiline is-12'>
          {blogPosts.map((post, ix) => {
            return (
              <div className='hero-blog column is-6' key={post.title}>
                <PopularBlogPostBox
                  date={post.date}
                  tags={post.tags}
                  image={post.image}
                  url={post.slug}
                  title={post.title}
                  key={ix}
                />
              </div>
            )
          })}
        </div>
        <MoreButton className='btn' href={routeLinks.blog}>
          more blog posts
        </MoreButton>
      </CustomContainer>
    </HeroBlog>
  )
}
