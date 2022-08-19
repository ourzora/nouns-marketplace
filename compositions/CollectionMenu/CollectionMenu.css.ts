import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

export const collectionTrigger = style([
  {
    gridColumn: '1',
    gridRow: '2',
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
  }),
])

export const modalWrapper = style({
  overflowY: 'scroll',
  height: 400,
})
