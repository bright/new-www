import { CmsWidgetControlProps, CmsWidgetPreviewProps } from 'netlify-cms-core'
import { PostTags } from '../PostTags'
import { Tag, WithContext as ReactTags } from 'react-tag-input'
import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'

const ReactTagsContainer = styled.div`
  // mostly copy paste from bulma tags
  // can't get it to work in a clean way
  .tags {
    justify-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
  }

  .tag {
    align-items: center;
    border-radius: 2px;
    display: inline-flex;
    height: 2em;
    justify-content: center;
    line-height: 1.5;
    padding-left: 0.75em;
    padding-right: 0.75em;
    white-space: nowrap;

    button {
      margin-left: 0.5em;
    }
  }
`

function toTag(value: string, index: number): Tag {
  return {
    id: index.toString(),
    text: value
  }
}

function toTagValue(tag: Tag) {
  return tag.text
}

function useAllPostsTags(): Tag[] {
  const [tags, setTags] = useState([])

  useEffect(function() {
    async function fetchPostTags() {
      const { tags } = await (await fetch('/blog-posts-meta.json')).json()
      setTags(tags)
    }

    fetchPostTags()
  }, [])

  return tags.map(t => ({ id: t, text: t }))
}

export const TagsControl: React.FC<CmsWidgetControlProps> = props => {
  const tags = Array.from(props.value ?? []).map((val, ix) => toTag(val as string, ix))
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([])

  useEffect(function() {
    async function fetchPostTags() {
      const { tags } = await (await fetch('/blog-posts-meta.json')).json()
      const tagObjects = (tags ?? []).map((tag: string) => ({ id: tag, text: tag }))
      setSuggestedTags(tagObjects)
    }

    fetchPostTags()
  }, [])

  function onAdd(newTag: Tag) {
    const updatedTags = tags.concat([newTag])
    props.onChange(updatedTags.map(toTagValue))
  }

  function onDelete(index: number) {
    const updatedTags = tags.filter((_, ix) => ix != index)
    props.onChange(updatedTags.map(toTagValue))
  }

  function onDrag(tag: Tag, oldIx: number, newPos: number) {
    const updatedTags = tags.concat([])
    updatedTags[oldIx] = updatedTags[newPos]
    updatedTags[newPos] = tag
    props.onChange(updatedTags.map(toTagValue))
  }

  return (
    <>
      <ReactTagsContainer>
        <ReactTags
          autocomplete={1}
          suggestions={suggestedTags}
          tags={tags}
          handleAddition={onAdd}
          handleDelete={onDelete}
          handleDrag={onDrag}
          classNames={{
            tag: 'tag',
            tags: 'tags'
          }}
        />
      </ReactTagsContainer>
    </>
  )
}
export const TagsPreview: React.FC<CmsWidgetPreviewProps> = props => {
  const elements: string[] = props.value
  return <PostTags tags={elements} />
}
