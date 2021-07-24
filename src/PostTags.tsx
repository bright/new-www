import React from 'react'

export const PostTags = ({ tags }: { tags: string[] }) => {
  return (
    <p className='tags has-justify-content-flex-end'>
      {tags.map((tag, index) => (
        <span className='tag' key={'tag-' + index}>
          {tag}
        </span>
      ))}
    </p>
  )
}
