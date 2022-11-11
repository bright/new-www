import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import * as provider from '@mdx-js/react'
import { gatsbyMdxOptions } from './gatsby-mdx-options'
import { RunnerOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options'
import { PromiseType } from './promise-type'

export async function compileMDXToReactComponent({ MDXSource }: { MDXSource: string }) {
  const compile = await evaluate(MDXSource, {
    ...(runtime as Pick<RunnerOptions, 'jsx' | 'Fragment' | 'jsxs'>),
    ...provider,
    ...gatsbyMdxOptions.mdxOptions,
  })
  return {
    Component: compile.default,
  }
}

export type MDXCompiledContent = PromiseType<ReturnType<typeof compileMDXToReactComponent>>['Component']

export async function compileMDXToReactComponentSafely(
  value: string
): Promise<{ error: Error, Component: null } | { Component: MDXCompiledContent, error: null}> {
  try {
    const { Component } = await compileMDXToReactComponent({ MDXSource: value })
    return { Component, error: null }
  } catch (e) {
    console.error('Failed to compile mdx', { MDXSource: value }, e)
    return { error: e as Error, Component: null }
  }
}

export type MDXCompiledContentOrError = PromiseType<ReturnType<typeof compileMDXToReactComponentSafely>>
