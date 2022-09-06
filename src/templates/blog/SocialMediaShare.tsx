import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '../../assets/facebook.svg'
import RedditIcon from '../../assets/reddit.svg'
import LinkedInIcon from '../../assets/linkedIn.svg'
import TwitterIcon from '../../assets/twitter.svg'
import FacebookIconBlack from '../../assets/facebook_black.svg'
import LinkedInIconBlack from '../../assets/linkedIn_black.svg'
import TwitterIconBlack from '../../assets/twitter_black.svg'
import SubtractionIcon from '../../assets/subtraction.svg'
import variables from '../../styles/variables'
import { clampBuilder } from './../../helpers/clampBuilder'
import { Button } from '../../components/shared'
import { useState } from 'react'

const IconsContainer = styled.div`
  display: flex;
  column-gap: 32px;
  row-gap: 27px;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: ${variables.pxToRem(36)} ${variables.pxToRem(24)} 0 0};
  @media ${variables.device.tablet} {
    max-width: 100%;
    column-gap: ${clampBuilder(300, 834, 19, 111)};
    max-width: 736px;
    justify-content: center;
    padding: ${variables.pxToRem(36)} 0 0 0};
    margin: 0 auto;
  }

  & a {
    /* margin-right: 1em; */
    display: inline-block;
    fill: white;
    opacity: 1;
  }
`
const Image30 = styled.figure`
  width: 30px;
  height: 30px;
  svg {
    width: 30px;
    height: 30px;
  }

  @media ${variables.device.laptop} {
    width: 23px;
    height: 23px;
    svg {
      width: 23px;
      height: 23px;
    }
  }
  @media ${variables.device.tablet} {
    width: 30px;
    height: 30px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`
const ImageYouTube = styled.figure`
  width: 42.58px;
  height: 30px;
  svg {
    width: 42.58px;
    height: 30px;
  }
  @media ${variables.device.laptop} {
    width: 32.65px;
    height: 23px;
    svg {
      width: 32.65px;
      height: 23px;
    }
  }
  @media ${variables.device.tablet} {
    width: 42.58px;
    height: 30px;
    svg {
      width: 42.58px;
      height: 30px;
    }
  }
`
const LinkCopyButton = styled(Button)`
  position: relative;
`
const LinkCopySucces = styled.p`
  position: absolute;
  top: 42px;
  left: -42px;

  width: 100px;
  color: ${variables.color.white};
  background: ${variables.color.text2};
  text-align: center;
  &:before {
    content: '';
    z-index: -1;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: unset;
    left: 50%;
    transform: translateX(-50%);
    top: -9px;
    background: ${variables.color.text2};
    transform: rotate(90deg);
    clip-path: polygon(59% 0%, 0% 50%, 59% 100%);
  }
`

export const SocialMediaShare: React.FC<{
  blackIcons?: boolean
  slug: string
  title: string
}> = ({ blackIcons, slug, title }) => {
  const baseUrl = 'https://brightinventions.pl'
  const url = baseUrl + slug

  const [copySucces, setCopySucces] = useState('')

  return (
    <>
      <IconsContainer>
        <a
          className='is-link'
          href={'https://reddit.com/submit?url=' + url + '&title=' + title}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image30>{blackIcons ? <RedditIcon /> : <RedditIcon />}</Image30>
        </a>
        <a
          className='is-link'
          href={'https://www.facebook.com/sharer/sharer.php?u=' + url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image30>{blackIcons ? <FacebookIconBlack /> : <FacebookIcon />}</Image30>
        </a>
        <a
          className='is-link'
          href={'https://twitter.com/share?url=' + url + '&text-' + title + '&via' + 'twitterHandle'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image30>{blackIcons ? <TwitterIconBlack /> : <TwitterIcon />}</Image30>
        </a>
        <a
          className='is-link'
          href={'https://www.linkedin.com/shareArticle?url=' + url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image30>{blackIcons ? <LinkedInIconBlack /> : <LinkedInIcon />}</Image30>
        </a>
        <LinkCopyButton
          style={{ cursor: 'copy' }}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setCopySucces('link copied')
            setTimeout(() => {
              setCopySucces('')
            }, 5000)
          }}
        >
          <Image30>{blackIcons ? <SubtractionIcon /> : <SubtractionIcon />}</Image30>
          {copySucces && <LinkCopySucces>{copySucces}</LinkCopySucces>}
        </LinkCopyButton>
      </IconsContainer>
    </>
  )
}
