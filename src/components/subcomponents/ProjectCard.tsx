import React from 'react'
import classNames from 'classnames'

import {ProjectModel} from '../../models/gql'
import {routeLinks} from '../../config/routing'

import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
    project: ProjectModel
    invertTitle?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({project, invertTitle}) => {
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

    return (
        <a className={classNames('card-content', styles.container)} href={`${routeLinks.projects}/${project.slug}`}>
            {invertTitle
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
            }
        </a>
    )
}

export default ProjectCard
