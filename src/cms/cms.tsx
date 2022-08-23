import CMS from 'netlify-cms-app'

// this only seems to register styles in preview pane
// or nowhere at all
// import '../styles/main.scss'
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { hiddenImageConfig } from './hiddenImageConfig'
import { importantInfoConfig } from './importantInfoConfig'
import { quoteConfig } from './quoteConfig'
import { TagsControl, TagsPreview } from './tags'

import '../cms/styles/quote.css'

CMS.registerWidget('tags', TagsControl, TagsPreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerEditorComponent({ ...buttonBlockConfig })
CMS.registerEditorComponent({ ...hiddenImageConfig })
CMS.registerEditorComponent({ ...importantInfoConfig })
CMS.registerEditorComponent({ ...quoteConfig })
