import { style, globalStyle, globalFontFace } from '@vanilla-extract/css'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
})

globalStyle('*', {
  fontFamily: "'Londrina Solid', cursive!important",
})

globalStyle('light-font', {
  fontWeight: 300,
})

export const lightFont = style({
  fontWeight: 300,
})
