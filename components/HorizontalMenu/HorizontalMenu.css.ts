import { style } from '@vanilla-extract/css'
import { color, space, atoms, media } from '@zoralabs/zord'

export const horizontalMenuButton = style([
  {
    borderRadius: 0,
    paddingBottom: space.x2,
    borderBottom: `2px solid transparent`,
    selectors: {
      '&.active': {
        borderBottom: `2px solid ${color.black70}`,
      },
    },
  },
  atoms({
    pb: 'x2',
    color: 'primary',
  }),
])

export const horizontalMenuWrapper = style([
  {
    overflowX: 'scroll',
    '@media': {
      [media.min768]: {
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
])
