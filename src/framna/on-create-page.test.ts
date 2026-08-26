import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Actions, Page } from 'gatsby'
import { onCreatePage } from '../../gatsby-node'

interface Recorded {
  deleted: string[]
  redirects: { fromPath: string; toPath: string; isPermanent?: boolean }[]
}

function run(pagePath: string): Recorded {
  const recorded: Recorded = { deleted: [], redirects: [] }
  const actions = {
    deletePage: (page: { path: string }) => recorded.deleted.push(page.path),
    createRedirect: (redirect: { fromPath: string; toPath: string; isPermanent?: boolean }) =>
      recorded.redirects.push(redirect),
  } as unknown as Actions
  const page = { path: pagePath } as Page

  ;(onCreatePage as (args: { page: Page; actions: Actions }) => void)({ page, actions })
  return recorded
}

test('a covered page is deleted and replaced with a permanent redirect to its Framna target', () => {
  const { deleted, redirects } = run('/projects/everytap/')
  assert.deepEqual(deleted, ['/projects/everytap/'])
  assert.deepEqual(redirects, [
    { fromPath: '/projects/everytap/', toPath: 'https://framna.com/cases/finebite?ref=brightinventions', isPermanent: true },
  ])
})

test('an unlisted page in a covered section falls back to the general-rule target', () => {
  const { redirects } = run('/blog/some-random-post/')
  assert.equal(redirects[0]?.toPath, 'https://framna.com/insights-hub?ref=brightinventions')
})

test('the homepage is left untouched (its redirect must be configured at the CDN layer)', () => {
  const { deleted, redirects } = run('/')
  assert.deepEqual(deleted, [])
  assert.deepEqual(redirects, [])
})

test('a page outside the redirection plan is left untouched', () => {
  const { deleted, redirects } = run('/privacy-policy/')
  assert.deepEqual(deleted, [])
  assert.deepEqual(redirects, [])
})
