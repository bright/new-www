import React from 'react'

import { SectionBlack } from '../shared'

import * as styles from './Achievements.module.scss'
import styled from 'styled-components'
import variables from '../../styles/variables'

const AchievementsSectionBlack = styled(SectionBlack)`
  padding: 6.19rem 2rem 8.625rem 2rem;
  @media ${variables.device.mobile} {
    padding: 6rem 0rem;
  }
`
const AchievementsWrapper = styled.div`
  max-width: 1248px;
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
  @media ${variables.device.mobile} {
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

export const Achievements = () => {
  const elements = [
    { number: new Date().getFullYear() - 2009, label: 'Years' },
    { number: 300, label: 'Projects' },
    { number: 167, label: 'Clients' },
    { number: 61, label: 'People' },
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
