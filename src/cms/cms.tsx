import type { CmsWidgetControlProps, CmsWidgetPreviewProps } from 'netlify-cms-core'
import CMS from 'netlify-cms-app'
import { PostTags } from '../PostTags'
import '../styles/main.scss'
import { BlogPostPreview } from './BlogPostPreview'

const ArrayControl: React.FC<CmsWidgetControlProps> = props => {
  const separator = props.field.get('separator', ', ')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value.split(separator))
  }

  return (
    <input
      type={'text'}
      id={props.forID}
      value={props.value ? props.value.join(separator) : ''}
      onChange={e => handleChange(e)}
      className={props.classNameWrapper}
    />
  )
}

const ArrayPreview: React.FC<CmsWidgetPreviewProps> = props => {
  const elements: string[] = props.value
  return <PostTags tags={elements} />
}

// @ts-ignore
// TODO: configure access to global CMS object
CMS.registerWidget('array', ArrayControl, ArrayPreview)

CMS.registerPreviewTemplate('blog', BlogPostPreview)
