import React from 'react'
import classNames from 'classnames'

import {ProjectModel} from '../../models/gql'

import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
    project: ProjectModel
    invertTitle?: boolean
    isAnchor?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, invertTitle, isAnchor}) => {
    const Title = () => (
        <span className={classNames('is-size-5 has-text-black has-text-weight-bold', styles.title)}>
            {project.title}
        </span>
    )

    const Image = () => (
        <figure className={classNames('image is-inline-block', styles.imageWrap)}>
            <img src={project.image} alt={project.title}/>
        </figure>
    )

    const Content = () => invertTitle
            ? (
                <React.Fragment>
                    <Image />
                    <Title />
                </React.Fragment>
            )
            : (
                <React.Fragment>
                    <Title />
                    <Image />
                </React.Fragment>
            )

    return isAnchor
        ? <a className={classNames('card-content', styles.container)} href={project.slug}><Content /></a>
        : <div className={classNames('card-content', styles.container)}><Content /></div>
}

export default ProjectCard
