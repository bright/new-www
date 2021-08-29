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
    mobile: `screen and (max-width: ${deviceSize.tablet -1}px)`,
    desktop: `min-width: ${deviceSize.tablet}`,
  },

  color: {
    primary: '#f7931e', //brightOrange
    text: '#131214',
    border: '#d3d3d3',
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
    },
    customtitle : {
      monserat: 'Montserrat, sans-serif',
      lato:  'Lato, sans-serif',
      size: pxToRem(40),
      sizeBlogTitle: pxToRem(28),
      sizeBlogTitleMobile: pxToRem(20),
    },
    customtext: {
      monserat: 'Montserrat, sans-serif',
      lato:  'Lato, sans-serif',
      size: pxToRem(22),
      sizeOurServicesMobile:pxToRem(16),
      sizeBlogTags:pxToRem(18),
      sizeBlogTagsMobile:pxToRem(12),
      sizeButton:pxToRem(18)
    },
  }
}
