import React, { useEffect } from 'react'
import styled from 'styled-components'

import { CustomSectionTitle, Section, SectionTitle } from './index'
import variables from '../../styles/variables'

const Container = styled(Section)`
  padding: 2rem 15rem 2rem 15rem;
  // clutch background color which we can't affect with widget type 12
  background-color: #fafafa;
  @media ${variables.device.laptop} {
    padding: 3.1875rem 6rem 3.1875rem 6rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 2rem 9rem 2rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 2rem 2.25rem 2rem 2.25rem;
  }
  @media ${variables.device.mobile} {
    padding: 2rem 1.125rem 2rem 1.125rem;
  }
`
const clutchWidgetHeight = 375

const ClutchWidget = styled.div`
  iframe {
    height: ${clutchWidgetHeight}px;
  }

  @media ${variables.device.mobile} {
    // on mobile the iframe is higher than that requested clutchWidgetHeight
    iframe {
      height: 420px;
    }
  }
`

const IndicatorActive = styled.li`
  color: black;
  font-size: 32px;
  display: inline-block;
  /* margin-top: 2em; */
  position: relative;
  padding-right: 0.875rem;
  left: -0.125em;

  &.white {
    color: white;
  }
`
styled(IndicatorActive)`
  cursor: pointer;
  opacity: 0.42;
`

const Arrow = styled.div`
  cursor: pointer;
  /* margin: auto 0; */
  z-index: 2;
`
styled(Arrow)`
  position: absolute;
  top: calc(14% - 12px);
  left: 0;

  &:last-of-type {
    right: 0;
    left: unset;
  }

  & svg {
    height: 24px;
    width: 12px;
  }
`

const Ratings = () => {
  useEffect(() => {
    setTimeout(() => {
      const clutchco = (window as any).CLUTCHCO
      if (clutchco) {
        clutchco.Init()
      }
    }, 3000)
  }, [])
  return (
    <>
      <CustomSectionTitle>see why clients love working&nbsp;with&nbsp;us</CustomSectionTitle>
      <Container>
        <ClutchWidget
          className='clutch-widget' // class name is requires for the clutch plugin to find the element
          data-nofollow='true'
          data-url='https://widget.clutch.co'
          data-widget-type='12'
          data-primary-color={variables.color.primary}
          data-background-color={variables.color.black}
          data-secondary-color={variables.color.primary}
          data-darkbg={true}
          data-height={clutchWidgetHeight}
          data-clutchcompany-id='32656'
          data-loading='lazy'
        />
      </Container>
    </>
  )
}

export default Ratings
