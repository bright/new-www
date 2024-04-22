import React, { FC } from 'react'
import { MoreButton, CustomSectionTitle, CustomContainer } from '../shared'
import { PopularBlogPostBox } from '../subcomponents/PopularBlogPostBox'
import { routeLinks } from '../../config/routing'
import { useTopBlogPosts } from '../../use-blog-posts/use-blog-posts'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { toBlogPost } from '../../use-blog-posts/blog-post-frontmatter-query-result'
import TeamMemebersSwiper from '../subcomponents/TeamMembersSwiper'
import { useWindowSize } from '../utils/use-windowsize'
import { Swiper, SwiperSlide } from 'swiper/react'

const HeroSectionTitle = styled(CustomSectionTitle)`
  margin: 11.625rem 0 4.56rem;
  @media ${variables.device.laptop} {
    margin: 7.25rem 0 5.1875rem;
  }

  @media ${variables.device.mobile} {
    margin: 5.125rem 0 4rem;
  }
`
const HeroBlog = styled.section`
  & .hero-blog.columns {
    margin: 0;
    padding: 2rem 15rem 0 15rem;
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
  @media ${variables.device.laptop} {
    & .hero-blog.columns {
      margin: 0;
      padding: 0 6rem;
      & .hero-blog.column {
        padding: 0 1.78125rem 3.5625rem;
      }
    }
  }
  @media ${variables.device.tabletXL} {
    & .hero-blog.columns {
      margin: 0;
      padding: 0 9rem;
      & .hero-blog.column {
        padding: 0 1.4375rem 2.875rem;
      }
    }
  }
  @media ${variables.device.tablet} {
    width: 100%;
    & .hero-blog.columns {
      margin: 0;
      padding: 0 2.25rem;
      & .hero-blog.column {
        width: 100%;
        padding: 0 0 2.8125rem;
      }
    }
  }
  @media ${variables.device.mobile} {
    width: 100%;
    & .hero-blog.columns {
      margin: 0;
      padding: 0 1.125rem;
      & .hero-blog.column {
        padding: 0 0 2.0625rem;
      }
    }
  }
`
const MoreButtonBlogWrapper = styled.div`
  padding: 0 ${variables.pxToRem(18)};
  & .btn {
    margin-top: 1.8125rem;
    margin-bottom: 1.25rem;
  }
`

const PopularBlogPosts = ({ posts, title }: { posts?: ReturnType<typeof toBlogPost>[], title?: string }) => {
  const blogPosts = useTopBlogPosts()
  const { width } = useWindowSize()
  const toScrollBreakpoint = 992

  return (
    <HeroBlog>
      <HeroSectionTitle>{title || 'recent blog posts'}</HeroSectionTitle>

      {width >= toScrollBreakpoint && <div className='hero-blog columns is-multiline is-12'>
        {(posts || blogPosts).map((post, ix) => {
          return (
            <div className='hero-blog column is-6' key={post.title}>
              <PopularBlogPostBox
                date={post.date}
                meaningfullyUpdatedAt={post.meaningfullyUpdatedAt}
                tags={post.tags}
                image={post.image}
                url={post.slug}
                title={post.title}
                key={ix}
              />
            </div>
          )
        })}
      </div>}

      {width < toScrollBreakpoint && <div className='hero-blog columns is-multiline is-12'>
        <Swiper slidesPerView={1.1}
                spaceBetween={16}
                loop={false}
                breakpoints={{
                  580: {
                    slidesPerView: 2.1,
                    spaceBetween: 32,
                  },
                }}>
          {(posts || blogPosts).map((post, ix) => {
            return (
              <SwiperSlide key={post.slug} style={{ height: 'auto' }}>
                <PopularBlogPostBox
                  date={post.date}
                  meaningfullyUpdatedAt={post.meaningfullyUpdatedAt}
                  tags={post.tags}
                  image={post.image}
                  url={post.slug}
                  title={post.title}
                  key={ix}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>}
      <MoreButtonBlogWrapper>
        <MoreButton className='btn' href={routeLinks.blog}>
          more blog posts
        </MoreButton>
      </MoreButtonBlogWrapper>
    </HeroBlog>
  )
}
export default PopularBlogPosts
