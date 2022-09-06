import React from 'react'
import styled from 'styled-components'
import variables from './styles/variables'

const Tags = styled.p`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${variables.pxToRem(10)};
`

export const PostTags = ({ tags }: { tags: string[] }) => {
  return (
    <Tags>
      {tags.map((tag, index) => (
        <span className='tag' key={'tag-' + index}>
          {tag}
        </span>
      ))}
    </Tags>
  )
}
