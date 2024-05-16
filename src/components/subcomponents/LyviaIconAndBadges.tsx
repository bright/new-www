import React from 'react'
import LyviaLogo from '../../assets/a_part_of_lyvia_white_1.svg'
import ForbesDiamondBadge from '../../assets/forbes_badge.svg'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { FlexWrapper } from '../shared'
import { CustomSection } from '../shared/index.styled'

const Image100 = styled.figure`
  width: 120px;
  height: auto;
  overflow: hidden;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
  }

  @media ${variables.device.laptop} {
    width: 80px;
    height: auto;

  }
  @media ${variables.device.tablet} {
    width: 60px;
    height: auto;

  }
`
const IconLink = styled.a`
  font-size: 0;
  height: 100%;
`

const AWSIcon = styled.img`
  padding-top: 10px;
  width: 85%;
`

const LyviaIconAndBadges = () => {
  return (
    <CustomSection paddingProps='35px 0 0 12px ' paddingLaptop='35px 0 0 12px' paddingTabletXL='35px 0 0 12px'
                   paddingTablet='30px 0 0 12px' paddingMobileProps='30px 0 0 12px'>
      <FlexWrapper desktopGap='30px' desktopDirection='column'>
        <IconLink href='https://www.lyviagroup.com'
                  target='_blank'
                  rel='noopener noreferrer nofollow'>
          We are a part of Lyvia Group
          <Image100><LyviaLogo /> </Image100>
        </IconLink>
        <FlexWrapper desktopGap='18px'>
          <IconLink
            href='https://partners.amazonaws.com/partners/0010h00001hdw3OAAQ/Bright%20Inventions'
            target='_blank'
            rel='noopener noreferrer nofollow'
          >
            <Image100>
              <AWSIcon src={'/images/aws-partner-black.png'} />
            </Image100>
          </IconLink>
          <IconLink
            href='/blog/bright-inventions-recognized-in-forbes-diamonds-2024/'
            rel='noopener noreferrer nofollow'
          >
            Forbes Diamond <Image100> <ForbesDiamondBadge /> </Image100>
          </IconLink>
        </FlexWrapper>
      </FlexWrapper>
    </CustomSection>
  )
}

export default LyviaIconAndBadges