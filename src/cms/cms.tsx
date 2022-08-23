import CMS from 'netlify-cms-app'

// this only seems to register styles in preview pane
// or nowhere at all
// import '../styles/main.scss'
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { TagsControl, TagsPreview } from './tags'

CMS.registerWidget('tags', TagsControl, TagsPreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerEditorComponent({ ...buttonBlockConfig })
