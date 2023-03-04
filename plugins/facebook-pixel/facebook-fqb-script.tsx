import { PluginOptions } from 'gatsby'
import { Script } from 'gatsby-script'
import { partytownEnabled } from '../../src/partytown-enabled'

export const FacebookFqbScript = ({ options }: { options: PluginOptions }) => {
  const pixelId = options.pixelId
  if (pixelId) {
    const scriptLoadStrategy = partytownEnabled ? 'off-main-thread' : 'post-hydrate'
    const partytownForwards = partytownEnabled ? ['fbq'] : undefined
    return (
      <>
        <Script
          src={'https://connect.facebook.net/en_US/fbevents.js'}
          strategy={scriptLoadStrategy}
          forward={partytownForwards}
        />
        <Script strategy={scriptLoadStrategy}>{`
        fbq('consent', 'revoke');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
        `}</Script>
      </>
    )
  } else {
    return null
  }
}
