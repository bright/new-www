import React, { FC } from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import variables from '../../styles/variables'
import { ProjectModel } from '../../models/gql'

const Container = styled.div`
  border: 1px solid #d3d3d3;
  width: calc(50% - 2rem);
  margin: 2rem 2rem;
  display: flex;
  flex-direction: column;
  min-height: 748px ;
  cursor: pointer;
  border-radius: 16px;
  &:nth-child(odd) {
    margin-right: 0rem;
  }
  &:nth-child(even) {
    margin-left: 0rem;
  }
  &:nth-child(2) {
    margin-top: 0;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
    
  > a {
      padding: 1rem;
  }  
    
  @media ${variables.device.laptop} {
    width: calc(50% - 1.75rem);
    margin: 1.75rem;
    min-height: ${variables.pxToRem(634)};
  }

  @media ${variables.device.tabletXL} {
    width: calc(50% - 1.41rem);
    margin: 1.41rem;
    min-height: ${variables.pxToRem(550)};
  }

  @media ${variables.device.tablet} {
    margin: 0.5625rem 0;
    width: 99%;
    min-height: ${variables.pxToRem(435)};

    &:nth-child(2) {
      margin-top: 0.5625rem;
    }
  }
`

const Title = styled.h3`
  padding-top: 4rem;
  text-align: center;
  font-family: ${variables.font.title.family};
  font-size: ${variables.font.customtitle.sizeSuccesTitleStory};
  font-style: normal;
  font-weight: 700;
  color: ${variables.color.heading};
  @media ${variables.device.tabletXL} {
    padding-top: 2rem;
    font-size: 1.5625rem;
  }
  @media ${variables.device.mobile} {
    padding-top: 3rem;
    font-size: ${variables.font.customtitle.sizeSuccesTitleStoryMobile};
  }
`

const Image = styled.figure`
  margin-top: 1em;
  height: 600px;

  @media ${variables.device.laptop} {
    height: 488px;
  }
  @media ${variables.device.tabletXL} {
    height: 388px;
  }

  @media ${variables.device.tablet} {
    height: 486px;
    width: 100%;
  }
  @media ${variables.device.mobile} {
    height: 243px;
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export interface SuccessStoryBoxProps {
  className?: string
  project: ProjectModel
}

export const SuccessStoryBox: FC<SuccessStoryBoxProps> = ({ project, className }) => {
  return (
    <Container className={className}>
      <Link to={routeLinks.project(project)}>
        <Title>{project.title}</Title>
        <Image className='image'>
          <GatsbyImage
            imgStyle={{ objectFit: 'cover', height: '100%', width: '100%' }}
            image={getImage(project.image)!}
            alt={project.title}
          />
        </Image>
      </Link>
    </Container>
  )
}

