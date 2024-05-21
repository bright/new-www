import CMS from 'netlify-cms-app'
import { BlogPostPreview } from './BlogPostPreview'
import { buttonBlockConfig } from './buttonBlockConfig'
import { hiddenImageConfig } from './hiddenImageConfig'
import { importantInfoConfig } from './importantInfoConfig'
import { quoteConfig } from './quoteConfig'
import { TagsControl, TagsPreview } from './tags'

const MarkdownWidget = require('netlify-cms-widget-markdown').default

import { withStyledInjectedIntoPreviewFrame } from './with-styled-injected-into-preview-frame'
import { MdxPreview } from './mdx-preview'
// https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/#modulepath
// this registers styles for preview pane
// editor pane is not styled here
import '../styles/main.scss'
import './styles/quote.css'
import { applyFixForJumpingCursorIssue } from './fix-for-jumping-cursor'
import { applyFixForSortingCaret } from './fix-sorting-caret'
import { withPreviewFrameProvider } from './with-preview-frame-provider'
import { GiphyEmbedCmsEditorComponent } from '../giphy-embed.cms'
import { InstagramEmbedCmsEditorComponent } from '../instagram-embed.cms'
import { TwitterEmbedCmsEditorComponent } from '../twitter-embed.cms'
import { EbookCmsEditorComponent } from '../ebook.cms'
import { TitleWithIconCmsEditorComponent } from '../title-with-icon.cms'
import { GalleryCmsEditorComponent } from '../gallery.cms'
import { SliderCmsEditorComponent } from '../slider.cms'
import { AppStoreCmsEditorComponent } from '../app-store.cms'
import { AnchorLinkCmsEditorComponent } from '../button.cms'
import { EditorComponentOptions } from 'netlify-cms-core'
import { sliderConfig } from './sliderConfig'

applyFixForJumpingCursorIssue()
applyFixForSortingCaret()

CMS.registerWidget('tags', TagsControl, TagsPreview)

CMS.registerWidget('mdx', MarkdownWidget.controlComponent, MdxPreview)

CMS.registerPreviewTemplate('blog', withPreviewFrameProvider(withStyledInjectedIntoPreviewFrame(BlogPostPreview)))
CMS.registerEditorComponent(buttonBlockConfig)
CMS.registerEditorComponent(hiddenImageConfig as EditorComponentOptions)
CMS.registerEditorComponent(importantInfoConfig)
CMS.registerEditorComponent(quoteConfig)
CMS.registerEditorComponent(GiphyEmbedCmsEditorComponent)
CMS.registerEditorComponent(InstagramEmbedCmsEditorComponent)
CMS.registerEditorComponent(TwitterEmbedCmsEditorComponent)
CMS.registerEditorComponent(EbookCmsEditorComponent)
CMS.registerEditorComponent(TitleWithIconCmsEditorComponent)
CMS.registerEditorComponent(GalleryCmsEditorComponent)
CMS.registerEditorComponent(SliderCmsEditorComponent)
CMS.registerEditorComponent(AppStoreCmsEditorComponent)
CMS.registerEditorComponent(AnchorLinkCmsEditorComponent)
CMS.registerEditorComponent(sliderConfig)
