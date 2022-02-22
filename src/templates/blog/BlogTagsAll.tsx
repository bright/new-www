import React from 'react'
import tagsTree from '../../../tag-groups.yml'
import { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { kebabCase } from '../../helpers/pathHelpers'
import { SubTagsWrapper, TagsLink, TagsSelect, TagsWrapper } from '../../components/shared/components/index'

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
        <TagsWrapper isBlogTagsAll={true}>
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
              <Link to={`${routeLinks.blogTags({ tag: activeTag.toLowerCase() })}1`}>all</Link>
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
