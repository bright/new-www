import React, { useRef } from 'react'
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
import { LogoTreasuryIcon } from '../icons/LogoTreasury.icon'

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

const ImageWrapper = styled.div`
  .about-img {
    margin-right: auto;
    margin-left: auto;
  }
`

const BlockchainExperts = () => {
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
            <LogoTreasuryIcon />

            <StaticImage
              src='../../../static/images/Treasury_www_LargeSize.png'
              alt=''
              placeholder='blurred'
              layout='constrained'
              width={1475}
              className='about-img'
              quality={100}
            />
          </ImageWrapper>
        </Link>

        <MoreButton className='btn' href={routeLinks.startProject} isBlack>
          estimate blockchain project
        </MoreButton>
      </CustomContainer>
    </CustomSection>
  )
}

export default BlockchainExperts
