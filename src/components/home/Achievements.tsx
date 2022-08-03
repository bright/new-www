import React from 'react'

import { SectionBlack } from '../shared'

import * as styles from './Achievements.module.scss'
import styled from 'styled-components'
import variables from '../../styles/variables'

const AchievementsSectionBlack = styled(SectionBlack)`
  padding: 6.19rem 15rem 8.625rem;
  @media ${variables.device.laptop} {
    padding: 6rem 11.125rem;
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
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    max-width: 448px;
    flex-wrap: wrap;
    & > div {
      padding-bottom: 7.32rem;
      flex: 1 1 50%;
      &:nth-of-type(even) {
        & > div {
          align-self: flex-end;
        }
      }
      & > div {
        align-self: flex-start;
      }

      &:nth-of-type(n + 3) {
        padding-bottom: 0;
      }
    }
  }

  @media ${variables.device.mobile} {
    max-width: 248px;
    flex-wrap: wrap;
    & > div {
      padding-bottom: 7.32rem;
      flex: 1 1 50%;
      &:nth-of-type(n + 3) {
        padding-bottom: 0;
      }
    }
  }
`

const Achievements = () => {
  const elements = [
    { number: new Date().getFullYear() - 2012, label: 'Years' },
    { number: 53, label: 'Projects' },
    { number: 40, label: 'Clients' },
    { number: 75, label: 'People' },
    //{ number: authors.length, label: 'Team' }, --- @todo: should be uncommented after making all members
  ]

  return (
    <AchievementsSectionBlack className={styles.achievements}>
      <AchievementsWrapper>
        {elements.map(({ number, label }) => (
          <div key={label}>
            <div className={styles.number}>{number}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </AchievementsWrapper>
    </AchievementsSectionBlack>
  )
}
export default Achievements
