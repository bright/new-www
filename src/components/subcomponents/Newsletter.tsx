import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const NewsletterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 ${variables.pxToRem(64)} 0;
  overflow: hidden;
  margin: 0 auto;
  & .newsimage {
    flex-basis: 40%;
  }

  @media ${variables.device.tablet} {
    flex-direction: column;
    gap: 0;
  }
`
const FormWrapper = styled.div`
  min-width: ${variables.pxToRem(550)};
  padding: 0 ${variables.pxToRem(30)};
  overflow: hidden;

  div.iframe-wrapper {
    width: 460px;
    height: 531px;
    top: 0px;
    left: 0px;
    margin: auto;

    @media ${'screen and (max-width: 460px)'} {
      width: 320px;
    }

    & iframe {
      height: ${variables.pxToRem(600)};
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const WrapperAgreeNewslatter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${variables.pxToRem(10)};

  & input {
    margin-right: ${variables.pxToRem(10)};
    border: 2px solid ${variables.color.black};
  }
  & span {
    font-size: ${variables.pxToRem(11)};
  }
`
export default function Newsletter() {
  return (
    <NewsletterWrapper>
      <StaticImage src='../../../static/images/newsletter.png' alt='Newsletter' className='newsimage' />
      <FormWrapper>
        <div className='iframe-wrapper'>
          <iframe
            className='responsive-iframe'
            src='https://app.getresponse.com/site2/5d4d6f8b6908199482efeb84d0edf9a5/?u=QX16N&webforms_id=hiz1B'
          ></iframe>
        </div>
      </FormWrapper>
    </NewsletterWrapper>
  )
}
