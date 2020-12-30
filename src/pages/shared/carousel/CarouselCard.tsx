import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { ProjectModel } from '../../../models/gql'
import variables from '../../../styles/variables'
import { routeLinks } from '../../../config/routing'

import RightArrow from '../../../assets/rightArrow.svg'

interface CarouselCardProps {
  project: ProjectModel
}

const Container = styled(Link)({
  marginTop: '105px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
})

const ProjectDescriptionWrapper = styled.div({
  maxWidth: '580px',

  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
})

const Title = styled.div({
  fontSize: '36px',
  lineHeight: '42px',
  fontWeight: 800,

  fontFamily: variables.headerFont,

  textAlign: 'left',

  color: variables.blackTextColor
})

const Description = styled.div({
  marginTop: '55px',

  fontSize: '20px',
  lineHeight: '40px',

  fontFamily: variables.textFont,

  textAlign: 'left',

  color: variables.blackTextColor
})

const ImageWrapper = styled.figure({
  height: '450px',
  display: 'inline-block'
})

const Image = styled.img({
  objectFit: 'contain',
  height: '100%',
  width: '100%',
  maxWidth: '500px',

  ['@media screen and (max-width: 768px)']: {
    maxWidth: '200px'
  }
})

const GoToContainer = styled.div({
  marginTop: '35px',
  alignSelf: 'flex-start'
})

const CarouselCardProps: React.FC<CarouselCardProps> = ({ project }) => {
  return (
    <Container to={`${routeLinks.projects}/${project.slug}`}>
      <ProjectDescriptionWrapper>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <GoToContainer>
          <RightArrow/>
        </GoToContainer>
      </ProjectDescriptionWrapper>
      <ImageWrapper>
        <Image src={project.image} alt={project.title}/>
      </ImageWrapper>
    </Container>
  )
}

export default CarouselCardProps
