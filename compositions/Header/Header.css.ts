import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'
import { HEADER_HEIGHT, HEADER_Z } from 'styles/style-constants'

export const headerWrapper = style({
  height: HEADER_HEIGHT,
  zIndex: HEADER_Z,
})

export const nounsGlasses = style({
  width: 101,
  height: 34,
})

export const collectionTrigger = style([
  {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  atoms({
    borderRadius: 'curved',
    gap: 'x2',
    px: 'x4',
  }),
])

export const modalWrapper = style({
  overflowY: 'scroll',
  height: 300,
})
