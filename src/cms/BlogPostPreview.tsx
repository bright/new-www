import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { LocationProvider } from '@reach/router'
import { PostArticleContent } from '../templates/PostTemplate'
import { AuthorsPreview } from './AuthorsPreview'

export const BlogPostPreview: React.FC<PreviewTemplateComponentProps> = props => {
  const { entry } = props

  const data = entry.get('data')

  const tags: string[] = Array.from(data.get('tags') ?? [])
  const date = data.get('date')
  const author = data.get('author')
  const canonicalUrl = data.get('canonicalUrl')
  const title = data.get('title')
  const timeToRead = 10

  return (
    <LocationProvider>
      <PostArticleContent
        date={date}
        fileAbsolutePath={entry.get('path')}
        title={title}
        authorsView={AuthorsPreview}
        contentView={() => props.widgetFor('body')!}
        author={author}
        canonicalUrl={canonicalUrl}
        tags={tags}
        timeToRead={timeToRead}
        update_date={false}
      />
    </LocationProvider>
  )
}
