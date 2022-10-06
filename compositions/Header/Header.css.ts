import { style } from '@vanilla-extract/css'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from 'styles/style-constants'
import { MAX_WIDTH } from 'styles/style-constants'
import { atoms, media, color, space } from '@zoralabs/zord'
import { HEADER_LAYER } from 'constants/layers'

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
        gridTemplateColumns: 'repeat(3, 1fr)',
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
    aspectRatio: '70 / 24',
    maxHeight: '30px',
  },
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
    w: 'auto',
    ml: 'auto',
    borderRadius: 'curved',
    justifyContent: {
      '@initial': 'center',
      '@1024': 'center',
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

export const connectButton = style([
  {
    justifyContent: 'space-around',
    borderRadius: 16,
    fontSize: 12,
    height: '40px',
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
    aspectRatio: '100 / 24',
    maxHeight: '24px',
  },
  atoms({
    cursor: 'pointer',
    pos: 'relative',
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
