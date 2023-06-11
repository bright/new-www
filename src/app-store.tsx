import React from 'react'
import { FlexWrapper } from './components/shared';
import styled from 'styled-components';


const AppSection = styled.section`
    & a {
        font-size: 0;
    }
`

const GoogleAppImg = styled.img`
    max-height: 90px;
    display: block;
    object-fit: cover;
    
`
const AppStoreImg = styled.img`
    display: block;
    max-height: 64px;
    width: auto;
`
export interface AppStoreProps {
    googleApp: string;
    srcGoogle: string;
    altGoogleImage: string;
    appStore: string;
    srcAppStore: string;
    altAppStoreImage: string;
}
export const AppStore = ({
    googleApp,
    srcGoogle,
    altGoogleImage,
    appStore,
    srcAppStore,
    altAppStoreImage }: AppStoreProps) => {
    return (
        <AppSection>
            <FlexWrapper desktopGap='64px' desktopItems='center' desktopContent='center' laptopGap='48px' mobileGap='32px'>
                <a href={googleApp}><GoogleAppImg src={srcGoogle} alt={altGoogleImage} />Google Play</a>
                <a href={appStore}><AppStoreImg src={srcAppStore} alt={altAppStoreImage} />App Store</a>
            </FlexWrapper>
        </AppSection>

    )
}
