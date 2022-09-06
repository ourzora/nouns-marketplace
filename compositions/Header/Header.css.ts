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
        gridColumn: '23',
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

export const connectButton = style([
  {
    gridColumn: '2',
    gridRow: '1',
    '@media': {
      [media.min1024]: {
        gridColumn: '24',
        gridRow: '1',
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: {
      '@initial': 'flex-end',
      '@1024': 'flex-start',
    },
  }),
])

export const docsLink = style([
  {
    height: 42,
    paddingLeft: space.x1,
    paddingRight: space.x3,
    gap: space.x3,
  },
  atoms({
    borderRadius: 'curved',
    position: 'relative',
  }),
])
