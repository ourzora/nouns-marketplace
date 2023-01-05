import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'
import { atoms, media, space } from '@zord/config'

export const footerWrap = atoms({
  w: '100%',
  justifyContent: 'center',
  pt: 'x10',
  my: 'x0',
  mx: 'auto',
})

export const footer = style([
  {
    borderTop: `2px solid #F2F2F2`,
    maxWidth: MAX_WIDTH.LG,
    flexWrap: 'wrap',
    columnGap: space['x6'],
    '@media': {
      [media.min1024]: {
        order: 'nowrap',
        columnGap: space['x0'],
      },
    },
  },
  atoms({
    pos: 'relative',
    w: '100%',
    py: 'x10',
    px: { '@initial': 'x0', '@1024': 'x8' },
    alignItems: { '@initial': 'start', '@1024': 'center' },
    justifyContent: { '@initial': 'center', '@1024': 'space-between' },
  }),
])

export const poweredBy = style([
  {
    order: 3, // re-sequence to wrap to next row in mobile
    '@media': {
      [media.min1024]: {
        order: 'unset',
      },
    },
  },
  atoms({
    justifySelf: 'center',
    bottom: { '@initial': 'x6' },
    mt: { '@initial': 'x13', '@1024': 'x0' },
    w: { '@initial': '100%', '@1024': 'auto' },
  }),
])
