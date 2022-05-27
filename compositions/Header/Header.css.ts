import { style, globalStyle } from '@vanilla-extract/css'
import { HEADER_HEIGHT } from 'styles/style-constants'

export const headerWrapper = style({
  height: 120,
  backgroundColor: 'rgba(255,255,255,0.25)',
  backdropFilter: 'blur(10px)',
})
