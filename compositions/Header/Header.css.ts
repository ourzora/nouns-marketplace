import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, MAX_WIDTH } from 'styles/style-constants'

import { globalStyle, style } from '@vanilla-extract/css'
import { atoms, color, media, radii, space, vars } from '@zord'

export const headerWrapper = style([
  atoms({
    w: '100%',
    justifyContent: 'center',
  }),
])

export const header = style([
  {
    width: MAX_WIDTH.XL,
    height: HEADER_HEIGHT_MOBILE,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${color.background2}`,
    gridColumn: '1/span 4',
    margin: '0 auto',
    '@media': {
      [media.min1024]: {
        maxWidth: `calc(${MAX_WIDTH.XL}px + (2 * ${vars.space.x8}))`,
        gridColumn: '1/span 12',
        height: HEADER_HEIGHT,
        borderBottom: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    pos: 'relative',
    alignItems: {
      '@1024': 'center',
    },
    gap: {
      '@initial': 'x2',
      '@768': 'x6',
    },
  }),
])

export const nounsGlassesLink = style([
  atoms({
    cursor: 'pointer',
    pos: 'relative',
  }),
])

export const manageButton = style([
  {
    gridColumn: '2',
    gridRow: '2',
    height: 42,
    '@media': {
      [media.min1024]: {
        gridColumn: '2',
        gridRow: '1',
      },
    },
  },
  atoms({
    ml: 'auto',
    px: 'x5',
    borderRadius: 'curved',
    justifyContent: 'center',
  }),
])

export const connectButton = style([
  {
    justifyContent: 'space-around',
    borderRadius: 16,
    '@media': {
      [media.min1024]: {
        height: '56px',
        fontSize: 16,
      },
    },
  },
  atoms({
    justifyContent: {
      '@initial': 'flex-end',
      '@1024': 'flex-start',
    },
  }),
])

export const nounsCenterLink = style([
  {
    display: 'none',
    '@media': {
      [media.min576]: {
        flexShrink: 0,
        display: 'block',
      },
    },
  },
  atoms({
    cursor: 'pointer',
  }),
])

export const modalWrapper = style([
  {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    height: 400,
  },
  atoms({
    overflowY: 'scroll',
  }),
])

export const modalContent = style([
  {
    width: '300px',
  },
  atoms({
    borderRadius: 'phat',
  }),
])

export const popupContent = style([
  {
    width: '300px',
    borderRadius: radii.phat,
    '@media': {
      [media.min1024]: {
        width: 'unset',
        borderRadius: 'unset',
      },
    },
  },
])

export const popupTrigger = style({
  // Vanilla extract quirk, just need a defined style so we can define the following globalStyle
})

globalStyle(`${popupTrigger} button`, {
  padding: space.x3,
  borderRadius: 16,
})

export const topMenuItem = style({
  height: '32px!important',
})

export const linksMenuItem = style([
  {
    display: 'flex',
    borderRadius: '8px',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: color.background2,
    },
    '@media': {
      [media.min1024]: {
        borderRadius: 'unset',
        ':hover': {
          backgroundColor: 'unset',
        },
      },
    },
  },
  atoms({
    alignItems: 'center',
    w: '100%',
    px: 'x4',
    py: 'x3',
  }),
])

export const connectMenuItem = style([
  {
    width: '100%',
    display: 'block',
    borderRadius: '8px',
    userSelect: 'none',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: color.background2,
    },
  },
  atoms({
    alignItems: 'center',
    w: '100%',
    px: 'x4',
    py: 'x3',
  }),
])

export const disconnectButton = style([
  {
    color: 'red',
    ':hover': {
      cursor: 'pointer',
    },
  },
])

export const popupWrapper = style([
  {
    // only works with !important
    borderRadius: '20px!important',
  },
])
