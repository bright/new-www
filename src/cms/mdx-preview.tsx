import { mdxComponents } from '../mdx'
import React, { useEffect, useState } from 'react'
import { compileMDXToReactComponentSafely, MDXCompiledContentOrError } from '../compile-mdx-to-react-component'
import styled from 'styled-components'

interface MdxPreviewProps {
  value: string // actual mdx
}

const Error = styled.div`
  color: red;
  font-weight: bold;
`

export const MdxPreview = ({ value }: MdxPreviewProps) => {
  const [compiledResult, setCompiledResult] = useState<MDXCompiledContentOrError | null>(null)

  useEffect(() => {
    compileMDXToReactComponentSafely(value).then(setCompiledResult)
  }, [value])

  const error = compiledResult?.error
  const Component = compiledResult?.Component

  if (error) {
    return <Error>{compiledResult?.error}</Error>
  }

  if (Component) {
    return <Component components={mdxComponents} />
  }

  return <div>Loading...</div>
}
