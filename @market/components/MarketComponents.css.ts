import { vars, atoms, color, size } from '@zoralabs/zord'
import { style, globalStyle } from '@vanilla-extract/css'

export const errorBox = style([
  {
    textAlign: 'start',
    overflowX: 'scroll',
    backgroundColor: color.black10,
  },
  atoms({
    w: '100%',
    px: 'x3',
    py: 'x2',
    borderRadius: 'curved',
  }),
])

globalStyle(`${errorBox} pre`, {
  fontSize: '12px',
  fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace!important',
  lineHeight: '1!important',
  color: 'red',
})

export const lightFont = style({
  fontWeight: 300,
})
