import React from "react"
import styled from "styled-components"

export interface ProjectGraphql {
  title: string
  slug: string
  image: string
  layout: string
  published: string
  tags: string[]
}

interface ProjectCardProps {
  project: ProjectGraphql
}

const Container = styled.div`
  /* height: 600px; */
  margin-bottom: 3em;
  box-shadow: none;
`

const Image = styled.figure`
  height: 450px;
  margin-bottom: 1em;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`

const ProjectTitle = styled.h2`
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
`

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Container className="card">
      <div className="card-content has-text-centered">
        <a href={project.slug}>
          <Image className="image is-inline-block">
            <img src={project.image} alt={project.title} />
          </Image>
          <ProjectTitle className="is-size-5 has-text-black has-text-weight-bold">
            {project.title}
          </ProjectTitle>
        </a>
      </div>
    </Container>
  )
}

export default ProjectCard
