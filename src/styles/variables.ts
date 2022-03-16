export const basePx = 16
export const pxToRem = (px: number) => `${px / basePx}rem`

export const deviceSize = {
  mobile: 580,
  tablet: 991,
  tabletXL: 1280,
  laptop: 1540,
  desktop: 1920,
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

  color: {
    primary: '#f7931e', //brightOrange
    text: '#0A0A0A',
    text2: '#0A0A0A',
    border: '#d3d3d3',
    white: '#ffffff',
    black: '#000000',
    heading: '#0A0A0A;',
  },

  font: {
    title: {
      family: 'Montserrat, sans-serif',
      size: pxToRem(22),
    },
    text: {
      family: 'Lato, sans-serif',
      size: pxToRem(18),
    },
    customtitle: {
      monserat: 'Montserrat, sans-serif',
      lato: 'Lato, sans-serif',
      size: pxToRem(40),
      sizeBlogTitle: pxToRem(28),
      sizeBlogTitleMobile: pxToRem(20),
      sizeSuccesTitleStory: pxToRem(22),
      sizeSuccesTitleStoryMobile: pxToRem(16),
    },
    customtext: {
      monserat: 'Montserrat, sans-serif',
      lato: 'Lato, sans-serif',
      size: pxToRem(22),
      sizeMobile: pxToRem(18),
      sizeOurServicesMobile: pxToRem(16),
      sizeBlogTags: pxToRem(16),
      sizeBlogTagsMobile: pxToRem(12),
      sizeButton: pxToRem(18),
      sizeAuthor: pxToRem(32),
    },
  },
}
