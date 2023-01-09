import { style } from '@vanilla-extract/css'
import { atoms, color, media, typography } from '@zord/config'

export const horizontalMenuButton = style([
  {
    borderBottom: `2px solid transparent`,
    lineHeight: typography.lineHeight[24],
    borderRadius: 'unset',
    selectors: {
      '&.active': {
        borderBottom: `2px solid ${color.accent}`,
        borderRadius: 'unset',
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
