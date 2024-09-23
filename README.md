## Development Environment

### 📋 Required packages

- Node.js
- gatsby-cli (https://www.gatsbyjs.com/docs/tutorial/part-zero/#using-the-gatsby-cli)

### 🚀 Environment setup

1. Run `yarn install`
1. Run `yarn develop`
1. The site is running at `http://127.0.0.1:8000` :)

Production build is done by `gatsby build`

## Development rules 👮‍♂

1. We work on feature branches. The name of the branch should be meaningful and indicate the changes you made.
1. Once the work is finished, you should create a pull request on github. Target branch should be set to `gatsby`.
1. When a pull request is merged, it will be deployed automatically to the production website.

## patch-package

We're using https://github.com/gatsbyjs/gatsby/discussions/34613#discussioncomment-2276231
be careful when upgrading gatsby.

## SimpleMdx

There's a custom SimpleMdx type defined that allows
using MDX inside frontmatter fields.

It only handles simple html conversion. Probably not even styling.
See `Job.tsx` and `links_more_about_us` for an example.

## Infrastructure

The infrastructure is deployed manually from [infrastructure](infrastructure) aws-cdk app.

## Cookie consent rendering optimisation

### Disabled until further notice

The optimization apparently has caused a change in how GA4 and UA categorizes source traffic.
The Direct & Organic channels were flipped. Most of the traffic appeared as if it was Direct.

The code is in [consent-vs-regular](https://github.com/bright/new-www/tree/consent-vs-regular) branch.

### How it worked

After we introduced cookie consent prompt the performance of the page dropped significantly.
The Lighthouse reports indicated that it is because late LCP triggered by showing Cookie Consent.

In order to alleviate the issue during build we're publishing 2 versions of all `index.html` files.
The default one, renders cookie consent lazily after component mounts.
The second one has cookie consent rendered in html.

The rendering is controlled via `COOKIE_CONSENT_EAGER_RENDER_ENABLED` environment variable.

After the cookie consent enabled html version is rendered we copy it to S3 bucket with a different name.
All `index.html` files are copied to S3 as `index_showCookieConsent_.html`.
Finally, there's a [consent-vs-regular-origin-request.ts](infrastructure/lib/consent-vs-regular-origin-request.ts)
CloudFront Function called on viewer request event.
The function checks if the request includes `CookieConsent` cookie and if **not** changes the request to
show `index_showCookieConsent_.html`.

### Downsides

The above approach improves performance significantly. However, it requires us to perform 2 builds of the page.
Perhaps there's a better approach...
