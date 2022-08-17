import { style } from '@vanilla-extract/css'
import { vars } from '@zoralabs/zord'

export const offsetY = style({
  transform: 'translateY(1px)',
})

export const textColor = style({
  color: vars.color.foreground.tertiary,
})
