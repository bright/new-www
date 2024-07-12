import styled from 'styled-components'
import variables, { roundedCorners } from '../../styles/variables'

export const Wrapper = styled.footer`
    color: ${variables.color.white};
    background-color: ${variables.color.brightBlack};
    font-family: ${variables.font.lato};
`

export const ContentWrapper = styled.div`
    font-size: 16px;
    padding: 96px 16px 40px;
    display: grid;
    grid-gap: 48px;
    grid-template-areas: 
      "contact-us"
      "head-office"
      "reach-us"
      "disclaimer";


    @media ${variables.deviceWidthMin.mobile} {
        font-size: 21px;
    }
    
    @media ${variables.deviceWidthMin.tabletXL} {
        font-size: 14px;
        padding: 131px 78px 50px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas: 
          "contact-us contact-us explore-more services"
          "head-office head-office . disclaimer"
          "reach-us reach-us . disclaimer";
    }

    @media ${variables.deviceWidthMin.laptop} {
        font-size: 14px;
    }

    @media ${variables.deviceWidthMin.desktop} {
        font-size: 18px;
        padding: 198px 117px 78px;
    }
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const DesktopOnlyBox = styled(Box)`
    display: none;
    
    @media ${variables.deviceWidthMin.tabletXL} {
        display: flex;
    }
`

export const InnerContent = styled.div`
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const ContactButton = styled.span`
    border-radius: ${roundedCorners};
    border: 2px solid ${variables.color.white};
    background-color: ${variables.color.white};
    display: flex;
    padding: 8px 8px 8px 24px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    font-family: ${variables.font.montserrat};
    font-size: 24px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    color: ${variables.color.brightBlack};
    justify-content: space-between;
    
    &:hover {
        background-color: ${variables.color.brightBlack};
        color: ${variables.color.white};
        border: 2px solid ${variables.color.white};
    }

    @media ${variables.deviceWidthMin.tabletXL} {
        max-width: 90%;
    }

    @media ${variables.deviceWidthMin.laptop} {
        max-width: 80%;
    }
`

export const Header = styled.div`
    color: ${variables.color.white};
    font-family: ${variables.font.montserrat};
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: 100%;

    @media ${variables.deviceWidthMin.tabletXL} {
        font-size: 25px;
    }

    @media ${variables.deviceWidthMin.laptop} {
        font-size: 28px;
    }

    @media ${variables.deviceWidthMin.desktop} {
        font-size: 38px;
    }
`

export const ExaggeratedLink = styled.a`
    text-decoration: underline;
    color: ${variables.color.white};
    cursor: pointer;
    
    &:hover {
        color: ${variables.color.primary};
    }
`

export const SocialsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
`

export const Partners = styled.div`
    display: flex;
    gap: 8px;
    align-items: start;
    align-self: end;
    width: 75%;
    
    @media ${variables.deviceWidthMin.tabletXL} {
        width: 100%;
    }
`;

export const PartnerLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    & svg {
        height: 60px;
    }
`;

export const Disclaimer = styled.div`
    font-size: 11px;
    align-self: end;
    width: 75%;

    a {
        color: ${variables.color.white};
        text-decoration: underline;

        &:hover {
            color: ${variables.color.primary};
        }
    }
    
    @media ${variables.deviceWidthMin.tabletXL} {
        width: 100%;
    }
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    a {
        color: ${variables.color.white};

        &:hover {
            color: ${variables.color.primary};
        }
    }
`