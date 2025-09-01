import React, { LegacyRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { TextRegular } from '../shared/index.styled'
import variables from '../../styles/variables'
import { InView } from 'react-intersection-observer'

interface ReCaptchaProps<T> {
  recaptchaRef: LegacyRef<T> | undefined;
}

export const RecaptchaContainer = styled(TextRegular)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${variables.pxToRem(16)};

    & span {
        font-size: 14px;
        color: ${variables.color.text3};
        line-height: 1.5rem;
        font-family: Lato;

        & a {
            text-decoration: underline;
            color: ${variables.color.text};
        }
    }

    .grecaptcha-badge {
        visibility: hidden;
    }
`

const ReCaptcha = ({ recaptchaRef }: ReCaptchaProps<any>) => {
  return (
    <InView triggerOnce={true} onChange={(inView) => {
      console.log('ReCaptcha.InView', inView)
    }}>
      {({ inView, ref }) => (
        <RecaptchaContainer ref={ref}>
          {inView && <ReCAPTCHA
            ref={recaptchaRef}
            sitekey='6Lf80doqAAAAAJa2ReybrabGvMunSubWjVLE3vIg'
            size='invisible'
          />}
          <span>
            <span>This site is protected by reCAPTCHA and the Google </span>
            <a href='https://policies.google.com/privacy' target='_blank'
             rel='nofollow noopener noreferrer'>Privacy Policy</a>
            <span> and </span>
            <a href='https://policies.google.com/terms' target='_blank'
             rel='nofollow noopener noreferrer'>Terms of Service</a>
            <span> apply.</span>
          </span>
        </RecaptchaContainer>
      )}

    </InView>
  )
}

export default ReCaptcha