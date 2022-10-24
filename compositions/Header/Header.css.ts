import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from 'styles/style-constants'
import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms, color, media, space } from '@zoralabs/zord'

export const headerWrapper = style([
  {
    height: HEADER_HEIGHT_MOBILE,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${color.background2}`,
    maxWidth: MAX_WIDTH.XL,
    margin: '0 auto',
    '@media': {
      [media.min1024]: {
        height: HEADER_HEIGHT,
        borderBottom: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    p: 'x4',
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

export const leftContainer = style([
  {
    alignItems: 'center',
  },
])

export const rightContainer = style([
  {
    alignItems: 'center',
  },
])

export const nounsGlassesLink = style([
  atoms({
    mr: 'x6',
    cursor: 'pointer',
    pos: 'relative',
    h: '100%',
  }),
])

export const manageButton = style([
  {
    gridColumn: '2',
    gridRow: '2',
    height: 42,
    paddingLeft: space.x5,
    paddingRight: space.x5,
    '@media': {
      [media.min1024]: {
        gridColumn: '2',
        gridRow: '1',
      },
    },
  },
  atoms({
    ml: 'auto',
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
        height: '52px',
        fontSize: 16,
      },
    },
  },
  atoms({
    w: '100%',
    ml: 'x6',
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

export const menuItem = style([
  atoms({
    alignItems: 'center',
    borderRadius: 'phat',
    px: 'x5',
    py: 'x5',
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

export const popUpWrapper = style([
  {
    // only works with !important
    borderRadius: '20px!important',
  },
])
