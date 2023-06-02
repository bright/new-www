import React from 'react'
import styled from 'styled-components'
import { CustomSection, CustomSectionTitle, FlexWrapper } from './components/shared'
import variables from './styles/variables'

const TitleWithIconSection = styled(CustomSection)`
    && h2 {
        margin: 0;
        margin-top:0;
        &:not(:first-child) {
            margin-top: 0;
        }
    }
`
const TitleWithIconCustomSectionTitle = styled(CustomSectionTitle)`
    font-weight: 800;
`
const ImageWrapper = styled.div`
    & img {
        display:  block;;
    }
   
`
const TitleWithIconFlexWrapper = styled(FlexWrapper)`
    width: 100%;
`
export interface TitleWithIconProps {
    sectionTitle: string
    titleIcon: string
    titleIconAlt: string

}
export const TitleWithIcon: React.FC<TitleWithIconProps> = ({
    sectionTitle,
    titleIcon,
    titleIconAlt
}) => {
    return (
        <TitleWithIconSection paddingProps='186px 0 105px' paddingLaptop='89px 0 105px' paddingTabletXL='116px 0 64px' paddingTablet='82px 0 56px' paddingMobileProps='66px 0 30px'>
            <TitleWithIconFlexWrapper desktopItems='center' desktopContent='center' desktopGap='33px' mobileDirection='column' mobileGap='24px'>
                <ImageWrapper>
                    <img alt={titleIconAlt} src={titleIcon} loading='lazy' width={77} height={28} />
                </ImageWrapper>
                <TitleWithIconCustomSectionTitle>{sectionTitle}</TitleWithIconCustomSectionTitle>

            </TitleWithIconFlexWrapper>
        </TitleWithIconSection>

    )
}