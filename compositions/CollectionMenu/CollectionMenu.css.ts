import { style } from '@vanilla-extract/css'
import { atoms, media, space } from '@zoralabs/zord'

export const collectionTrigger = style([
  {
    gridColumn: '1',
    gridRow: '2',
    height: 42,
    gridGap: space.x2,
    '@media': {
      [media.min1024]: {
        gridColumn: '3',
        gridRow: '1',
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: 'flex-start',
    borderRadius: 'curved',
    display: 'flex',
  }),
])

export const modalWrapper = style({
  overflowY: 'scroll',
  height: 400,
})
