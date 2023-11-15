import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import * as provider from '@mdx-js/react'
import { gatsbyMdxOptions } from './gatsby-mdx-options'
import { RunnerOptions } from '@mdx-js/mdx/lib/util/resolve-evaluate-options'
import { PromiseType } from './promise-type'


let logged = false;
export async function compileMDXToReactComponent({ MDXSource }: { MDXSource: string }) {
  if(!logged){
    logged = true;
    console.log('compileMDXToReactComponent.runtime', runtime)
  }
  const compile = await evaluate(MDXSource, {
    development: false,
    ...(runtime as Pick<RunnerOptions, 'jsx' | 'Fragment' | 'jsxs'>),
    ...provider,
    ...gatsbyMdxOptions.mdxOptions,
  })
  return {
    Component: compile.default,
  }
}

export type MDXCompiledContent = PromiseType<ReturnType<typeof compileMDXToReactComponent>>['Component']

export interface MdxCompilerError extends Error {
  column: number | null
  line: number | null
  message: string
  reason: string
  ruleId: string
  source: string
}

export async function compileMDXToReactComponentSafely(
  value: string
): Promise<{ error: MdxCompilerError; Component: null } | { Component: MDXCompiledContent; error: null }> {
  try {
    const { Component } = await compileMDXToReactComponent({ MDXSource: value })
    return { Component, error: null }
  } catch (e) {
    console.error('Failed to compile mdx', { MDXSource: value, error: e })
    return { error: e as MdxCompilerError, Component: null }
  }
}

export type MDXCompiledContentOrError = PromiseType<ReturnType<typeof compileMDXToReactComponentSafely>>
