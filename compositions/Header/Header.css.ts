import { style, globalStyle } from '@vanilla-extract/css'
import { HEADER_HEIGHT, HEADER_Z } from 'styles/style-constants'

export const headerWrapper = style({
  height: HEADER_HEIGHT,
  zIndex: HEADER_Z,
})

export const nounsGlasses = style({
  width: 101,
  height: 34,
})
