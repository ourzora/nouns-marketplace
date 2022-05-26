import { style } from '@vanilla-extract/css'

export const codeWrapper = style({
  textAlign: 'start',
})

export const code = style({
  fontSize: '14px',
  fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
  lineHeight: 1.25,
  overflowX: 'scroll',
})
