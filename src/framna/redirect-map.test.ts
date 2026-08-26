import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveFramnaTarget, resolveFramnaExternal, resolveFramnaLink, PENDING_FRAMNA_PATHS } from './redirect-map'

test('specific rules map to their Framna target with ref appended', () => {
  assert.equal(resolveFramnaTarget('/'), 'https://framna.com/?ref=brightinventions')
  assert.equal(resolveFramnaTarget('/what-we-offer/'), 'https://framna.com/services?ref=brightinventions')
  assert.equal(resolveFramnaTarget('/projects/everytap/'), 'https://framna.com/cases/finebite?ref=brightinventions')
  assert.equal(
    resolveFramnaTarget('/our-areas/ai-software-development/'),
    'https://framna.com/services/artificial-intelligence?ref=brightinventions',
  )
  assert.equal(resolveFramnaTarget('/start-project/'), 'https://framna.com/contact?ref=brightinventions')
})

test('the restaurant POS projects all collapse to just-eat-pos', () => {
  const posPaths = [
    '/projects/system-for-restaurants-mobile/',
    '/projects/system-for-restaurants/',
    '/projects/kitchen-display-system/',
    '/projects/delivery-drivers-app/',
    '/projects/pos-bill-splitting/',
    '/projects/pos-devices-integration/',
  ]
  for (const path of posPaths) {
    assert.equal(resolveFramnaTarget(path), 'https://framna.com/cases/just-eat-pos?ref=brightinventions', path)
  }
})

test('articles-sheet blog posts resolve to their specific target', () => {
  assert.equal(
    resolveFramnaTarget('/blog/10-most-common-psychological-games-at-work/'),
    'https://framna.com/fearless-collaboration?ref=brightinventions',
  )
  assert.equal(
    resolveFramnaTarget('/blog/keys-and-re-renders-in-react/'),
    'https://framna.com/about?ref=brightinventions',
  )
})

test('hash-specific rule takes precedence over the plain path', () => {
  assert.equal(resolveFramnaTarget('/career/'), 'https://framna.com/careers?ref=brightinventions')
  assert.equal(
    resolveFramnaTarget('/career/', '#career-faqs'),
    'https://framna.com/insights/careers-faqs-poland?ref=brightinventions',
  )
  // an unknown hash falls back to the plain-path rule
  assert.equal(resolveFramnaTarget('/career/', '#something-else'), 'https://framna.com/careers?ref=brightinventions')
})

test('general fallback rules apply to unlisted paths in a covered section', () => {
  assert.equal(resolveFramnaTarget('/projects/some-unlisted-case/'), 'https://framna.com/cases?ref=brightinventions')
  assert.equal(resolveFramnaTarget('/blog/some-unlisted-post/'), 'https://framna.com/insights-hub?ref=brightinventions')
  assert.equal(resolveFramnaTarget('/our-areas/some-service/'), 'https://framna.com/services?ref=brightinventions')
  assert.equal(resolveFramnaTarget('/jobs/senior-frontend-developer/'), 'https://framna.com/careers?ref=brightinventions')
})

test('framnatizing (not-yet-built) blog posts fall through to the general blog rule', () => {
  for (const path of PENDING_FRAMNA_PATHS) {
    assert.equal(resolveFramnaTarget(path), 'https://framna.com/insights-hub?ref=brightinventions', path)
  }
})

test('a specific rule wins over the general rule for the same section', () => {
  // /blog/ has both a specific rule (insights-hub) and would match the general /blog rule (also insights-hub);
  // an onboarding post has a distinct specific target that must not be shadowed by the general rule.
  assert.equal(
    resolveFramnaTarget('/blog/how-to-make-your-onboarding-bright/'),
    'https://framna.com/insights/onboarding-journey-at-framna-poland?ref=brightinventions',
  )
})

test('paths outside the plan are not covered', () => {
  assert.equal(resolveFramnaTarget('/privacy-policy/'), null)
  assert.equal(resolveFramnaTarget('/career/some-faq/'), null)
  assert.equal(resolveFramnaTarget('/contact/'), null)
})

test('path normalization is tolerant of case and missing trailing slash', () => {
  assert.equal(resolveFramnaTarget('/Projects/Everytap'), 'https://framna.com/cases/finebite?ref=brightinventions')
  assert.equal(resolveFramnaTarget('projects/everytap/'), 'https://framna.com/cases/finebite?ref=brightinventions')
})

test('ref append is idempotent (never duplicated)', () => {
  const target = resolveFramnaTarget('/projects/everytap/')!
  assert.equal(target.match(/ref=brightinventions/g)?.length, 1)
})

test('resolveFramnaExternal maps social + mailto links', () => {
  assert.equal(
    resolveFramnaExternal('https://www.facebook.com/Bright.Inventions/'),
    'https://www.facebook.com/framnastudios/',
  )
  assert.equal(
    resolveFramnaExternal('https://www.linkedin.com/company/bright-inventions/'),
    'https://www.linkedin.com/company/framna/',
  )
  assert.equal(resolveFramnaExternal('mailto:info@bright.dev'), 'https://framna.com/contact?ref=brightinventions')
})

test('resolveFramnaLink resolves internal paths, hashes, queries, and external links', () => {
  assert.equal(resolveFramnaLink('/projects/everytap/'), 'https://framna.com/cases/finebite?ref=brightinventions')
  assert.equal(resolveFramnaLink('/projects/everytap'), 'https://framna.com/cases/finebite?ref=brightinventions')
  assert.equal(
    resolveFramnaLink('/career/#career-faqs'),
    'https://framna.com/insights/careers-faqs-poland?ref=brightinventions',
  )
  assert.equal(resolveFramnaLink('/blog/?page=2'), 'https://framna.com/insights-hub?ref=brightinventions')
  assert.equal(resolveFramnaLink('https://x.com/BrightDevs'), 'https://framna.com/about?ref=brightinventions')
  assert.equal(resolveFramnaLink('/privacy-policy/'), null)
  assert.equal(resolveFramnaLink('#section'), null)
})

test('resolveFramnaExternal appends ref only for framna.com targets', () => {
  // framna.com target -> ref appended
  assert.equal(resolveFramnaExternal('https://x.com/BrightDevs'), 'https://framna.com/about?ref=brightinventions')
  // real social platform target -> left exactly as the sheet specifies
  assert.equal(
    resolveFramnaExternal('https://www.instagram.com/bright_inventions/'),
    'https://www.instagram.com/framnastudios/?hl=en',
  )
  assert.equal(resolveFramnaExternal('https://unknown.example/whatever'), null)
})
