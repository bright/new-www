import React from 'react'
import { MoreButton } from './components/shared'
import styled from 'styled-components'
import variables from './styles/variables'


const MoreButtonWrapper = styled.div`
    margin-top: ${variables.pxToRem(97)};
    @media ${variables.device.laptop} {
        margin-top: ${variables.pxToRem(81)};
    }
    @media ${variables.device.tablet} {
        margin-top: ${variables.pxToRem(64)};
    }
`

export interface AnchorLinkProps {
    text: string,
    href: string,
}

export const AnchorLink = ({ text, href }: AnchorLinkProps) => {
    return (
        <MoreButtonWrapper>
            <MoreButton href={href} text={text} isBlack marginTop='0' />
        </MoreButtonWrapper>

    )
}
