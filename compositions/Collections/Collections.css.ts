import { style } from '@vanilla-extract/css'
import { color, space } from '@zoralabs/zord'

export const collectionActivityButton = style([
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
])
