export const routeLinks = {
  aboutUs(params?: { authorId: string, slug: string | undefined } | { page: 'story' | 'values' | 'team' }) {
    if (!params) {
      return `/about-us/`
    }
    if ('authorId' in params) {
      return `/about-us/${params.slug ?? params.authorId}/`
    }
    return `/about-us/${params.page}/`
  },
  whatWeOffer: '/what-we-offer',
  projects: '/projects',
  career: '/career',
  blog: '/blog',
  startProject: '/start-project',
  privacyPolicy: '/privacy-policy',
}
