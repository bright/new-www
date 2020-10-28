import React from 'react'
import classNames from 'classnames'
import {Carousel} from 'react-responsive-carousel'

import ProjectCard, {ProjectGraphql} from '../../components/subcomponents/ProjectCard'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import BackArrow from '../../assets/backArrowBlack.svg'
import NextArrow from '../../assets/nextArrowBlack.svg'
import styles from './Header.module.scss'


interface Props {
    items: ProjectGraphql[]
}

const HeaderCarousel: React.FC<Props> = ({items}) => {
    // @todo: to fix TS type
    const indicator = (onClickHandler: any, isSelected: boolean) => {
        if (isSelected) {
            return <li className={classNames(styles.indicator, styles.active)}>&#x2022;</li>
        }
        return (
            <li className={styles.indicator} onClick={onClickHandler}>
                &#x2022;
            </li>
        )
    }

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
        <Carousel
            className={styles.carousel}
            showStatus={false}
            showThumbs={false}
            infiniteLoop
            renderIndicator={indicator}
            renderArrowPrev={arrowPrev}
            renderArrowNext={arrowNext}>
            {(items || []).map((item, index) => (
                <div key={index + 'project'}>
                    <ProjectCard project={item as ProjectGraphql} invertTitle={true}/>
                </div>
            ))}
        </Carousel>
    )
}

export default HeaderCarousel
