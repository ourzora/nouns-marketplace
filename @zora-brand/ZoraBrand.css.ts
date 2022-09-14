import { atoms, media } from '@zoralabs/zord'
import { style } from '@vanilla-extract/css'

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

export const poweredByContainer = style([
  {
    flexDirection: 'column',
    marginTop: '30px',
    '@media': {
      [media.min1024]: {
        marginTop: 0,
        flexDirection: 'row',
        flexFlow: 'row-reverse',
      },
    },
  },
])
