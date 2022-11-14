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
  height: 'unset!important', // TODO: removeme when zord is vendored

  selectors: {
    '&:not([disabled]):hover': {
      cursor: 'pointer',
      backgroundColor: vars.color.background2,
      borderRadius: '12px!important', // TODO: removeme when zord is vendored
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
    border: '0!important',
    padding: '0!important',
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
