import React from 'react'
import classNames from 'classnames'

import { routeLinks } from '../../config/routing'
import { CustomSection } from '../shared'
import styled from 'styled-components'
import * as styles from './Header.module.scss'
import variables from '../../styles/variables'
import { Link } from 'gatsby'
import { StandWithUkraine } from '../icons/StandWithUkraine.icon'

const HeroWrapper = styled.div`
  color: ${variables.color.text};
  & > div > .title {
    font-size: 8.0625rem;
    line-height: 8.5rem;
    margin: 0;
    color: ${variables.color.text};
  }
  @media ${variables.device.desktop} {
    max-width: 1438px;
  }
  @media ${variables.device.laptop} {
    max-width: 1237px;
  }
  @media ${variables.device.tabletXL} {
    max-width: 992px;
  }
  @media ${variables.device.tablet} {
    max-width: 904px;
  }
  @media ${variables.device.mobile} {
    max-width: 347px;
  }
  @media ${variables.device.desktop} {
    & > div > .title {
      font-size: 8.0625rem;
      line-height: 8.5rem;
      margin: 0;
    }
    @media ${variables.device.laptop} {
      & > div > .title {
        font-size: 6.9375rem;
        line-height: 7.3125rem;
        margin: 0;
      }
    }
    @media ${variables.device.tabletXL} {
      & > div > .title {
        font-size: 5.5625rem;
        line-height: 7.25rem;
        margin: 0;
      }
    }
    @media ${variables.device.tablet} {
      & > div > .title {
        font-size: 6.25rem;
        line-height: 7.3125rem;
        margin: 0;
      }
    }

    @media ${variables.device.mobile} {
      & > div > .title {
        font-size: clamp(2.3125rem, -0.6662rem + 14.8936vw, 3.1875rem);
        line-height: clamp(3.1875rem, 0.2088rem + 14.8936vw, 4.0625rem);
        color: ${variables.color.heading};
      }
    }
  }
`
const HeroBody = styled.div`
  /* padding: 0 19rem 0 6.5rem; */
  /* @media ${variables.device.desktop} {
    padding: 17.5625rem 0rem 0 0rem;
  } */
  /* @media ${variables.device.laptop} {
    padding: 16.1875rem 0.625rem 0 0rem;
  } */
  @media ${variables.device.tabletXL} {
    /* padding: 11.9375rem 0.9375rem 0 0rem; */
    & div.buttons {
      display: none;
    }
  }
  @media ${variables.device.tablet} {
    /* padding: 11.9375rem 0.9375rem 0 0rem; */
    & div.buttons {
      display: block;
    }
  }
  @media ${variables.device.mobile} {
    /* padding: 8.94rem 2.56rem 0 0.625rem; */
    width:100% ;
  }
`

export const Header = () => {
  return (
    <CustomSection className={classNames(styles.header)}>
      <HeroBody>
        <CustomSection
          paddingProps='7.25rem 0 5.625rem '
          paddingLaptop='6.875rem 0 5.25rem'
          paddingTabletXL='5rem 0 3.375rem'
          paddingTablet='5.375rem 0 3.125rem'
          paddingMobileProps='3.3125rem 0 3.125rem'
        >
          <StandWithUkraine />
        </CustomSection>

        <HeroWrapper>
          <div>
            <h1 className={classNames('title mt-6', styles.title)}>
              let's create software that <span>matters</span>
            </h1>
          </div>
        </HeroWrapper>
        <div className='buttons is-hidden-tablet'>
          <a className='button estimate is-primary' href={routeLinks.startProject}>
            <strong>estimate project</strong>
          </a>
        </div>
      </HeroBody>
    </CustomSection>
  )
}
