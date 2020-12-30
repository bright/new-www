import React from 'react'
import { useStaticQuery } from 'gatsby'

import GQL from './Achievements.gql'
import { createAuthors } from '../../models/creator'

import styles from './Achievements.module.scss'
import { GQLData } from '../../models/gql'

export const Achievements = () => {
  // const authors = createAuthors(useStaticQuery(GQL) as GQLData)

  const elements = [
    { number: (new Date()).getFullYear() - 2008, label: 'Years' },
    { number: 300, label: 'Projects' },
    { number: 167, label: 'Clients' },
    { number: 52, label: 'Team' },
    //{ number: authors.length, label: 'Team' }, --- @todo: should be uncommented after making all members
  ]

  return (
    <section className={styles.achievements}>
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
    </section>
  )
}
