import { style } from '@vanilla-extract/css'
// import { atoms, media } from '@zord'
import { atoms } from '@zord/atoms'
import { media } from '@zord/tokens'

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
