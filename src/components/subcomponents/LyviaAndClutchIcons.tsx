import React from 'react'
import ClutchIcon from '../../assets/TopDevelopers_badge.svg'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { FlexWrapper } from '../shared'
import { CustomSection } from '../shared/index.styled'

const Image100 = styled.figure`
  width: 100px;
  height: auto;
  svg {
    width: 100px;
    height: auto;
  }

  @media ${variables.device.laptop} {
    width: 80px;
    height: auto;
    svg {
      width: 80px;
      height: auto;
    }
  }
  @media ${variables.device.tablet} {
    width: 60px;
    height: auto;
    svg {
      width: 60px;
      height: auto;
    }
  }
`
const IconLikn = styled.a`
font-size: 0;
`

const LyviaAndClutchIcons = () => {
    return (
        <CustomSection paddingProps='30px 0 0 12px ' paddingLaptop='30px 0 0 12px' paddingTabletXL='30px 0 0 12px' paddingTablet='30px 0 0 12px' paddingMobileProps='30px 0 0 12px' >
            <FlexWrapper>  <IconLikn
                href='https://clutch.co/profile/bright-inventions#highlights'
                target='_blank'
                rel='noopener noreferrer nofollow'
            >
                clutch <Image100> <ClutchIcon /></Image100>
            </IconLikn></FlexWrapper>
        </CustomSection>
    )
}

export default LyviaAndClutchIcons