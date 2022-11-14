import { style } from '@vanilla-extract/css'
import { atoms, color, media } from '@zoralabs/zord'

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
    gap: 'x2',
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
])

export const filteredItems = style([
  {
    maxHeight: 'calc((80px * 5) + (80px * 0.5) + (16px * 5) + 2px)', // (80px * 5 rows) + (0.5 * 1 row) + (5 * 16px gap) + 2px borderTop
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
])

export const filterUnscrolled = style({
  borderTop: `2px solid transparent`,
})
export const filterScrolled = style({
  borderColor: color.background2,
})
export const floor = atoms({
  textTransform: 'none',
})
