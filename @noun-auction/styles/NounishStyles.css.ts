import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, color, media, radii, space } from '@zord/config'

export const auctionWrapperVariants = {
  layout: {
    row: [
      {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gridAutoFlow: 'row',
        borderRadius: radii.phat,
        border: `2px solid ${color.background2}`,
        '@media': {
          [media.min1024]: {
            gridTemplateColumns: '350px repeat(2, 1fr) 1.25fr 155px',
            height: '68px',
            borderRadius: 0,
            border: 'none',
            zIndex: '20',
          },
        },
      },
      atoms({
        gap: {
          '@initial': 'x3',
          '@1024': 'x4',
        },
        px: {
          '@initial': 'x4',
          '@1024': 'x0',
        },
        pb: {
          '@initial': 'x4',
          '@1024': 'x0',
        },
        pt: {
          '@initial': 'x4',
          '@1024': 'x0',
        },
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
    collectionHero: [
      atoms({
        display: 'inline-block',
      }),
    ],
    sideBarBid: [
      {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
      },
      atoms({
        width: '100%',
      }),
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

export const wrapperHover = style([
  {
    '@media': {
      '(hover: hover)': {
        overflow: 'visible',
        zIndex: '10',
        selectors: {
          '&:after': {
            content: '',
            width: 'calc(100% + 30px)',
            height: 'calc(100% + 20px)',
            transform: 'translateX(-15px) translateY(-2px)',
            backgroundColor: color.background2, // should be black 5
            position: 'absolute',
            top: '0',
            left: '0',
            borderRadius: radii.phat,
            zIndex: '1',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease-out',
          },
          '&:hover&:after': {
            opacity: 0.5,
          },
        },
      },
    },
  },
  atoms({
    pos: 'relative',
  }),
])

export const responsiveRow = style([
  {
    alignItems: 'flex-start',
    '@media': {
      [media.min1024]: {
        alignItems: 'flex-end',
      },
    },
    selectors: {
      '&.nounish-auction__countdown': {
        gridColumn: '1',
        '@media': {
          [media.min1024]: {
            gridColumn: 'auto',
          },
        },
      },
      '&.nounish-auction__high-bid': {
        gridColumn: '2',
        '@media': {
          [media.min1024]: {
            gridColumn: 'auto',
          },
        },
      },
    },
  },
  atoms({
    w: '100%',
  }),
])

export const rowButtonWrapper = style([
  {
    gridColumn: '1 / 3',
    width: '100%',
    '@media': {
      [media.min1024]: {
        gridColumn: 'auto',
      },
    },
  },
])

globalStyle(
  `
  ${rowButtonWrapper} .zora-modal-trigger-wrapper,
  ${rowButtonWrapper} .nounish-auction__row-link
`,
  {
    width: '50%',
    textAlign: 'center',
    '@media': {
      [media.min1024]: {
        width: '100%',
      },
    },
  }
)

globalStyle(`${rowButtonWrapper} .zora-modal-trigger`, {
  width: '100%',
  '@media': {
    [media.min1024]: {
      width: '100%',
    },
  },
})

export const sidebarBidWrapper = style([
  {
    backgroundColor: color.accent,
  },
  atoms({
    p: 'x4',
    gap: 'x4',
    borderRadius: 'phat',
    flexDirection: 'column',
  }),
])

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

export const placeBidTriggerWrapper = atoms({
  alignSelf: 'flex-start',
})

export const placeBidTrigger = style([
  {
    whiteSpace: 'nowrap',
    height: '42px',
  },
  atoms({
    borderRadius: 'curved',
    px: 'x4',
    py: 'x2',
    justifyContent: 'center',
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
    gridTemplateColumns: 'auto 125px',
  },
  atoms({
    w: '100%',
  }),
])

export const transactionBidder = style([
  {
    gridTemplateColumns: `${space.x12} auto`,
  },
  atoms({
    gap: 'x3',
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
        height: space.x5,
        borderLeft: `2px solid ${color.background2}`,
        margin: `${space.x1} 0`,
        transform: `translateX(calc(${space.x6} - 1px))`,
        '@media': {
          [media.min1024]: {
            height: space.x6,
            margin: `${space.x2} 0`,
          },
        },
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

/* Thumbnail */
export const tokenInfoWrapper = style([
  {
    gridColumn: '1 / 3',
    gridTemplateColumns: '68px auto',
    gridTemplateRows: '68px',
    '@media': {
      [media.min1024]: {
        maxWidth: 350,
        gridColumn: 'auto',
        borderBottom: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    gap: 'x3',
    display: 'grid',
    pb: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
    mb: {
      '@initial': 'x2',
      '@1024': 'x0',
    },
  }),
])

export const nounishThumbnail = style([
  atoms({
    backgroundColor: 'tertiary',
    position: 'relative',
    overflow: 'hidden',
    h: '100%',
    w: '100%',
  }),
])

export const nounishThumbnailImage = style([
  atoms({
    inset: 'x0',
    position: 'absolute',
    w: '100%',
    h: '100%',
    objectFit: 'cover',
  }),
])

export const pixelate = style([
  {
    '@supports': {
      '(filter: url("#mosaic"))': {
        filter: 'url("#mosaic")',
        transform: 'scale(.65)',
      },
    },
  },
])

export const rowLoader = style([
  {
    height: 68,
    width: 68,
  },
  atoms({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'curved',
    backgroundColor: 'tertiary',
    pos: 'relative',
    overflow: 'hidden',
  }),
])

export const activeAuctionCardData = style([
  {
    gridTemplateColumns: '1fr',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
  },
  atoms({
    gap: {
      '@initial': 'x3',
      '@1024': 'x3',
    },
  }),
])

export const showError = atoms({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const rowCollectionName = style([
  {
    fontSize: 'large',
    fontWeight: 'bold',
  },
])
