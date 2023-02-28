import { GatsbyBrowser } from 'gatsby'
import { gtagOrFallback } from './gtag-or-fallback'
import { GoogleGtagScript } from './google-gtag-script'
import React from 'react'

// TODO: this would be the same in pixel or hotjar
// how do we unify that?
const supportedMetaTag = {
  'article:published_time': 'article_published_at',
  'article:author': 'article_author',
  'article:tag': 'tags',
  'og:title': 'title',
}

function collectMetaTags() {
  return Array.from(document.querySelectorAll('meta')).map(meta => ({
    key: meta.getAttribute('property') ?? meta.name,
    value: meta.content,
  }))
}

function pageViewDimensionsFromMeta() {
  return collectMetaTags()
    .filter(({ key }) => key in supportedMetaTag)
    .reduce((acc, { key, value }) => {
      const metaKeyNameAsDimensionName = supportedMetaTag[key as keyof typeof supportedMetaTag]
      return Object.assign(acc, {
        [metaKeyNameAsDimensionName]: value,
      })
    }, {})
}

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = args => {
  const location = args.location
  // directly from gatsby-plugin-google-gtag
  const sendPageView = function sendPageView() {
    const pagePath = location ? location.pathname + location.search + location.hash : undefined
    gtagOrFallback()('event', 'page_view', {
      page_path: pagePath,
      ...pageViewDimensionsFromMeta(),
    })
  }

  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(function () {
      requestAnimationFrame(sendPageView)
    })
  } else {
    // simulate 2 rAF calls
    setTimeout(sendPageView, 32)
  }
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }, options) => {
  return (
    <>
      {element}
      <GoogleGtagScript options={options} location={props.location} />
    </>
  )
}
