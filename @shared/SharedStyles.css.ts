import { globalStyle, style } from '@vanilla-extract/css'
// import { atoms, color, typography } from '@zord'
import { atoms } from '@zord/atoms'
import { color, typography } from '@zord/tokens'

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
    color: 'accent',
  }),
])

export const errorBox = style([
  {
    backgroundColor: color.background2,
  },
  atoms({
    textAlign: 'start',
    w: '100%',
    overflowX: 'scroll',
    px: 'x3',
    py: 'x2',
    borderRadius: 'curved',
  }),
])

globalStyle(`${errorBox} pre`, {
  fontSize: typography.fontSize[14],
  fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace!important',
  lineHeight: '1!important',
  color: 'red',
  whiteSpace: 'pre-wrap',
})

export const lightFont = style({
  fontFamily: 'PTRootUIWebLight!important',
  fontWeight: 300,
})
