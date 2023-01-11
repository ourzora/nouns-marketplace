import { style } from '@vanilla-extract/css'

import { vars } from '../theme'

export const radioButtonGroup = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.x2,
})

export const row = style({
  flexDirection: 'row',
})
