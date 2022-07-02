import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const daosWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
  },
  atoms({
    w: '100%',
    m: 'auto',
    gap: 'x4',
  }),
])
