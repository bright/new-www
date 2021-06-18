import { useTopPublishedBlogPostsQuery } from './use-top-published-blog-posts-query'
import { toBlogPost } from './blog-post-frontmatter-query-result'

export const useTopBlogPosts = () => {
  return useTopPublishedBlogPostsQuery().map(toBlogPost)
}
