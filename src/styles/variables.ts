const basePx = 16
export const pxToRem = (px: number) => `${px / basePx}rem`

const deviceSize = {
  mobile: 480,
  tablet: 768
}

export default {
  pxToRem,

  pagePadding: pxToRem(40),

  size: {
    mobile: `${deviceSize.mobile}px`,
    tablet: `${deviceSize.tablet}px`,
    navHeight: '4.6rem'
  },

  device: {
    mobile: `max-width: ${deviceSize.tablet} - 1px`,
    desktop: `min-width: ${deviceSize.tablet}`,
  },

  color: {
    primary: '#f7931e', //brightOrange
    text: '#131214',
    white: '#ffffff',
    black: '#000000'
  },

  font: {
    title: {
      family: 'Montserrat, sans-serif',
      size: pxToRem(22)
    },
    text: {
      family: 'Lato, sans-serif',
      size: pxToRem(18)
    }
  },

  // OLD VALUES
  blackTextColor: '#131214',
  blackBannerBackground: '#131214',
  white: '#ffffff',
  black: '#000000',

  textFont: 'Lato',
  headerFont: 'Montserrat'
}
