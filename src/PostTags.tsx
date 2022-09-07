import React from 'react'
import styled from 'styled-components'
import variables from './styles/variables'

const Tags = styled.p`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${variables.pxToRem(10)};
  font-family: ${variables.font.customtext.lato};
  color: ${variables.color.text2};

  @media ${variables.device.mobile} {
    justify-content: center;
  }
`
const Tag = styled.span`
  align-items: center;
  background-color: hsl(0deg, 0%, 96%);
  border-radius: 4px;
  color: ${variables.color.text2};
  font-family: ${variables.font.customtext.lato};
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
`

export const PostTags = ({ tags }: { tags: string[] }) => {
  return (
    <Tags>
      {tags.map((tag, index) => (
        <Tag key={'tag-' + index}>{tag}</Tag>
      ))}
    </Tags>
  )
}
