import { HEADER_LAYER } from 'constants/layers'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms, color, media, vars } from '@zoralabs/zord'

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
    zIndex: HEADER_LAYER,
    borderBottom: `2px solid ${color.background2}`,
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        maxWidth: `calc(${MAX_WIDTH.XL}px + (2 * ${vars.space.x8}))`,
        gridColumn: '1/span 12',
        height: HEADER_HEIGHT,
        gridTemplateColumns: 'repeat(24, 1fr)',
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
  {
    aspectRatio: '70 / 24',
  },
  atoms({
    w: 'x25',
    cursor: 'pointer',
    pos: 'relative',
  }),
])

export const manageButton = style([
  atoms({
    ml: 'auto',
    borderRadius: 'curved',
    justifyContent: 'center',
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
  atoms({
    w: '100%',
    justifyContent: {
      '@initial': 'flex-end',
      '@1024': 'flex-start',
    },
  }),
])
