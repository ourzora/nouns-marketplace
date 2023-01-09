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
      borderRadius: '12px',
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
  {
    border: '0',
    padding: '0',
  },
  atoms({
    padding: 'x0',
  }),
])
export const popupWrapper = style({
  borderRadius: '16px',
})
export const stretch = atoms({
  alignItems: 'stretch',
})
