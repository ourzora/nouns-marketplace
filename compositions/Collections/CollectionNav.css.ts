import { style } from '@vanilla-extract/css'

export const activeLine = style([
  {
    height: 2,
    backgroundColor: 'currentColor',
    bottom: -2,
  },
])

export const navItem = style([
  {
    userSelect: 'none',
  },
])
