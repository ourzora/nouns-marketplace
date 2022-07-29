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

export const buttonStyle = style({
  borderRadius: vars.radii.curved,
  backgroundColor: vars.color.foreground.primary,
  color: vars.color.text.primaryInverse,
  whiteSpace: 'nowrap',
})

export const lightFont = style({
  fontWeight: 300,
})

export const marketStatsWrapper = style([
  {
    overflowX: 'scroll',
  },
  atoms({
    w: {
      '@initial': '100vw',
      '@1024': 'auto',
    },
    px: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
    mb: {
      '@initial': 'x2',
      '@1024': 'x0',
    },
  }),
])

export const stat = style({
  whiteSpace: 'nowrap',
})
