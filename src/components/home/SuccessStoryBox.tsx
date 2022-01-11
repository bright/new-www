import React, { FC } from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import variables from '../../styles/variables'

const Container = styled.div`
  border: 1px solid #d3d3d3;
  width: calc(50% - 2rem);
  min-height: 10rem;
  margin: 2rem 2rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:nth-child(odd) {
    margin-right: 0rem;
  }
  &:nth-child(even) {
    margin-left: 0rem;
  }

  &:hover {
    box-shadow: 15px 15px 40px -25px rgba(170, 170, 170, 1);
  }
  @media ${variables.device.laptop} {
    width: calc(50% - 1.75rem);
    margin: 1.75rem;
  }

  @media ${variables.device.tabletXL} {
    width: calc(50% - 1.41rem);
    margin: 1.41rem;
    height: ${variables.pxToRem(520)};
  }

  @media ${variables.device.tablet} {
    margin: 0.5625rem 0;
    width: 100%;
    height: auto;
    &:nth-child(7) {
      margin-bottom: 4rem;
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
  color: black;
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
  image: IGatsbyImageData
  title: string
  slug: string
  className?: string
}

const SuccessStoryBox: FC<SuccessStoryBoxProps> = props => {
  return (
    <Container className={props.className}>
      <Link to={routeLinks.projects + '/' + props.slug}>
        <Title>{props.title}</Title>
        <Image className='image'>
          <GatsbyImage
            imgStyle={{ objectFit: 'contain', height: '100%', width: '100%' }}
            image={getImage(props.image)!}
            alt={props.title}
          />
        </Image>
      </Link>
    </Container>
  )
}

export default SuccessStoryBox
