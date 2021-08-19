import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { ProjectModel } from '../../../models/gql'
import variables from '../../../styles/variables'
import { routeLinks } from '../../../config/routing'

import RightArrow from '../../../assets/rightArrow.svg'
import { SectionTitle, TextRegular } from '..'
import { HideTablet } from '../index.styled'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'

interface CarouselCardProps {
  project: ProjectModel
}

const Container = styled(Link)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  ['@media screen and (max-width: 767px)']: {
    flexDirection: 'column-reverse',
  },
})

const ProjectDescriptionWrapper = styled.div({
  flexBasis: '50%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const Title = styled(SectionTitle)({
  textAlign: 'left',
  color: variables.color.text,
  marginBottom: '0px',
  fontWeight: '900',
  ['@media screen and (max-width: 767px)']: {
    fontSize: '18px',
  },
})

const Description = styled(TextRegular)({
  marginTop: '3.5rem',
  textAlign: 'left',
  fontSize: '20px',
  color: 'var(--black-200)',
  ['@media screen and (max-width: 767px)']: {
    marginTop: '1.125rem',
    fontSize: '16px',
  },
})

const imageStyle = {
  objectFit: 'cover' as 'cover',
  height: '100%',
  width: '100%',

  ['@media screen and (max-width: 768px)']: {
    maxWidth: '200px',
    height: '100%',
  },
}

const GoToContainer = styled.div({
  marginTop: '2rem',
  textAlign: 'start',
  fontSize: '1.125rem',
  fontWeight: '900',
  ['@media screen and (max-width: 768px)']: {
    marginTop: '1.125rem',
    marginBottom: '4rem',
  },
})

const CarouselCard: React.FC<CarouselCardProps> = ({ project }) => {
  return (
    <Container to={`${routeLinks.projects}/${project.slug}`}>
      <ProjectDescriptionWrapper>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <GoToContainer>
          Read more
          {/* <RightArrow /> */}
        </GoToContainer>
      </ProjectDescriptionWrapper>
      <GatsbyImage imgStyle={imageStyle} image={getImage(project.image)!} alt={project.title} />
    </Container>
  )
}

export default CarouselCard
