import React from 'react'
import styled from 'styled-components'
import { story } from './story-data'
import { TextRegular } from '../../shared'
import variables from '../../../styles/variables'
import { CustomSection } from './../../shared/index'
import { useState } from 'react'
import { clampBuilder } from './../../../helpers/clampBuilder'
import { TimelineLogo, TimelineImage } from '../../timeline'
import { useWindowSize } from '../../utils/use-windowsize'

const StoriesWrapperScroll = styled.div`
  @media ${variables.device.tabletXL} {
    overflow-x: hidden;
    height: 600px;
  }
  @media ${variables.device.tablet} {
    width: 100vw;
    overflow: scroll;
    height: 600px;
  }

  @media ${variables.device.mobile} {
    height: 650px;
  }
`
const StoriesWrapperPosition = styled.div`
  position: relative;
  width: 100%;
  &::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid #d3d3d3;
    width: 100%;
    top: 125px;
    z-index: -1;
  }
  @media ${variables.device.tabletXL} {
    width: 102vw;
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
  justify-content: space-between;
  padding: 0 ${variables.pxToRem(240)};

  @media ${variables.device.laptop} {
    padding: 0 ${variables.pxToRem(90)};
  }
  @media ${variables.device.tabletXL} {
    padding: 0 0 0 ${variables.pxToRem(50)};
  }
  @media ${variables.device.tablet} {
    padding: 0 0 0 ${variables.pxToRem(25)};
  }
  @media ${variables.device.mobile} {
    padding: 0 0 0 ${variables.pxToRem(7)};
  }
`
const StoryWrapper = styled.div`
  /* flex-basis: calc(100% / 13); */
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
export const PositionContentWrapper = styled.div<{ positionLeft: boolean }>`
  position: absolute;
  top: 204px;
  ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:0`)};
  ${({ positionLeft }) => (positionLeft ? `right: 0` : `right:unset`)};
  width: ${variables.pxToRem(551)};
  height: auto;

  @media ${variables.device.tabletXL} {
    width: ${clampBuilder(993, 1281, 524, 654)};
  }
  @media ${variables.device.tablet} {
    ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:0`)};
    ${({ positionLeft }) => (positionLeft ? `right:0` : `right:unset`)};
    width: ${variables.pxToRem(555)};
  }
  @media ${variables.device.mobile} {
    top: 181px;
    position: fixed;
    width: calc(100% - 2 * 18px);
    margin: 0 auto;
    ${({ positionLeft }) => (positionLeft ? `left: unset` : `left:18px`)};
    ${({ positionLeft }) => (positionLeft ? `right:18px` : `right:unset`)};
  }
`
const ContentWrapper = styled.div<{ positionLeft: boolean; positionFirst: boolean; positionLast: boolean }>`
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
const ContentWrapperPositionOutsideScroll = styled.div`
  @media ${variables.device.laptop} {
    position: relative;
    transform: rotate(0deg);
  }
`

export function StoryComponent() {
  const [selectedTimeLine, setSelectedTimeLine] = useState(story[0].heading)
  const handleChange = ({ target }) => {
    const { value } = target
    if (value) {
      setSelectedTimeLine(value)
    } else {
      const value = target.getAttribute('data-value')
      setSelectedTimeLine(value)
    }
  }
  const { width } = useWindowSize()

  return (
    <CustomSection
      paddingProps='8.125rem 0 25rem'
      paddingLaptop='6.25rem 0 25rem'
      paddingTabletXL='4.375rem 0 0'
      paddingTablet='7.6875rem 0 0'
      paddingMobileProps='4.5625rem 0 0'
    >
      <ContentWrapperPositionOutsideScroll>
        <StoriesWrapperScroll>
          <StoriesWrapperPosition>
            <StoriesWrapper>
              {story.map((item, index) => {
                const isChecked = selectedTimeLine === item.heading
                const isLeft = width <= 581 ? index === story.length : index >= 5
                const isFirst = width <= 581 ? index === 0 : index <= 1
                const isLast = index === story.length - 1
                return (
                  <StoryWrapper key={item.heading}>
                    <Data
                      className={isChecked ? 'is-active' : ''}
                      data-value={item.heading}
                      onMouseOver={handleChange}
                      onChange={handleChange}
                    >
                      {item.heading}
                    </Data>
                    <Label>
                      <input
                        type='radio'
                        value={item.heading}
                        checked={isChecked}
                        onMouseOver={handleChange}
                        onChange={handleChange}
                      />
                    </Label>
                    {isChecked && (
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
      </ContentWrapperPositionOutsideScroll>
    </CustomSection>
  )
}
