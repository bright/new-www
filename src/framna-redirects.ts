const REF = '?ref=brightinventions'
const framna = (path: string) => `https://framna.com${path}${REF}`

export const FRAMNA_URLS = {
  home: framna('/'),
  services: framna('/services'),
  cases: framna('/cases'),
  careers: framna('/careers'),
  insightsHub: framna('/insights-hub'),
  about: framna('/about'),
  contact: framna('/contact'),
  studiosGdansk: framna('/studios/gdansk'),
  aiServices: framna('/services/artificial-intelligence'),
  onboardingJourney: framna('/insights/onboarding-journey-at-framna-poland'),
  feedbackCulture: framna('/insights/feedback-culture'),
  careersFaqs: framna('/insights/careers-faqs-poland'),
  fearlessCollaboration: framna('/fearless-collaboration'),
  relevoCase: framna('/cases/relevo'),
  finebiteCase: framna('/cases/finebite'),
  justEatPosCase: framna('/cases/just-eat-pos'),
}

// Exact-path -> Framna URL. Keys are normalized (trailing slash, `/` for home).
// The two mapping-doc rows whose target was a "framnatizing" placeholder (not a
// real URL yet) are intentionally excluded: /blog/payment-point-of-sale-design-ui-ux/
// and /blog/esc-pos-integrating-point-of-sale-printers/.
export const SPECIFIC_PATH_REDIRECTS: Record<string, string> = {
  '/': FRAMNA_URLS.home,
  '/what-we-offer/': FRAMNA_URLS.services,
  '/projects/': FRAMNA_URLS.cases,
  '/blog/how-to-make-your-onboarding-bright/': FRAMNA_URLS.onboardingJourney,
  '/career/': FRAMNA_URLS.careers,
  '/projects/eco-friendly-app/': FRAMNA_URLS.relevoCase,
  '/projects/everytap/': FRAMNA_URLS.finebiteCase,
  '/projects/system-for-restaurants-mobile/': FRAMNA_URLS.justEatPosCase,
  '/projects/system-for-restaurants/': FRAMNA_URLS.justEatPosCase,
  '/projects/kitchen-display-system/': FRAMNA_URLS.justEatPosCase,
  '/projects/delivery-drivers-app/': FRAMNA_URLS.justEatPosCase,
  '/projects/pos-bill-splitting/': FRAMNA_URLS.justEatPosCase,
  '/projects/pos-devices-integration/': FRAMNA_URLS.justEatPosCase,
  '/about-us/team/': FRAMNA_URLS.studiosGdansk,
  '/our-areas/ai-software-development/': FRAMNA_URLS.aiServices,
  '/blog/': FRAMNA_URLS.insightsHub,
  '/about-us/': FRAMNA_URLS.about,
  '/start-project/': FRAMNA_URLS.contact,
  '/our-areas/gdansk-digital-product-agency/': FRAMNA_URLS.studiosGdansk,
  '/blog/no-time-for-bullshit-feedback-culture/': FRAMNA_URLS.feedbackCulture,
  '/blog/ai-deep-research-comparison/': FRAMNA_URLS.aiServices,
  '/blog/the-johari-window-as-a-tool-in-feedback-processing/': FRAMNA_URLS.fearlessCollaboration,
  '/blog/jetbrains-junie-ai-assistant-vs-cursor-frontend-developers/': FRAMNA_URLS.aiServices,
  '/blog/ai-agents-comparison-from-ios-dev-perspective/': FRAMNA_URLS.aiServices,
  '/blog/how-to-develop-solution-oriented-mindset-in-your-life-and-in-your-team/': FRAMNA_URLS.fearlessCollaboration,
  '/blog/10-most-common-psychological-games-at-work/': FRAMNA_URLS.fearlessCollaboration,
  '/blog/cursor-vs-junie-for-android/': FRAMNA_URLS.aiServices,
  '/blog/ios-testflight-github-actions-fastlane-match/': FRAMNA_URLS.about,
  '/blog/introducing-langchain-agents-tutorial-with-example/': FRAMNA_URLS.aiServices,
  '/blog/openai-chatgpt-team-enterprise-privacy-policies-explained/': FRAMNA_URLS.aiServices,
  '/blog/keys-and-re-renders-in-react/': FRAMNA_URLS.about,
  '/blog/choosing-the-right-logging-library-for-android-app/': FRAMNA_URLS.about,
  '/blog/azure-openai-service-privacy-policies-explained/': FRAMNA_URLS.aiServices,
  // hash-qualified: only matches when pathname+hash together equal this key
  '/career/#career-faqs': FRAMNA_URLS.careersFaqs,
}

// mailto: target -> Framna URL (covers the `info@bright.dev` specific row)
export const MAILTO_REDIRECTS: Record<string, string> = {
  'info@bright.dev': FRAMNA_URLS.contact,
}

const GENERAL_PATH_RULES: Array<{ prefix: string; url: string }> = [
  { prefix: '/projects/', url: FRAMNA_URLS.cases },
  { prefix: '/blog/', url: FRAMNA_URLS.insightsHub },
  { prefix: '/our-areas/', url: FRAMNA_URLS.services },
  { prefix: '/jobs/', url: FRAMNA_URLS.careers },
]

function normalizePath(pathname: string): string {
  if (pathname === '' || pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

/**
 * Resolves a mapped Framna URL for a link target using only the mapping doc's
 * "Specific" rows (no general fallback rules). Accepts a bare pathname or a
 * full href-like string; an optional hash can be passed separately (used by
 * the banner, which already has pathname/hash split via useLocation) or
 * embedded in pathOrHref (used by SiteLink/MDX, which only have a raw href).
 * Returns null when the target isn't one of the mapped pages.
 */
export function resolveSpecificRedirect(pathOrHref: string, hash?: string): string | null {
  const [pathPart, hashPart] = pathOrHref.split('#')
  // A bare "#anchor" href (no path segment, e.g. an in-page TOC/footnote
  // link) targets whatever page is currently rendered, not the homepage -
  // never treat an empty pathPart as "/" here.
  if (pathPart === '' && hash === undefined) return null
  const path = normalizePath(pathPart)
  const effectiveHash = hash ?? (hashPart ? `#${hashPart}` : '')
  if (effectiveHash && SPECIFIC_PATH_REDIRECTS[`${path}${effectiveHash}`]) {
    return SPECIFIC_PATH_REDIRECTS[`${path}${effectiveHash}`]
  }
  return SPECIFIC_PATH_REDIRECTS[path] ?? null
}

/**
 * Resolves the Framna announcement banner's per-page CTA target: specific
 * mapping-doc row, else a general prefix rule, else the Framna homepage.
 * Always returns a URL.
 */
export function resolveBannerTarget(pathname: string, hash?: string): string {
  const specific = resolveSpecificRedirect(pathname, hash)
  if (specific) return specific
  const path = normalizePath(pathname)
  const rule = GENERAL_PATH_RULES.find(r => path.startsWith(r.prefix))
  return rule?.url ?? FRAMNA_URLS.home
}
