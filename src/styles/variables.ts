export const basePx = 16
export const pxToRem = (px: number) => `${px / basePx}rem`

export const deviceSize = {
  mobile: 580,
  tablet: 991,
  tabletXL: 1280,
  laptop: 1540,
  desktop: 1920,
}

const montserrat = 'Montserrat, "DejaVu Sans", Verdana, sans‑serif, serif'
const lato = 'Lato, sans-serif'
export const font = {
  montserrat: montserrat,
  lato: lato,
  title: {
    family: montserrat,
    size: pxToRem(22),
  },
  text: {
    family: lato,
    size: pxToRem(18),
  },
  customtitle: {
    monserat: montserrat,
    lato: lato,
    size: pxToRem(40),
    sizeBlogTitle: pxToRem(28),
    sizeBlogTitleMobile: pxToRem(20),
    sizeSuccesTitleStory: pxToRem(22),
    sizeSuccesTitleStoryMobile: pxToRem(16),
  },
  customtext: {
    monserat: montserrat,
    lato: lato,
    size: pxToRem(22),
    sizeMobile: pxToRem(18),
    sizeOurServicesMobile: pxToRem(16),
    sizeBlogTags: pxToRem(16),
    sizeBlogTagsMobile: pxToRem(12),
    sizeButton: pxToRem(18),
    sizeAuthor: pxToRem(32),
  },
}
export default {
  pxToRem,

  pagePadding: pxToRem(40),

  size: {
    mobile: `${deviceSize.mobile}px`,
    tablet: `${deviceSize.tablet}px`,
    tabletXL: `${deviceSize.tabletXL}px`,
    laptop: `${deviceSize.laptop}px`,
    desktop: `${deviceSize.desktop}px`,
    navHeight: '4.6rem',
  },

  device: {
    mobile: `screen and (max-width: ${deviceSize.mobile + 1}px)`,
    tablet: `screen and (max-width: ${deviceSize.tablet + 1}px)`,
    tabletXL: `screen and (max-width: ${deviceSize.tabletXL + 1}px)`,
    laptop: `screen and (max-width: ${deviceSize.laptop + 1}px)`,
    desktop: `screen and (max-width: ${deviceSize.desktop + 1}px)`,
  },

  deviceWidthMin: {
    mobile: `screen and (min-width: ${deviceSize.mobile}px)`,
    tablet: `screen and (min-width: ${deviceSize.tablet}px)`,
    tabletXL: `screen and (min-width: ${deviceSize.tabletXL}px)`,
    laptop: `screen and (min-width: ${deviceSize.laptop}px)`,
    desktop: `screen and (min-width: ${deviceSize.desktop}px)`,
  },

  color: {
    primary: '#fe6b00', //brightOrange
    text: '#0A0A0A',
    text2: '#0A0A0A',
    border: '#d3d3d3',
    white: '#ffffff',
    black: '#000000',
    heading: '#0A0A0A;',
    borderInput: '#888888',
    darkerGrey: '#D3D3D3',
    lighterGrey: '#F5F5F5',
    brightBlack: '#131313'
  },
  font: font,
}

export const roundedCorners = 'calc(infinity * 1px)'
