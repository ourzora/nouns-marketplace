import { vars } from '@zoralabs/zord'
import { style } from '@vanilla-extract/css'

export const buttonStyle = style({
  borderRadius: vars.radii.round,
  backgroundColor: vars.color.foreground.primary,
})

export const lightFont = style({
  fontWeight: 300,
})
