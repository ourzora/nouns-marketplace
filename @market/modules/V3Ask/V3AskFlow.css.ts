import { style } from '@vanilla-extract/css'
import { atoms, vars } from '@zord/config'

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
  height: 'unset',

  selectors: {
    '&:not([disabled]):hover': {
      cursor: 'pointer',
      backgroundColor: vars.color.background2,
      borderRadius: vars.radii.curved,
    },
  },
})

export const textColor = style({
  color: vars.color.accentDisabled,
})

export const savings = style({
  fontWeight: 'bold',
})

export const popupTrigger = style([
  atoms({
    padding: 'x0',
    borderWidth: 'none',
  }),
])

export const stretch = atoms({
  alignItems: 'stretch',
})
