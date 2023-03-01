/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }, options) => {
  return (
    <>
      {element}
      <GoogleGtagScript options={options} />
    </>
  )
}
