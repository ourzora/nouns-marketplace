import { style } from '@vanilla-extract/css'
// import { atoms, typography } from '@zord'
import { atoms } from '@zord/atoms'
import { typography } from '@zord/tokens'

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
