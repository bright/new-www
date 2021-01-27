import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { ProjectModel } from '../../../models/gql'
import variables from '../../../styles/variables'
import { routeLinks } from '../../../config/routing'

import RightArrow from '../../../assets/rightArrow.svg'
import { SectionTitle, TextRegular } from '..'

interface CarouselCardProps {
  project: ProjectModel
}

const Container = styled(Link)({
  marginTop: '35px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const ProjectDescriptionWrapper = styled.div({
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const Title = styled(SectionTitle)({
  textAlign: 'left',
  color: variables.color.text,
})

const Description = styled(TextRegular)({
  marginTop: '55px',
  textAlign: 'left',
  color: variables.color.text,
})

const ImageWrapper = styled.figure({
  display: 'inline-block',

  flex: 1,
})

const Image = styled.img({
  objectFit: 'contain',
  height: '450px',
  width: '100%',

  ['@media screen and (max-width: 768px)']: {
    maxWidth: '200px',
  },
})

const GoToContainer = styled.div({
  margin: '35px 0',
  alignSelf: 'flex-start',
})

const CarouselCard: React.FC<CarouselCardProps> = ({ project }) => {
  return (
    <Container to={`${routeLinks.projects}/${project.slug}`}>
      <ProjectDescriptionWrapper>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <GoToContainer>
          <RightArrow />
        </GoToContainer>
      </ProjectDescriptionWrapper>
      <ImageWrapper>
        <Image src={project.image} alt={project.title} />
      </ImageWrapper>
    </Container>
  )
}

export default CarouselCard
