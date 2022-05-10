import React from 'react'
import { ArrowNavigationStoryIcon } from './../../icons/ArrowNavigationStory.icon'
import styled from 'styled-components'
import variables from '../../../styles/variables'
import { CustomSection } from '../../shared'

const ArrowWrapper = styled.div`
  display: flex;
  gap: ${variables.pxToRem(45)};
  justify-content: center;
  & button {
    all: unset;
    cursor: pointer;
    &:disabled {
      opacity: 0.3;
    }
  }
`
interface StoryNavigationProps {
  onClickRight?: () => void
  onClickLeft?: () => void
  disabledLeft?: any
  disabledRight?: any
}
export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  onClickRight,
  onClickLeft,
  disabledLeft,
  disabledRight,
}) => {
  return (
    <CustomSection paddingLaptop='2.25rem 0' paddingTabletXL='2.25rem 0'>
      <ArrowWrapper>
        <button onClick={onClickLeft} disabled={disabledLeft}>
          <ArrowNavigationStoryIcon isRotate={true} />
        </button>
        <button onClick={onClickRight} disabled={disabledRight}>
          <ArrowNavigationStoryIcon isRotate={false} />
        </button>
      </ArrowWrapper>
    </CustomSection>
  )
}
