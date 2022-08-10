import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, color } from '@zoralabs/zord'

export const linkButton = style([
  {
    whiteSpace: 'nowrap',
    height: '42px',
  },
  atoms({
    borderRadius: 'curved',
    px: 'x4',
    py: 'x2',
    justifyContent: 'center',
    backgroundColor: 'tertiary',
    color: 'primary',
  }),
])

export const errorBox = style([
  {
    textAlign: 'start',
    backgroundColor: color.black10,
  },
  atoms({
    w: '100%',
    overflowX: 'scroll',
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
