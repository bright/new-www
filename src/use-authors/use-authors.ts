import { Author } from './authors-frontmatter-query-result'
import { useAuthorsAvatars64 } from './use-authors-avatar-64'
import { useAuthorsAvatarsDefault } from './use-authors-avatar-default'

type UseAuthorsParams = {
  authorId?: string
  avatarSize?: { width: 64 }
}

function toAuthorsFilter(props: UseAuthorsParams) {
  if (props.authorId) {
    return (author: Author) => props.authorId === author.authorId
  }
  return () => true
}

export const useAuthors = (props: UseAuthorsParams = {}) => {
  let data: Author[]

  switch (props.avatarSize?.width) {
    case 64:
      data = useAuthorsAvatars64()
      break;
    default:
      data = useAuthorsAvatarsDefault()
      break;
  }

  const authorsFilter = toAuthorsFilter(props)

  return data.filter(authorsFilter)
}
