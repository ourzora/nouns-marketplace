import { style } from '@vanilla-extract/css'
import { atoms, color, media, radii, space } from '@zord/config'

export const collectionTrigger = style([
  {
    gridColumn: '1',
    gridRow: '2',
    '@media': {
      [media.min576]: {
        flexShrink: 0,
      },
      [media.min1024]: {
        height: space.x14,
      },
    },
  },
  atoms({
    gap: 'x2',
    w: '100%',
    justifyContent: 'flex-start',
    borderRadius: 'curved',
    display: { '@initial': 'none', '@576': 'flex' },
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
    maxHeight: `calc((${space.x10} * 5.5) + (${space.x4} * 5) + 2px)`, // (40px * 5 rows) + (0.5 * 1 row) + (5 * 16px gap) + 2px borderTop
    borderBottomLeftRadius: radii.curved,
    borderBottomRightRadius: radii.curved,
    '@media': {
      [media.min576]: {
        maxHeight: `calc((${space.x14} * 5.5) + (${space.x4} * 5) + 2px)`, // (56px * 5 rows...
      },
    },
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
