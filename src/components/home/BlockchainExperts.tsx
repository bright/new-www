import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import {
  CustomContainer,
  CustomSection,
  CustomSectionInner,
  CustomSectionTitle,
  CustomTextRegular,
} from '../shared/index.styled'
import styled from 'styled-components'
import { MoreButton } from './../shared/index'
import variables from '../../styles/variables'
import { Link } from 'gatsby'
import { routeLinks } from '../../config/routing'
import { Projects } from './Projects'

const BlockchainExpertsTextRegural = styled(CustomTextRegular)`
  line-height: 2.5rem;
  text-align: center;
  @media ${variables.device.laptop} {
    line-height: 2.5rem;
  }
  @media ${variables.device.mobile} {
    line-height: 1.75rem;
  }
`

const ButtonBlockchainExperts = styled.div`
  & .btn {
    background-color: var(--black);
    color: #fff;
    font-size: ${variables.font.customtext.sizeButton};
    line-height: 1.375rem;
    padding: 1rem 4rem;
    &:hover {
      background-color: var(--orange-200);
      border: 1px solid transparent;
    }
    @media ${variables.device.mobile} {
      font-size: ${variables.font.customtext.sizeMobile};
      width: 100%;
      white-space: nowrap;
      padding: 1rem 0;
    }
  }
  .column {
    padding: 0;
  }
`
const ImageWrapper = styled.div`
  .about-img {
    margin-right: auto;
    margin-left: auto;
    &:first-of-type {
      display: block;
      margin-top: ${variables.pxToRem(64)};
      max-width: ${variables.pxToRem(257)};
      margin-bottom: ${variables.pxToRem(10)};
    }
  }
  @media ${variables.device.laptop} {
    .about-img {
      &:first-of-type {
        margin-top: ${variables.pxToRem(44)};
        margin-bottom: ${variables.pxToRem(4)};
        max-width: ${variables.pxToRem(217)};
      }
    }
  }
  @media ${variables.device.tabletXL} {
    .about-img {
      &:first-of-type {
        margin-bottom: ${variables.pxToRem(17)};
      }
    }
  }

  @media ${variables.device.mobile} {
    .about-img {
      &:first-of-type {
        margin-bottom: ${variables.pxToRem(38)};
        max-width: ${variables.pxToRem(228)};
      }
    }
  }
`

export const BlockchainExperts = () => {
  return (
    <CustomSection>
      <CustomContainer>
        <CustomSectionTitle>we are blockchain experts</CustomSectionTitle>
        <CustomSectionInner>
          <BlockchainExpertsTextRegural>
            We have experience in developing blockchain projects in Ethereum and Substrate. We believe that blockchain
            is the technology of the future that’s why we’ve developed our original project for blockchain enthusiasts
            as well. Meet BrightTreasury – our original app built to support blockchain Substrate community.
          </BlockchainExpertsTextRegural>
        </CustomSectionInner>
        <Link to='/projects/bright-treasury'>
          <ImageWrapper>
            <StaticImage
              src='../../../static/images/brightTreasuryLogo.svg'
              alt=''
              placeholder='blurred'
              layout='constrained'
              width={344}
              className='about-img'
            />
            <StaticImage
              src='../../../static/images/Treasury_www_LargeSize.png'
              alt=''
              placeholder='blurred'
              layout='constrained'
              width={1475}
              className='about-img'
            />
          </ImageWrapper>
        </Link>
        <ButtonBlockchainExperts>
          <Link to={routeLinks.startProject}>
            <MoreButton className='btn'>estimate blockchain project</MoreButton>
          </Link>
        </ButtonBlockchainExperts>
      </CustomContainer>
    </CustomSection>
  )
}
