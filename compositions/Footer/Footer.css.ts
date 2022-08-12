import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { FOOTER_HEIGHT, FOOTER_HEIGHT_MOBILE } from 'styles/style-constants'

export const footerWrapper = style([
  {
    height: FOOTER_HEIGHT_MOBILE,
    '@media': {
      [media.min1024]: {
        height: FOOTER_HEIGHT,
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    px: 'x4',
  }),
])
