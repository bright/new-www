export const routeLinks = {
  aboutUs(params?: { authorId: string; slug: string | undefined } | { page: 'team' }) {
    if (!params) {
      return `/about-us`
    }
    if ('authorId' in params) {
      return `/about-us/${params.slug ?? params.authorId}/`
    }
    return `/about-us${params.page && `/${params.page}`}`
  },
  blogTags(params?: { tag: string }) {
    if (!params) {
      return `/blog/`
    }
    if (params.tag) {
      return `/blog/${params.tag}/`
    }
    return `/blog/`
  },
  ourAreas(params?: { service: string; faqTitle: string }) {
    if (!params) {
      return `/our-areas/`
    }
    if (params.faqTitle && params.service) {
      return `/our-areas/${params.service}/${params.faqTitle}/`
    }
    return `/our-areas/${params.service ?? ''}`
  },
  whatWeOffer: '/what-we-offer',
  projects: '/projects',
  career: '/career',
  blog: '/blog',
  jobs: '/jobs',
  startProject: '/start-project',
  privacyPolicy: '/privacy-policy',
}
