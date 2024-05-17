import React from 'react'
import styled from 'styled-components'
import { SectionBlack } from './index.styled'
import variables from '../../styles/variables'
import { FlexWrapper } from '.'


const AchievementsSectionBlack = styled(SectionBlack)`
  padding: ${variables.pxToRem(110)} ${variables.pxToRem(240)};
  @media ${variables.device.laptop} {
    padding: 6rem 9rem;
  }
  @media ${variables.device.tabletXL} {
    padding: 6rem 9rem;
  }
  @media ${variables.device.tablet} {
    padding: 6rem 11.125rem;
  }
  @media ${variables.device.mobile} {
    padding: 6rem 0rem;
  }
`
const AchievementsWrapper = styled.div`
  max-width: 1440px;
  display: flex;
  gap: 24px;
  align-items: start;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
  @media ${variables.device.desktop} {
    max-width: 1440px;
  }
  @media ${variables.device.laptop} {
    max-width: 1080px;
  }
  @media ${variables.device.tabletXL} {
    max-width: 992px;
  }
  @media ${variables.device.tablet} {
    max-width: 600px;
    flex-wrap: wrap;
    row-gap: 7.32rem;
    & > div {
     
      flex: 1 1 50%;
      &:nth-of-type(even) {
        & > div {
          align-self: center;
        }
      }
      & > div {
        align-self: center;
      }
    }
  }

  @media ${variables.device.mobile} {
    max-width: 360px;
    flex-wrap: wrap;
    & > div {
      flex: 1 1 100%;
    }
  }
`
const Number = styled.div`
    line-height: ${variables.pxToRem(88)};
    font-size: ${variables.pxToRem(72)};
    font-weight: 800;
    white-space: nowrap;
    @media ${variables.device.tabletXL} {
      font-size: ${variables.pxToRem(54)};
      line-height: ${variables.pxToRem(66)};
    }
    @media ${variables.device.tabletXL} {
      font-size: ${variables.pxToRem(45)};
      line-height: ${variables.pxToRem(55)};
    }

`
const Label = styled.div`
    line-height: ${variables.pxToRem(27)};
    font-size: ${variables.pxToRem(22)};
    text-align: center;
    opacity: .76;
    @media ${variables.device.tabletXL} {
      font-size: ${variables.pxToRem(16)};
      line-height: ${variables.pxToRem(19)};
    }
`
interface Achievement {
  label: string,
  number: string
}
interface AchievementsProps {
  achievements?: Achievement[]
}

const AchievementsProject = ({ achievements }: AchievementsProps) => {


  return (
    <AchievementsSectionBlack >
      <AchievementsWrapper>
        {achievements && achievements.map(({ number, label }) => {
          return (
            <FlexWrapper key={label}>
              <Number> {number}</Number>
              <Label >{label}</Label>
            </FlexWrapper>
          )
        })}

      </AchievementsWrapper>
    </AchievementsSectionBlack >
  )
}
export default AchievementsProject