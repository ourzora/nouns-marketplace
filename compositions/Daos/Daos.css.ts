import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms, color, media } from '@zoralabs/zord'

export const daosWrapper = style([
  {
    maxWidth: MAX_WIDTH.MED,
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    gridTemplateRows: 'auto',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
        maxWidth: MAX_WIDTH.XL,
      },
    },
  },
  atoms({
    w: '100%',
    m: 'auto',
    gap: {
      '@initial': 'x4',
      '@1024': 'x8',
    },
  }),
])

export const daosRow = style([
  {
    '@media': {
      [media.min1024]: {
        borderTop: `2px solid ${color.background2}`,
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
