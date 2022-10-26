import CMS from 'netlify-cms-app'
const { MdxControl, MdxPreview } = require("netlify-cms-widget-mdx");
// this only seems to register styles in preview pane
// or nowhere at all
// import '../styles/main.scss'
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { hiddenImageConfig } from './hiddenImageConfig'
import { importantInfoConfig } from './importantInfoConfig'
import { quoteConfig } from './quoteConfig'
import { TagsControl, TagsPreview } from './tags'

import quoteStyles from '!css-loader!../cms/styles/quote.css'

console.log('registering custom editor & preview components')

CMS.registerWidget('tags', TagsControl, TagsPreview)
CMS.registerWidget('mdx', MdxControl, MdxPreview)

CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerEditorComponent({ ...buttonBlockConfig })
CMS.registerEditorComponent({ ...hiddenImageConfig })
CMS.registerEditorComponent({ ...importantInfoConfig })
CMS.registerEditorComponent({ ...quoteConfig })
CMS.registerPreviewStyle(quoteStyles.toString(), { raw: true })

