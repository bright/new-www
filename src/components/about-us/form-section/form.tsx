import React, { CSSProperties, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { FormProps, JobApplicationForm } from '../../forms/job-application/job-application-form'
import { routeLinks } from '../../../config/routing'
import { CustomSection, CustomSectionInner, TextRegular } from '../../shared'
import variables from '../../../styles/variables'
import { CustomSectionTitle } from './../../shared/index.styled'

interface Props extends FormProps {
  title?: React.ReactNode
  description?: React.ReactNode
  className?: string
  style?: CSSProperties
}

const Description = styled(TextRegular)`
  margin-bottom: 4rem;

  @media ${variables.device.mobile} {
    margin-bottom: 2rem;
  }
`

export const FormComponent: React.FC<Props> = props => {
  const [success, setSuccess] = useState(false)

  const {
    style,
    className,
    title = (
      <>
        want to be part of a bright a story? drop us a line or check{' '}
        <Link to={routeLinks.career}>
          <span>open positions</span>
        </Link>
      </>
    ),
    description = (
      <>
        Our recruitment demand is constantly changing. Drop us a line at{' '}
        <a href='mailto:jobs@bright.dev'>jobs@bright.dev</a>
        , or submit your CV and we will contact you when a position inline with your competences becomes available.
      </>
    ),
    ...formProps
  } = props
  return (
    <CustomSection
      paddingProps='2rem 0 11.625rem '
      paddingLaptop='0 0 7.25rem '
      paddingTabletXL='0 2.25rem 7.25rem'
      paddingTablet='0 2.25rem 7.25rem'
      paddingMobileProps='0 1.125rem 5.1875rem'
    >
      <CustomSectionInner maxWidth='956px' style={style} className={className}>
        <CustomSectionTitle
          margin='9.625rem 0 4rem'
          laptopMargin='7.25rem 0 3.5rem'
          tabletXLMargin='7.25rem 0 3.5rem'
          tabletMargin='7.25rem 0 3.5rem'
          mobileMargin='5.125rem 0 2rem'
        >
          {title}
        </CustomSectionTitle>
        {description && <Description>{description}</Description>}
        <JobApplicationForm {...formProps} onSubmit={() => setSuccess(true)} />
      </CustomSectionInner>
    </CustomSection>
  )
}
