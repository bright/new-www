export const routeLinks = {
         aboutUs(params?: { authorId: string; slug: string | undefined; ex?: boolean } | { page: 'team' }) {
           if (!params) {
             return `/about-us/`
           }
           if ('ex' in params && params.ex) {
             return `/about-us/`
           }
           if ('authorId' in params) {
             return `/about-us/${params.slug ?? params.authorId}/`
           }
           return `/about-us${params.page && `/${params.page}`}/`
         },
         blogTags(params?: { tag: string | undefined }) {
           if (params?.tag) {
             return `/blog/${params.tag}/`
           }
           return `/blog/`
         },
         ourAreas(params?: { service: string; faqSlug?: string | undefined }) {
           if (params?.faqSlug && params?.service) {
             return `/our-areas/${params.service}/${params.faqSlug}/`
           }
           if (params?.service) {
             return `/our-areas/${params.service}/`
           }
           return `/our-areas/`
         },
         jobOffer(slug: string) {
           return `/jobs/${slug}/`
         },
         whatWeOffer: '/what-we-offer/',
         projects: '/projects/',
         project(params: { slug: string }) {
           return `/projects/${params.slug}/`
         },
         career(params?: { faqSlug?: string | undefined }) {
           if (params?.faqSlug) {
             return `/career/${params.faqSlug}/`
           }
           return `/career/`
         },
         blog: '/blog/',
         startProject: '/start-project/',
         privacyPolicy: '/privacy-policy',
         webDevelopment: '/our-areas/web-development',
         mobileDevelopment: '/our-areas/mobile-app-development/',
         blockchainDevelopment: '/our-areas/blockchain/',
         bluetoothDevelopment: '/our-areas/bluetooth-development/',
         mvpdDevelopment: '/our-areas/mvp-development/',
         healthcareDevelopment: 'healthcare-software-development/',
       }
