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
import YouTubeIcon from '../../assets/youtube.svg'
import YouTubeIconBlack from '../../assets/youtube_black.svg'
import BehanceIcon from '../../assets/behance.svg'
import BehanceIconBlack from '../../assets/behance_black.svg'
import DribbleIcon from '../../assets/dribble.svg'
import DribbleIconBlack from '../../assets/dribble_black.svg'
import SpotifyIcon from '../../assets/spotify.svg'
import SpotifyIconBlack from '../../assets/spotify_black.svg'
import ApplePodcastIcon from '../../assets/apple_podcast.svg'
import ApplePodcastIconBlack from '../../assets/apple_podcast_black.svg'
import variables from '../../styles/variables'
import { clampBuilder } from './../../helpers/clampBuilder'

const IconsContainer = styled.div`
  display: flex;
  column-gap: 32px;
  row-gap: 27px;
  align-items: center;
  flex-wrap: wrap;
  max-width: 312px;
  padding-left: 0.75rem;
  @media ${variables.device.tablet} {
    max-width: 100%;
    column-gap: ${clampBuilder(300, 834, 19, 111)};
    max-width: 736px;
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
// const ImageBehance = styled.figure`
//   width: 36.53px;
//   height: 22.37px;
//   svg {
//     width: 36.53px;
//     height: 22.37px;
//   }
//   @media ${variables.device.laptop} {
//     width: 29.39px;
//     height: 18px;
//     svg {
//       width: 29.39px;
//       height: 18px;
//     }
//   }
//   @media ${variables.device.tablet} {
//     width: 36.53px;
//     height: 22.37px;
//     svg {
//       width: 36.53px;
//       height: 22.37px;
//     }
//   }
// `
export const SocialIcons: React.FC<{
  blackIcons?: boolean
  className?: string
}> = ({ blackIcons, className }) => {
  return (
    <IconsContainer className={' is-12 ' + className}>
      <a className='is-link' href='https://www.facebook.com/Bright.Inventions/' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <FacebookIconBlack /> : <FacebookIcon />}</Image30>
      </a>

      <a className='is-link' href='https://twitter.com/BrightDevs' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <TwitterIconBlack /> : <TwitterIcon />}</Image30>
      </a>

      <a className='is-link' href='https://www.linkedin.com/company/bright-inventions/' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <LinkedInIconBlack /> : <LinkedInIcon />}</Image30>
      </a>

      <a className='is-link' href='https://www.instagram.com/bright_inventions/' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <InstagramIconBlack /> : <InstagramIcon />}</Image30>
      </a>

      <a className='is-link' href='https://www.behance.net/BrightInventions/' target='_blank' rel='noopener'>
        <ImageYouTube>{blackIcons ? <BehanceIconBlack /> : <BehanceIcon />}</ImageYouTube>
      </a>

      <a className='is-link' href='https://github.com/bright' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <GithubIconBlack /> : <GithubIcon />}</Image30>
      </a>

      <a className='is-link' href='https://dribbble.com/Bright_Inventions/' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <DribbleIconBlack /> : <DribbleIcon />}</Image30>
      </a>

      <a className='is-link' href='https://open.spotify.com/show/1xrG8BF4Niv5uIzHvIn79q' target='_blank' rel='noopener'>
        <Image30>{blackIcons ? <SpotifyIconBlack /> : <SpotifyIcon />}</Image30>
      </a>

      <a
        className='is-link'
        href='https://podcasts.apple.com/us/podcast/brightdevtalks/id1625829267'
        target='_blank'
        rel='noopener'
      >
        <Image30>{blackIcons ? <ApplePodcastIconBlack /> : <ApplePodcastIcon />}</Image30>
      </a>
      <a
        className='is-link'
        href='https://www.youtube.com/channel/UCWNKNRKF_kzgGZnrzlQ7wvA'
        target='_blank'
        rel='noopener'
      >
        <ImageYouTube>{blackIcons ? <YouTubeIconBlack /> : <YouTubeIcon />}</ImageYouTube>
      </a>
    </IconsContainer>
  )
}
