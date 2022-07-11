import React, { useState, useMemo, MutableRefObject } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { useScrollPosition } from './../../components/utils/use-scrollposition'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { ArrowJobTemplateIcon } from '../../components/icons/ArrowJobTemplate.icon'

const ImageWrapper = styled.div`
  position: relative;
  @media ${variables.device.tablet} {
    padding-left: ${variables.pxToRem(36)};
    width: 100vw;
    overflow: scroll;
  }
  @media ${variables.device.mobile} {
    padding-left: ${variables.pxToRem(18)};
  }
`
const ImageWrapperRef = styled.div`
  width: 100%;
  @media ${variables.device.tablet} {
    & .scroll {
      display: inline-flex;
      & > .about-img {
        width: 1900px;
        & img {
          z-index: -1;
        }
      }
    }
  }
  @media ${variables.device.mobile} {
    & .scroll {
      & > .about-img {
        width: 1000px;
      }
    }
  }
`
const SvgArrowWrapper = styled.div<{ show: boolean; isRotate: boolean }>`
  position: sticky;
  right: 1rem;

  opacity: 0;
  height: fit-content;

  @media ${variables.device.tablet} {
    transform: ${({ isRotate }) => (isRotate ? 'rotate(180deg)' : 'rotate(0deg)')};
    opacity: ${({ show }) => (show ? '1' : '0')};
    right: ${variables.pxToRem(37)};
    margin-top: ${variables.pxToRem(305)};
  }
  @media ${variables.device.mobile} {
    right: ${variables.pxToRem(18)};
    margin-top: ${variables.pxToRem(173)};
  }
`

export const JobImage: React.FC<{ alt: string; image: IGatsbyImageData; className: string }> = ({
  alt,
  image,
  className,
}) => {
  const [hideOnScroll, setHideOnScroll] = useState<boolean>(false)
  const [rotateArrow, setRotateArrow] = useState<boolean>(false)
  const element = React.useRef<HTMLDivElement>(null)
  const boundingElement = React.useRef<HTMLDivElement>(null)
  useScrollPosition(
    ({ prevPos, currPos, isScrolling }) => {
      if (boundingElement.current && element.current && element.current.firstChild) {
        const child: HTMLDivElement = element.current.firstChild as HTMLDivElement
        const { clientWidth: parentWidth } = boundingElement.current
        const { clientWidth: childWidth } = child
        const isEndOfScroll = currPos.x + parentWidth === childWidth

        if (isEndOfScroll) {
          setRotateArrow(true)
        } else if (currPos.x < 0) {
          setRotateArrow(false)
        }
        setTimeout(() => {
          setHideOnScroll(isScrolling)
        }, 0)
      }
    },
    [],
    element as MutableRefObject<HTMLElement | undefined>,
    false,
    0,
    boundingElement as MutableRefObject<HTMLElement | undefined>
  )
  return useMemo(
    () => (
      <ImageWrapper ref={boundingElement}>
        <ImageWrapperRef ref={element}>
          <div className='scroll'>
            <GatsbyImage image={image} alt={alt} className={className} />
            <SvgArrowWrapper className='arrow-wrapper' isRotate={rotateArrow} show={!hideOnScroll}>
              <ArrowJobTemplateIcon />
            </SvgArrowWrapper>
          </div>
        </ImageWrapperRef>
      </ImageWrapper>
    ),
    [rotateArrow, hideOnScroll]
  )
}
