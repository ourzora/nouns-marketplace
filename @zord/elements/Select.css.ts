import { style } from '@vanilla-extract/css'

import { atoms } from '../atoms'
import { vars } from '../theme'

export const baseSelect = style([
  {
    borderRadius: vars.radii.curved,
    borderWidth: vars.border.width.normal,
    outline: 'none',
    selectors: {
      '&:focus': {
        borderColor: vars.color.primary,
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  atoms({
    h: '100%',
    w: '100%',
    py: 'x3',
    color: 'primary',
    fontWeight: 'paragraph',
    fontSize: 14,
    lineHeight: 24,
  }),
])

export const baseSelectContainer = style([
  {
    backgroundColor: vars.color.background2,
    transition: `background-color 0.1s ${vars.ease.out}`,
  },
  atoms({
    p: 'x0',
  }),
])
