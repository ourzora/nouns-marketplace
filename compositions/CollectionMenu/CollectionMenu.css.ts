import { style } from '@vanilla-extract/css'
import { color, space, atoms, media } from '@zoralabs/zord'

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

export const modal = style({
  maxWidth: 680,
})

export const modalWrapper = style([
  {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  atoms({
    overflowY: 'scroll',
  }),
])

export const filteredItems = style([
  {
    // maxHeight: 274, // (80px * 3 rows) + (2 * 16px gap) + 2px borderTop
    // maxHeight: 370, // (80px * 4 rows) + (3 * 16px gap) + 2px borderTop
    maxHeight: 466, // (80px * 5 rows) + (4 * 16px gap) + 2px borderTop // Waiting on answer from Andrei on # of rows to show
  },
  atoms({
    borderRadius: 'curved',
  }),
])

export const filterUnscrolled = style({
  borderTop: `2px solid transparent`,
})
export const filterScrolled = style({
  borderTop: `2px solid ${color.background2}`,
})
