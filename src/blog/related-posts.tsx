import React, { useEffect, useState } from 'react'
import { CustomSectionTitle, MoreButton } from '../components/shared'
import { routeLinks } from '../config/routing'
import { createBlogRelatedPosts } from '../models/creator'
import { allMdxData } from '../models/gql'
import { BlogFeed } from './Feed'
import styled from 'styled-components'
import variables from '../styles/variables'

const MoreButtonRelatedPostsWrapper = styled.div`
  margin-top: ${variables.pxToRem(105)};
  @media ${variables.device.mobile} {
    margin-top: ${variables.pxToRem(64)};
  }
`

interface RelatedPostsProps {
  allMdx: allMdxData
  currentPostfileAbsolutPath: string
}

const RelatedPosts = ({ allMdx, currentPostfileAbsolutPath }: RelatedPostsProps) => {
  const [filteredPosts, setFilteredPosts] = useState<allMdxData>()

  const filterRelatedPost = (allMdx: allMdxData, currentPostfileAbsolutPath: string) => {
    const indexOfCurrentPostInRelated = allMdx.edges.findIndex(
      ({ node }) => node.internal.contentFilePath === currentPostfileAbsolutPath
    )

    if (allMdx.edges.length > 4) {
      if (indexOfCurrentPostInRelated !== -1) {
        allMdx.edges.splice(indexOfCurrentPostInRelated, 1)
      } else {
        allMdx.edges.splice(allMdx.edges.length - 1, 1)
      }
    }

    return allMdx
  }

  useEffect(() => {
    const filteredMarkdown = filterRelatedPost(allMdx, currentPostfileAbsolutPath)
    setFilteredPosts(filteredMarkdown)
  })

  return (
    <div>
      <CustomSectionTitle>read more blog posts</CustomSectionTitle>
      <BlogFeed posts={createBlogRelatedPosts(filteredPosts)} />
      <MoreButtonRelatedPostsWrapper>
        <MoreButton href={routeLinks.blog} marginTop='0'>
          back to blog
        </MoreButton>
      </MoreButtonRelatedPostsWrapper>
    </div>
  )
}

export default RelatedPosts
