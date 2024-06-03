import React from 'react'
import { tagTree } from './config'
import { Group, GroupName, Tag, TagGroup, Wrapper } from './Tags.styled'
import { TagTree } from './types'

interface TagsProps {
  value: TagTree
  onChange: (selected: TagTree) => void
}
export const Tags = ({ value, onChange }: TagsProps) => {
  const getTagOnClick = (tagGroup: string, tag: string | true) => () => {
    const newValue = { ...value }

    if (tag === true) {
      delete newValue[tagGroup]
    }
    else if (!newValue[tagGroup]) {
      newValue[tagGroup] = [tag]
    }
    else if (newValue[tagGroup]?.includes(tag)) {
      newValue[tagGroup] = newValue[tagGroup]?.filter(t => t !== tag)
    } else {
      newValue[tagGroup] = [...(newValue[tagGroup] || []), tag]
    }

    if (newValue[tagGroup]?.length === 0) {
      delete newValue[tagGroup]
    }

    onChange(newValue)
  }

  return (
    <Wrapper>
      {(Object.keys(tagTree) as Array<keyof typeof tagTree>).map((tagType, index) => {
        return (
          <Group key={index}>
            <GroupName>{tagType}</GroupName>
            <TagGroup>
              <Tag key={index} $active={!value[tagType]} onClick={getTagOnClick(tagType, true)}>
                all
              </Tag>
              {tagTree[tagType].map((tag, index) => {
                return <Tag key={index} $active={value[tagType]?.includes(tag)} onClick={getTagOnClick(tagType, tag)}>{tag}</Tag>
              })}
            </TagGroup>
          </Group>
        )
      })}
    </Wrapper>
  )
}