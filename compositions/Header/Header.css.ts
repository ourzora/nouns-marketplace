import { style } from '@vanilla-extract/css'
import { atoms, media, color, space } from '@zoralabs/zord'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, HEADER_Z } from 'styles/style-constants'

export const headerWrapper = style([
  {
    height: HEADER_HEIGHT_MOBILE,
    zIndex: HEADER_Z,
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
    borderBottom: `2px solid ${color.black10}`,
    '@media': {
      [media.min1024]: {
        height: HEADER_HEIGHT,
        gridTemplateColumns: 'repeat(24, 1fr)',
        borderBottom: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    p: {
      '@initial': 'x4',
      '@1024': 'x4',
    },
    pos: 'relative',
    gap: 'x4',
  }),
])

export const nounsGlassesLink = style([
  {
    gridColumn: '1',
    gridRow: '1',
    aspectRatio: '70 / 24',
    maxHeight: '30px',
  },
  atoms({
    cursor: 'pointer',
    pos: 'relative',
    h: '100%',
  }),
])

export const nounsGlasses = style([
  atoms({
    w: '100%',
    h: '100%',
    inset: 'x0',
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
    w: 'auto',
    ml: 'auto',
    borderRadius: 'curved',
    justifyContent: {
      '@initial': 'center',
      '@1024': 'center',
    },
  }),
])

export const connectButton = style([
  {
    borderRadius: 'phat',
    gridColumn: '2',
    gridRow: '1',
    '@media': {
      [media.min1024]: {
        gridColumn: '2',
        gridRow: '1',
      },
    },
  },
  atoms({
    textAlign: 'center',
    w: '100%',
    justifyContent: {
      '@initial': 'flex-end',
      '@1024': 'flex-start',
    },
  }),
])

export const nounsCenterLink = style([
  {
    gridColumn: '2',
    gridRow: '1',
    aspectRatio: '100 / 24',
    maxHeight: '24px',
    '@media': {
      [media.min1024]: {
        gridColumn: '23',
        gridRow: '1',
      },
    },
  },
  atoms({
    cursor: 'pointer',
    pos: 'relative',
    h: '100%',
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
