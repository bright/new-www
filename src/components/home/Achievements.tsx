import React from 'react'

import { SectionBlack } from '../shared'

import * as styles from './Achievements.module.scss'

export const Achievements = () => {
  const elements = [
    { number: (new Date()).getFullYear() - 2012, label: 'Years' },
    { number: 53, label: 'Projects' },
    { number: 40, label: 'Clients' },
    { number: 59, label: 'People' },
    //{ number: authors.length, label: 'Team' }, --- @todo: should be uncommented after making all members
  ]

  return (
    <SectionBlack className={styles.achievements}>
      <div className='container'>
        <div className='columns'>
          {elements.map(({ number, label }) => (
            <div className='column is-inline-block-mobile is-half-mobile' key={label}>
              <div className={styles.number}>{number}</div>
              <div className={styles.label}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlack>
  )
}
