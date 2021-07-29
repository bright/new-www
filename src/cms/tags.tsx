import { CmsWidgetControlProps, CmsWidgetPreviewProps } from 'netlify-cms-core'
import { PostTags } from '../PostTags'
import { Tag, WithContext as ReactTags } from 'react-tag-input'
import styled from 'styled-components'

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
    text: value,
  }
}

function toTagValue(tag: Tag) {
  return tag.text
}

export const TagsControl: React.FC<CmsWidgetControlProps> = props => {
  const tags = Array.from(props.value ?? []).map((val, ix) => toTag(val as string, ix))

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
          tags={tags}
          handleAddition={onAdd}
          handleDelete={onDelete}
          handleDrag={onDrag}
          classNames={{
            tag: 'tag',
            tags: 'tags',
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
