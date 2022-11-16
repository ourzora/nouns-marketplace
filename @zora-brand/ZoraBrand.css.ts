import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

export const zoraBrand = style({
  fontWeight: 500,
})

export const poweredByContainer = style(
  [
    {
      '@media': {
        [media.min1024]: {
          marginTop: 0,
        },
      },
    },
  ],
  atoms({
    flexDirection: { '@initial': 'column', '@1024': 'row' },
  })
)
