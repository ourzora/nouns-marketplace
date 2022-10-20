import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

export const zoraTagline = style([
  {
    // FIXME: get rid of !important
    fontFamily: 'PTRootUIWebLight!important',
    opacity: 0.6,
  },
  atoms({
    marginRight: 'x1',
  }),
])

export const zoraBrand = style({
  fontWeight: 500,
})

export const poweredByContainer = style(
  [
    {
      '@media': {
        [media.min1024]: {
          marginTop: 0,
          flexFlow: 'row-reverse',
        },
      },
    },
  ],
  atoms({
    flexDirection: { '@initial': 'column', '@1024': 'row' },
  })
)
