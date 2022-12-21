import { style } from '@vanilla-extract/css'
import { atoms } from '@zord/atoms'
import { typography } from '@zord/tokens'

export const button = style([
  {
    // lineHeight: typography.lineHeight['30'],
    lineHeight: typography.lineHeight['24'],
  },
  atoms({
    position: 'absolute',
    bottom: 'x0',
    right: 'x0',
    px: 'x2',
    // backgroundColor: 'background1'
  }),
])
