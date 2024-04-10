import { mdxComponents } from '../mdx'
import React, { CSSProperties, ErrorInfo, useEffect, useState } from 'react'
import {
  compileMDXToReactComponentSafely,
  MDXCompiledContentOrError,
  MdxCompilerError,
} from '../compile-mdx-to-react-component'
import styled from 'styled-components'
import { ErrorBoundary } from './error-boundary'
import { mdxOptionsForPreviewOnly } from '../gatsby-mdx-options'
import { CmsWidgetPreviewProps } from 'netlify-cms-core'

export type GetAssetFunction = (asset: string) => {
  url: string;
  path: string;
  field?: any;
  fileObj: File;
};

interface MdxPreviewProps {
  value: string // actual mdx
  getAsset: GetAssetFunction
}

const Error = styled.div`
  color: red;
`

export const MdxPreview = ({ value, getAsset }: CmsWidgetPreviewProps) => {
  const [compiledResult, setCompiledResult] = useState<MDXCompiledContentOrError | null>(null)

  useEffect(() => {
    compileMDXToReactComponentSafely(value, mdxOptionsForPreviewOnly(getAsset)).then(setCompiledResult)
  }, [value])

  const error = compiledResult?.error
  const Component = compiledResult?.Component

  if (error) {
    return <CompilerError error={error} value={value} />
  }

  if (Component) {
    return (
      <ErrorBoundary name='MdxPreview' renderError={ReactError}>
        <Component components={mdxComponents} />
      </ErrorBoundary>
    )
  }

  return <div>Loading...</div>
}

function ReactError({ error, errorInfo }: { error: Error; errorInfo: ErrorInfo }) {
  return (
    <Error>
      {error.message} <br />
      Stack: {error.stack}
      <br />
      Component stack: {errorInfo.componentStack}
    </Error>
  )
}

function CompilerError({ error, value }: { error: MdxCompilerError; value: string }) {
  function lineAndColumnDetails() {
    if (error.line == null || error.column == null) {
      return null
    }

    const errorLine0Based = error.line - 1
    const mdxWithProblem = value.split('\n').slice(Math.max(0, errorLine0Based - 1), errorLine0Based + 3)
    const isFirstLineAProblem = mdxWithProblem.length == 1
    const isSecondLineAProblem = mdxWithProblem.length > 2
    const problemStyle: CSSProperties = { fontWeight: 'bold' }

    return (
      <>
        Line: {error.line} <br />
        Column: {error.column} <br />
        <pre>
          <code>
            <div style={isFirstLineAProblem ? problemStyle : {}}>
              {isFirstLineAProblem ? '--->\t' : ''}
              {mdxWithProblem[0]}
            </div>
            {mdxWithProblem.length > 1 && (
              <div style={isSecondLineAProblem ? problemStyle : {}}>
                {isSecondLineAProblem ? '--->\t' : ''}
                {mdxWithProblem[1]}
              </div>
            )}
            {mdxWithProblem.length > 2 && <div>{mdxWithProblem[2]}</div>}
          </code>
        </pre>
      </>
    )
  }

  return (
    <Error>
      <div style={{ fontWeight: 'bold' }}>Failed to compile MDX!</div>
      {error.message} <br />
      {lineAndColumnDetails()}
    </Error>
  )
}
