import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import classNames from 'classnames'

import HeaderTitle from './HeaderTitle'
import HeaderCarousel from './HeaderCarousel'

import styles from './Header.module.scss'

const Header = () => {
  const {allMarkdownRemark: { edges }} = useStaticQuery(GQL)
  const carouselItems = edges.map((e: any) => e.node.frontmatter)

  return (
    <section className={classNames('hero', styles.header)}>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns'>
            <HeaderTitle />
            <div className={classNames('column is-two-fifths is-hidden-mobile has-text-centered', styles.carouselContainer)}>
              <HeaderCarousel items={carouselItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GQL = graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { layout: { eq: "project" }, published: { ne: false } }
        }
        limit: 6
        sort: { order: ASC, fields: frontmatter___order }
      ) {
        edges {
          node {
            frontmatter {
              title
              image
              layout
              slug
              published
            }
          }
        }
      }
    }
  `

export default Header
