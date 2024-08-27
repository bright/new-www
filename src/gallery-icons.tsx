import React from 'react';
import { FlexWrapper } from './components/shared';
import styled from 'styled-components';
import variables from './styles/variables';



const GallerySection = styled.div`
    margin: 0 ${variables.pxToRem(-319)} ${variables.pxToRem(85)};
    @media ${variables.device.laptop} {
        margin: 0 ${variables.pxToRem(-220)} ${variables.pxToRem(64)};
    }
    @media ${variables.device.tabletXL} {
        margin: 0 0 ${variables.pxToRem(64)};
    }
    @media ${variables.device.mobile} {
        margin: 0 0 2em;
    }
`
const ImageWrapper = styled.div<{ length: number }>`
flex-basis: ${({ length }) => length && `calc(100%/${length} - (90px - 90px/${length}))`};
    & img{
        display: block;
        width: 100%;
    }
    @media ${variables.device.tabletXL} {
        flex-basis:${({ length }) => length && `calc(100% / (${length}/2) - (90px - 90px / 4))`};
    }
    @media ${variables.device.mobile} {
        flex-basis:${({ length }) => length && `calc(100% / 2 - (74px - 74px / 2))`};
    }
`
interface Image {
    src: string;
    alt: string;
}
export interface GalleryIconsProps {
    images: Image[];
}

export const Gallery = ({ images }: GalleryIconsProps) => {
    let parsedImages: Image[];

    if (typeof images === 'string') {
        parsedImages = JSON.parse(images);
    } else if (Array.isArray(images)) {
        parsedImages = images;
    } else {
        console.error('Images is neither an array nor a string:', images);
        return null; // or render some error state
    }

    return (
        <GallerySection >
            <FlexWrapper desktopItems='flex-end' desktopGap='90px' tabletXLWrap='wrap' mobileGap='74px'>
                {parsedImages.map((image: { src: string | undefined; alt: string | undefined; }, index: React.Key | null | undefined) => {
                    return (
                        <ImageWrapper key={index} length={parsedImages.length}>
                            <img src={image.src} alt={image.alt} />
                        </ImageWrapper>
                    )
                })
                }
            </FlexWrapper >
        </GallerySection>
    );
};


