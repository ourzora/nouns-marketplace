import { style, globalStyle } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

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

export const leadingTight = style({
  lineHeight: 1.125,
})

export const lightGreyType = style({
  color: 'var(--dk-grey)',
})

export const buttonStyle = style([
  {
    backgroundColor: 'var(--light-grey)',
  },
  atoms({
    borderRadius: 'round',
    px: 'x4',
    py: 'x2',
    justifyContent: 'center',
  }),
])
