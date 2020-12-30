import React from 'react'
import classNames from 'classnames'

import { routeLinks } from '../../config/routing'

import styles from './Header.module.scss'

const HeaderTitle = () => {
  return (
    <React.Fragment>
      <div className='column'>
        <h1 className={classNames('title mt-6', styles.title)}>
          let's create software that <span>matters</span>
        </h1>
      </div>
      {/*<div className='column is-hidden-tablet'>*/}
      {/*  Through mobile apps and complex backend systems to emerging*/}
      {/*  technology solutions we are creating success stories for startups,*/}
      {/*  consultancy agencies as well as mid-size organisations*/}
      {/*</div>*/}
      <div className='column is-hidden-tablet'>
        <div className='buttons'>
          <a className='button estimate is-primary' href={routeLinks.startProject}>
            <strong>estimate project</strong>
          </a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HeaderTitle
