import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import variables from '../../styles/variables'

const NewsletterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${variables.pxToRem(100)};
  padding: 0 0 ${variables.pxToRem(64)} 0;
  overflow: hidden;
  margin: 0 auto;
  & .newsimage {
    flex-basis: 40%;
  }

  @media ${variables.device.tablet} {
    flex-direction: column;
    gap: 0;
    & .newsimage {
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

export default function Newsletter() {
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 0 && !isScrolledDown) {
        var script = document.createElement('script')
        script.src = 'https://app.getresponse.com/view_webform_v2.js?u=QX16N&webforms_id=hiz1B'
        document.head.appendChild(script)
        setIsScrolledDown(true)
      } else {
        setIsScrolledDown(false)
      }
    }
    document.addEventListener('scroll', scrollListener)
    return () => {
      document.removeEventListener('scroll', scrollListener)
    }
  }, [isScrolledDown])
  return (
    <>
      {isScrolledDown && (
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
      )}
    </>
  )
}
