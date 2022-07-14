import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

// const STACK_BREAKPOINT = 750

export const tokenInfoWrapper = style([
  {
    maxWidth: 350,
  },
  atoms({
    w: '100%',
    gap: 'x3',
  }),
])

export const placeBidTrigger = style([
  {
    whiteSpace: 'nowrap',
  },
  atoms({
    borderRadius: 'curved',
    px: 'x4',
    py: 'x2',
    justifyContent: 'center',
    backgroundColor: 'tertiary',
    color: 'primary',
  }),
])

export const nounishAuctionRow = style([
  atoms({
    borderColor: 'secondary',
    borderStyle: 'solid',
    borderWidth: 'normal',
    borderRadius: 'phat',
    backgroundColor: 'primary',
    p: 'x2',
  }),
])
