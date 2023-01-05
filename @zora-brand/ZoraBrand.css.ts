import { style } from '@vanilla-extract/css'
import { atoms, media, typography } from '@zord/config'

export const zoraBrand = style({
  fontWeight: '500!important',
  letterSpacing: '.05em',
  fontFamily: "'Inter', sans-serif!important",
  fontSize: 12,
  lineHeight: typography.lineHeight[20],
  color: '#808080',
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
