import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'
import { FOOTER_HEIGHT } from 'styles/style-constants'

export const footerWrapper = style([
  {
    height: FOOTER_HEIGHT,
  },
  atoms({
    w: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
])
