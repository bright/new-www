// Single source of truth for the Bright Inventions -> Framna rebrand redirects.
//
// Data comes from the "Content - Rebranding - Framna" sheet: "Redirection plan" (primary) and
// "Redirection articles Q1-Q2 2026" (secondary). On a conflicting old-link the "Redirection plan" value wins, which is
// encoded by spreading PLAN_SPECIFIC_RULES last in MERGED_SPECIFIC_RULES.

const REF_PARAM_KEY = 'ref'
const REF_PARAM_VALUE = 'brightinventions'
const FRAMNA_HOST = 'framna.com'

// Paths whose Framna target is not built yet ("framnatizing" in the sheet). They are intentionally absent from the
// specific rules so they fall through to the general /blog rule (framna.com/insights-hub) until Framna ships the page.
export const PENDING_FRAMNA_PATHS = [
  '/blog/payment-point-of-sale-design-ui-ux/',
  '/blog/esc-pos-integrating-point-of-sale-printers/',
]

// From "Redirection articles Q1-Q2 2026". Loaded first so "Redirection plan" can override on conflict.
const ARTICLES_SPECIFIC_RULES: Record<string, string> = {
  '/blog/ai-deep-research-comparison/': 'https://framna.com/services/artificial-intelligence',
  '/blog/jetbrains-junie-ai-assistant-vs-cursor-frontend-developers/':
    'https://framna.com/services/artificial-intelligence',
  '/blog/ai-agents-comparison-from-ios-dev-perspective/': 'https://framna.com/services/artificial-intelligence',
  '/blog/cursor-vs-junie-for-android/': 'https://framna.com/services/artificial-intelligence',
  '/blog/introducing-langchain-agents-tutorial-with-example/': 'https://framna.com/services/artificial-intelligence',
  '/blog/openai-chatgpt-team-enterprise-privacy-policies-explained/':
    'https://framna.com/services/artificial-intelligence',
  '/blog/azure-openai-service-privacy-policies-explained/': 'https://framna.com/services/artificial-intelligence',
  '/blog/the-johari-window-as-a-tool-in-feedback-processing/': 'https://framna.com/fearless-collaboration',
  '/blog/how-to-develop-solution-oriented-mindset-in-your-life-and-in-your-team/':
    'https://framna.com/fearless-collaboration',
  '/blog/10-most-common-psychological-games-at-work/': 'https://framna.com/fearless-collaboration',
  '/blog/ios-testflight-github-actions-fastlane-match/': 'https://framna.com/about',
  '/blog/keys-and-re-renders-in-react/': 'https://framna.com/about',
  '/blog/choosing-the-right-logging-library-for-android-app/': 'https://framna.com/about',
}

// From "Redirection plan". Overrides the articles sheet on conflict.
const PLAN_SPECIFIC_RULES: Record<string, string> = {
  '/': 'https://framna.com/',
  '/what-we-offer/': 'https://framna.com/services',
  '/projects/': 'https://framna.com/cases',
  '/blog/': 'https://framna.com/insights-hub',
  '/blog/how-to-make-your-onboarding-bright/': 'https://framna.com/insights/onboarding-journey-at-framna-poland',
  '/blog/no-time-for-bullshit-feedback-culture/': 'https://framna.com/insights/feedback-culture',
  '/career/': 'https://framna.com/careers',
  '/career/#career-faqs': 'https://framna.com/insights/careers-faqs-poland',
  '/projects/eco-friendly-app/': 'https://framna.com/cases/relevo',
  '/projects/everytap/': 'https://framna.com/cases/finebite',
  '/projects/system-for-restaurants-mobile/': 'https://framna.com/cases/just-eat-pos',
  '/projects/system-for-restaurants/': 'https://framna.com/cases/just-eat-pos',
  '/projects/kitchen-display-system/': 'https://framna.com/cases/just-eat-pos',
  '/projects/delivery-drivers-app/': 'https://framna.com/cases/just-eat-pos',
  '/projects/pos-bill-splitting/': 'https://framna.com/cases/just-eat-pos',
  '/projects/pos-devices-integration/': 'https://framna.com/cases/just-eat-pos',
  '/about-us/': 'https://framna.com/about',
  '/about-us/team/': 'https://framna.com/studios/gdansk',
  '/our-areas/ai-software-development/': 'https://framna.com/services/artificial-intelligence',
  '/our-areas/gdansk-digital-product-agency/': 'https://framna.com/studios/gdansk',
  '/start-project/': 'https://framna.com/contact',
}

const MERGED_SPECIFIC_RULES: Record<string, string> = {
  ...ARTICLES_SPECIFIC_RULES,
  ...PLAN_SPECIFIC_RULES,
}

// Applied only when no specific rule matches. `segment` is matched as a path segment (e.g. "/blog").
const GENERAL_RULES: ReadonlyArray<{ segment: string; target: string }> = [
  { segment: '/projects', target: 'https://framna.com/cases' },
  { segment: '/blog', target: 'https://framna.com/insights-hub' },
  { segment: '/our-areas', target: 'https://framna.com/services' },
  { segment: '/jobs', target: 'https://framna.com/careers' },
]

// External URL remaps from the articles sheet (social media + mailto). Keys are matched trailing-slash-insensitively.
const EXTERNAL_RULES: Record<string, string> = {
  'https://www.facebook.com/Bright.Inventions': 'https://www.facebook.com/framnastudios/',
  'https://www.linkedin.com/company/bright-inventions': 'https://www.linkedin.com/company/framna/',
  'https://www.instagram.com/bright_inventions': 'https://www.instagram.com/framnastudios/?hl=en',
  'https://www.youtube.com/channel/UCWNKNRKF_kzgGZnrzlQ7wvA': 'https://www.youtube.com/@Framna',
  'https://x.com/BrightDevs': 'https://framna.com/about',
  'https://github.com/bright': 'https://framna.com/about',
  'https://podcasts.apple.com/us/podcast/brightdevtalks/id1625829267': 'https://framna.com/about',
  'https://open.spotify.com/show/1xrG8BF4Niv5uIzHvIn79q': 'https://framna.com/about',
  'https://www.behance.net/BrightInventions': 'https://framna.com/about',
  'https://dribbble.com/Bright_Inventions': 'https://framna.com/about',
  'mailto:info@bright.dev': 'https://framna.com/contact',
}

function isFramnaTarget(target: string): boolean {
  try {
    return new URL(target).hostname === FRAMNA_HOST
  } catch {
    return false
  }
}

// Adds ref=brightinventions to Framna targets, leaving any existing query intact and never duplicating the param.
function withRef(target: string): string {
  if (!isFramnaTarget(target)) return target
  const url = new URL(target)
  if (!url.searchParams.has(REF_PARAM_KEY)) {
    url.searchParams.set(REF_PARAM_KEY, REF_PARAM_VALUE)
  }
  return url.toString()
}

/**
 * Every specifically-listed source path paired with its Framna target (ref appended). Used to emit redirects at build
 * time for listed paths whose page may not exist (e.g. the removed team roster), which onCreatePage would never see.
 * Excludes the home path (see onCreatePage) and hash-qualified rules, which cannot be expressed as HTTP redirects.
 */
export function framnaSpecificRedirects(): { fromPath: string; toPath: string }[] {
  return Object.entries(MERGED_SPECIFIC_RULES)
    .filter(([path]) => path !== '/' && !path.includes('#'))
    .map(([path, target]) => ({ fromPath: path, toPath: withRef(target) }))
}

function normalizePath(pathname: string): string {
  let path = pathname.trim().toLowerCase()
  if (!path.startsWith('/')) path = `/${path}`
  if (!path.endsWith('/')) path = `${path}/`
  return path
}

function normalizeHash(hash: string): string {
  return hash.replace(/^#/, '').trim().toLowerCase()
}

/**
 * Maps a brightinventions.pl path to its Framna target (with ref=brightinventions), or null when the path is not
 * covered by the redirection plan. `hash` lets hash-specific rules (e.g. /career/#career-faqs) take precedence.
 */
export function resolveFramnaTarget(pathname: string, hash = ''): string | null {
  const path = normalizePath(pathname)

  const normalizedHash = normalizeHash(hash)
  if (normalizedHash) {
    const hashMatch = MERGED_SPECIFIC_RULES[`${path}#${normalizedHash}`]
    if (hashMatch) return withRef(hashMatch)
  }

  const specificMatch = MERGED_SPECIFIC_RULES[path]
  if (specificMatch) return withRef(specificMatch)

  const generalMatch = GENERAL_RULES.find(rule => path.includes(`${rule.segment}/`) || path === `${rule.segment}/`)
  if (generalMatch) return withRef(generalMatch.target)

  return null
}

/**
 * Maps a known external URL (social media, mailto) to its Framna replacement, or null when the URL is not covered.
 * ref=brightinventions is appended only when the target points at framna.com.
 */
export function resolveFramnaExternal(href: string): string | null {
  const key = href.trim().replace(/\/+$/, '')
  const target = EXTERNAL_RULES[key]
  if (!target) return null
  return withRef(target)
}

/**
 * Resolves the Framna target for a link destination as authored in a component or in content, or null when it is not
 * covered. Internal destinations (starting with "/") are matched by path, preserving any hash so hash-specific rules
 * apply; other destinations are matched against the external URL map.
 */
export function resolveFramnaLink(to: string): string | null {
  if (to.startsWith('/')) {
    const [pathAndQuery, hash] = to.split('#')
    const path = pathAndQuery.split('?')[0]
    return resolveFramnaTarget(path, hash ?? '')
  }
  return resolveFramnaExternal(to)
}
