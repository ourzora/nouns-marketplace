import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { recipe } from '@vanilla-extract/recipes'

export const auctionWrapperVariants = {
  layout: {
    row: [
      {
        height: '68px',
        gridTemplateColumns: '300px repeat(3, 1fr) 155px',
      },
      atoms({
        height: '100%',
      }),
    ],
    withHistory: [
      {
        gridTemplateColumns: '300px repeat(3, 1fr) 155px',
        gridTemplateRows: '68px 1fr auto',
      },
    ],
  },
}

export const auctionWrapper = recipe({
  variants: auctionWrapperVariants,
  base: style([
    atoms({
      width: '100%',
      position: 'relative',
    }),
  ]),
  defaultVariants: {
    layout: 'row',
  },
})

export const bidHistoryWrapper = style([
  {
    gridRowStart: 2,
    gridRowEnd: 2,
    gridColumnStart: 1,
    gridColumnEnd: 6,
  },
])

export const debugWrapper = style([
  {
    gridRowStart: 3,
    gridRowEnd: 3,
    gridColumnStart: 1,
    gridColumnEnd: 6,
  },
])

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
