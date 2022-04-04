import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '../../assets/facebook.svg'
import GithubIcon from '../../assets/github.svg'
import InstagramIcon from '../../assets/instagram.svg'
import LinkedInIcon from '../../assets/linkedIn.svg'
import TwitterIcon from '../../assets/twitter.svg'
import FacebookIconBlack from '../../assets/facebook_black.svg'
import GithubIconBlack from '../../assets/github_black.svg'
import InstagramIconBlack from '../../assets/instagram_black.svg'
import LinkedInIconBlack from '../../assets/linkedIn_black.svg'
import TwitterIconBlack from '../../assets/twitter_black.svg'

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75em;

  padding-right: 4em;

  & a {
    /* margin-right: 1em; */
    display: inline-block;
    fill: white;
    opacity: 1;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`
export const SocialIcons: React.FC<{
  blackIcons?: boolean
  className?: string
}> = ({ blackIcons, className }) => {
  return (
    <IconsContainer className={' is-12 ' + className}>
      <a className='is-link' href='https://www.facebook.com/Bright.Inventions/'>
        <figure className='image is-24x24'>{blackIcons ? <FacebookIconBlack /> : <FacebookIcon />}</figure>
      </a>

      <a className='is-link' href='https://twitter.com/BrightDevs'>
        <figure className='image is-24x24'>{blackIcons ? <TwitterIconBlack /> : <TwitterIcon />}</figure>
      </a>

      <a className='is-link' href='https://www.linkedin.com/company/bright-inventions/'>
        <figure className='image is-24x24'>{blackIcons ? <LinkedInIconBlack /> : <LinkedInIcon />}</figure>
      </a>

      <a className='is-link' href='https://www.instagram.com/bright_inventions/'>
        <figure className='image is-24x24'>{blackIcons ? <InstagramIconBlack /> : <InstagramIcon />}</figure>
      </a>

      <a className='is-link' href='https://github.com/bright'>
        <figure className='image is-24x24'>{blackIcons ? <GithubIconBlack /> : <GithubIcon />}</figure>
      </a>
    </IconsContainer>
  )
}
