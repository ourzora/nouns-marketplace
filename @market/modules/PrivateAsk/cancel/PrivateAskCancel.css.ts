import { style } from '@vanilla-extract/css'
import { vars } from '@zoralabs/zord'

export const grid = style([
  {
    gridTemplateColumns: '1fr auto',
    backgroundColor: 'transparent',
  },
])

export const offsetY = style({
  transform: 'translateY(1px)',
})

export const button = style({
  selectors: {
    '&:not([disabled]):hover': {
      cursor: 'pointer',
      backgroundColor: vars.color.background2,
    },
  },
})

export const textColor = style({
  color: vars.color.accentDisabled,
})
