import React, { useMemo } from 'react'
import styled from 'styled-components'

function isClip(url: string | undefined) {
  return url?.startsWith('https://giphy.com/clips/') ?? false
}

function isGif(url: string | undefined) {
  return url?.startsWith('https://giphy.com/gifs/') ?? false
}

function extractGiphyId(url: string) {
  let id = url.split('/')?.pop()?.split('-')?.pop()
  if (!id) {
    console.error('Giphy id not found in url', url)
  }
  return id
}

function missingGifGiphyIdFallback() {
  // https://giphy.com/gifs/colibridigital-colibrito-colibr-FUKCPzVj0GGrCsdsmP
  return 'FUKCPzVj0GGrCsdsmP'
}

const ResponsiveIframeContainer = styled.div`
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
`

const ResponsiveIframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`

const GihpyGifEmbed = (props: GiphyProps) => {
  const giphyId = useMemo(() => extractGiphyId(props.url) ?? missingGifGiphyIdFallback(), [props.url])
  const iframeEmbedUrl = `https://giphy.com/embed/${giphyId}`
  return (
    <div>
      <ResponsiveIframeContainer>
        <ResponsiveIframe
          src={iframeEmbedUrl}
          width='100%'
          height='100%'
          frameBorder='0'
          className='giphy-embed'
          allowFullScreen
        ></ResponsiveIframe>
      </ResponsiveIframeContainer>
      <p>
        <a href={props.url}>via GIPHY</a>
      </p>
    </div>
  )
}

function missingClipGiphyIdFallback() {
  // https://giphy.com/clips/yellow-loading-load-o9i5pNiXaSurCGMsz6
  return 'o9i5pNiXaSurCGMsz6'
}

const GiphyClipEmbed = (props: GiphyProps) => {
  const giphyId = useMemo(() => extractGiphyId(props.url) ?? missingClipGiphyIdFallback(), [props.url])
  const iframeEmbedUrl = `https://giphy.com/embed/${giphyId}/video`
  return (
    <ResponsiveIframeContainer>
      <ResponsiveIframe frameBorder='0' height='100%' src={iframeEmbedUrl} width='100%'></ResponsiveIframe>
    </ResponsiveIframeContainer>
  )
}

export interface GiphyProps {
  url: string
}

// <GiphyEmbed url='https://giphy.com/gifs/garyvee-motivation-balance-3o6Zt14FoFHzswxPmE' />
export const GiphyEmbed = (props: GiphyProps) => {
  if (isClip(props.url)) {
    return <GiphyClipEmbed {...props} />
  }

  if (isGif(props.url)) {
    return <GihpyGifEmbed {...props} />
  }

  return <div>Don't know how to handle url {props.url}</div>
}

