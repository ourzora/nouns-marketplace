import { style } from '@vanilla-extract/css'
import { atoms, media, typography } from '@zoralabs/zord'

export const zoraBrand = style({
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
  fontSize: `${typography.fontSize[12]}!important`,
  lineHeight: `${typography.lineHeight[20]}!important`,
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
