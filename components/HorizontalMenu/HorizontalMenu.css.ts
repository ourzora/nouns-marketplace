import { style } from '@vanilla-extract/css'
import { color, space, atoms, media } from '@zoralabs/zord'

export const horizontalMenuButton = style([
  {
    borderRadius: 0,
    borderBottom: `2px solid transparent`,
    paddingBottom: space.x2,
    selectors: {
      '&.active': {
        borderBottom: `2px solid ${color.black70}`,
      },
    },
  },
  atoms({
    color: 'primary',
  }),
])

export const horizontalMenuWrapper = style([
  {
    '@media': {
      [media.min576]: {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
  atoms({
    overflowX: 'scroll',
    gap: 'x6',
  }),
])
