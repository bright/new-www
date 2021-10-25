export const routeLinks = {
  aboutUs(params?: { authorId: string, slug: string | undefined } | { page: 'story' | 'values' | 'team' }) {
    if (!params) {
      return `/about-us/story/`
    }
    if ('authorId' in params) {
      return `/about-us/${params.slug ?? params.authorId}/`
    }
    return `/about-us/${params.page}/`
  },
  blogTags(params?: { tag: string } ) {
    if (!params) {
      return `/blog/`
    }
    if ('tag' in params) {
      return `/blog/${params.tag ?? ''}/`
    }
    return `/blog/${params.tag}/`
  },
  whatWeOffer: '/what-we-offer',
  projects: '/projects',
  career: '/career',
  blog: '/blog',
  blog1: '/blog/:xd/:xs',
  jobs: '/jobs',
  startProject: '/start-project',
  privacyPolicy: '/privacy-policy',
}
