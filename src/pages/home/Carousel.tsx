import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import classNames from 'classnames'
import {Carousel as CarouselLib} from 'react-responsive-carousel'

import ProjectCard from '../../components/subcomponents/ProjectCard'
import {ProjectModel} from '../../models/gql'
import BackArrow from '../../assets/backArrowBlack.svg'
import NextArrow from '../../assets/nextArrowBlack.svg'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './Carousel.module.scss'

export const Carousel = () => {
    const {allMarkdownRemark: { edges }} = useStaticQuery(GQL)
    const carouselItems: ProjectModel[] = edges ? edges.map((e: any) => e.node.frontmatter) : []

    // @todo: to fix TS type
    const indicator = (onClickHandler: any, isSelected: boolean) => isSelected
        ? <li className={classNames(styles.indicator, styles.active)}>&#x2022;</li>
        : <li className={styles.indicator} onClick={onClickHandler}>&#x2022;</li>

    const arrowPrev = (onClickHandler: any) => (
        <div className={styles.arrow} style={{left: 15}}>
            <BackArrow onClick={onClickHandler}/>
        </div>
    )

    const arrowNext = (onClickHandler: any) => (
        <div className={styles.arrow} style={{right: 15}}>
            <NextArrow onClick={onClickHandler}/>
        </div>
    )

    return (
        <section className={classNames('container', styles.carouselContainer)}>
            <CarouselLib
                className={styles.carousel}
                showStatus={false}
                showThumbs={false}
                infiniteLoop
                renderIndicator={indicator}
                renderArrowPrev={arrowPrev}
                renderArrowNext={arrowNext}>
                {(carouselItems || []).map((item, index) => (
                    <div key={index + 'project'}>
                        <ProjectCard project={item as ProjectModel} invertTitle={true} isAnchor={false}/>
                    </div>
                ))}
            </CarouselLib>
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