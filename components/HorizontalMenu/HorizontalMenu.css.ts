import { style } from '@vanilla-extract/css'
import { atoms } from '@zord/atoms'
import { color, media, typography } from '@zord/tokens'

export const horizontalMenuButton = style([
  {
    borderBottom: `2px solid transparent!important`,
    lineHeight: typography.lineHeight[24],
    selectors: {
      '&.active': {
        borderBottom: `2px solid ${color.accent}!important`,
      },
    },
  },
  atoms({
    color: 'primary',
    pb: 'x2',
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
