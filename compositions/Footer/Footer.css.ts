import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const footerWrap = style([
  {
    maxWidth: MAX_WIDTH.LG,
  },
  atoms({
    paddingTop: 'x10',
    my: 'x0',
    mx: 'auto',
  }),
])

export const footerWrapper = style([
  {
    borderTop: `2px solid #F2F2F2`,
  },
  atoms({
    w: '100%',
    py: 'x10',
    alignItems: { '@initial': 'start', '@1024': 'center' },
    justifyContent: { '@initial': 'center', '@1024': 'space-between' },
  }),
])

export const poweredBy = atoms({
  justifySelf: 'center',
})

export const menu = atoms({
  display: { '@initial': 'none', '@1024': 'block' },
})
