import React from 'react'
import tagsTree from '../../../tag-groups.yml'
import { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import styled from 'styled-components'
import { kebabCase } from '../../helpers/pathHelpers'

const TagsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 4rem 0;

  & > li {
    width: 270px;
    height: 47px;
    margin-right: 1.3125rem;
    margin-bottom: 1.375rem;
    border: 1px solid #d3d3d3;

    &:hover {
      border: 1px solid #f7931e;
    }
  }
`
const TagsLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0a0a0a;

  &.is-active {
    font-weight: bold;
    border: 1px solid #f7931e;
  }
  &::first-letter {
    text-transform: lowercase;
  }
`
const SubTagsWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  & > li {
    margin-right: 3rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
    &.is-active {
      font-weight: 900;
    }
    &:last-of-type {
      margin-right: 0;
    }
    & > a {
      color: #131214;
    }
  }
`
const TagsSelect = styled.select`
  width: 100%;
  height: 2.75rem;
  margin: 2.25rem 0;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: #131214;
  padding: 0 1.125rem;

  & option {
    background-color: #fff;
    box-shadow: 0px 0px 40px #0000001d;
    margin: 3.4375rem 0;
  }
`

const BlogTagsAll = ({ activeTag, activeSubTag, ...props }) => {
  const [names, setNames] = useState([])
  const [tags, setTags] = useState([])
  const [tagValue, setTagValue] = useState('')
  const [subTagValue, setSubTagValue] = useState('')
  const breakpoint = 769
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResizeWindow)
    setCurrentGroupTagsNames()
    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  const setCurrentGroupTagsNames = async () => {
    const { groups } = tagsTree
    const currentGroupNames = groups.map(el => el.name)
    const currentGroupTags = groups.filter(el => el.name == activeTag)
    let currentGroupTagsNames = []
    if (currentGroupTags[0]?.groups) {
      currentGroupTagsNames =
        currentGroupTags && currentGroupTags.length > 0 ? currentGroupTags[0]?.groups.map(el => el.name) : []
    }

    setNames(currentGroupNames)
    setTags(currentGroupTagsNames)
    const kebabCaseTag = activeTag && kebabCase(activeTag.toLowerCase())
    const kebabCaseSubTag = activeSubTag && kebabCase(activeSubTag.toLowerCase())
    setTagValue(`${routeLinks.blogTags({ tag: kebabCaseTag })}`)
    if (activeSubTag) {
      setSubTagValue(`${routeLinks.blogTags({ tag: kebabCaseTag })}${kebabCaseSubTag}`)
    }
  }

  if (width < breakpoint && width > 0) {
    const handleOnChange = ({ target }) => {
      const { value } = target
      if (value == routeLinks.blog) {
        window.location = routeLinks.blog
      } else {
        window.location = `${value}1`
      }
    }

    const handleOnChangeSubTags = ({ target }) => {
      const { value } = target
      window.location = `${value}/1`
    }

    return (
      <>
        <TagsSelect value={tagValue} onChange={handleOnChange}>
          <option value={routeLinks.blog}>all areas</option>
          {typeof names !== 'undefined' &&
            names.length > 0 &&
            names.map((el, i) => {
              const kebabCaseTag = kebabCase(el.toLowerCase())

              return (
                <option key={el + '-' + i} value={routeLinks.blogTags({ tag: kebabCaseTag })}>
                  {el.toLowerCase()}
                </option>
              )
            })}
        </TagsSelect>

        {tags.length > 0 ? (
          <TagsSelect value={subTagValue} onChange={handleOnChangeSubTags}>
            <option value={`${routeLinks.blogTags({ tag: activeTag.toLowerCase() })}1`}>All </option>

            {tags.map((el, i) => {
              const kebabCaseTag = kebabCase(activeTag)
              const kebabCaseSubTag = kebabCase(el.toLowerCase())
              return (
                <option key={el + '-' + i} value={`${routeLinks.blogTags({ tag: kebabCaseTag })}${kebabCaseSubTag}`}>
                  {' '}
                  {el}
                </option>
              )
            })}
          </TagsSelect>
        ) : null}
      </>
    )
  } else if (width >= breakpoint) {
    return (
      <>
        <TagsWrapper>
          <li>
            <TagsLink className={!activeTag ? 'is-active' : ''} to={routeLinks.blog}>
              all areas
            </TagsLink>
          </li>
          {typeof names !== 'undefined' &&
            names.length > 0 &&
            names.map(el => {
              const kebabCaseTag = kebabCase(el.toLowerCase())

              return (
                <li>
                  <TagsLink
                    className={activeTag?.toLowerCase() == el.toLowerCase() ? 'is-active' : ''}
                    to={`${routeLinks.blogTags({ tag: kebabCaseTag })}1`}
                  >
                    {el.toLowerCase()}
                  </TagsLink>
                </li>
              )
            })}
        </TagsWrapper>
        {tags.length > 0 ? (
          <SubTagsWrapper>
            <li className={!activeSubTag ? 'is-active' : ''}>
              {' '}
              <Link to={`${routeLinks.blogTags({ tag: activeTag.toLowerCase() })}1`}>All</Link>
            </li>
            {tags.map(el => {
              const kebabCaseTag = kebabCase(activeTag)
              const kebabCaseSubTag = kebabCase(el.toLowerCase())

              return (
                <li className={activeSubTag?.toLowerCase() == el.toLowerCase() ? 'is-active' : ''}>
                  {' '}
                  <Link to={`${routeLinks.blogTags({ tag: kebabCaseTag })}${kebabCaseSubTag}/1`}>{el}</Link>
                </li>
              )
            })}
          </SubTagsWrapper>
        ) : null}
      </>
    )
  } else {
    return <></>
  }
}

export default BlogTagsAll
