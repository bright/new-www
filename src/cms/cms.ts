import CMS from 'netlify-cms-app'
// this only seems to register styles in preview pane
// or nowhere at all
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { hiddenImageConfig } from './hiddenImageConfig'
import { importantInfoConfig } from './importantInfoConfig'
import { quoteConfig } from './quoteConfig'
import { TagsControl, TagsPreview } from './tags'

import { withStyledInjectedIntoPreviewFrame } from './with-styled-injected-into-preview-frame'
import { MdxPreview } from './mdx-preview'

const { MdxControl } = require('netlify-cms-widget-mdx')

import mainStyles from '!css-loader!sass-loader!../styles/main.scss'
import quoteStyles from '!css-loader!../cms/styles/quote.css'

CMS.registerPreviewStyle(mainStyles.toString(), { raw: true })
CMS.registerPreviewStyle(quoteStyles.toString(), { raw: true })

console.debug('registering custom editor & preview components', {
  mainStyles,
  quoteStyles
})

CMS.registerWidget('tags', TagsControl, TagsPreview)

CMS.registerWidget('mdx', MdxControl, MdxPreview)

CMS.registerPreviewTemplate('blog', withStyledInjectedIntoPreviewFrame(BlogPostPreview))
CMS.registerEditorComponent({ ...buttonBlockConfig })
CMS.registerEditorComponent({ ...hiddenImageConfig })
CMS.registerEditorComponent({ ...importantInfoConfig })
CMS.registerEditorComponent({ ...quoteConfig })


