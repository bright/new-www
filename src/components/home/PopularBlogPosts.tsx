import React, { FC } from "react"
import { MoreButton, Section, SectionTitle } from "../shared"
import { PopularBlogPostBox } from "../subcomponents/PopularBlogPostBox"
import { routeLinks } from '../../config/routing'
import { useTopBlogPosts } from '../../use-blog-posts/use-blog-posts'

export const PopularBlogPosts: FC = () => {
  const blogPosts = useTopBlogPosts()

  return (
    <Section>
      <SectionTitle className="is-size-3">what’s new on our blog</SectionTitle>
      <div className="columns is-multiline is-12">
        {blogPosts.map( (post, ix) => {
          return (
            <div className="column is-6" key={post.title}>
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
      <MoreButton href={routeLinks.blog}>read more</MoreButton>
    </Section>
  )
}
