import { graphql, Link } from 'gatsby'
import React from 'react'
import { CustomSectionTitle, MoreButton } from '../../components/shared'
import { routeLinks } from '../../config/routing'
import { createBlogRelatedPosts } from '../../models/creator'
import { allMarkdownRemarkData } from '../../models/gql'
import { BlogFeed } from '../blog/Feed'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { useEffect } from 'react'
import { useState } from 'react'

const RelatedMoreButton = styled(MoreButton)`
  margin-top: ${variables.pxToRem(105)};
`

interface RelatedPostsProps {
  allMarkdownRemark: allMarkdownRemarkData
  currentPostfileAbsolutPath: string
}

const RelatedPosts = ({ allMarkdownRemark, currentPostfileAbsolutPath }: RelatedPostsProps) => {
  const [filteredPosts, setFilteredPosts] = useState<allMarkdownRemarkData>()

  const filterRelatedPost = (allMarkdownRemark: allMarkdownRemarkData, currentPostfileAbsolutPath: string) => {
    const indexOfCurrentPostInRelated = allMarkdownRemark.edges.findIndex(
      ({ node }) => node.fileAbsolutePath === currentPostfileAbsolutPath
    )
    if (allMarkdownRemark.edges.length > 4) {
      if (indexOfCurrentPostInRelated !== -1) {
        allMarkdownRemark.edges.splice(indexOfCurrentPostInRelated, 1)
      } else {
        allMarkdownRemark.edges.splice(allMarkdownRemark.edges.length - 1, 1)
      }
    }

    return allMarkdownRemark
  }

  useEffect(() => {
    const filteredMarkdown = filterRelatedPost(allMarkdownRemark, currentPostfileAbsolutPath)
    setFilteredPosts(filteredMarkdown)
  })
  return (
    <div>
      <CustomSectionTitle>read more blog posts</CustomSectionTitle>
      <BlogFeed posts={createBlogRelatedPosts(filteredPosts)} />
      <Link to={routeLinks.blog}>
        <RelatedMoreButton>back to blog</RelatedMoreButton>
      </Link>
    </div>
  )
}

export default RelatedPosts
