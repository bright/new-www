import { useTopPublishedBlogPostsQuery } from './use-top-published-blog-posts-query'
import { toBlogPost } from './blog-post-frontmatter-query-result'

export const useTopBlogPosts = () => {
  return useTopPublishedBlogPostsQuery()
    .map(toBlogPost)
    .sort(function (a, b) {
      return (
        new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime() ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    })
}
