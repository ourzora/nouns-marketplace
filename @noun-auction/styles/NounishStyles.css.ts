import { style } from '@vanilla-extract/css'
import { atoms, space, color } from '@zoralabs/zord'
import { recipe } from '@vanilla-extract/recipes'

export const auctionWrapperVariants = {
  layout: {
    row: [
      {
        height: '68px',
        gridTemplateColumns: '250px repeat(2, 1fr) 1.25fr 155px',
      },
      atoms({
        height: '100%',
      }),
    ],
    historyOnly: [
      {
        gridTemplateRows: 'auto',
      },
    ],
    withHistory: [
      {
        gridTemplateColumns: '250px repeat(2, 1fr) 1.25fr 155px',
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

export const transactionEventWrapper = style([
  {
    gridTemplateColumns: '1fr 125px',
  },
  atoms({
    w: '100%',
  }),
])

export const auctionEventRow = style([
  {
    selectors: {
      '&:after': {
        content: '',
        display: 'block',
        position: 'relative',
        width: '100%',
        height: space.x6,
        borderLeft: `2px solid ${color.black10}`,
        margin: `${space.x2} 0 ${space.x2}`,
        transform: `translateX(calc(${space.x6} - 1px))`,
      },
      '&:last-of-type:after': {
        display: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
])

/* STYLE UTILS */
export const lightFont = style({
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
})
