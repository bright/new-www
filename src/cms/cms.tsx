import CMS from 'netlify-cms-app'

// this only seems to register styles in preview pane
// or nowhere at all
// import '../styles/main.scss'
import { BlogPostPreview } from './BlogPostPreview'
import { TagsControl, TagsPreview } from './blog'

CMS.registerWidget('tags', TagsControl, TagsPreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
