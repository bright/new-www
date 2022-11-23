import { AuthorDataProps, AuthorsView } from '../blog/author-data'

export function AuthorsPreview(props: AuthorDataProps) {
  return (
    <AuthorsView
      authorId={props.authorId}
      slug={props.authorId}
      name={props.authorId ?? 'Name'}
      avatar={null as any}
      bio={'Bio'}
    />
  )
}
