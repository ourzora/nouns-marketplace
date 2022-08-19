import { style } from '@vanilla-extract/css'
import { atoms, vars } from '@zoralabs/zord'

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
      backgroundColor: vars.color.background.tertiary,
    },
  },
})

export const textColor = style({
  color: vars.color.foreground.tertiary,
})

export const summary = atoms({
  textAlign: 'right',
})
