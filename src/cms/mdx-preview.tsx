import { PropsWithChildren, useMemo } from 'react'
import Prism from 'prismjs'

require('prismjs/components/prism-bash')
Prism.languages['shell'] = Prism.languages.bash;

require('prismjs/components/prism-csharp')
require('prismjs/components/prism-c')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-objectivec')
require('prismjs/components/prism-sql')
require('prismjs/components/prism-swift')
require('prismjs/components/prism-kotlin')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-tsx')

import { gatsbyMdxOptions } from '../gatsby-mdx-options'

const { setupPreview } = require('netlify-cms-widget-mdx')
const pre = ({ children, ...props }: PropsWithChildren<any>) => {
  const codeElement = children
  const className = codeElement.props?.props?.className
  const langCode = className?.substring('language-'.length)
  const language = Prism.languages[langCode]
  const sourceCode = codeElement.props.children.toString()
  if (language) {
    const highlighted = useMemo(() => Prism.highlight(sourceCode.toString(), language, langCode), [langCode, sourceCode])
    return <pre className={className} {...props}>
    <code className={className} dangerouslySetInnerHTML={{ __html: highlighted }} />
  </pre>
  } else {
    console.log({langCode, languages: Object.keys(Prism.languages)})
    return <pre>
      <div style={{ color: 'red' }}>Please specify a language</div>
      {children}
      </pre>
  }
}

export const MdxPreview = setupPreview({
  ...gatsbyMdxOptions.mdxOptions,
  components: {
    pre: pre
  }
})
