# Framna redirect plan

Transition plan for routing `brightinventions.pl` traffic to `framna.com` during the Bright Inventions → Framna rebrand.

Source of truth: the Google Sheet **"Content - Rebranding - Framna"**, sheets **"Redirection plan"** (primary) and
**"Redirection articles Q1-Q2 2026"** (secondary). On any conflicting old-link, **"Redirection plan" wins**.

## Chosen approach (decided)

- **Direct/external URL access → hard HTTP 301** at the hosting layer (S3 + CloudFront via `gatsby-plugin-s3`). This is
  "Option C".
- **Scope: everything the sheet covers** — the specifically-listed paths, the general-rule sections (all of `/blog`,
  `/projects`, `/our-areas`, `/jobs`), and the homepage `/`. Those sections fully retire from brightinventions.pl.
- **Covered pages are not built** — `gatsby-node.ts` skips `createPage` for them and emits a 301 redirect object instead.
- Every 301 target carries `ref=brightinventions`.

This overrides the original "visitors from Google still see the page + banner" idea: covered pages now redirect outright.
The banner/popup remain only for pages that are still served (uncovered paths).

## Goal recap

| # | Requirement | How it is met under Option C |
| --- | --- | --- |
| 1 | Covered links lead directly to Framna | 301 for direct loads; `FramnaLink`/Gatsby fallback for in-app clicks |
| 2 | Internal covered links go to the target | Same — see "Internal clicks" below |
| 3 | Canonical → target for covered pages | Subsumed: 301'd pages are never served, so no canonical needed |
| 4 | Target includes `ref=brightinventions` | Baked into every 301 `toPath` and every CTA/link target |
| 5 | Cover external, direct URL access | The 301 redirect objects — the core of this plan |

## Architecture: one redirect-map module

New file `src/framna/redirect-map.ts` — the single source of truth, consumed by `gatsby-node.ts` (build-time 301s), the
banner/popup CTA, and (optionally) the `FramnaLink` wrapper and social-link touch-ups.

Exports:

- `resolveFramnaTarget(pathname: string, hash?: string): string | null` — maps a `brightinventions.pl` path to a Framna
  URL, or `null` when the path is not covered.
- `resolveFramnaExternal(href: string): string | null` — maps a known external URL (social media, `mailto:`) to its
  Framna replacement, or `null` when not covered.

Rules for `resolveFramnaTarget`:

1. Normalize the path: lowercase, ensure a single trailing slash.
2. **Specific match** against the merged table (hash-qualified key tried first, e.g. `/career/#career-faqs`).
3. Else **general fallback** by path segment.
4. Else `null`.
5. Any resolved `framna.com` target gets `?ref=brightinventions` appended (query-aware, never doubled). The bare `/`
   home path matches specifically and never triggers a general rule.

`framnatizing` / blank / non-URL targets are treated as **not yet available** → skip the specific rule and fall through
to the general rule (so those blog posts resolve to `insights-hub` until Framna ships the page). Flipping one to a real
URL later is a one-line edit.

### Merged specific rules

Built by loading the **articles** sheet first, then overlaying the **plan** sheet (plan precedence). All targets below
receive `?ref=brightinventions` at resolve time.

From **"Redirection plan"**:

| Old path | Framna target |
| --- | --- |
| `/` | `https://framna.com/` |
| `/what-we-offer/` | `https://framna.com/services` |
| `/projects/` | `https://framna.com/cases` |
| `/blog/` | `https://framna.com/insights-hub` |
| `/blog/how-to-make-your-onboarding-bright/` | `https://framna.com/insights/onboarding-journey-at-framna-poland` |
| `/blog/no-time-for-bullshit-feedback-culture/` | `https://framna.com/insights/feedback-culture` |
| `/career/` | `https://framna.com/careers` |
| `/career/#career-faqs` | `https://framna.com/insights/careers-faqs-poland` |
| `/projects/eco-friendly-app/` | `https://framna.com/cases/relevo` |
| `/projects/everytap/` | `https://framna.com/cases/finebite` |
| `/projects/system-for-restaurants-mobile/` | `https://framna.com/cases/just-eat-pos` |
| `/projects/system-for-restaurants/` | `https://framna.com/cases/just-eat-pos` |
| `/projects/kitchen-display-system/` | `https://framna.com/cases/just-eat-pos` |
| `/projects/delivery-drivers-app/` | `https://framna.com/cases/just-eat-pos` |
| `/projects/pos-bill-splitting/` | `https://framna.com/cases/just-eat-pos` |
| `/projects/pos-devices-integration/` | `https://framna.com/cases/just-eat-pos` |
| `/about-us/` | `https://framna.com/about` |
| `/about-us/team/` | `https://framna.com/studios/gdansk` |
| `/our-areas/ai-software-development/` | `https://framna.com/services/artificial-intelligence` |
| `/our-areas/gdansk-digital-product-agency/` | `https://framna.com/studios/gdansk` |
| `/start-project/` | `https://framna.com/contact` |

From **"Redirection articles Q1-Q2 2026"** (blog posts):

| Old path | Framna target |
| --- | --- |
| `/blog/ai-deep-research-comparison/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/jetbrains-junie-ai-assistant-vs-cursor-frontend-developers/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/ai-agents-comparison-from-ios-dev-perspective/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/cursor-vs-junie-for-android/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/introducing-langchain-agents-tutorial-with-example/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/openai-chatgpt-team-enterprise-privacy-policies-explained/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/azure-openai-service-privacy-policies-explained/` | `https://framna.com/services/artificial-intelligence` |
| `/blog/the-johari-window-as-a-tool-in-feedback-processing/` | `https://framna.com/fearless-collaboration` |
| `/blog/how-to-develop-solution-oriented-mindset-in-your-life-and-in-your-team/` | `https://framna.com/fearless-collaboration` |
| `/blog/10-most-common-psychological-games-at-work/` | `https://framna.com/fearless-collaboration` |
| `/blog/ios-testflight-github-actions-fastlane-match/` | `https://framna.com/about` |
| `/blog/keys-and-re-renders-in-react/` | `https://framna.com/about` |
| `/blog/choosing-the-right-logging-library-for-android-app/` | `https://framna.com/about` |
| `/blog/payment-point-of-sale-design-ui-ux/` | _framnatizing_ → falls through to `insights-hub` |
| `/blog/esc-pos-integrating-point-of-sale-printers/` | _framnatizing_ → falls through to `insights-hub` |

### General fallback rules

Applied only when no specific rule matches:

| Path contains | Framna target |
| --- | --- |
| `projects` | `https://framna.com/cases` |
| `blog` | `https://framna.com/insights-hub` |
| `our-areas` | `https://framna.com/services` |
| `jobs` | `https://framna.com/careers` |

Note: blog listing/tag pages contain `blog` and therefore also 301 to `insights-hub` under this rule.

### External URL map (`resolveFramnaExternal`)

From the articles sheet. `ref=brightinventions` is appended **only** when the target host is `framna.com`; links that
point at a real social platform are left exactly as the sheet specifies.

| Old URL | Framna target |
| --- | --- |
| `https://www.facebook.com/Bright.Inventions/` | `https://www.facebook.com/framnastudios/` |
| `https://www.linkedin.com/company/bright-inventions/` | `https://www.linkedin.com/company/framna/` |
| `https://www.instagram.com/bright_inventions/` | `https://www.instagram.com/framnastudios/?hl=en` |
| `https://www.youtube.com/channel/UCWNKNRKF_kzgGZnrzlQ7wvA` | `https://www.youtube.com/@Framna` |
| `https://x.com/BrightDevs` | `https://framna.com/about?ref=brightinventions` |
| `https://github.com/bright` | `https://framna.com/about?ref=brightinventions` |
| `https://podcasts.apple.com/us/podcast/brightdevtalks/id1625829267` | `https://framna.com/about?ref=brightinventions` |
| `https://open.spotify.com/show/1xrG8BF4Niv5uIzHvIn79q` | `https://framna.com/about?ref=brightinventions` |
| `https://www.behance.net/BrightInventions/` | `https://framna.com/about?ref=brightinventions` |
| `https://dribbble.com/Bright_Inventions/` | `https://framna.com/about?ref=brightinventions` |
| `mailto:info@bright.dev` | `https://framna.com/contact?ref=brightinventions` |

## How the 301s are emitted (S3 + CloudFront)

Verified against the installed `gatsby-plugin-s3@0.4.1` and the current `gatsby-config.ts`
(`generateRedirectObjectsForPermanentRedirects: true`, deploy via `gatsby-plugin-s3`):

- For each covered path, `gatsby-node.ts` calls
  `createRedirect({ fromPath, toPath: '<absolute framna url incl. ?ref=brightinventions>', isPermanent: true })`.
- The plugin writes permanent redirects to `.cache/s3.redirectObjects.json`; on deploy (`bin.js`) it creates an S3
  object at the `fromPath` key with `WebsiteRedirectLocation` set. Because `toPath` is an **absolute** URL,
  `url.resolve(base, toPath)` returns it unchanged, so the redirect points at `framna.com` with the query string intact.
- S3 serves this as an HTTP **301** at the website endpoint; CloudFront forwards it.

Wildcards: S3 redirect objects are exact-key only, so the **general rules are materialized into concrete per-page 301s**
by iterating the existing `createPage` loops (blog posts, projects, services, jobs) and resolving each page's target.

**Skip building covered pages:** in each `createPage` loop, if `resolveFramnaTarget(path)` is non-null, do **not**
`createPage`; emit the redirect instead. This avoids a page/redirect key collision and any stale served HTML.

### Prerequisite to verify (needs AWS access)

`WebsiteRedirectLocation` only yields a 301 when CloudFront's origin is the S3 **website endpoint**, not the REST/OAC
endpoint. The existing `vCare` / `gdansk-*` permanent redirects in `gatsby-node.ts` imply this is already the case, but
confirm before relying on it. After deploy, a CloudFront invalidation (`npm run invalidate-cf-cache`) is needed so cached
copies of now-redirected pages are purged.

## Internal clicks (in-app SPA navigation)

Gatsby `<Link>` navigations are client-side and do not hit the S3 301. Two layers cover them:

- **Safety net (free):** when a `<Link>` targets a path with no page-data (because we skipped building it), Gatsby falls
  back to a hard `window.location` load, which hits the S3 301 → Framna. So correctness holds even with no code changes.
- **UX optimization (optional `FramnaLink` wrapper):** a wrapper around Gatsby `Link` that, when
  `resolveFramnaTarget(to)` is non-null, renders `<a href={target} target="_blank" rel="noopener">` directly — avoiding
  the loader flash and double-hop. Refactor surface if adopted: ~32 files importing `Link` from `gatsby`, 8
  `styled(Link)` definitions, plus an `a:` override in `src/mdx.tsx` for in-article links, and the social-link
  components (`Footer`, `SocialIcons`, `author-data`, `SocialMediaShare`) for `resolveFramnaExternal`.

**Recommendation:** ship the 301s first (they satisfy every requirement on their own via the safety net), then decide
whether the wrapper's snappier UX is worth the ~40-file refactor. The lean path may skip the wrapper entirely.

## Banner + popup CTA

Both are mounted in `src/layout/Page.tsx` and now only ever render on **uncovered** pages (covered pages 301 away). Keep
them pointing at the Framna home page `https://framna.com?ref=brightinventions` (already set), or make the CTA
page-specific via `resolveFramnaTarget(pathname)` — low value now that covered pages are gone, so home is fine.

## Homepage `/` — cannot be automated through this path

`gatsby-plugin-s3` derives each redirect object's S3 key via `withoutLeadingSlash(fromPath)`, which returns an **empty
string** for `/`. A permanent `/` redirect would therefore try to upload an object with an empty key (broken deploy), and
routing off an empty key-prefix risks redirecting the whole bucket. So the `onCreatePage` gate **explicitly skips `/`**.

The homepage redirect must instead be configured at the CDN layer — e.g. a CloudFront Function / `viewer-request`
redirect, or a Route 53 / S3 root object handled deliberately with staging verification. Tracked as an open item; not
implemented in code.

## Edge cases

- Blog listing/tag pages match the general `blog` rule and 301 to `insights-hub`.
- `/career/{faq-slug}/` sub-pages are not covered (no `career` general rule) and continue to render.
- `ref` append is idempotent and query-aware (won't duplicate or clobber an existing query).
- Trailing-slash and case normalization on incoming paths and on the `fromPath` keys.

## Testing

- Unit tests for `resolveFramnaTarget`: every specific row, each general rule, hash rule, not-covered path,
  `framnatizing` fall-through, and `ref` idempotency.
- Unit tests for `resolveFramnaExternal`: each social row, `mailto`, and `ref`-only-on-`framna.com` behaviour.
- Unit tests for sheet precedence (a synthetic colliding key resolves to the "Redirection plan" value).
- Build check: `.cache/s3.redirectObjects.json` contains the expected `fromPath` → absolute-Framna-`toPath` pairs and
  covered pages are absent from `public/`.
- Post-deploy (staging): `curl -I https://<staging>/projects/everytap/` returns `301` with
  `Location: https://framna.com/cases/finebite?ref=brightinventions`; an unlisted project returns
  `301 → .../cases?ref=...`.

## Build order / status

1. **Done** — `src/framna/redirect-map.ts` (both sheets merged, plan precedence, general rules, external map) +
   `src/framna/redirect-map.test.ts` (12 cases, run via `npm test` using Node's built-in test runner + `ts-node`).
2. **Done** — `gatsby-node.ts` `onCreatePage` hook: for every page (filesystem + programmatic) except `/`, if
   `resolveFramnaTarget(page.path)` is non-null, `deletePage` + `createRedirect(..., isPermanent: true)`.
3. **Verified at unit/integration level** — `npm test` (16 cases) covers the map and the `onCreatePage` hook; the hook
   was also exercised directly and produces the correct `deletePage` + permanent `createRedirect` calls (e.g.
   `/projects/everytap/` → `https://framna.com/cases/finebite?ref=brightinventions`, `/` and unlisted paths untouched).
   **End-to-end build verification is blocked in this environment** by a pre-existing, unrelated failure:
   `gatsby-plugin-netlify-cms` cannot resolve `swiper/modules/zoom/zoom.js` (swiper 8.4.7) during CMS-admin bundling,
   which aborts the build before `onPostBuild`, so `.cache/s3.redirectObjects.json` is not written here. Verify on a
   working build (CI) that the file lists the expected `fromPath → framna` pairs and covered pages are absent from
   `public/`, then confirm `curl -I` 301s after a staging deploy.
4. **Open** — homepage `/` redirect at the CDN layer (see above).
5. **Optional** — `FramnaLink` wrapper + MDX `a:` override + social-link touch-ups, only if the snappier in-app click
   UX is wanted (the Gatsby hard-reload safety net already makes in-app clicks correct without it).

## Open decisions / to confirm

1. **CloudFront origin** is the S3 website endpoint (prerequisite for `WebsiteRedirectLocation` 301s) — verify with AWS.
2. **`FramnaLink` wrapper** — adopt for UX, or rely on the Gatsby hard-reload safety net and skip the ~40-file refactor?
3. **Banner/popup CTA** — keep pointing at `framna.com` home (assumed), or make page-specific.
4. **Social/`mailto` handling** — append `ref` only on `framna.com` targets; rewrite `mailto:info@bright.dev` to the
   contact page (assumed). Only relevant if the wrapper/social touch-ups are adopted.
