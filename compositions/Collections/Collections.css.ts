import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms, media, vars } from '@zoralabs/zord'

export const collections = style([
  {
    maxWidth: '100%',
    '@media': {
      [media.min1024]: {
        maxWidth: '100%',
      },
      [media.min1440]: {
        maxWidth: `calc(${MAX_WIDTH.XL}px + (2 * ${vars.space.x8}))`,
      },
    },
  },
  atoms({
    px: { '@initial': 'x4', '@1024': 'x8' },
    width: '100%',
    alignSelf: 'center',
  }),
])
