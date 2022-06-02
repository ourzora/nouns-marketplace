import { style, globalStyle } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const codeWrapper = style([
  {
    textAlign: 'start',
    overflowX: 'scroll',
  },
  atoms({
    w: '100%',
    backgroundColor: 'tertiary',
    p: 'x4',
    borderRadius: 'curved',
    mt: 'x2',
  }),
])

globalStyle(`${codeWrapper} pre`, {
  fontSize: '12px',
  fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace!important',
  lineHeight: '1!important',
})
