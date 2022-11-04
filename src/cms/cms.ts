import CMS from 'netlify-cms-app'
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { hiddenImageConfig } from './hiddenImageConfig'
import { importantInfoConfig } from './importantInfoConfig'
import { quoteConfig } from './quoteConfig'
import { TagsControl, TagsPreview } from './tags'

const { controlComponent } = require('netlify-cms-widget-markdown')

import { withStyledInjectedIntoPreviewFrame } from './with-styled-injected-into-preview-frame'
import { MdxPreview } from './mdx-preview'
// https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/#modulepath
// this registers styles for preview pane
// editor pane is not styled here
import '../styles/main.scss'
import './styles/quote.css'
import { applyFixForJumpingCursorIssue } from './fix-for-jumping-cursor'

applyFixForJumpingCursorIssue()

CMS.registerWidget('tags', TagsControl, TagsPreview)
CMS.registerWidget('mdx', controlComponent, MdxPreview)


CMS.registerPreviewTemplate('blog', withStyledInjectedIntoPreviewFrame(BlogPostPreview))
CMS.registerEditorComponent({ ...buttonBlockConfig })
CMS.registerEditorComponent({ ...hiddenImageConfig })
CMS.registerEditorComponent({ ...importantInfoConfig })
CMS.registerEditorComponent({ ...quoteConfig })


