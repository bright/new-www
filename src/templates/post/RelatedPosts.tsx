import { Link } from 'gatsby'
import React from 'react'
import { CustomSectionTitle } from '../../components/shared'
import { routeLinks } from '../../config/routing'
import { createBlogRelatedPosts } from '../../models/creator'
import { allMdxData } from '../../models/gql'
import { BlogFeed } from '../blog/Feed'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { useEffect } from 'react'
import { useState } from 'react'

const RelatedMoreButton = styled.button`
  border: 1px solid black;
  background: white;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  color: #000000;
  opacity: 1;
  padding: 1rem 4rem;
  font-size: 1.125rem;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  margin: ${variables.pxToRem(105)} auto 0;
  display: block;
  &:hover {
    color: rgb(255, 255, 255);
    background: rgb(0, 0, 0);
  }

  @media ${variables.device.mobile} {
    width: 100%;
    margin: ${variables.pxToRem(64)} 0 0;
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
      ({ node }) => node.fileAbsolutePath === currentPostfileAbsolutPath
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
      <Link to={routeLinks.blog}>
        <RelatedMoreButton>back to blog</RelatedMoreButton>
      </Link>
    </div>
  )
}

export default RelatedPosts
