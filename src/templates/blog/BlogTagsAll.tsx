import React from 'react'
import tagsTree from '../../../content/tag-groups.yml'
import { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import styled from 'styled-components'

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

const BlogTagsAll = ({ activeTag, subTagsList, pageContext, ...props }) => {
  const [names, setNames] = useState([])
  const [tags, setTags] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 480
  const [value, setValue] = useState('')

  useEffect(() => {
    const hendleResizeWindow = () => setWidth(window.innerWidth)
    window.addEventListener('resize', hendleResizeWindow)
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
    return () => {
      window.removeEventListener('resize', hendleResizeWindow)
    }
  }, [])

  if (width < breakpoint) {
    const handleOnChange = e => {
      window.location = `${e.target.value}1`
    }

    const handleOnChangeSubTags = ({ target }) => {
      const { value } = target
      if (subTagsList.filter(item => item.toLowerCase() == value.toLowerCase()).length > 0) {
        window.location.href = `${window.location.href.replace(value.toLowerCase() + '-', '')}`
      } else {
        if (subTagsList.length > 0) {
          window.location.href = `${window.location.href}${value.toLowerCase()}-`
        } else {
          window.location.href = `${pageContext.baseURI}/${value.toLowerCase()}-`
        }
      }
    }

    return (
      <>
        <TagsSelect value={value} onChange={handleOnChange}>
          {activeTag ? (
            <option value='' disabled={true}>
              asdasdas
            </option>
          ) : null}
          {names &&
            names.map(el => {
              return (
                <option
                  value={routeLinks.blogTags({ tag: el.toLowerCase() })}
                  selected={el.toLowerCase() == activeTag ? true : false}
                >
                  {el.toLowerCase()}
                </option>
              )
            })}
        </TagsSelect>

        {tags.length > 0 ? (
          <TagsSelect onChange={handleOnChangeSubTags}>
            {tags.map(el => (
              <option value={el.toLowerCase()}> {el}</option>
            ))}
          </TagsSelect>
        ) : null}
      </>
    )
  }
  return (
    <>
      <TagsWrapper>
        {names &&
          names.map(el => (
            <li>
              <TagsLink
                className={activeTag?.toLowerCase() == el.toLowerCase() ? 'is-active' : ''}
                to={`${routeLinks.blogTags({ tag: el.toLowerCase() })}1`}
              >
                {el}
              </TagsLink>
            </li>
          ))}
      </TagsWrapper>
      {tags.length > 0 ? (
        <SubTagsWrapper>
          {tags.map(el => (
            <li
              className={
                subTagsList.filter(item => item.toLowerCase() == el.toLowerCase()).length > 0 ? 'is-active' : ''
              }
            >
              {' '}
              <Link
                to={
                  subTagsList.filter(item => item.toLowerCase() == el.toLowerCase()).length > 0
                    ? `${window.location.href.replace(el.toLowerCase() + '-', '')}`
                    : subTagsList.length > 0
                    ? `${window.location.href}${el.toLowerCase()}-`
                    : `${pageContext.baseURI}/${el.toLowerCase()}-`
                }
              >
                {el}
              </Link>
            </li>
          ))}
        </SubTagsWrapper>
      ) : null}
    </>
  )
}

export default BlogTagsAll
