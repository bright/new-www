import { WithContext, Question, FAQPage } from 'schema-dts'
import { StructuredData } from './StructuredData'
import React, { useMemo } from 'react'

export const FaqStructuredData = ({ faqs }: any) => {
  console.log(faqs)
  const FAQ = faqs.map(({ frontmatter }: any) => {
    const { question, answer } = frontmatter

    const questionFaq: Question = {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
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
