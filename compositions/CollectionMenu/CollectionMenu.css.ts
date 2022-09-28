import { style } from '@vanilla-extract/css'
import { color, space, atoms, vars, media, typography } from '@zoralabs/zord'
import { MODAL_TAB_LAYER } from '../../constants/layers'

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

export const filteredItems = style({
  maxHeight: 272, // (80px * 3 rows) + (2 * 16px gap)
})
