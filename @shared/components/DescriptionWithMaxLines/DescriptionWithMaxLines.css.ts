import { style } from '@vanilla-extract/css'
import { atoms, typography } from '@zoralabs/zord'

export const button = style([
  {
    lineHeight: typography.lineHeight['30'],
  },
  atoms({
    position: 'absolute',
    bottom: 'x0',
    right: 'x0',
    px: 'x2',
    // backgroundColor: 'background1'
  }),
])
