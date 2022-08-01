import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media, color, radii } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const daosWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
  },
  atoms({
    w: '100%',
    m: 'auto',
    gap: 'x4',
  }),
])

export const daosRow = style([
  {
    '@media': {
      [media.min1024]: {
        borderTop: `2px solid ${color.black10}`,
        transition: 'border-color 250ms ease',
      },
      '(hover: hover)': {
        selectors: {
          '&:hover': {
            borderTop: `2px solid transparent`,
          },
        },
      },
    },
  },
  atoms({
    pos: 'relative',
    pt: {
      '@initial': 'x0',
      '@1024': 'x4',
    },
  }),
])
