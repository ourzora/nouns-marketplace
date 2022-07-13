import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, HEADER_Z } from 'styles/style-constants'

export const headerWrapper = style({
  height: HEADER_HEIGHT_MOBILE,
  zIndex: HEADER_Z,
  '@media': {
    [media.min1024]: {
      height: HEADER_HEIGHT,
      position: 'relative',
      top: 0,
      backdropFilter: 'blur(10px)',
    },
  },
})

export const nounsGlasses = style({
  width: 70,
  height: 24,
  '@media': {
    [media.min1024]: {
      width: 101,
      height: 34,
    },
  },
})

export const collectionTrigger = style([
  atoms({
    borderRadius: 'curved',
    gap: 'x2',
    px: 'x4',
  }),
])

export const modalWrapper = style({
  overflowY: 'scroll',
  height: 400,
})
