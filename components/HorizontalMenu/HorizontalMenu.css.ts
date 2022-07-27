import { style } from '@vanilla-extract/css'
import { color, space, atoms } from '@zoralabs/zord'

export const horizontalMenuButton = style([
  {
    borderRadius: 0,
    paddingBottom: space.x2,
    borderBottom: `2px solid transparent`,
    selectors: {
      '&.active': {
        borderBottom: `2px solid ${color.black70}`,
      },
    },
  },
  atoms({
    pb: 'x2',
    color: 'primary',
  }),
])
