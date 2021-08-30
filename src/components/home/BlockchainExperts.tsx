import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import {
  CustomContainer,
  CustomSection,
  CustomSectionTitle,
  CustomTextRegular,
  SectionInner,
} from '../shared/index.styled'
import styled from 'styled-components'
import { MoreButton } from './../shared/index'
import variables from '../../styles/variables'

const BlockchainExpertsTextRegural = styled(CustomTextRegular)`
  font-size: 1.25rem;
  text-align: center;
`

const ButtonBlockchainExperts = styled.div`
  & .btn {
    background-color: var(--black);
    color: #fff;
    font-size: ${variables.font.customtext.sizeButton};
    line-height: 1.375rem;
    padding: 1rem 4rem;
  }
`

export const BlockchainExperts = () => {
  return (
    <CustomSection>
      <CustomContainer>
        <CustomSectionTitle>we are blockchain experts</CustomSectionTitle>
        <SectionInner>
          <BlockchainExpertsTextRegural>
            We have experience in developing blockchain projects in Ethereum and Substrate. We believe that blockchain
            is the technology of the future that’s why we’ve developed our original project for blockchain enthusiasts
            as well. Meet Bright Treasury – our original app built to support blockchain Substrate community.
          </BlockchainExpertsTextRegural>
        </SectionInner>
        <StaticImage
          src=''
          alt=''
          placeholder='blurred'
          layout='fixed'
          width={200}
          height={200}
          className='about-img'
        />
        <StaticImage
          src=''
          alt=''
          placeholder='blurred'
          layout='fixed'
          width={200}
          height={200}
          className='about-img'
        />
        <ButtonBlockchainExperts>
          <MoreButton className='btn'>estimate blockchain project</MoreButton>
        </ButtonBlockchainExperts>
      </CustomContainer>
    </CustomSection>
  )
}
