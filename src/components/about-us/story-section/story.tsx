import React, { MutableRefObject, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { story } from './story-data'
import { TextRegular } from '../../shared'
import variables, { deviceSize } from '../../../styles/variables'
import { CustomSection } from './../../shared/index'
import { useState } from 'react'
import { clampBuilder } from './../../../helpers/clampBuilder'
import { TimelineLogo, TimelineImage } from '../../timeline'
import { useWindowSize } from '../../utils/use-windowsize'
import { StoryNavigation } from './StoryNavigation'
import { useScrollPosition } from '../../utils/use-scrollposition'

const StoriesWrapperScroll = styled.div<{ isScrollShouldVisible: boolean }>`
  ${({ isScrollShouldVisible }) => isScrollShouldVisible && 'overflow-x: scroll'};
  height: ${variables.pxToRem(600)};
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${variables.device.laptop} {
    height: ${variables.pxToRem(650)};
    width: 100vw;
  }
  @media ${variables.device.tabletXL} {
    height: ${variables.pxToRem(600)};
  }

  @media ${variables.device.tablet} {
    height: 100%;
    padding-bottom: ${variables.pxToRem(45)};
  }
  @media ${variables.device.mobile} {
    padding-bottom: ${variables.pxToRem(55)};
    height: 100%;
  }
`
const StoriesWrapperPosition = styled.div<{ isScrollShouldVisible: boolean }>`
  position: relative;
  width: auto;
  ${({ isScrollShouldVisible }) => isScrollShouldVisible && 'width: max-content'};

  &::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid #d3d3d3;
    width: 100%;
    top: 125px;
    z-index: -1;
  }

  @media ${variables.device.tablet} {
    width: 245vw;
  }
  @media ${variables.device.mobile} {
    width: 440vw;
  }
`

const StoriesWrapper = styled.div`
  display: flex;
  margin: 0 ${variables.pxToRem(240)};
  gap: ${variables.pxToRem(37)};
  width: max-content;

  @media ${variables.device.laptop} {
    margin: 0 ${variables.pxToRem(90)};
    gap: ${variables.pxToRem(32)};
  }
  @media ${variables.device.tabletXL} {
    margin: 0 ${variables.pxToRem(50)};
  }
  @media ${variables.device.tablet} {
    padding: 0 0 0 ${variables.pxToRem(25)};
    gap: 0;
    width: 100%;
  }
  @media ${variables.device.mobile} {
    padding: 0 0 0 ${variables.pxToRem(7)};
  }
`
const StoryWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  & .is-active {
    border: 1px solid #f7931e;
    font-weight: 600;
  }

  @media ${variables.device.tablet} {
    flex-basis: 100%;
  }
`
const Data = styled.p`
  padding: ${variables.pxToRem(14)} ${variables.pxToRem(18)};
  border: 1px solid #d3d3d3;
  margin-bottom: ${variables.pxToRem(64)};
  font-weight: normal;
  line-height: ${variables.pxToRem(19)};
  color: ${variables.color.text};
  font-size: ${clampBuilder(1542, 1920, 14, 16)};

  @media ${variables.device.laptop} {
    font-size: ${clampBuilder(1282, 1541, 14, 16)};
  }
  @media ${variables.device.tabletXL} {
    font-size: ${clampBuilder(993, 1281, 12, 16)};
  }
  @media ${variables.device.tablet} {
    font-size: ${clampBuilder(582, 992, 12, 16)};
  }
  @media ${variables.device.mobile} {
    font-size: ${variables.pxToRem(14)};
  }
`
const Label = styled.label`
  input[type='radio'] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
    width: 25px;
    height: 25px;
    font: inherit;
    box-shadow: 0px 10px 18px #0000001f;
    border: 1px solid #0a0a0a;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
    &::before {
      content: '';
      width: 13px;
      height: 13px;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background: #f7931e 0% 0% no-repeat padding-box;
    }
    & :checked::before {
      transform: scale(1);
    }
  }
`
export const PositionContentWrapper = styled.div<{ positionLeft?: boolean; isScrollShouldVisible?: boolean }>`
  position: absolute;
  top: 204px;
  width: ${variables.pxToRem(551)};
  ${({ isScrollShouldVisible }) => isScrollShouldVisible && 'position: relative; top: 0;'};
  ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:0`)};
  ${({ positionLeft }) => (positionLeft ? `right: 0` : `right:unset`)};

  height: auto;

  @media ${variables.device.tabletXL} {
    width: ${clampBuilder(993, 1281, 524, 654)};
  }
  @media ${variables.device.tablet} {
    position: relative;
    width: calc(100% - 2 * 106px);
    margin: 0 auto;
    top: 0;
  }
  @media ${variables.device.mobile} {
    position: relative;
    width: calc(100% - 2 * 18px);
    margin: 0 auto;
    top: 0;
  }
`
const ContentWrapper = styled.div<{ positionLeft?: boolean; positionFirst?: boolean; positionLast?: boolean }>`
  position: relative;
  box-shadow: 0px 0px 99px #00000017;
  padding: ${variables.pxToRem(36)} ${variables.pxToRem(33)};
  background: white;
  color: ${variables.color.text};
  transform: translate3d(0, 0, 0);

  &::before {
    content: '';
    z-index: -1;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    position: absolute;

    ${({ positionLeft }) => (positionLeft ? `right: ${clampBuilder(1542, 1920, 26, 29)}` : `right:unset`)};
    ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:${clampBuilder(1542, 1920, 26, 29)}`)};
    ${({ positionFirst }) => positionFirst && `left: ${clampBuilder(1542, 1920, 48, 52)}`};

    top: -9px;
    background: white;
    transform: rotate(90deg);
    clip-path: polygon(59% 0%, 0% 50%, 59% 100%);
    box-shadow: 0px 0px 99px #00000017;
  }
  @media ${variables.device.laptop} {
    & ::before {
      ${({ positionLeft }) => (positionLeft ? `right:clamp(1.125rem, -1.9686rem + 3.8610vw, 1.75rem)` : `right:unset`)};
      ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:clamp(1.125rem, -1.9686rem + 3.8610vw, 1.75rem)`)};
      ${({ positionFirst }) => positionFirst && `left: ${clampBuilder(1282, 1541, 48, 52)}`};
    }
  }
  @media ${variables.device.tabletXL} {
    & ::before {
      ${({ positionLeft }) => (positionLeft ? `right:${clampBuilder(993, 1281, 25, 29)}` : `right:unset`)};
      ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:${clampBuilder(993, 1281, 25, 29)}`)};
      ${({ positionFirst }) => positionFirst && `left: ${clampBuilder(993, 1281, 43, 53)}`};
    }
  }
  @media ${variables.device.tablet} {
    & ::before {
      ${({ positionLeft }) =>
        positionLeft ? `right:clamp(3.1875rem, -0.3613rem + 9.7561vw, 5.6875rem)` : `right:unset`};
      ${({ positionLeft }) =>
        positionLeft ? `left: unset` : `left:clamp(3.1875rem, -0.3613rem + 9.7561vw, 5.6875rem)`};
      ${({ positionFirst }) => positionFirst && `left: ${clampBuilder(582, 992, 51, 92)}`};
    }
  }
  @media ${variables.device.mobile} {
    & ::before {
      ${({ positionLeft }) => (positionLeft ? `right: 50%; transform: translateX(-50%);` : `right:unset`)};
      ${({ positionLeft }) =>
        positionLeft ? `left: unset` : `left:50%;     transform: translateX(-50%) rotate(90deg);`};

      ${({ positionFirst }) =>
        positionFirst && `left: ${clampBuilder(360, 581, 47, 88)}; transform: translateX(0%) rotate(90deg);`};
      ${({ positionLast }) =>
        positionLast && `left: ${clampBuilder(360, 581, 270, 449)}; transform: translateX(0%) rotate(90deg);`};
    }
  }
`
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${variables.pxToRem(32)};
  padding-bottom: ${variables.pxToRem(36)};
  & div:not(.logo) {
    overflow: hidden;
    transition: all 0.3s ease 0s;
    width: ${variables.pxToRem(107)};
    height: ${variables.pxToRem(107)};
    border: 1px solid rgb(211, 211, 211);
    border-radius: ${variables.pxToRem(189)};
    & img {
      border-radius: ${variables.pxToRem(180)};
      width: ${variables.pxToRem(107)};
      height: ${variables.pxToRem(107)};
    }
  }
  @media ${variables.device.tabletXL} {
    gap: ${variables.pxToRem(24)};
    padding-bottom: ${variables.pxToRem(23)};
    flex-flow: row;
    flex-wrap: wrap;
    & div:not(.logo) {
      width: ${variables.pxToRem(80)};
      height: ${variables.pxToRem(80)};
      & img {
        width: ${variables.pxToRem(80)};
        height: ${variables.pxToRem(80)};
      }
    }
  }
`

export function StoryComponent() {
  const [selectedTimeLine, setSelectedTimeLine] = useState(story[0].heading)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isScrollShouldVisible, setIsScrollShouldVisible] = useState(false)
  const [disabledLeft, setDisabledLeft] = useState('disabled')
  const [disabledRight, setDisabledRight] = useState('')
  const offsetMoveScroll = 100

  const handleChange = ({ target }) => {
    const { value } = target
    const index = target.getAttribute('data-index')

    if (value) {
      setSelectedTimeLine(value)
    } else {
      const value = target.getAttribute('data-value')
      setSelectedTimeLine(value)
    }

    setSelectedIndex(index)
  }
  const { width } = useWindowSize()

  const element = React.useRef<HTMLDivElement>(null)
  const boundingElement = React.useRef<HTMLDivElement>(null)

  useScrollPosition(
    ({ prevPos, currPos, isScrolling }) => {
      if (boundingElement.current && element.current) {
        const { clientWidth: parentWidth } = boundingElement.current
        const { clientWidth: childWidth } = element.current
        const isEndOfScroll = currPos.x + parentWidth === childWidth

        if (isEndOfScroll) {
          setDisabledLeft('')
          setDisabledRight('disabled')
        } else if (currPos.x <= 0) {
          setDisabledLeft('disabled')
          setDisabledRight('')
        } else {
          setDisabledLeft('')
          setDisabledRight('')
        }
      }
    },
    [],
    element as MutableRefObject<HTMLElement | undefined>,
    false,
    0,
    boundingElement as MutableRefObject<HTMLElement | undefined>
  )

  const scroll = (scrollOffset: any) => {
    boundingElement.current!.scrollLeft += scrollOffset
  }

  const getClientRect = (element: HTMLElement) => element.getBoundingClientRect().width
  useEffect(() => {
    if (element.current && boundingElement.current) {
      const widthChild = getClientRect(element.current)
      const widthParent = getClientRect(boundingElement.current)
      const isScrollShouldVisible = widthChild > widthParent
      setIsScrollShouldVisible(isScrollShouldVisible)
      console.log(widthChild, 'child')
      console.log(widthParent, 'parent')
    }
  }, [boundingElement, element])

  return (
    <CustomSection
      paddingProps={isScrollShouldVisible ? '0 0 2.3125rem' : ' 8.125rem 0 2.3125rem'}
      paddingLaptop={isScrollShouldVisible ? '0 0 2.3125rem' : ' 8.125rem 0 2.3125rem'}
      paddingTabletXL={isScrollShouldVisible ? '0 0 1.9375rem' : '4.375rem 0 0'}
      paddingTablet='7.6875rem 0 8.0625rem'
      paddingMobileProps='4.5625rem 0 5.6875'
    >
      {isScrollShouldVisible && width > deviceSize.tablet + 1 && typeof window !== 'undefined' && (
        <>
          <StoryNavigation
            onClickRight={() => scroll(offsetMoveScroll)}
            onClickLeft={() => scroll(-offsetMoveScroll)}
            disabledLeft={disabledLeft}
            disabledRight={disabledRight}
          />
        </>
      )}

      <StoriesWrapperScroll isScrollShouldVisible={isScrollShouldVisible} ref={boundingElement}>
        <StoriesWrapperPosition isScrollShouldVisible={isScrollShouldVisible}>
          <StoriesWrapper ref={element}>
            {story.map((item, index) => {
              const isChecked = selectedTimeLine === item.heading
              const isLeft = index >= 5
              const isFirst = index <= 1
              const isLast = index === story.length - 1

              return (
                <StoryWrapper key={item.heading}>
                  <Data
                    className={isChecked ? 'is-active' : ''}
                    data-value={item.heading}
                    data-index={index}
                    onMouseOver={handleChange}
                    onChange={handleChange}
                  >
                    {item.heading}
                  </Data>
                  <Label>
                    <input
                      type='radio'
                      value={item.heading}
                      data-index={index}
                      checked={isChecked}
                      onMouseOver={handleChange}
                      onChange={handleChange}
                    />
                  </Label>

                  {isChecked && width > deviceSize.tablet + 1 && typeof window !== 'undefined' && (
                    <PositionContentWrapper positionLeft={isLeft}>
                      <ContentWrapper positionLeft={isLeft} positionFirst={isFirst} positionLast={isLast}>
                        <ImageWrapper>
                          {item.images?.map(image => (
                            <TimelineImage key={image.src} {...image} />
                          ))}
                          {item.logos?.map(image => (
                            <TimelineLogo key={image.src} {...image} />
                          ))}
                        </ImageWrapper>

                        <TextRegular>{item.content}</TextRegular>
                      </ContentWrapper>
                    </PositionContentWrapper>
                  )}
                </StoryWrapper>
              )
            })}
          </StoriesWrapper>
        </StoriesWrapperPosition>
      </StoriesWrapperScroll>
      {selectedIndex >= 0 && width <= deviceSize.tablet + 1 && typeof window !== 'undefined' && (
        <PositionContentWrapper>
          <ContentWrapper positionFirst={selectedIndex == 0} positionLast={selectedIndex == story.length - 1}>
            <ImageWrapper>
              {story[selectedIndex].images?.map(image => (
                <TimelineImage key={image.src} {...image} />
              ))}
              {story[selectedIndex].logos?.map(image => (
                <TimelineLogo key={image.src} {...image} />
              ))}
            </ImageWrapper>

            <TextRegular>{story[selectedIndex].content}</TextRegular>
          </ContentWrapper>
        </PositionContentWrapper>
      )}
    </CustomSection>
  )
}
