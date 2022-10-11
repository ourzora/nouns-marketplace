import { style } from '@vanilla-extract/css'
import { atoms, media, color, space } from '@zoralabs/zord'
import { HEADER_LAYER } from 'constants/layers'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from 'styles/style-constants'

export const headerWrapper = style([
  {
    height: HEADER_HEIGHT_MOBILE,
    zIndex: HEADER_LAYER,
    borderBottom: `2px solid ${color.background2}`,
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

export const nounsGlassesLink = style([
  {
    aspectRatio: '70 / 24',
    maxHeight: '30px',
  },
  atoms({
    w: 'x25',
    cursor: 'pointer',
    pos: 'relative',
    h: '100%',
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

export const docsLink = style({
  paddingLeft: space.x2,
  paddingRight: space.x3,
})
