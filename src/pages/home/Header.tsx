import React from 'react'
import classNames from 'classnames'

import styles from './Header.module.scss'

export const Header = () => {
    return (
        <section className={classNames('hero', styles.header)}>
            <div className='hero-body'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column'>
                            <h1 className={classNames('title mt-6', styles.title)}>
                                let's create software that <span>matters</span>
                            </h1>
                        </div>
                        <div className='column is-hidden-tablet'>
                            <div className='buttons'>
                                <a className='button estimate is-primary' href='/start-project'>
                                    <strong>estimate project</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
