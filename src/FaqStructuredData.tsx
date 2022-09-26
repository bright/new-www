import { WithContext, Question, FAQPage } from 'schema-dts'
import { StructuredData } from './StructuredData'
import React, { useMemo } from 'react'
import removeMarkdown from 'markdown-to-text'

export const FaqStructuredData = ({ faqs }: any) => {
  const FAQ = faqs.map(({ frontmatter }: any) => {
    const { question, answer } = frontmatter

    const questionFaq: Question = {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: removeMarkdown(answer),
      },
    }

    return questionFaq
  })

  const contextProps: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [FAQ],
  }

  return <StructuredData {...contextProps} />
}
