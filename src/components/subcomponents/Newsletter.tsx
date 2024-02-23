import React, { useMemo } from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'
import { useWindowSize } from '../utils/use-windowsize'
import { StaticImage } from 'gatsby-plugin-image'
import { Script } from 'gatsby'

const NewsletterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${variables.pxToRem(25)};
  padding: 0;
  overflow: hidden;
  margin: 0 auto;

  & .newsimage {
    align-self: flex-end;
    flex-basis: 60%;
  }

  @media ${variables.device.tablet} {
    flex-direction: column;
    gap: 0;
    & .newsimage {
      margin: 0 auto;
      max-width: 50%;
      flex-basis: 100%;
    }
  }

  @media ${variables.device.mobile} {
    & .newsimage {
      max-width: 100%;
    }
  }
`

const getResponseFormHtml = {
  __html: `<getresponse-form form-id='4cf7c335-357f-44f6-950d-d0e9c318f0c6' e='0'></getresponse-form>`,
}
export default function Newsletter() {
  const { width } = useWindowSize()
  const breakpoint = 992
  const isMobile = width <= breakpoint;

  const Image = () => isMobile
    ? <StaticImage src='../../../static/images/newsletter_mobile.png' alt='Newsletter' className='newsimage' quality={100} />
    : <StaticImage src='../../../static/images/newsletter.png' alt='Newsletter' className='newsimage' quality={100} />

  return (
    <NewsletterWrapper>
      <Image />
      <Script>{`
        window['__GetResponseAnalyticsObject'] = 'GrTracking'
        window['GrTracking'] = window['GrTracking'] || function() {
        (window['GrTracking'].q = window['GrTracking'].q || []).push(arguments)
      };
      `}</Script>
      <Script
        async
        crossOrigin={'use-credentials'}
        strategy="idle"
        src='https://ga.getresponse.com/script/483051bf-18f4-4900-9a14-5aa75f9cf66e/ga.js'
      />
      <div dangerouslySetInnerHTML={getResponseFormHtml}></div>
    </NewsletterWrapper>
  )
}
